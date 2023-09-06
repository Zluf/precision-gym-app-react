import "./UserDashboard.css";
import React, { useRef, useState } from "react";
import Routine from "./UserDashboard/Routine";
import ExerciseFormModal from "./ExerciseFormModal";
import AppContext from "../../context/app-context";
import AddNewSession from "./UserDashboard/AddNewSession";

export default function UserDashboard() {
  const context = React.useContext(AppContext);

  React.useEffect(() => {
    // executes upon mount, gets stored in memory, therefore does not execute on further re-renders
    // console.log(`Authed User: ${authUser}`);
    context.fetchExerciseDatabase();
  }, [context.fetchExerciseDatabase]);

  return (
    <div className="user-dashboard">
      {context.routineList
        .sort((a, b) => a.routineId - b.routineId)
        .map((routine, i) => {
          const routineClassName = routine.routineName
            .toLowerCase()
            .split(" ")
            .join("-");

          return (
            <div className="routine-container" key={`rc${i}`}>
              <Routine
                key={i}
                className={`routine ${routineClassName}`}
                routineName={routine.routineName}
                routine={routine}
              />

              <AddNewSession routineIndex={i} />
            </div>
          );
        })}

      {context.modalWindowIsOpen && <ExerciseFormModal />}
    </div>
  );
}
