import React from "react";
import "./MainWindow.css";
import Exercise from "./Exercise";
import AppContext from "../store/app-context";

export default function MainWindow() {
  const context = React.useContext(AppContext);

  return (
    <main>
      <h2>Routine Name</h2>
      {context.exerciseList.map((exercise, i) => {
        return (
          <Exercise
            key={`${exercise.name}-${i}`}
            exName={exercise.name}
            exWeight={exercise.weightKg}
            exSets={exercise.sets}
            onDeleteExercise={context.onDeleteExercise}
            onEditExercise={() => {
              context.toggleModal(exercise);
            }}
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
      <button>+ Add to Logbook</button>
    </main>
  );
}
