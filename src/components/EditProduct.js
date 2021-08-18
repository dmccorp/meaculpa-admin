import React, { useState, useEffect } from "react";
import { getProduct, editProduct } from "../api/apiProducts";

export default function EditProductForm() {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [productId, setProductId] = useState("");

  async function fetchProduct() {
    const currentUrl = window.location.href;
    const prodId = currentUrl.substring(currentUrl.lastIndexOf("/") + 1);
    const result = await getProduct(prodId);
    setName(result.name);
    setCategory(result.categoryid);
    setPrice(result.price);
    setProductId(result.productid);
  }

  useEffect(() => {
    fetchProduct();
  }, []);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (name && price && category) {
      const body = {
        productid: parseFloat(productId),
        name: name,
        price: parseInt(price),
        categoryid: parseInt(category),
      };
      editProduct(body);
    } else {
      alert("Please fill all fields");
    }
  };

  return (
    <form onSubmit={handleFormSubmit}>
      <div className="shadow sm:rounded-md sm:overflow-hidden bg-white">
        <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate px-5 pt-5">
          Add products
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
              />
            </div>

            <div className="col-span-6 sm:col-span-2">
              <label
                htmlFor="category"
                className="block text-sm font-medium text-gray-700"
              >
                Category
              </label>
              <input
                type="number"
                name="categoryid"
                id="category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
              />
            </div>
          </div>
        </div>
        <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
          <a
            className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            href="/products"
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
  );
}
