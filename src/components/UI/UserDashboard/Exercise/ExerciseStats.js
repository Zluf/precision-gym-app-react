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

  return (
    <div
      className="exercise-stats"
      key={props.setIndex + 1}
      data-set-num={props.setIndex}
    >
      <div className="exercise-stats--top">
        <div className="exercise-stats--set-and-weight">
          <span className="exercise-stat exercise-stats--set-num">
            Set {props.setIndex + 1},
          </span>

          <div className="exercise-stat exercise-stats--weight">
            <label htmlFor="weight">weight (kg): </label>
            <input
              name="weight"
              defaultValue={props.ex.sets[props.setIndex].weight}
              onBlur={(event) => weightBlurHandler(event, props.setIndex)}
              onChange={(event) => event.target.value}
              onKeyDown={props.onKeyDown}
            ></input>
          </div>

          <button
            className="btn-transparent expand-stats-btn"
            onClick={toggleRepsHandler}
          >
            <img
              src={angle}
              style={{
                transform: repsAreVisible
                  ? "rotate(-90deg)"
                  : "rotate(-180deg)",
              }}
              alt="toggle reps button"
            />
          </button>
        </div>

        <button
          className="exercise-stat delete-set"
          onClick={addOrDeleteSetHandler.bind(null, "delete", props.setIndex)}
        >
          ❌
        </button>
      </div>

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

      <button
        className="add-set"
        onClick={addOrDeleteSetHandler.bind(null, "add", props.setIndex)}
      >
        + Add a set
      </button>
    </div>
  );
}
