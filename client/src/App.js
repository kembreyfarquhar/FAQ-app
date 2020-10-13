import React, { useState, useEffect } from "react";
import axios from "axios";
import { Home } from "./components/Home";
import { Login } from "./components/Login";

function App() {
  const [loggingIn, setIsLoggingIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("faq_token")) {
      const token = localStorage.getItem("faq_token");
      axios
        .post(`${process.env.REACT_APP_API_URL}/api/auth/${token}`)
        .then(() => setIsAdmin(true))
        .catch(() => setIsAdmin(false));
    }
  }, []);

  return loggingIn ? (
    <Login setIsLoggingIn={setIsLoggingIn} setIsAdmin={setIsAdmin} />
  ) : (
    <Home
      setIsLoggingIn={setIsLoggingIn}
      isAdmin={isAdmin}
      setIsAdmin={setIsAdmin}
    />
  );
}

export default App;
