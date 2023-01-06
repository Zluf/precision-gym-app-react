import React from "react";
import "./Exercise.css";
import AppContext from "../store/app-context";

export default function Exercise(props) {
  const context = React.useContext(AppContext);

  const onDeleteExercise = () => {
    context.deleteExercise(props.exName);
  };

  return (
    <div className={`exercise ${props.exName}`} onClick={props.onEditExercise}>
      <div className="delete-exercise" onClick={onDeleteExercise}>
        ❌
      </div>
      <div>Exercise name: {props.exName}</div>
      <div>Weight (kg): {props.exWeight}</div>
      <div>Sets: {props.exSets}</div>
    </div>
  );
}
