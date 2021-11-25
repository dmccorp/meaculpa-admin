import React, { useState, useEffect } from "react";
import OngoingBid from "../components/OngoingBid";
import UpcomingBid from "../components/UpcomingBid";
import { getOngoingRooms, getUpcomingRooms } from "../api/apiBidding";

function Home() {
  const [upcoming, setUpcoming] = useState([]),
    [activeUpcomingPage, setUpcomingPage] = useState(1),
    [activeOngoingPage, setOngoingPage] = useState(1),
    [ongoing, setOngoing] = useState([]),
    handleOngoingPageChange = (page) => {
      setOngoingPage(page);
      getOngoingRoomDetails(page);
    },
    handleUpcomingPageChange = (page) => {
      setUpcomingPage(page);
      getUpcomingRoomDetails(page);
    };

  async function getOngoingRoomDetails(page) {
    const ongoingBidData = await getOngoingRooms(page);

    setUpcoming(ongoingBidData);
  }
  async function getUpcomingRoomDetails(page) {
    const upcomingBidData = await getUpcomingRooms(page);

    setOngoing(upcomingBidData);
  }

  useEffect(() => {
    getOngoingRoomDetails(activeOngoingPage);
    getUpcomingRoomDetails(activeUpcomingPage);
  }, []);

  return (
    <>
      <div className="flex flex-col mb-8">
        <h2 className="text-base mb-2">Ongoing Bids</h2>
        <OngoingBid
          bids={upcoming}
          activePage={activeOngoingPage}
          handleOngoingPageChange={handleOngoingPageChange}
        />
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
