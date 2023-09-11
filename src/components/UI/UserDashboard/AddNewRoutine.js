import React, { useRef, useState } from "react";
import AppContext from "../../../context/app-context";
import { todaysDate } from "../../../context/AppProvider";
import "./AddNewRoutine.css";

export default function AddNewRoutine(props) {
  const context = React.useContext(AppContext);
  const [addingNewRoutine, setAddingNewRoutine] = useState(false);
  const newRoutineInputRef = useRef();

  const addNewRoutineHandler = (event) => {
    event.preventDefault();

    const newRoutine = {
      routineName: newRoutineInputRef.current.value.toString(),
      routineId: null,
      logbook: {
        [todaysDate()]: [
          {
            id: 1,
            name: "Enter a new exercise name",
            sets: [
              {
                weight: 0,
                reps: [Array(5).fill(0)],
              },
            ],
          },
        ],
      },
    };

    context.addNewRoutine(props.routineIndex, newRoutine);
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
