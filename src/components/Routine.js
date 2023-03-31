import React from "react";
import "./Routine.css";
import Exercise from "./Exercise";
import AppContext from "../context/app-context";

export default function Routine(props) {
  const context = React.useContext(AppContext);

  const onRepClickHandler = (event, exercise) => {
    const repPerformance = +event.target.dataset.value;
    const repPerfNum = event.target.closest(".rep-expanded").dataset.repNum;
    const setNum = event.target.closest(".set-expanded").dataset.setNum;
    const updatedEx = exercise;
    updatedEx.sets[setNum][repPerfNum] = repPerformance;
    context.updateExerciseList2(updatedEx);
  };

  const onInputKeyPressHandler = (event, exercise) => {
    if (event.key === "Enter") {
      event.preventDefault();
      let updatedEx = exercise;
      const inputKeyName = Object.keys(updatedEx).find(
        (key) => updatedEx[key] === updatedEx[event.target.name]
      );
      updatedEx[inputKeyName] = event.target.value;
      context.updateExerciseList2(updatedEx);

      event.target.blur();
    }
  };

  return (
    <section onClick={props.onClick}>
      {/* <h2>Routine Name</h2> */}
      {context.routineList.length > 0 &&
        Object.values(context.routineList[props.routineIndex]).map(
          (exercise, i) => {
            return (
              <Exercise
                key={`${exercise.name}-${i + 1}`}
                exIndex={i}
                ex={exercise}
                onEditExercise={() => {
                  context.toggleModal(exercise);
                }}
                onRepClick={(event) => {
                  onRepClickHandler(event, exercise);
                }}
                onInputKeyPress={(event) =>
                  onInputKeyPressHandler(event, exercise)
                }
                onDeleteExercise={context.onDeleteExercise}
              />
            );
          }
        )}

      <button
        onClick={() => {
          context.toggleModal();
        }}
      >
        + Add Exercise
      </button>

      <button onClick={props.onClickButton}>Click me!</button>

      {/* <button>+ Add to Logbook</button> */}
    </section>
  );
}
