import { react, useRef } from "react";
import reactDom from "react-dom";
import "./ExerciseFormModal.css";

export default function ExerciseForm(props) {
  // const [exName, setExName] = react.useState("");
  // const [exWeight, setExWeight] = react.useState("");
  // const [exSets, setExSets] = react.useState("");

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
      "weight-kg": exWeight,
      sets: exSets,
    };
    props.onAddEx(newExercise);
    props.onToggleModal();
  };

  return (
    <>
      {reactDom.createPortal(
        <div>
          {/* <div className="backdrop" onClick={props.onToggleModal}></div> */}
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
                // onChange={exNameChangeHandler}
              />
              <label htmlFor="weight">Weight</label>
              <input
                name="weight"
                type="number"
                ref={weightInput}
                // onChange={exWeightChangeHandler}
              />
              <label htmlFor="sets">Sets</label>
              <input
                name="sets"
                type="number"
                ref={setsInput}
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
