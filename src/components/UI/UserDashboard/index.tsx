import "./UserDashboard.css";
import { useEffect, useContext, useMemo } from "react";
import RoutineComponent from "./Routine";
import ExerciseFormModal from "../ExerciseFormModal";
import {
  AppDataContext,
  AppActionsContext,
} from "../../../context/app-context";
import AddNewRoutine from "./AddNewRoutine";
import { auth } from "../../../firebase";

export default function UserDashboard() {
  console.log("RNDR UserDashboard");
  const { routineList, modalWindowIsOpen } = useContext(AppDataContext);
  const { fetchExerciseDatabase } = useContext(AppActionsContext);

  useEffect(() => {
    const user = auth.currentUser;
    if (user) {
      fetchExerciseDatabase(user.uid);
    }
  }, [fetchExerciseDatabase]);

  // Use toSorted() to avoid mutating the original array
  const sortedRoutines = useMemo(
    () => {
      console.log("routines sorted");
      return [...routineList].sort(
        (a, b) => (a.routineId ?? 0) - (b.routineId ?? 0)
      );
    },
    [routineList] // Only recompute if this changes
  );

  return (
    <div className="user-dashboard">
      {routineList.length <= 0 && <AddNewRoutine />}

      {sortedRoutines.map((routine, i) => {
        const routineClassName = routine.routineName
          .toLowerCase()
          .split(" ")
          .join("-");

        return (
          <div className="routine-container" key={`rc${i}`}>
            <RoutineComponent
              key={routine.routineName}
              className={`routine ${routineClassName}`}
              id={routineClassName}
              routineName={routine.routineName}
              routine={routine}
            />

            <AddNewRoutine routineIndex={i} />
          </div>
        );
      })}

      {modalWindowIsOpen && <ExerciseFormModal />}
    </div>
  );
}
