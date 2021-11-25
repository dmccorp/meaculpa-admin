import React, { useState, useEffect } from "react";
import moment from "moment";
import Pagination from "react-js-pagination";
import { getBidHistory } from "../api/apiBidding";
import { itemCountLarge } from "../common/constant";

function BiddingHistory() {
  const [bids, setBids] = useState({}),
    [activePage, setActivePage] = useState(1),
    handlePageChange = (page) => {
      setActivePage(page);
      fetchBids(page);
    };

  async function fetchBids(page) {
    let bids = await getBidHistory(page);
    if (bids) {
      setBids(bids);
    }
  }

  useEffect(() => {
    fetchBids(activePage);
  }, []);

  return (
    <div className="">
      <div className="">
        <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Product
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Closed
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Winner
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Redeemed
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Bids
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  start time
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  end time
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Users
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {bids &&
                bids.rooms &&
                bids.rooms.map((bid) => (
                  <tr key={bid.roomid}>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      <div className="truncate" style={{ maxWidth: "150px" }}>
                        {bid.productname}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      {bid.latestbidamt ? "₹ " + bid.latestbidamt : "N/A"}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      {bid.winner && bid.winner.username}
                    </td>
                    <td className="px-6 py-4  text-sm text-gray-500">
                      {bid.redeem_status ? "Redeemed" : "Pending"}
                    </td>
                    <td className="px-6 py-4  text-sm text-gray-500">
                      {bid.total_bids}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      {moment(bid.starttime).format("DD/MM/YYYY hh:mm a")}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      {moment(bid.endtime).format("DD/MM/YYYY hh:mm a")}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {bid.total_users}
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
        <Pagination
          activePage={activePage}
          itemsCountPerPage={itemCountLarge}
          totalItemsCount={bids.total_count}
          pageRangeDisplayed={5}
          onChange={handlePageChange}
          itemClass="page-item"
          linkClass="page-link"
        />
      </div>
    </div>
  );
}

export default BiddingHistory;
