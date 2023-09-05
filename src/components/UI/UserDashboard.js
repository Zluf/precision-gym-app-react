import "./UserDashboard.css";
import React from "react";
import Routine from "./Routine";
import ExerciseFormModal from "./ExerciseFormModal";
import AppContext from "../../context/app-context";

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
            <Routine
              key={i}
              className={`routine ${routineClassName}`}
              routineName={routine.routineName}
              routine={routine}
            />
          );
        })}
      {context.modalWindowIsOpen && <ExerciseFormModal />}
    </div>
  );
}
