import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getAllProducts } from "../api/apiProducts";

export default function RoomForm({ form, update }) {
  const [price, setPrice] = useState(1);
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [products, setProducts] = useState([]);
  const [product, setProduct] = useState(0);
  const [entryFee, setEntryFee] = useState(50);
  const [stepAmount, setStepAmount] = useState(1);

  async function getProducts() {
    let data = await getAllProducts();
    if (data) {
      setProducts(data);
    }
  }

  useEffect(() => {
    form.current = {
      price,
      startTime,
      endTime,
      product,
      entryFee,
      stepAmount,
    };
  }, [form, price, startTime, endTime, product, entryFee, stepAmount]);

  useEffect(() => {
    if (update) {
      setPrice(update.startbidamt);
      setEntryFee(update.entryfee);
      setProduct(update.productid);
      const tzoffset = new Date().getTimezoneOffset() * 60000;
      const starttime = new Date(update.starttime - tzoffset)
        .toISOString()
        .slice(0, -8);
      setStartTime(starttime);
      const endtime = new Date(update.endtime - tzoffset)
        .toISOString()
        .slice(0, -8);
      setEndTime(endtime);
      setStepAmount(update.stepamt);
    }
  }, [update]);

  useEffect(() => {
    getProducts();
  }, []);

  const setDropdown = () => {
    return products.map((item) => {
      return (
        <option key={item.productid} value={item.productid}>
          {item.name}
        </option>
      );
    });
  };

  return (
    <div>
      <div className="px-4 py-5 space-y-6 sm:p-6">
        <div className="grid grid-cols-6 gap-6">
          <div className="col-span-6 sm:col-span-2">
            <label
              htmlFor="price"
              className="block text-sm font-medium text-gray-700"
            >
              Starting amount
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
              Product
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
              Start time
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
              End time
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
          <div className="col-span-6 sm:col-span-2">
            <label
              htmlFor="stepamount"
              className="block text-sm font-medium text-gray-700"
            >
              Step amount
            </label>
            <input
              onChange={(e) => setStepAmount(e.target.value)}
              type="number"
              name="stepamount"
              id="stepamount"
              value={stepAmount}
              className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
            />
          </div>
        </div>
      </div>
      <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
        <Link
          className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          to="/rooms"
        >
          Back
        </Link>
        <button
          type="submit"
          className="inline-flex justify-center ml-4 py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Save
        </button>
      </div>
    </div>
  );
}
