import axios from "axios";

const baseURL = "http://socket.basithkunimal.com/";

export function getAllProducts() {
  return axios
    .post(`${baseURL}api/product/getall`)
    .then((res) => {
      return res.data.data;
    })
    .catch((e) => {});
}
