import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { getAuth } from "@firebase/auth";
import Pagination from "react-js-pagination";
import { getAllBids } from "../api/apiBidding";
import { API_URL } from "..";
import moment from "moment";
import "../common/styles.css";
import { itemCountMedium } from "../common/constant";

function Table() {
  const [data, setData] = useState([]),
    [activePage, setActivePage] = useState(1);

  const handlePageChange = (page) => {
    setActivePage(page);
    getUserDetails(page);
  };

  async function getUserDetails(currentPage) {
    const res = await getAllBids(currentPage);
    if (res) setData(res);
  }

  useEffect(() => {
    getUserDetails(activePage);
  }, []);

  function deleteRoom(roomid) {
    return async function () {
      if (window.confirm("Are you sure?")) {
        const token = await getAuth().currentUser.getIdToken();
        fetch(API_URL + "/api/room/delete", {
          method: "POST",
          headers: {
            "X-Access-Token": token,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ roomid }),
        });
        setData(data.filter((room) => room.roomid !== roomid));
      }
    };
  }

  return (
    <div className="flex flex-col">
      <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Room
              </th>
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
                Price
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
                Start Amt
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                date
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
              <th scope="col" className="relative px-6 py-3">
                <span className="sr-only">Edit</span>
              </th>
              <th scope="col" className="relative px-6 py-3">
                <span className="sr-only">Delete</span>
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {data.rooms &&
              data.rooms.map((item) => (
                <tr key={item.roomid}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">
                          {item.roomid}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div
                      className="text-sm text-gray-900 truncate"
                      style={{ maxWidth: "150px" }}
                      title={item.productname}
                    >
                      {item.productname}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{item.price}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      ₹{item.entryfee}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {item.startbidamt}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {moment(item.starttime).format("DD/MM/YYYY")}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {moment(item.starttime).format("hh:mm a")}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {moment(item.endtime).format("hh:mm a")}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <Link
                      to={"/rooms/" + item.roomid}
                      className="text-indigo-600 hover:text-indigo-900"
                    >
                      Edit
                    </Link>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button
                      onClick={deleteRoom(item.roomid)}
                      className="text-red-500 pl-5"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
      <Pagination
        activePage={activePage}
        itemsCountPerPage={itemCountMedium}
        totalItemsCount={data.total_count}
        pageRangeDisplayed={5}
        onChange={handlePageChange}
        itemClass="page-item"
        linkClass="page-link"
      />
    </div>
  );
}

export default function Biddings() {
  return (
    <div>
      <div className="py-5">
        <Link
          to="/rooms/new"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          New
        </Link>
      </div>
      <Table />
    </div>
  );
}
