import React from "react";
import moment from "moment";
import Pagination from "react-js-pagination";
import { itemCountSmall } from "../common/constant";

function UpcomingBid({ bids = {}, activePage, handleUpcomingPageChange }) {
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
                  Entry fee
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
                  minimum amount
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  step amount
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {bids.rooms &&
                bids.rooms.map((bid) => (
                  <tr key={bid.email}>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      {bid.productname}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      ₹{bid.entryfee}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      {moment(bid.starttime).format("DD/MM/YYYY hh:mm a")}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      {moment(bid.endtime).format("DD/MM/YYYY hh:mm a")}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {bid.startbidamt}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {bid.stepamt}
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
        <Pagination
          activePage={activePage}
          itemsCountPerPage={itemCountSmall}
          totalItemsCount={bids.total_count}
          pageRangeDisplayed={5}
          onChange={handleUpcomingPageChange}
          itemClass="page-item"
          linkClass="page-link"
        />
      </div>
    </div>
  );
}

export default UpcomingBid;
