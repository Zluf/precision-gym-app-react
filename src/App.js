import React, { useState } from "react";
import "./App.css";
import "./components/UI/Card.css";
import Logo from "./components/Logo/Logo";
import AppContext from "./context/app-context";
import SignIn from "./components/auth/SignIn";
import SignUp from "./components/auth/SignUp";
import AuthDetails from "./components/auth/AuthDetails";
import UserDashboard from "./components/UI/UserDashboard";

// !! To add dates
// !! To add login

function App() {
  const context = React.useContext(AppContext);

  return (
    <div className="app">
      <Logo />

      <AuthDetails />

      {!context.authUser && (
        <section>
          <SignIn />
          <SignUp />
          <AuthDetails />
        </section>
      )}

      {context.authUser && <UserDashboard />}
    </div>
  );
}

export default App;
