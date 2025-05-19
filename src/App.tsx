import React from "react";
import "./App.css";
import Logo from "./components/Logo/Logo";
import { AppContext } from "./context/AppProvider";
import Auth from "./components/auth/Auth";
import AuthDetails from "./components/auth/AuthDetails";
import UserDashboard from "./components/UI/UserDashboard/index";
import AddNewRoutine from "./components/UI/UserDashboard/AddNewRoutine";

function App({ children }: { children: React.ReactNode }) {
  const context = React.useContext(AppContext);
  return (
    <div className="app">
      <Logo />
      <AuthDetails />
      {!context.authUser && <Auth />}
      {context!.authUser && <UserDashboard />}
      {context.authUser && context.routineList.length <= 0 && <AddNewRoutine />}
      {/* <DragDropTest /> */}
    </div>
  );
}
//

export default App;
