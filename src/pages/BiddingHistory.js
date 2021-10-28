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
                  Closing amount
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
                  Redeem status
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Total bid count
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
                  Total users
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {bids.map((bid) => (
                <tr key={bid.email}>
                  <td className="px-6 py-4  text-sm text-gray-500">
                    {bid.productname}
                  </td>
                  <td className="px-6 py-4  text-sm text-gray-500">
                    {bid.latestbidamt}
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
                    {moment(bid.starttime).format("MM/DD/YYYY hh:mm a")}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    {moment(bid.endtime).format("MM/DD/YYYY hh:mm a")}
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
