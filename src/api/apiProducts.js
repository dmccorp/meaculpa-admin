import axios from "axios";

const baseURL = "http://socket.basithkunimal.com/";

export function getAllProducts() {
  return axios
    .get(`${baseURL}api/product/getall`)
    .then((res) => {
      return res.data.data;
    })
    .catch((e) => {});
}

export function getProduct(id) {
  return axios
    .get(`${baseURL}api/product/get/${id}`)
    .then((res) => {
      return res.data.data[0];
    })
    .catch((e) => {});
}

export function editProduct(body) {
  return axios
    .post(`${baseURL}api/product/edit`, body)
    .then((res) => {
      window.location.href = "/products";
    })
    .catch((e) => {});
}
