import React, { useEffect, useRef } from "react";
import { io } from "socket.io-client";
import { API_URL } from "..";
import { timeLeft } from "../common";

function OngoingBid({ room }) {
  const timeLeftColumn = useRef();
  const latestBidColumn = useRef();
  useEffect(() => {
    if (!room) return;
    const timer = setInterval(() => {
      timeLeftColumn.current.innerText = timeLeft(room.endtime);
    }, 1000);
    timeLeftColumn.current.innerText = timeLeft(room.endtime);
    const socket = io.connect(API_URL);
    socket.on(`bid/${room.roomid}`, (msg) => {
      const bid = JSON.parse(msg);
      latestBidColumn.current.innerText = bid.bidamt;
    });
    latestBidColumn.current.innerText = room.latestbidamt;
    return () => {
      socket.disconnect();
      clearInterval(timer);
    };
  }, [room]);
  if (!room) return null;
  return (
    <div className="bg-white p-5 rounded-xl">
      <div className="pb-5">
        <h1 className="text-xl m-0 font-bold text-uppercase">Ongoing bid</h1>
      </div>
      <div className="flex gap-10 ">
        <div className="w-40">
          <img src={room.imgurl} alt={room.productname} />
        </div>
        <div className="flex gap-20">
          <div>
            <div className="pb-5">
              <div className="text-sm text-gray-400">Product name</div>
              <div className="font-bold">{room.productname}</div>
            </div>
            <div>
              <div className="text-sm text-gray-400">Category</div>
              <div className="font-bold">{room.categoryname}</div>
            </div>
          </div>
          <div>
            <div className="pb-5">
              <div className="text-sm text-gray-400">Entry fee</div>
              <div className="font-bold">₹{room.entryfee / 100}</div>
            </div>
            <div>
              <div className="text-sm text-gray-400">Total users</div>
              <div className="font-bold">{room.total_users}</div>
            </div>
          </div>
          <div>
            <div className="pb-5">
              <div className="text-sm text-gray-400">Latest amount</div>
              <div className="font-bold" ref={latestBidColumn}></div>
            </div>
            <div>
              <div className="text-sm text-gray-400">Time remaining</div>
              <div className="font-bold" ref={timeLeftColumn}></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OngoingBid;
