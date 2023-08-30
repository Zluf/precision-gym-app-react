import React from "react";
import "./Exercise.css";
import AppContext from "../../context/app-context";
import RepGauge from "./RepGauge";

export default function Exercise(props) {
  const context = React.useContext(AppContext);

  let sets = [];
  for (let setIndex = 0; setIndex < props.ex.sets.length; setIndex++) {
    sets.push(
      <div
        className="exercise-stat set-expanded"
        key={setIndex + 1}
        data-set-num={setIndex}
      >
        <span className="exercise-stat exercise-stat-set-num">
          Set {setIndex + 1},
        </span>
        <div className="exercise-stat exercise-stat-weight">
          <label htmlFor="weight">weight (kg): </label>
          <input
            name="weight"
            defaultValue={props.ex.sets[setIndex].weight}
            onBlur={props.onBlur} // ! to convert argument to Number
            onChange={(event) => event.target.value}
            onKeyDown={(event) => {
              if (event.key === "Enter") event.target.blur();
            }}
            style={{
              width: `5ch`,
            }}
          ></input>
        </div>

        {props.ex.sets[setIndex].reps.map((rep, repIndex) => (
          // rep is a value inside the array
          <RepGauge
            key={repIndex}
            rep={rep}
            ex={props.ex}
            routineName={props.routineName}
            onRepClick={props.onRepClick}
            onAddOrDeleteRep={props.onAddOrDeleteRep}
            repIndex={repIndex}
          />
        ))}
      </div>
    );
  }

  return (
    <div className={`exercise ${props.ex.name}`} data-ex-index={props.exIndex}>
      <div className="exercise-options">
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

      {sets.map((set) => set)}
    </div>
  );
}
