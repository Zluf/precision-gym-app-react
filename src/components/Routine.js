import React from "react";
import "./Routine.css";
import Exercise from "./Exercise";
import AppContext from "../context/app-context";

export default function Routine(props) {
  const context = React.useContext(AppContext);

  const onRepClickHandler = (event, routineName, exercise) => {
    const setNum = event.target.closest(".set-expanded").dataset.setNum;
    const repPerfNum = event.target.closest(".rep-expanded").dataset.repNum;
    const repPerformance = +event.target.dataset.value;
    const updatedEx = exercise;
    updatedEx.sets[setNum][repPerfNum] = repPerformance;
    context.updateExerciseList2(routineName, updatedEx);
  };

  const onBlurHandler = (event, exercise) => {
    console.log(event.target.value);
    console.log(exercise);
    let updatedEx = exercise;
    const inputKeyName = Object.keys(updatedEx).find(
      (key) => updatedEx[key] === updatedEx[event.target.name]
    );
    updatedEx[inputKeyName] = event.target.value;
    context.updateExerciseList2(props.routineName, updatedEx);
  };

  return (
    <section onClick={props.onClick} className={props.className}>
      <h2>{props.routineName}</h2>
      <div className="exercises-container">
        {props.routine.map((exercise, i) => {
          return (
            <Exercise
              key={`${exercise.name}-${i + 1}`}
              exIndex={i}
              routine={props.routine}
              routineName={props.routineName}
              routineIndex={props.routineIndex}
              ex={exercise}
              onEditExercise={() => {
                context.toggleModal(exercise);
              }}
              onRepClick={(event) => {
                onRepClickHandler(event, props.routineName, exercise);
              }}
              onBlur={(event) => onBlurHandler(event, exercise)}
              onDeleteExercise={context.deleteExercise}
            />
          );
        })}
      </div>

      <button
        onClick={() => {
          context.toggleModal(props.routineName);
        }}
      >
        + Add Exercise
      </button>

      <button onClick={props.onClickButton}>Click me!</button>

      {/* <button>+ Add to Logbook</button> */}
    </section>
  );
}
