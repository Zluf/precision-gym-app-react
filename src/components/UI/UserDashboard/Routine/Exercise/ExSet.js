import React, { useContext, useEffect, useState } from "react";
import "./ExerciseStats.css";
import AppContext from "../../../../context/app-context";
import RepGauge from "./RepGauge";
import SetGauge from "./Set/SetGauge";
import SetWeight from "./Set/SetWeight";
import SetExpandButton from "./Set/SetExpandButton";
import SetAddDeleteButton from "./Set/SetAddDeleteButton";

export default function ExSet(props) {
  const context = useContext(AppContext);

  const [repsAreVisible, setRepsAreVisible] = useState(false);
  const toggleRepsHandler = () => {
    setRepsAreVisible((prevRepsAreVisible) => !prevRepsAreVisible);
  };

  const repClickHandler = (event, setIndex, repIndex) => {
    const repPerformance = +event.target.dataset.value;
    const newReps = props.ex.sets[setIndex].reps.map((rep, i) => {
      if (i !== repIndex && rep > repPerformance) return rep;
      if (i <= repIndex) return repPerformance;
      if (i > repIndex) return rep;
    });
    props.ex.sets[setIndex].reps = newReps;
    context.updateExerciseList2(props.routineName, props.ex, props.routineDate);
  };

  const repsToggleStyle = {
    height: repsAreVisible
      ? `${props.ex.sets[props.setIndex].reps.length * 20}px`
      : 0,
    opacity: repsAreVisible ? 1 : 0,
  };

  return (
    <div className="exercise-stats" data-set-num={props.setIndex}>
      <div className="exercise-stats--row">
        <span className="exercise-stats--set-num">
          Set {props.setIndex + 1}
        </span>

        <SetGauge ex={props.ex} setIndex={props.setIndex} />
      </div>

      <div className="exercise-stats--row">
        <SetWeight
          routineDate={props.routineDate}
          routineName={props.routineName}
          set={props.set}
          ex={props.ex}
          setIndex={props.setIndex}
        />

        <SetExpandButton
          repsAreVisible={repsAreVisible}
          toggleRepsHandler={toggleRepsHandler}
        />

        <SetAddDeleteButton
          setIndex={props.setIndex}
          addOrDelete="delete-set"
          routineName={props.routineName}
          routineDate={props.routineDate}
        >
          ✖️
        </SetAddDeleteButton>
      </div>

      {/* Reps */}
      <div className="exercise-stats--reps" style={repsToggleStyle}>
        {props.ex.sets[props.setIndex].reps.map((rep, repIndex) => (
          // rep is a value inside the array
          <RepGauge
            rep={rep}
            key={repIndex}
            routineName={props.routineName}
            routineDate={props.routineDate}
            ex={props.ex}
            setIndex={props.setIndex}
            repIndex={repIndex}
            onRepClick={(event) =>
              repClickHandler(event, props.setIndex, repIndex)
            }
          />
        ))}
      </div>

      <SetAddDeleteButton
        routineName={props.routineName}
        routineDate={props.routineDate}
        setIndex={props.setIndex}
        addOrDelete="add-set"
      >
        + Add Set
      </SetAddDeleteButton>
    </div>
  );
}
