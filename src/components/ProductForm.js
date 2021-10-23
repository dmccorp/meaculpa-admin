import { getAuth } from "@firebase/auth";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { API_URL } from "..";

export default function ProductForm({ title, product, onSubmit }) {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [categories, setCategories] = useState([]);

  const onHandleFileChange = (e) => {
    console.log(e.target.files[0]);
  };

  useEffect(() => {
    if (product) {
      setName(product.name);
      setPrice(product.price);
      setCategory(product.category);
    }
  }, [product]);

  useEffect(() => {
    async function fetchCategories() {
      const token = await getAuth().currentUser.getIdToken();
      const rsp = await fetch(API_URL + "/api/category/list", {
        headers: {
          "X-Access-Token": token,
        },
      });
      const msg = await rsp.json();
      setCategories(msg.data);
    }
    fetchCategories();
  }, []);

  return (
    <form onSubmit={onSubmit}>
      <div className="shadow sm:rounded-md sm:overflow-hidden bg-white">
        <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate px-5 pt-5">
          {title}
        </h2>
        <div className="px-4 py-5 space-y-6 sm:p-6">
          <div className="grid grid-cols-6 gap-6">
            <div className="col-span-6 sm:col-span-2">
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700"
              >
                Name
              </label>
              <input
                type="text"
                name="name"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                autoComplete="given-name"
                className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                required
              />
            </div>
            <div className="col-span-6 sm:col-span-2">
              <label
                htmlFor="price"
                className="block text-sm font-medium text-gray-700"
              >
                Price
              </label>
              <input
                type="number"
                name="price"
                id="price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                autoComplete="given-name"
                className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                required
              />
            </div>

            <div className="col-span-6 sm:col-span-2">
              <label
                htmlFor="category"
                className="block text-sm font-medium text-gray-700"
              >
                Category
              </label>
              <select
                name="categoryid"
                id="category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                required
              >
                <option>Select category</option>
                {categories.map((category) => (
                  <option value={category.categoryid}>{category.name}</option>
                ))}
              </select>
            </div>
            <div className="col-span-6 sm:col-span-2">
              <label
                htmlFor="picture"
                className="block text-sm font-medium text-gray-700"
              >
                Image
              </label>
              <input
                type="file"
                name="picture"
                id="picture"
                onChange={onHandleFileChange}
                accept="image/png, image/jpeg"
                className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md border p-1"
                required
              />
            </div>
          </div>
        </div>
        <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
          <Link
            className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            to="/products"
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
    </form>
  );
}
