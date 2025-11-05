import React from "react";
import { useEffect, useRef } from "react";
import reactDom from "react-dom";
import AppContext from "../../context/app-context";
import "./ExerciseFormModal.css";

export default function ExerciseForm() {
  const context = React.useContext(AppContext);
  const nameInput = useRef<HTMLInputElement>(null);
  const weightInput = useRef<HTMLInputElement>(null);
  const setsInput = useRef<HTMLInputElement>(null);
  const repsInput = useRef<HTMLInputElement>(null);

  const submitHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!nameInput.current || !weightInput.current || !setsInput.current || !repsInput.current) {
      return;
    }

    const exName = nameInput.current.value;
    const exWeight = weightInput.current.value;
    const exSets = setsInput.current.value;
    const exReps = repsInput.current.value;
    const newExInput = {
      id: (context.currentRoutine as any).exercises.length + 1,
      name: exName,
      sets: Array(+exSets).fill({
        weight: exWeight,
        reps: Array(+exReps).fill(0),
      }),
    };
    context.updateDatabase(
      (context.currentRoutine as any).routineName,
      newExInput,
      (context.currentRoutine as any).routineDate
    );
    context.toggleModal();
  };

  const formRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (formRef.current && !formRef.current.contains(event.target as Node)) {
        context.toggleModal();
      }
    };
    window.addEventListener("click", handleClickOutside);
    return () => {
      window.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <>
      {reactDom.createPortal(
        <div className="exercise-form" ref={formRef}>
          <div className="close" onClick={() => context.toggleModal()}>
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
              defaultValue={""}
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
        document.getElementById(
          (context.currentRoutine as any).routineName.toLowerCase().split(" ").join("-")
        )!
      )}
    </>
  );
}
