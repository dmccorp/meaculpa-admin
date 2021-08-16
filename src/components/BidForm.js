import React, { useState, useEffect } from "react";
import { getAllProducts } from "../api/apiProducts";
import { createBidRoom } from "../api/apiBidding";

export default function BidForm() {
  const [price, setPrice] = useState(null);
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [products, setProducts] = useState([]);
  const [product, setProduct] = useState(0);
  const [entryFee, setEntryFee] = useState(0);

  async function getProducts() {
    let data = await getAllProducts();
    if (data) {
      setProducts(data);
    }
  }

  useEffect(() => {
    getProducts();
  }, []);

  const setDropdown = () => {
    return products.map((item) => {
      return <option value={item.productid}>{item.name}</option>;
    });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    if (price && startTime && endTime && product > 0 && entryFee) {
      console.log("Date.parse(startTime),,", Date.parse(startTime));
      console.log("Date.parse(end),,", Date.parse(endTime));
      const body = {
        minbidamt: parseFloat(price),
        starttime: Date.parse(startTime),
        endtime: Date.parse(endTime),
        productid: parseInt(product),
        entryfee: parseInt(entryFee),
      };
      createBidRoom(body);
    } else {
      alert("Please fill all fields");
    }
  };

  return (
    <div>
      <div className="mt-5 md:mt-0 md:col-span-2">
        <form onSubmit={handleFormSubmit}>
          <div className="shadow sm:rounded-md sm:overflow-hidden bg-white">
            <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate px-5 pt-5">
              Create bid
            </h2>
            <div className="px-4 py-5 space-y-6 sm:p-6">
              <div className="grid grid-cols-6 gap-6">
                <div className="col-span-6 sm:col-span-2">
                  <label
                    htmlFor="price"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Bid amount
                  </label>
                  <input
                    onChange={(e) => setPrice(e.target.value)}
                    type="number"
                    name="price"
                    value={price}
                    id="price"
                    autoComplete="given-name"
                    className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                  />
                </div>
                <div className="col-span-6 sm:col-span-2">
                  <label
                    htmlFor="entry-fee"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Entry fee
                  </label>
                  <input
                    onChange={(e) => setEntryFee(e.target.value)}
                    type="number"
                    name="entry-fee"
                    value={entryFee}
                    id="entry-fee"
                    autoComplete="given-name"
                    className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                  />
                </div>
                <div className="col-span-6 sm:col-span-2">
                  <label
                    htmlFor="products"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Products
                  </label>
                  <select
                    className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                    name="product"
                    id="products"
                    value={product}
                    onChange={(e) => setProduct(e.target.value)}
                  >
                    <option value="0">Select</option>
                    {products && setDropdown()}
                  </select>
                </div>
                <div className="col-span-6 sm:col-span-2">
                  <label
                    htmlFor="start-time"
                    className="block text-sm font-medium text-gray-700"
                  >
                    start time
                  </label>
                  <input
                    onChange={(e) => setStartTime(e.target.value)}
                    type="datetime-local"
                    name="start-time"
                    id="start-time"
                    value={startTime}
                    className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                  />
                </div>
                <div className="col-span-6 sm:col-span-2">
                  <label
                    htmlFor="end-time"
                    className="block text-sm font-medium text-gray-700"
                  >
                    end time
                  </label>
                  <input
                    onChange={(e) => setEndTime(e.target.value)}
                    type="datetime-local"
                    name="end-time"
                    id="end-time"
                    value={endTime}
                    className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                  />
                </div>
              </div>
            </div>
            <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
              <a
                className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                href="/biddings"
              >
                Back
              </a>
              <button
                type="submit"
                className="inline-flex justify-center ml-4 py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Save
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
