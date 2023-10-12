import React from "react";
import "./App.css";
import Logo from "./components/Logo/Logo";
import AppContext from "./context/app-context";
import Auth from "./components/auth/Auth";
import AuthDetails from "./components/auth/AuthDetails";
import UserDashboard from "./components/UI/UserDashboard";
import AddNewRoutine from "./components/UI/UserDashboard/AddNewRoutine";
<<<<<<< HEAD:src/App.js

=======
//
>>>>>>> 502cd4b9399d46015c4ee0cf19d966cf3c21266a:src/App.jsx
function App() {
  const context = React.useContext(AppContext);
  return (
    <div className="app">
      <Logo />
      <AuthDetails />
      {!context.authUser && <Auth />}
      {context.authUser && <UserDashboard />}
      {context.authUser && context.routineList.length <= 0 && <AddNewRoutine />}
      {/* <DragDropTest /> */}
    </div>
  );
}
//

export default App;
