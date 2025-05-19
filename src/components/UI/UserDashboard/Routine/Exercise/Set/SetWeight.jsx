import React from "react";
import { useState, useEffect, useContext } from "react";
import AppContext from "../../../../../../context/AppProvider";
import { keyDownHandler } from "../../Exercise";
import "../ExerciseStats.css";

function SetWeight(props) {
  const context = useContext(AppContext);
  const [weight, setWeight] = useState(props.set.weight);

  const weightBlurHandler = (event, setIndex) => {
    props.ex.sets[setIndex].weight = +event.target.value;
    context.updateDatabase(props.routineName, props.ex, props.routineDate);
  };

  useEffect(() => {
    setWeight(props.set.weight);
  }, [props.routineDate]);

  return (
    <div className="exercise-stats--weight">
      <label htmlFor="weight">weight (kg): </label>
      <input
        name="weight"
        type="number"
        step="0.5"
        value={weight}
        onBlur={(event) => weightBlurHandler(event, props.setIndex)}
        onChange={(event) => setWeight(+event.target.value)}
        onKeyDown={keyDownHandler}
      ></input>
    </div>
  );
}

export default SetWeight;
