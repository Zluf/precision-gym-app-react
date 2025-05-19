/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import "./UserDashboard.css";
import { useEffect, useContext } from "react";
import RoutineComponent from "./Routine";
import ExerciseFormModal from "../ExerciseFormModal";
import { AppContext } from "../../../context/AppProvider";
import AddNewRoutine from "./AddNewRoutine";
import { Routine } from "../../../../types";

interface Context {
  fetchExerciseDatabase: () => void;
  routineList: Routine[];
  modalWindowIsOpen: boolean;
}

export default function UserDashboard() {
  const context = useContext(AppContext);

  useEffect(() => {
    // executes upon mount, gets stored in memory, therefore does not execute on further re-renders
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
              <RoutineComponent
                key={i}
                className={`routine ${routineClassName}`}
                id={routineClassName}
                routineName={routine.routineName}
                routine={routine}
              />

              <AddNewRoutine routineIndex={i} />
            </div>
          );
        })}

      {context.modalWindowIsOpen && <ExerciseFormModal />}
    </div>
  );
}
