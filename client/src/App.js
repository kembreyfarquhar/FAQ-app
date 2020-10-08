import React, { useState } from "react";
import { Home } from "./components/Home";
import { Login } from "./components/Login";

/* 
Components:
  home - if not logged in, admin link/button at top right
          if logged in, logout button
  loop through FAQs - render FAQ component (if not logged in, just view)(if logged in, edit/delete buttons, created & edited user emails)
  login - conditionally render based on auth state (make false after success)

  admin state - bool
*/

function App() {
  const [loggingIn, setIsLoggingIn] = useState(false);
  return loggingIn ? (
    <Login setIsLoggingIn={setIsLoggingIn} />
  ) : (
    <Home setIsLoggingIn={setIsLoggingIn} />
  );
}

export default App;
