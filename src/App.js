import React, { useState } from "react";
import "./App.css";
import Logo from "./components/Logo/Logo";
import Routine from "./components/Routine";
import ExerciseFormModal from "./components/ExerciseFormModal";
import AppContext from "./context/app-context";

function App() {
  const context = React.useContext(AppContext);

  console.log("Sorting:", context.routineList.sort());

  return (
    <div className="app">
      <Logo />

      {context.routineList.sort().map((routine, i) => {
        const routineClassName = routine[0].toLowerCase().split(" ").join("-");

        return (
          <Routine
            key={i}
            className={`section ${routineClassName}`}
            routineName={routine[0]}
            routine={routine[1]}
            routineIndex={i}
          />
        );
      })}

      {context.modalWindowIsOpen && <ExerciseFormModal />}

      <button>+ New Routine</button>
    </div>
  );
}

export default App;
