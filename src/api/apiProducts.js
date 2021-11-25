import { getAuth } from "@firebase/auth";
import axios from "axios";
import { API_URL } from "..";
import { itemCountMedium } from "../common/constant";

export async function getAllProducts(activePage) {
  const token = await getAuth().currentUser.getIdToken();
  return axios
    .get(
      `${API_URL}/api/product/getall?pageno=${activePage}&limit=${itemCountMedium}`,
      {
        headers: {
          "X-Access-Token": token,
        },
      }
    )
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
