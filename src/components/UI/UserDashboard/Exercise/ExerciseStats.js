import React, { useContext, useState } from "react";
import "./ExerciseStats.css";
import AppContext from "../../../../context/app-context";
import RepGauge from "./RepGauge";
import angle from "../../../../assets/angle-bracket.png";

export default function ExerciseStats(props) {
  const context = useContext(AppContext);

  const [repsAreVisible, setRepsAreVisible] = useState(false);

  const toggleRepsHandler = () => {
    setRepsAreVisible((prevRepsAreVisible) => !prevRepsAreVisible);
  };

  const weightBlurHandler = (event, setIndex) => {
    props.ex.sets[setIndex].weight = +event.target.value;
    context.updateExerciseList2(props.routineName, props.ex, props.routineDate);
  };

  const addOrDeleteSetHandler = (addOrDelete, setIndex) => {
    const newEx = Object.assign({}, props.ex);
    // Remove the targeted set
    if (addOrDelete === "delete") {
      newEx.sets.splice(setIndex, 1);
    }
    // Add a new subsequent set with new rep stats
    if (addOrDelete === "add") {
      const newSet = Object.assign({}, newEx.sets[setIndex]);
      newSet.reps = Array(newSet.reps.length).fill(0);
      newEx.sets.splice(setIndex + 1, 0, newSet);
    }
    // 3. Update the database
    context.updateExerciseList2(props.routineName, newEx, props.routineDate);
  };

  const repClickHandler = (event, setIndex, repIndex) => {
    const repPerformance = +event.target.dataset.value;
    const updatedEx = props.ex;
    updatedEx.sets[setIndex].reps[repIndex] = repPerformance;
    context.updateExerciseList2(
      props.routineName,
      updatedEx,
      props.routineDate
    );
  };

  const setGaugeColor = (rep) => {
    return rep === 100
      ? "#008000"
      : rep === 80
      ? "#008000bb"
      : rep === 60
      ? "#00800090"
      : rep === 40
      ? "#0080006c"
      : rep === 20
      ? "#0080002c"
      : "white";
  };

  return (
    <div
      className="exercise-stats"
      key={props.setIndex + 1}
      data-set-num={props.setIndex}
    >
      <div className="exercise-stats--row">
        {/* Set: Index */}
        <span className="exercise-stats--set-num">
          Set {props.setIndex + 1}
        </span>

        {/* Set Gauge */}
        <div className="exercise-stats--set-gauge">
          {props.ex.sets[props.setIndex].reps.map((rep, i) => (
            <div
              key={i}
              className="gauge-sector"
              style={{
                backgroundColor: setGaugeColor(rep),
              }}
            ></div>
          ))}
        </div>
      </div>

      {/* Set: Index / weight / expand / delete  */}
      <div className="exercise-stats--row">
        {/* Set Weight: label / input */}
        <div className="exercise-stats--weight">
          <label htmlFor="weight">weight (kg): </label>
          <input
            name="weight"
            type="number"
            step="0.5"
            defaultValue={props.ex.sets[props.setIndex].weight}
            onBlur={(event) => weightBlurHandler(event, props.setIndex)}
            onChange={(event) => event.target.value}
            onKeyDown={props.onKeyDown}
          ></input>
        </div>

        {/* Set: expand reps */}
        <button
          className="expand-stats-btn btn-transparent "
          onClick={toggleRepsHandler}
        >
          <img
            src={angle}
            style={{
              transform: repsAreVisible ? "rotate(-90deg)" : "rotate(-180deg)",
            }}
            alt="toggle reps button"
          />
        </button>

        {/* Set: delete */}
        <button
          className="delete-set"
          onClick={addOrDeleteSetHandler.bind(null, "delete", props.setIndex)}
        >
          ❌
        </button>
      </div>

      {/* Reps */}
      <div
        className="exercise-stats--reps"
        style={{
          height: repsAreVisible
            ? `${props.ex.sets[props.setIndex].reps.length * 20}px`
            : 0,
          opacity: repsAreVisible ? 1 : 0,
        }}
      >
        {props.ex.sets[props.setIndex].reps.map((rep, repIndex) => (
          // rep is a value inside the array
          <RepGauge
            rep={rep}
            key={repIndex}
            repIndex={repIndex}
            setIndex={props.setIndex}
            ex={props.ex}
            routineName={props.routineName}
            routineDate={props.routineDate}
            onRepClick={(event) =>
              repClickHandler(event, props.setIndex, repIndex)
            }
          />
        ))}
      </div>

      {/* Add Set */}
      <button
        className="add-set"
        onClick={addOrDeleteSetHandler.bind(null, "add", props.setIndex)}
      >
        + Add a set
      </button>
    </div>
  );
}
