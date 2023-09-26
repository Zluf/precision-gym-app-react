import React from "react";
import "./Exercise.css";
import AppContext from "../../../../context/app-context";
import ExerciseStats from "./Exercise/ExerciseStats";

export default function Exercise(props) {
  const context = React.useContext(AppContext);

  const keyDownHandler = (event) => {
    if (event.key === "Enter") event.target.blur();
  };
  //

  const nameBlurHandler = (event) => {
    props.ex["name"] = event.target.value;
    context.updateDatabase(props.routineName, props.ex, props.routineDate);
  };

  return (
    <div
      className={`exercise ${props.ex.name}`}
      data-ex-index={props.exIndex}
      onClick={() => {
        console.log(props.ex);
      }}
    >
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

      {props.ex.sets.map((set, setIndex) => (
        // <p>{set.weight}</p>
        <ExerciseStats
          key={setIndex}
          setIndex={setIndex}
          set={set}
          ex={props.ex}
          onKeyDown={keyDownHandler}
          routineName={props.routineName}
          routineDate={props.routineDate}
        />
      ))}
    </div>
  );
}
