import React, { useState, useEffect } from "react";
import { Home } from "./components/Home";
import { Login } from "./components/Login";

function App() {
  const [loggingIn, setIsLoggingIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("faq_token")) {
      setIsAdmin(true);
    }
  }, [isAdmin]);

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
