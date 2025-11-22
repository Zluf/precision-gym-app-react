import React, { useContext } from "react";
import { AppActionsContext } from "../../../../../context/app-context";
import "./ExerciseStats.css";
import { keyDownHandler } from "../Exercise";
import { Exercise } from "../../../../../types";

interface ExNameProps {
  ex: Exercise;
  routineName: string;
  routineDate: string;
}

function ExName(props: ExNameProps) {
  const { updateDatabase, deleteExercise } = useContext(AppActionsContext);

  const nameBlurHandler = (event: React.FocusEvent<HTMLInputElement>) => {
    // Create immutable update
    const updatedEx: Exercise = {
      ...props.ex,
      name: event.target.value,
    };
    updateDatabase(props.routineName, updatedEx, props.routineDate);
  };

  return (
    <div>
      <div
        className="delete-exercise"
        onClick={() => {
          deleteExercise(
            props.routineName,
            props.ex.name,
            props.routineDate
          );
        }}
      >
        ❌
      </div>

      <div className="exercise-stat exercise-stats--name">
        <label htmlFor="name">Exercise Name: </label>
        <input
          name="name"
          type="text"
          defaultValue={props.ex.name}
          onChange={(event) => event.target.value}
          onKeyDown={keyDownHandler}
          onBlur={(event) => nameBlurHandler(event)}
          style={{
            width: `${props.ex.name.length}ch`,
          }}
        ></input>
      </div>
    </div>
  );
}

export default ExName;
