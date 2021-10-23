import { getAuth } from "@firebase/auth";
import { useHistory } from "react-router";
import { API_URL } from "..";
import ProductForm from "../components/ProductForm";

export default function CreateProduct() {
  const history = useHistory();
  async function onSubmit(e) {
    const token = await getAuth().currentUser.getIdToken();
    e.preventDefault();
    const formData = new FormData(e.target);
    await fetch(API_URL + "/api/product/create", {
      method: "POST",
      headers: {
        "X-Access-Token": token,
      },
      body: formData,
    });
    history.push("/products");
  }
  return <ProductForm title="Add product" onSubmit={onSubmit} />;
}
