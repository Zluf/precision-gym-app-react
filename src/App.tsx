import React from "react";
import "./App.css";
import Logo from "./components/Logo/Logo";
import { AppDataContext } from "./context/app-context";
import Auth from "./components/auth/Auth";
import AuthDetails from "./components/auth/AuthDetails";
import UserDashboard from "./components/UI/UserDashboard/index";
import AddNewRoutine from "./components/UI/UserDashboard/AddNewRoutine";

function App() {
  console.log("App component rendered");
  const { authUser, routineList } = React.useContext(AppDataContext);
  return (
    <div className="app">
      <Logo />
      <AuthDetails />
      {!authUser && <Auth />}
      {authUser && <UserDashboard />}
      {authUser && routineList.length <= 0 && <AddNewRoutine />}
    </div>
  );
}
//

export default App;
