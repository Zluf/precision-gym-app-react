import React, { useRef } from "react";
import "./Exercise.css";
import AppContext from "../context/app-context";
import RepGauge from "./RepGauge";
import { render } from "react-dom";

export default function Exercise(props) {
  const context = React.useContext(AppContext);
  const nameInput = useRef();
  const weightInput = useRef();

  const onDeleteExercise = () => {
    context.deleteExercise(props.exName);
  };

  let sets = [];
  for (let setIndex = 0; setIndex < props.ex.sets.length; setIndex++) {
    sets.push(
      <div className="set-expanded" key={setIndex + 1} data-set-num={setIndex}>
        Set {setIndex + 1}:
        {context.exerciseList[props.exIndex].sets[setIndex].map(
          (rep, repIndex) => (
            <RepGauge
              key={repIndex}
              onRepClick={props.onRepClick}
              exIndex={props.exIndex}
              setIndex={setIndex}
              repIndex={repIndex}
            />
          )
        )}
      </div>
    );
  }

  return (
    <div className={`exercise ${props.exName}`}>
      <div className="exercise-options">
        <div className="exercise-option" onClick={props.onEditExercise}>
          📝
        </div>
        <div className="exercise-option" onClick={onDeleteExercise}>
          ❌
        </div>
      </div>
      <div className="exercise-stat exercise-stat-name">
        <label htmlFor="name">Exercise Name: </label>
        <input
          name="name"
          defaultValue={props.ex.name}
          ref={nameInput}
          onKeyDown={props.onInputKeyPress}
        ></input>
      </div>
      <div className="exercise-stat exercise-stat-weight">
        <label htmlFor="weight">Weight (kg): </label>
        <input
          name="weight"
          defaultValue={props.ex.weight}
          onClick={props.onInputClick}
          ref={weightInput}
          onKeyDown={props.onInputKeyPress}
        ></input>
      </div>
      {sets.map((set) => set)}
    </div>
  );
}
