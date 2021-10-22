import "./App.css";
import { BrowserRouter as Router } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import { useEffect, useState } from "react";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "@firebase/auth";

function Login() {
  function signin() {
    const auth = getAuth();
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then((result) => {
        // const credential = GoogleAuthProvider.credentialFromResult();
        // const token = credential.accessToken;
        // const user = result.user;
      })
      .catch((error) => {});
  }
  return (
    <div>
      <button onClick={signin}>Sign in</button>
    </div>
  );
}

function Busy() {
  return <div>Loading...</div>;
}

function App() {
  const [auth, setAuth] = useState(false);
  const [busy, setBusy] = useState(true);
  useEffect(() => {
    getAuth().onAuthStateChanged((user) => {
      setBusy(false);
      if (user) {
        setAuth(true);
      }
    });
  }, []);
  if (busy) return <Busy />;
  if (!auth) return <Login />;
  return (
    <Router basename="/admin">
      <Dashboard />
    </Router>
  );
}

export default App;
