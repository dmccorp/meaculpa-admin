import { getAuth } from "@firebase/auth";
import axios from "axios";
import { API_URL } from "..";
import {
  itemCountMedium,
  itemCountSmall,
  itemCountLarge,
} from "../common/constant";

export async function getAllBids(activePage) {
  const token = await getAuth().currentUser.getIdToken();
  return axios
    .get(
      `${API_URL}/api/room/getall?pageno=${activePage}&limit=${itemCountMedium}`,
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

export async function getBidHistory(activePage = 1) {
  const token = await getAuth().currentUser.getIdToken();
  return axios
    .get(
      `${API_URL}/api/room/listhistory?pageno=${activePage}&limit=${itemCountLarge}
    `,
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

export async function getUpcomingRooms(activePage) {
  const token = await getAuth().currentUser.getIdToken();
  return axios
    .get(
      `${API_URL}/api/room/list/upcoming?pageno=${activePage}&limit=${itemCountSmall}
    `,
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

export async function getOngoingRooms(activePage) {
  const token = await getAuth().currentUser.getIdToken();
  return axios
    .get(
      `${API_URL}/api/room/list/ongoing?pageno=${activePage}&limit=${itemCountSmall}`,
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

export async function createBidRoom(data) {
  const token = await getAuth().currentUser.getIdToken();
  return fetch(`${API_URL}/api/room/create`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Access-Token": token,
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
