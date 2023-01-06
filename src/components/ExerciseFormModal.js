import React, { useRef } from "react";
import reactDom from "react-dom";
import AppContext from "../store/app-context";
import "./ExerciseFormModal.css";

export default function ExerciseForm(props) {
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

    const newExercise = {
      name: exName,
      weightKg: exWeight,
      sets: exSets,
    };
    props.onAddEx(newExercise);
    props.onToggleModal();
  };

  return (
    <>
      {reactDom.createPortal(
        <div>
          <div className="exercise-form">
            <div className="close" onClick={props.onToggleModal}>
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
              <button className="button" type="submit">
                👊 Add Exercise
              </button>
            </form>
          </div>
        </div>,
        document.getElementById("modal-root")
      )}
    </>
  );
}
