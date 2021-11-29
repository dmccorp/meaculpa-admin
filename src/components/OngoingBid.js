import React, { useEffect, useRef } from "react";
import Pagination from "react-js-pagination";
import { io } from "socket.io-client";
import { API_URL } from "..";
import { timeLeft } from "../common";
import { itemCountSmall } from "../common/constant";

function Row({ room }) {
  const timeLeftColumn = useRef();
  const latestBidColumn = useRef();
  useEffect(() => {
    setInterval(() => {
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
    };
  }, [room]);
  return (
    <tr>
      <td className="px-6 py-4 text-sm text-gray-500">{room.productname}</td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
        {room.categoryname}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
        ₹{room.entryfee / 100}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
        {room.total_users}
      </td>
      <td
        className="px-6 py-4 whitespace-nowrap text-sm text-gray-500"
        ref={latestBidColumn}
      ></td>
      <td
        className="px-6 py-4 whitespace-nowrap text-sm text-gray-500"
        ref={timeLeftColumn}
      ></td>
    </tr>
  );
}

function OngoingBid({ bids = [], activePage = 1, handleOngoingPageChange }) {
  return (
    <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
      <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
        <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Product name
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Category
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Entry fee
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Total users
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Latest amount
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Time remaining
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {bids.rooms &&
                bids.rooms.map((room) => <Row room={room} key={room.roomid} />)}
            </tbody>
          </table>
        </div>
        <Pagination
          activePage={activePage}
          itemsCountPerPage={itemCountSmall}
          totalItemsCount={bids.total_count}
          pageRangeDisplayed={5}
          onChange={handleOngoingPageChange}
          itemClass="page-item"
          linkClass="page-link"
        />
      </div>
    </div>
  );
}

export default OngoingBid;
