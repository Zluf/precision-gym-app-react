import React from "react";
import { useContext } from "react";
import { AppActionsContext } from "../../../../../../context/app-context";
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
  const { updateDatabase } = useContext(AppActionsContext);

  const weightBlurHandler = (
    event: React.FocusEvent<HTMLInputElement>,
    setIndex: number
  ) => {
    // Create immutable update
    const updatedEx: Exercise = {
      ...props.ex,
      sets: props.ex.sets.map((set, i) =>
        i === setIndex ? { ...set, weight: +event.target.value } : set
      ),
    };
    updateDatabase(props.routineName, updatedEx, props.routineDate);
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
