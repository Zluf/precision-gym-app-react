import React from "react";
import { useContext } from "react";
import AppContext from "../../../../../../context/app-context";
import { keyDownHandler } from "../../Exercise";
import "../ExerciseStats.css";
import { Exercise } from "../../../../../../types";

interface SetWeightProps {
  routineDate: string;
  routineName: string;
  set: { weight: number; reps: number[] };
  ex: Exercise;
  setIndex: number;
}

function SetWeight(props: SetWeightProps) {
  const context = useContext(AppContext);

  const weightBlurHandler = (
    event: React.FocusEvent<HTMLInputElement>,
    setIndex: number
  ) => {
    props.ex.sets[setIndex].weight = +event.target.value;
    context.updateDatabase(props.routineName, props.ex, props.routineDate);
  };

  return (
    <div className="exercise-stats--weight">
      <label htmlFor="weight">weight (kg): </label>
      <input
        name="weight"
        type="number"
        step="0.5"
        defaultValue={props.set.weight}
        onBlur={(event) => weightBlurHandler(event, props.setIndex)}
        onKeyDown={keyDownHandler}
      ></input>
    </div>
  );
}

export default SetWeight;
