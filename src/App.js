import React from "react";
import "./App.css";
import Logo from "./components/Logo/Logo";
import Routine from "./components/Routine";
import ExerciseFormModal from "./components/ExerciseFormModal";
import AppContext from "./context/app-context";

function App() {
  const context = React.useContext(AppContext);

  const onClickButton = () => {
    console.log("routine");
  };

  return (
    <div className="app">
      {/* <div className="linear-gradient-layer"></div> */}
      <Logo />
      {Object.values(context.routineList).length === 0 && <Routine />}
      {Object.values(context.routineList).length > 0 &&
        Object.values(context.routineList).map((routine, i) => {
          return <Routine key={i} routineIndex={i} />;
        })}
      {context.modalWindowIsOpen && <ExerciseFormModal />}

      <button>+ New Routine</button>
    </div>
  );
}

export default App;
