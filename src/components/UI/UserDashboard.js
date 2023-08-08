import "./UserDashboard.css";
import React from "react";
import Routine from "./Routine";
import ExerciseFormModal from "./ExerciseFormModal";
import AppContext from "../../context/app-context";

export default function UserDashboard() {
  const context = React.useContext(AppContext);

  return (
    <div className="user-dashboard">
      {context.routineList.sort().map((routine, i) => {
        const routineClassName = routine[0].toLowerCase().split(" ").join("-");
        return;
        // (
        // <Routine
        //   key={i}
        //   className={`routine ${routineClassName}`}
        //   routineName={routine[0]}
        //   routine={routine[1]}
        //   routineIndex={i}
        // />
        // );
      })}

      {/* {context.modalWindowIsOpen && <ExerciseFormModal />} */}
    </div>
  );
}
