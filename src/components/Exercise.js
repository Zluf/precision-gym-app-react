import React, { useRef } from "react";
import "./Exercise.css";
import AppContext from "../context/app-context";
import RepGauge from "./RepGauge";

export default function Exercise(props) {
  const context = React.useContext(AppContext);
  const nameInput = useRef();
  const weightInput = useRef();

  const onDeleteExercise = () => {
    context.deleteExercise(props.ex.name);
  };

  let sets = [];
  for (let setIndex = 0; setIndex < props.ex.sets.length; setIndex++) {
    sets.push(
      <div className="set-expanded" key={setIndex + 1} data-set-num={setIndex}>
        Set {setIndex + 1}:
        {props.ex.sets[setIndex].map((rep, repIndex) => (
          <RepGauge
            key={repIndex}
            rep={rep}
            onRepClick={props.onRepClick}
            repIndex={repIndex}
          />
        ))}
      </div>
    );
  }

  const onBlurHandler = (event) => {
    console.log(event.target);
  };

  return (
    <div className={`exercise ${props.exName}`}>
      <div className="exercise-options">
        <div className="exercise-option" onClick={props.onEditExercise}>
          📝
        </div>
        <div
          className="exercise-option"
          onClick={() => {
            context.deleteExercise(props.routineName, props.ex.name);
          }}
        >
          ❌
        </div>
      </div>

      <div className="exercise-stat exercise-stat-name">
        <label htmlFor="name">Exercise Name: </label>
        <input
          name="name"
          type="text"
          defaultValue={props.ex.name}
          onChange={(event) => event.target.value}
          onKeyDown={(event) => {
            if (event.key === "Enter") event.target.blur();
          }}
          onBlur={props.onBlur}
          style={{
            width: `${props.ex.name.length}ch`,
          }}
        ></input>
      </div>

      <div className="exercise-stat exercise-stat-weight">
        <label htmlFor="weight">Weight (kg): </label>
        <input
          name="weight"
          defaultValue={props.ex.weight}
          onBlur={props.onBlur} // ! to convert argument to Number
          onChange={(event) => event.target.value}
          onKeyDown={(event) => {
            if (event.key === "Enter") event.target.blur();
          }}
          ref={weightInput}
          style={{
            width: `5ch`,
          }}
        ></input>
      </div>
      {sets.map((set) => set)}
    </div>
  );
}
