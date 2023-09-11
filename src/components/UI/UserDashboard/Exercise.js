import React from "react";
import "./Exercise.css";
import AppContext from "../../../context/app-context";
import RepGauge from "./Exercise/RepGauge";
import angle from "../../../assets/angle-bracket.png";
import ExerciseStats from "./Exercise/ExerciseStats";

export default function Exercise(props) {
  const context = React.useContext(AppContext);

  const keyDownHandler = (event) => {
    if (event.key === "Enter") event.target.blur();
  };

  const nameBlurHandler = (event) => {
    props.ex["name"] = event.target.value;
    context.updateExerciseList2(props.routineName, props.ex, props.routineDate);
  };

  let sets = [];
  for (let setIndex = 0; setIndex < props.ex.sets.length; setIndex++) {
    sets.push(
      <ExerciseStats
        key={setIndex}
        setIndex={setIndex}
        ex={props.ex}
        onKeyDown={keyDownHandler}
        routineName={props.routineName}
        routineDate={props.routineDate}
      />
    );
  }

  return (
    <div className={`exercise ${props.ex.name}`} data-ex-index={props.exIndex}>
      <div className="exercise-options">
        <div
          className="exercise-option"
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

      {sets.map((set) => set)}
    </div>
  );
}
