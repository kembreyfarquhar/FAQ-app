import React, { useState } from "react";
import { Home } from "./components/Home";
import { Login } from "./components/Login";

function App() {
  const [loggingIn, setIsLoggingIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  return loggingIn ? (
    <Login setIsLoggingIn={setIsLoggingIn} isAdmin={isAdmin} />
  ) : (
    <Home setIsLoggingIn={setIsLoggingIn} setIsAdmin={setIsAdmin} />
  );
}

export default App;
