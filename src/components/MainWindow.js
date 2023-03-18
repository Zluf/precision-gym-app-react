import React from "react";
import "./MainWindow.css";
import Exercise from "./Exercise";
import AppContext from "../context/app-context";

export default function MainWindow() {
  const context = React.useContext(AppContext);

  const onRepClickHandler = (event, exercise) => {
    const repPerformance = +event.target.dataset.value;
    const repPerfNum = event.target.closest(".rep-expanded").dataset.repNum;
    const setNum = event.target.closest(".set-expanded").dataset.setNum;
    const updatedEx = exercise;
    updatedEx.sets[setNum][repPerfNum] = repPerformance;
    context.updateExerciseList2(updatedEx);
  };

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
            onEditExercise={() => {
              context.toggleModal(exercise);
            }}
            onRepClick={(event) => {
              onRepClickHandler(event, exercise);
            }}
            onDeleteExercise={context.onDeleteExercise}
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
