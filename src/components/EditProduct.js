import React, { useState, useEffect } from "react";
import { useHistory } from "react-router";
import { getProduct, editProduct } from "../api/apiProducts";
import ProductForm from "./ProductForm";

export default function EditProductForm() {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [productId, setProductId] = useState("");
  const history = useHistory();

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

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    console.log(e);
    if (name && price && category) {
      const body = {
        productid: parseFloat(productId),
        name: name,
        price: parseInt(price),
        categoryid: parseInt(category),
      };
      await editProduct(body);
      history.push("/products");
    } else {
      alert("Please fill all fields");
    }
  };

  return (
    <ProductForm
      title={"Edit product"}
      onSubmit={handleFormSubmit}
      initial={{ name, price, category }}
    />
  );
}
