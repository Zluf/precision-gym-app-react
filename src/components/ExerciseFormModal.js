import React, { useRef } from "react";
import reactDom from "react-dom";
import AppContext from "../context/app-context";
import "./ExerciseFormModal.css";

export default function ExerciseForm() {
  const context = React.useContext(AppContext);
  const nameInput = useRef();
  const weightInput = useRef();
  const setsInput = useRef();
  const repsInput = useRef();

  const submitHandler = (e) => {
    e.preventDefault();

    const exName = nameInput.current.value;
    const exWeight = weightInput.current.value;
    const exSets = setsInput.current.value;
    const exReps = repsInput.current.value;

    const newExInput = {
      name: exName,
      weight: exWeight,
      sets: Array(+exSets).fill(Array(+exReps).fill(0)),
    };

    // when when exercise gets added
    !context.currentExercise[1] && context.addExToDatabase(newExInput);

    // when exercise gets edited
    context.currentExercise[1] && context.updateExercise(newExInput);

    // closes the Modal Window when it's currently open
    context.toggleModal();
  };

  return (
    <>
      {reactDom.createPortal(
        <div>
          <div className="exercise-form">
            <div className="close" onClick={context.toggleModal}>
              ❌
            </div>
            <form onSubmit={submitHandler}>
              <label htmlFor="name">Exercise Name</label>
              <input
                name="name"
                type="text"
                ref={nameInput}
                defaultValue={
                  context.currentExercise[1]
                    ? context.currentExercise[1].name
                    : ""
                }
              />

              <label htmlFor="weight">Weight (kg)</label>
              <input
                name="weight"
                type="number"
                step="any"
                min="0"
                ref={weightInput}
                defaultValue={
                  context.currentExercise[1]
                    ? context.currentExercise[1].weight
                    : ""
                }
              />

              <label htmlFor="sets">Sets</label>
              <input
                name="sets"
                type="number"
                ref={setsInput}
                min="0"
                defaultValue={
                  context.currentExercise[1]
                    ? context.currentExercise[1].sets.length
                    : ""
                }
              />
              <label htmlFor="reps">Reps per set</label>
              <input
                name="reps"
                type="number"
                min="0"
                ref={repsInput}
                defaultValue={
                  context.currentExercise[1]
                    ? context.currentExercise[1].sets.length
                    : ""
                }
              />

              {!context.currentExercise[1] && (
                <button className="button" type="submit">
                  👊 Add Exercise
                </button>
              )}

              {context.currentExercise[1] && (
                <button className="button" type="submit">
                  📝 Update Exercise
                </button>
              )}
            </form>
          </div>
        </div>,
        document.getElementById("modal-root")
      )}
    </>
  );
}
