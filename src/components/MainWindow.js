import React from "react";
import "./MainWindow.css";
import Exercise from "./Exercise";
// import exerciseList from "../RegisteredExercises.json";

export default function MainWindow(props) {
  return (
    <main>
      {props.exerciseList.map((exercise, i) => {
        return (
          <Exercise
            key={props.exerciseList[i]["name"]}
            exName={props.exerciseList[i]["name"]}
            exWeight={props.exerciseList[i]["weight-kg"]}
            exSets={props.exerciseList[i]["sets"]}
            onDeleteExercise={props.onDeleteExercise}
          />
        );
      })}

      <button
        onClick={() => {
          props.onToggleModal();
        }}
      >
        + Add Exercise
      </button>
    </main>
  );
}
