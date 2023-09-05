import React from "react";
import "./Exercise.css";
import AppContext from "../../context/app-context";
import RepGauge from "./RepGauge";

export default function Exercise(props) {
  const context = React.useContext(AppContext);

  const keyDownHandler = (event) => {
    if (event.key === "Enter") event.target.blur();
  };

  const blurHandler = (event, setIndex) => {
    if (!setIndex) {
      props.ex["name"] = event.target.value;
    } else {
      props.ex.sets[setIndex].weight = +event.target.value;
    }
    context.updateExerciseList2(props.routineName, props.ex, props.routineDate);
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

  let sets = [];
  for (let setIndex = 0; setIndex < props.ex.sets.length; setIndex++) {
    sets.push(
      <div className="exercise-stat" key={setIndex + 1} data-set-num={setIndex}>
        <div className="set-expanded">
          <span className="exercise-stat exercise-stat-set-num">
            Set {setIndex + 1},
          </span>

          <div className="exercise-stat exercise-stat-weight">
            <label htmlFor="weight">weight (kg): </label>
            <input
              name="weight"
              defaultValue={props.ex.sets[setIndex].weight}
              onBlur={(event) => blurHandler(event, setIndex)}
              onChange={(event) => event.target.value}
              onKeyDown={keyDownHandler}
              style={{
                width: `5ch`,
              }}
            ></input>
          </div>

          <button
            className="add-delete-set"
            onClick={addOrDeleteSetHandler.bind(null, "delete", setIndex)}
          >
            ➖
          </button>

          <button
            className="add-delete-set"
            onClick={addOrDeleteSetHandler.bind(null, "add", setIndex)}
          >
            ➕
          </button>
        </div>

        {props.ex.sets[setIndex].reps.map((rep, repIndex) => (
          // rep is a value inside the array
          <RepGauge
            rep={rep}
            key={repIndex}
            repIndex={repIndex}
            setIndex={setIndex}
            ex={props.ex}
            routineName={props.routineName}
            routineDate={props.routineDate}
            onRepClick={(event) => repClickHandler(event, setIndex, repIndex)}
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
            context.deleteExercise(
              props.routineName,
              props.ex.name,
              props.routineDate
            );
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
          onKeyDown={keyDownHandler}
          onBlur={(event) => blurHandler(event)}
          style={{
            width: `${props.ex.name.length}ch`,
          }}
        ></input>
      </div>

      {sets.map((set) => set)}
    </div>
  );
}
