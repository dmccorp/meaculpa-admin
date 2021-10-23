import { getAuth } from "@firebase/auth";
import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router";
import { API_URL } from "..";
import { getProduct } from "../api/apiProducts";
import ProductForm from "./ProductForm";

export default function EditProductForm() {
  const { id } = useParams();
  const [product, setProduct] = useState("");
  const history = useHistory();

  useEffect(() => {
    async function fetchProduct() {
      const result = await getProduct(id);
      setProduct(result);
    }
    fetchProduct();
  }, [id]);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const token = await getAuth().currentUser.getIdToken();
    const formData = new FormData(e.target);
    formData.append("productid", parseInt(id));
    await fetch(`${API_URL}/api/product/edit`, {
      method: "POST",
      headers: {
        "X-Access-Token": token,
      },
      body: formData,
    });
    history.push("/products");
  };

  return (
    <ProductForm
      title={"Edit product"}
      onSubmit={handleFormSubmit}
      product={product}
    />
  );
}
