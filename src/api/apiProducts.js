import { getAuth } from "@firebase/auth";
import axios from "axios";
import { API_URL } from "..";

export async function getAllProducts() {
  const token = await getAuth().currentUser.getIdToken();
  return axios
    .get(`${API_URL}/api/product/getall`, {
      headers: {
        "X-Access-Token": token,
      },
    })
    .then((res) => {
      return res.data.data;
    })
    .catch((e) => {});
}

export async function getProduct(id) {
  const token = await getAuth().currentUser.getIdToken();
  return axios
    .get(`${API_URL}/api/product/get/${id}`, {
      headers: {
        "X-Access-Token": token,
      },
    })
    .then((res) => {
      return res.data.data;
    })
    .catch((e) => {});
}
