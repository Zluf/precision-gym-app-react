import React from "react";
import "./Exercise.css";
import ExName from "./Exercise/ExName";
import ExSet from "./Exercise/ExSet";

export const keyDownHandler = (event) => {
  if (event.key === "Enter") event.target.blur();
};

export default function Exercise(props) {
  return (
    <div className="exercise">
      <ExName
        ex={props.ex}
        routineName={props.routineName}
        routineDate={props.routineDate}
      />
      {props.ex.sets.map((set, setIndex) => (
        <ExSet
          ex={props.ex}
          set={set}
          key={setIndex}
          setIndex={setIndex}
          routineName={props.routineName}
          routineDate={props.routineDate}
        />
      ))}
    </div>
  );
}
