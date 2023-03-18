import React, { useRef } from "react";
import "./Exercise.css";
import AppContext from "../context/app-context";

export default function Exercise(props) {
  const context = React.useContext(AppContext);
  const nameInput = useRef();
  const weightInput = useRef();

  const onDeleteExercise = () => {
    context.deleteExercise(props.exName);
  };

  const onInputKeyPressHandler = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      console.log(event.target.value);
      event.target.blur();
    }
  };

  let sets = [];
  for (let i = 0; i < props.exSets.length; i++) {
    sets.push(
      <div className="set-expanded" key={i + 1} data-set-num={i}>
        Set {i + 1}:
        <div className="rep-expanded" data-rep-num={0}>
          <span>{`Rep ${1}:`}</span>
          <div className="gauge">
            <span
              onClick={props.onRepClick}
              data-value="100"
              className="circle"
              style={{
                backgroundColor:
                  context.exerciseList[0].sets[0][0] >= 100 && "green",
              }}
            ></span>
            <span
              onClick={props.onRepClick}
              data-value="80"
              className="circle"
              style={{
                backgroundColor:
                  context.exerciseList[0].sets[0][0] >= 80 && "green",
              }}
            ></span>
            <span
              onClick={props.onRepClick}
              data-value="60"
              className="circle"
              style={{
                backgroundColor:
                  context.exerciseList[0].sets[0][0] >= 60 && "green",
              }}
            ></span>
            <span
              onClick={props.onRepClick}
              data-value="40"
              className="circle"
              style={{
                backgroundColor:
                  context.exerciseList[0].sets[0][0] >= 40 && "green",
              }}
            ></span>
            <span
              onClick={props.onRepClick}
              data-value="20"
              className="circle"
              style={{
                backgroundColor:
                  context.exerciseList[0].sets[0][0] >= 20 && "green",
              }}
            ></span>
          </div>
        </div>
      </div>
    );
  }

  let setsFunc = () => {
    let reps = [];
    for (let repIndex = props.exSets.length - 1; repIndex >= 0; repIndex--) {
      reps.push(
        <div className="rep-expanded" data-rep-num={0}>
          <span>{`Rep ${1}:`}</span>
          {Array(5)
            .fill(null)
            .map((_, i) => (
              <div className="gauge">
                <span
                  onClick={props.onRepClick}
                  data-value={repIndex * 20}
                  className="circle"
                  style={{
                    backgroundColor:
                      context.exerciseList[0].sets[0][0] >= repIndex * 20 &&
                      "green",
                  }}
                ></span>
              </div>
            ))}
        </div>
      );
    }

    let sets = [];
    for (let i = 0; i < props.exSets.length; i++) {
      sets.push(
        <div className="set-expanded" key={i + 1} data-set-num={i}>
          Set {i + 1}:{reps.map((rep) => rep)}
        </div>
      );
      return;
    }
  };

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
        <label htmlFor="exname">Exercise Name: </label>
        <input
          name="exname"
          defaultValue={props.exName}
          ref={nameInput}
          onKeyDown={onInputKeyPressHandler}
        ></input>
      </div>
      <div className="exercise-stat exercise-stat-weight">
        <label htmlFor="exweight">Weight (kg): </label>
        <input
          name="exweight"
          defaultValue={props.exWeight}
          onClick={props.onInputClick}
          ref={weightInput}
          onKeyDown={onInputKeyPressHandler}
        ></input>
      </div>
      {sets.map((set) => set)}
    </div>
  );
}
