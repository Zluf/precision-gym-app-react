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
      {context.routineList.sort().map((routine, i) => {
        const routineClassName = routine[0].toLowerCase().split(" ").join("-");

        return (
          <Routine
            key={i}
            className={`routine ${routineClassName}`}
            routineName={routine[0]}
            routine={routine[1]}
          />
        );
      })}
      {context.modalWindowIsOpen && <ExerciseFormModal />}
    </div>
  );
}
