import React, { useState, useEffect } from "react";
import OngoingBid from "../components/OngoingBid";
import UpcomingBid from "../components/UpcomingBid";
import { getOngoingRooms, getUpcomingRooms } from "../api/apiBidding";

function Home() {
  const [upcoming, setUpcoming] = useState({ rooms: [] }),
    [activeUpcomingPage, setUpcomingPage] = useState(1),
    [ongoing, setOngoing] = useState([]),
    handleUpcomingPageChange = (page) => {
      setUpcomingPage(page);
      getUpcomingRoomDetails(page);
    };

  async function getOngoingRoomDetails(page = 1) {
    const ongoingBidData = await getOngoingRooms(page);

    setUpcoming(ongoingBidData);
  }
  async function getUpcomingRoomDetails(page = 1) {
    const upcomingBidData = await getUpcomingRooms(page);

    setOngoing(upcomingBidData);
  }

  useEffect(() => {
    getOngoingRoomDetails();
    getUpcomingRoomDetails();
  }, []);

  return (
    <>
      <div className="flex flex-col mb-8">
        <OngoingBid room={upcoming.rooms[0]} />
      </div>
      <div className="flex flex-col">
        <h2 className="text-base mb-2">Upcoming Bids</h2>
        <UpcomingBid
          bids={ongoing}
          activePage={activeUpcomingPage}
          handleUpcomingPageChange={handleUpcomingPageChange}
        />
      </div>
    </>
  );
}

export default Home;
