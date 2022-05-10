import React from "react";
// import exerciseList from "../RegisteredExercises.json";
import "./Exercise.css";

export default function Exercise(props) {
  const deleteExercise = () => {
    props.onDeleteExercise(props.exName);
  };

  return (
    <div className="exercise">
      <div className="delete-exercise" onClick={deleteExercise}>
        ❌
      </div>
      <div>Exercise name: {props.exName}</div>
      <div>Weight (kg): {props.exWeight}</div>
      <div>Sets: {props.exSets}</div>
    </div>
  );
}
