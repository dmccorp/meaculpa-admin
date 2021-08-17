import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getAllProducts } from "../api/apiProducts";

function Table() {
  const [data, setData] = useState([]);

  async function getProducts() {
    let products = await getAllProducts();
    if (products) {
      setData(products);
    }
  }

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <div className="flex flex-col">
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
                    Name
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
                    Category
                  </th>
                  <th scope="col" className="relative px-6 py-3">
                    <span className="sr-only">Edit</span>
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200 overflow-y-scroll">
                {data.map((item) => (
                  <tr key={item.productid}>
                    <td className="px-6 py-4 w-10/12">
                      <div className="flex">
                        <img
                          className="h-24 mr-4"
                          alt={item.name}
                          src={item.imgurl}
                        />
                        <div className="text-sm text-gray-900">{item.name}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{item.price}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {item.categoryid}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <a
                        href={`product/edit/${item.productid}`}
                        className="text-indigo-600 hover:text-indigo-900"
                      >
                        Edit
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Products() {
  return (
    <div>
      <div className="py-5">
        <Link
          to="/product/new"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          New
        </Link>
      </div>
      <Table />
    </div>
  );
}
