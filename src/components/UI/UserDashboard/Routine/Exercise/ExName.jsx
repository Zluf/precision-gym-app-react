import React, { useContext } from "react";
import AppContext from "../../../../../context/AppProvider";
import "./ExerciseStats.css";
import { keyDownHandler } from "../Exercise";

function ExName(props) {
  const context = useContext(AppContext);

  const nameBlurHandler = (event) => {
    props.ex["name"] = event.target.value;
    context.updateDatabase(props.routineName, props.ex, props.routineDate);
  };

  return (
    <div>
      <div
        className="delete-exercise"
        onClick={() => {
          context.deleteExercise(
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
