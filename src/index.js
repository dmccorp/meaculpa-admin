import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { initializeApp } from "firebase/app";

export const API_URL = "https://api.meaculpa.in";

const firebaseConfig = {
  apiKey: "AIzaSyDU9BN7f2SwEtN2-lyinclf4CqLvAijYZ0",
  authDomain: "meaculpa-62470.firebaseapp.com",
  projectId: "meaculpa-62470",
  storageBucket: "meaculpa-62470.appspot.com",
  messagingSenderId: "53516764614",
  appId: "1:53516764614:web:9538f0608fec3c85f31ec7",
  measurementId: "G-NC3WKZ8BHT",
};
initializeApp(firebaseConfig);

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
