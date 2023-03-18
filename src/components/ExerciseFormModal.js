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
      weightKg: exWeight,
      sets: Array(+exSets).fill(Array(+exReps).fill(0)),
    };
    !context.currentExercise && context.addExToDatabase(newExInput);
    context.currentExercise && context.updateExerciseList2(newExInput);
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
              <label htmlFor="exname">Exercise Name</label>
              <input
                name="exname"
                type="text"
                ref={nameInput}
                defaultValue={
                  context.currentExercise ? context.currentExercise.name : ""
                }
              />
              <label htmlFor="weight">Weight</label>
              <input
                name="weight"
                type="number"
                step="any"
                min="0"
                ref={weightInput}
                defaultValue={
                  context.currentExercise
                    ? context.currentExercise.weightKg
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
                  context.currentExercise
                    ? context.currentExercise.sets.length
                    : ""
                }
              />
              <label htmlFor="reps">Reps per set</label>
              <input name="reps" type="number" min="0" ref={repsInput} />
              {!context.currentExercise && (
                <button className="button" type="submit">
                  👊 Add Exercise
                </button>
              )}
              {context.currentExercise && (
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
