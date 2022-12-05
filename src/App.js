import "./App.css";
import { BrowserRouter as Router } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import { createContext, useEffect, useState } from "react";
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
    <div className="flex justify-center items-center h-screen">
      <button
        onClick={signin}
        className="px-5 py-2 bg-blue-500 text-white rounded"
      >
        Sign in
      </button>
    </div>
  );
}

function Busy() {
  return (
    <div className="flex items-center justify-center h-screen">Loading...</div>
  );
}

export const AppContext = createContext();

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
  const appContext = {
    logout: function () {
      getAuth().signOut();
      setAuth(false);
    },
  };
  if (busy) return <Busy />;
  if (!auth) return <Login />;
  return (
    <AppContext.Provider value={appContext}>
      <Router>
        <Dashboard />
      </Router>
    </AppContext.Provider>
  );
}

export default App;
