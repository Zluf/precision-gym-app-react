import React from "react";
import { useEffect, useRef, useContext } from "react";
import reactDom from "react-dom";
import { AppDataContext, AppActionsContext } from "../../context/app-context";
import "./ExerciseFormModal.css";

export default function ExerciseForm() {
  const { currentRoutine } = useContext(AppDataContext);
  const { addNewExercise, toggleModal } = useContext(AppActionsContext);
  const nameInput = useRef<HTMLInputElement>(null);
  const weightInput = useRef<HTMLInputElement>(null);
  const setsInput = useRef<HTMLInputElement>(null);
  const repsInput = useRef<HTMLInputElement>(null);
  const formRef = useRef<HTMLDivElement>(null);

  if (!currentRoutine) {
    return null; // Don't render modal if there's no current routine
  }

  const submitHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (
      !nameInput.current ||
      !weightInput.current ||
      !setsInput.current ||
      !repsInput.current
    ) {
      return;
    }

    const exName = nameInput.current.value;
    const exWeight = +weightInput.current.value;
    const exSets = +setsInput.current.value;
    const exReps = +repsInput.current.value;

    const newExInput = {
      id: currentRoutine.exercises.length + 1,
      name: exName,
      sets: Array(exSets).fill({
        weight: exWeight,
        reps: Array(exReps).fill(0),
      }),
    };

    addNewExercise(
      currentRoutine.routineName,
      newExInput,
      currentRoutine.routineDate
    );
    toggleModal();
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (formRef.current && !formRef.current.contains(event.target as Node)) {
        toggleModal();
      }
    };
    window.addEventListener("click", handleClickOutside);
    return () => {
      window.removeEventListener("click", handleClickOutside);
    };
  }, [toggleModal]);

  const portalTargetId = currentRoutine.routineName
    .toLowerCase()
    .split(" ")
    .join("-");
  const portalTarget = document.getElementById(portalTargetId);
  // If portal target doesn't exist, don't render
  if (!portalTarget) {
    console.error(`Portal target element not found: ${portalTargetId}`);
    return null;
  }

  return (
    <>
      {reactDom.createPortal(
        <div className="exercise-form" ref={formRef}>
          <div className="close" onClick={() => toggleModal()}>
            ❌
          </div>
          <form onSubmit={submitHandler}>
            <label htmlFor="name">Exercise Name</label>
            <input
              name="name"
              type="text"
              ref={nameInput}
              defaultValue={""}
              required
            />

            <label htmlFor="weight">Weight (kg)</label>
            <input
              name="weight"
              type="number"
              step="any"
              min="0"
              ref={weightInput}
              defaultValue={0}
              required
            />

            <label htmlFor="sets">Sets</label>
            <input
              name="sets"
              type="number"
              ref={setsInput}
              min="0"
              max="10"
              defaultValue={""}
              required
            />

            <label htmlFor="reps">Reps per set</label>
            <input
              name="reps"
              type="number"
              min="0"
              max="20"
              ref={repsInput}
              defaultValue={""}
              required
            />

            <button className="button" type="submit">
              👊 Add Exercise
            </button>
          </form>
        </div>,
        portalTarget
      )}
    </>
  );
}
