import React, { useRef } from "react";
import reactDom from "react-dom";
import AppContext from "../store/app-context";
import "./ExerciseFormModal.css";

export default function ExerciseForm() {
  const context = React.useContext(AppContext);

  // const [exName, setExName] = useState("");
  // const [exWeight, setExWeight] = useState("");
  // const [exSets, setExSets] = useState("");

  // const exNameChangeHandler = (e) => {
  //   setExName(e.target.value);
  // };
  // const exWeightChangeHandler = (e) => {
  //   setExWeight(e.target.value);
  // };
  // const exSetChangeHandler = (e) => {
  //   setExSets(e.target.value);
  // };

  const nameInput = useRef();
  const weightInput = useRef();
  const setsInput = useRef();

  const submitHandler = (e) => {
    e.preventDefault();

    const exName = nameInput.current.value;
    const exWeight = weightInput.current.value;
    const exSets = setsInput.current.value;

    const exerciseData = {
      name: exName,
      weightKg: exWeight,
      sets: exSets,
    };
    !context.currentExercise && context.addExToDatabase(exerciseData);
    context.currentExercise && context.updateExercise(exerciseData);
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
                // onChange={exNameChangeHandler}
              />
              <label htmlFor="weight">Weight</label>
              <input
                name="weight"
                type="number"
                ref={weightInput}
                defaultValue={
                  context.currentExercise
                    ? context.currentExercise.weightKg
                    : ""
                }
                // onChange={exWeightChangeHandler}
              />
              <label htmlFor="sets">Sets</label>
              <input
                name="sets"
                type="number"
                ref={setsInput}
                defaultValue={
                  context.currentExercise ? context.currentExercise.sets : ""
                }
                // onChange={exSetChangeHandler}
              />
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
