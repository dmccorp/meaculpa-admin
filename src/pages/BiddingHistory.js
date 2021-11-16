import React, { useState, useEffect } from "react";
import { getBidHistory } from "../api/apiBidding";
import moment from "moment";

function BiddingHistory() {
  const [bids, setBids] = useState([]);

  async function fetchBids() {
    let bids = await getBidHistory();
    if (bids) {
      setBids(bids);
    }
  }

  useEffect(() => {
    fetchBids();
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
              {bids.map((bid) => (
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
                    {bid.winner}
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
      </div>
    </div>
  );
}

export default BiddingHistory;
