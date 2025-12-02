import React from "react";
import "./App.css";
import Logo from "./components/Logo/Logo";
import { AppDataContext } from "./context/app-context";
import Auth from "./components/auth/Auth";
import AuthDetails from "./components/auth/AuthDetails";
import UserDashboard from "./components/UI/UserDashboard/index";

function App() {
  console.log("RNDR App");
  const { authUser } = React.useContext(AppDataContext);
  return (
    <div className="app">
      <Logo />
      <AuthDetails />
      {!authUser && <Auth />}
      {authUser && <UserDashboard />}
    </div>
  );
}
//

export default App;
