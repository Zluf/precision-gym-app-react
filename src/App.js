import React from "react";
import "./App.css";
import Logo from "./components/Logo/Logo";
import MainWindow from "./components/MainWindow";
import ExerciseFormModal from "./components/ExerciseFormModal";
import AppContext from "./context/app-context";
import InputValue from "./test-code/InputValue";

function App() {
  const context = React.useContext(AppContext);

  return (
    <div className="app">
      <div className="linear-gradient-layer"></div>
      <Logo />
      <MainWindow />
      {context.modalWindowIsOpen && <ExerciseFormModal />}
      <InputValue />
    </div>
  );
}

export default App;
