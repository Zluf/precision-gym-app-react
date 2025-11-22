import React, { useContext } from "react";
import { useRef, useState } from "react";
import { todaysDate } from "../../../context/AppProvider";
import "./AddNewRoutine.css";
import { AppActionsContext } from "../../../context/app-context";
import { Routine } from "../../../types";

interface AddNewRoutineProps {
  routineIndex?: number;
}

export default function AddNewRoutine(props: AddNewRoutineProps) {
  const { addNewRoutine } = useContext(AppActionsContext);
  const [addingNewRoutine, setAddingNewRoutine] = useState(false);
  const newRoutineInputRef = useRef<HTMLInputElement>(null);

  const addNewRoutineHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!newRoutineInputRef.current) return;

    const newRoutine: Routine = {
      routineName: newRoutineInputRef.current.value.toString(),
      routineId: undefined,
      logbook: {
        [todaysDate()]: [
          {
            id: 1,
            name: "Enter a new exercise name",
            sets: [
              {
                weight: 0,
                reps: Array(5).fill(0),
              },
            ],
          },
        ],
      },
    };

    addNewRoutine(props.routineIndex ?? -1, newRoutine);
    setAddingNewRoutine(false);
  };

  return (
    <div className="add-new-routine-container">
      {!addingNewRoutine && (
        <button
          onClick={() => {
            setAddingNewRoutine(true);
          }}
        >
          + Add a new routine
        </button>
      )}

      {addingNewRoutine && (
        <form onSubmit={addNewRoutineHandler} className="new-routine-form">
          <input placeholder="Enter session name" ref={newRoutineInputRef} />
          <button type="submit" className="btn-transparent">
            ➕
          </button>
        </form>
      )}
    </div>
  );
}
