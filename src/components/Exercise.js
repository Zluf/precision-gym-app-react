import React from "react";
import "./Exercise.css";
import AppContext from "../store/app-context";

export default function Exercise(props) {
  const context = React.useContext(AppContext);

  const onDeleteExercise = () => {
    context.deleteExercise(props.exName);
  };

  let sets = [];
  for (let i = 0; i < props.exSets; i++) {
    sets.push(
      <div className="set-expanded" key={i}>
        Set {i}:
        <div className="rep-expanded">
          Rep 1:
          <div className="gauge">
            <span className="circle"></span>
            <span className="circle"></span>
            <span className="circle"></span>
            <span className="circle"></span>
            <span className="circle"></span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`exercise ${props.exName}`}>
      <div className="exercise-option" onClick={onDeleteExercise}>
        ❌
      </div>
      <div className="exercise-option" onClick={props.onEditExercise}>
        📝
      </div>
      <div>Exercise name: {props.exName}</div>
      <div>Weight (kg): {props.exWeight}</div>
      {sets.map((set) => set)}
    </div>
  );
}
