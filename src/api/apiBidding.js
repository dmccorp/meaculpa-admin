import { getAuth } from "@firebase/auth";
import axios from "axios";
import { API_URL } from "..";

export async function getAllBids() {
  const token = await getAuth().currentUser.getIdToken();
  return axios
    .get(`${API_URL}/api/room/getall`, {
      headers: {
        "X-Access-Token": token,
      },
    })
    .then((res) => {
      return res.data.data;
    })
    .catch((e) => {});
}

export async function getBidHistory() {
  const token = await getAuth().currentUser.getIdToken();
  return axios
    .get(`${API_URL}/api/room/listhistory?pageno=1&limit=15
    `, {
      headers: {
        "X-Access-Token": token,
      },
    })
    .then((res) => {
      return res.data.data;
    })
    .catch((e) => {});
}

export function createBidRoom(data) {
  return fetch(`${API_URL}/api/room/create`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
}

export async function editBidRoom(data) {
  const token = await getAuth().currentUser.getIdToken();
  return fetch(`${API_URL}/api/room/edit`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Access-Token": token,
    },
    body: JSON.stringify(data),
  }).catch((e) => {});
}
