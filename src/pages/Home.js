import React from "react";
import OngoingBid from "../components/OngoingBid";
import UpcomingBid from "../components/UpcomingBid";

function Home() {
  const onGoing = [],
    upComing = [];
  return (
    <>
      <div className="flex flex-col mb-8">
        <h2 className="text-base mb-2">Ongoing Bids</h2>
        <OngoingBid bids={onGoing} />
      </div>
      <div className="flex flex-col">
        <h2 className="text-base mb-2">Upcoming Bids</h2>
        <UpcomingBid bids={upComing} />
      </div>
    </>
  );
}

export default Home;
