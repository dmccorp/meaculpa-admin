import { getAuth } from "@firebase/auth";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Pagination from "react-js-pagination";
import { itemCountMedium } from "../common/constant";
import { API_URL } from "..";
import { getAllProducts } from "../api/apiProducts";

function Table() {
  const [data, setData] = useState([]),
    [activePage, setActivePage] = useState(1);

  const handlePageChange = (page) => {
    setActivePage(page);
    getProducts(page);
  };

  async function getProducts(page = 1) {
    let products = await getAllProducts(page);
    if (products) {
      setData(products);
    }
  }

  function deleteProduct(productid) {
    return async function () {
      if (window.confirm("Are you sure?")) {
        const token = await getAuth().currentUser.getIdToken();
        fetch(API_URL + "/api/product/delete", {
          method: "POST",
          headers: {
            "X-Access-Token": token,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ productid }),
        })
          .then((res) => {
            if (res.status !== 200) {
              res
                .text()
                .then((txt) => {
                  return JSON.parse(txt).msg;
                })
                .then((txt) => {
                  alert(txt);
                });
            } else {
              setData(
                data.filter((product) => product.productid !== productid)
              );
            }
          })
          .catch((err) => {
            console.log("err, err", err);
            alert(err);
          });
      }
    };
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
                {data.products &&
                  data.products.map((item) => (
                    <tr key={item.productid}>
                      <td className="px-6 py-4">
                        <div className="flex">
                          <img
                            className="h-4 w-4 mr-4 overflow-hidden"
                            alt={item.name}
                            src={item.imgurl}
                          />
                          <div
                            className="text-sm text-gray-900 truncate"
                            style={{ maxWidth: "450px" }}
                            title={item.name}
                          >
                            {item.name}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          ₹ {item.price}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {item.categoryname}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <Link
                          to={`/products/edit/${item.productid}`}
                          className="text-indigo-600 hover:text-indigo-900"
                        >
                          Edit
                        </Link>
                        <button
                          onClick={deleteProduct(item.productid)}
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
      </div>
    </div>
  );
}

export default function Products() {
  return (
    <div>
      <div className="py-5">
        <Link
          to="/products/new"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          New
        </Link>
      </div>
      <Table />
    </div>
  );
}
