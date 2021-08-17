import axios from "axios";

const baseURL = "http://socket.basithkunimal.com/";

export function getAllBids() {
  return axios
    .get(`${baseURL}api/room/getall`)
    .then((res) => {
      return res.data.data;
    })
    .catch((e) => {});
}

export function createBidRoom(data) {
  return axios
    .post(`${baseURL}api/room/create`, data)
    .then((res) => {
      window.location.href = "/biddings";
    })
    .catch((e) => {});
}
