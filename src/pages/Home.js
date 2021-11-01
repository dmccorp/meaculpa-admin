import React, { useState, useEffect } from "react";
import OngoingBid from "../components/OngoingBid";
import UpcomingBid from "../components/UpcomingBid";
import { getOngoingRooms, getUpcomingRooms } from "../api/apiBidding";

function Home() {
  const [upcoming, setUpcoming] = useState([]),
    [ongoing, setOngoing] = useState([]);

  async function getRoomDetails() {
    const upcomingBidData = await getUpcomingRooms(),
      ongoingBidData = await getOngoingRooms();

    setOngoing(upcomingBidData);
    setUpcoming(ongoingBidData);
  }

  useEffect(() => {
    getRoomDetails();
  }, []);

  return (
    <>
      <div className="flex flex-col mb-8">
        <h2 className="text-base mb-2">Ongoing Bids</h2>
        <OngoingBid bids={upcoming} />
      </div>
      <div className="flex flex-col">
        <h2 className="text-base mb-2">Upcoming Bids</h2>
        <UpcomingBid bids={ongoing} />
      </div>
    </>
  );
}

export default Home;
