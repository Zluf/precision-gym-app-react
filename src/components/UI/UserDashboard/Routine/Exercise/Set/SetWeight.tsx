import React from "react";
import { useContext } from "react";
import { AppActionsContext } from "../../../../../../context/app-context";
import { keyDownHandler } from "../../Exercise";
import "../ExerciseStats.css";

interface SetWeightProps {
  routineDate: string;
  routineName: string;
  set: { weight: number; reps: number[] };
  exId: number;
  setIndex: number;
}

function SetWeight(props: SetWeightProps) {
  const { updateExercise } = useContext(AppActionsContext);

  const weightBlurHandler = (
    event: React.FocusEvent<HTMLInputElement>,
    setIndex: number
  ) => {
    updateExercise(
      props.routineName,
      props.exId,
      {
        type: "updateSetWeight",
        setIndex,
        newWeight: +event.target.value,
      },
      props.routineDate
    );
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
