import React, { useState } from "react";
import "./App.css";
import Logo from "./components/Logo/Logo";
import AppContext from "./context/app-context";
import Auth from "./components/auth/Auth";
import AuthDetails from "./components/auth/AuthDetails";
import UserDashboard from "./components/UI/UserDashboard";
import AddNewRoutine from "./components/UI/UserDashboard/AddNewRoutine";

function App() {
  const context = React.useContext(AppContext);

  return (
    <div className="app">
      <Logo />

      <AuthDetails />

      {!context.authUser && <Auth />}

      {context.authUser && context.routineList.length <= 0 && <AddNewRoutine />}

      {context.authUser && <UserDashboard />}
    </div>
  );
}

export default App;
