import React from "react";
import "./MainWindow.css";
import Exercise from "./Exercise";
import AppContext from "../store/app-context";

export default function MainWindow() {
  const context = React.useContext(AppContext);
  console.log(context);
  return (
    <main>
      {context.exerciseList.map((exercise, i) => {
        return (
          <Exercise
            key={context.exerciseList[i]["name"]}
            exName={context.exerciseList[i]["name"]}
            exWeight={context.exerciseList[i]["weight-kg"]}
            exSets={context.exerciseList[i]["sets"]}
            onDeleteExercise={context.onDeleteExercise}
            onEditExercise={context.onEditExercise}
          />
        );
      })}

      <button
        onClick={() => {
          context.toggleModal();
        }}
      >
        + Add Exercise
      </button>
      <button>+ Save as Routine</button>
    </main>
  );
}
