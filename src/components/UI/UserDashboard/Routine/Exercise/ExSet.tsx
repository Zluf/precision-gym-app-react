import React, { memo, useState } from "react";
import "./ExerciseStats.css";
import RepGauge from "./Set/RepGauge";
import SetGauge from "./Set/SetGauge";
import SetWeight from "./Set/SetWeight";
import SetExpandButton from "./Set/SetExpandButton";
import SetAddDeleteButton from "./Set/SetAddDeleteButton";
import { Exercise } from "../../../../../types";

interface ExSetProps {
  ex: Exercise;
  set: { weight: number; reps: number[] };
  setIndex: number;
  routineName: string;
  routineDate: string;
  onRepClick: (setIndex: number, repIndex: number, newValue: number) => void;
}

// Custom comparator function for memo() defined outside
const arePropsEqual = (
  prevProps: ExSetProps,
  nextProps: ExSetProps
): boolean => {
  return prevProps.set === nextProps.set;
};

const ExSet = memo((props: ExSetProps) => {
  console.log(
    `RNDR ${props.routineName} / ${props.ex.name} / set ${props.setIndex}`,
    props.set
  );

  const [repsAreVisible, setRepsAreVisible] = useState(false);

  const toggleRepsHandler = () => {
    setRepsAreVisible((prevRepsAreVisible) => !prevRepsAreVisible);
  };

  const repClickHandler = (
    event: React.MouseEvent<HTMLDivElement>,
    setIndex: number,
    repIndex: number
  ) => {
    const value = event.currentTarget.dataset.value;
    if (!value) {
      console.error("Missing data-value attribute on rep element");
      return;
    }

    const repPerformance = +value;

    // Call parent's callback instead of creating updatedEx here
    props.onRepClick(setIndex, repIndex, repPerformance);
  };

  const repsToggleStyle: React.CSSProperties = {
    height: repsAreVisible ? `${props.set.reps.length * 20}px` : 0,
    opacity: repsAreVisible ? 1 : 0,
  };

  return (
    <div className="exercise-stats" data-set-num={props.setIndex}>
      <div className="exercise-stats--row">
        <span className="exercise-stats--set-num">
          Set {props.setIndex + 1}
        </span>

        <SetGauge set={props.set} setIndex={props.setIndex} />
      </div>

      <div className="exercise-stats--row">
        <SetWeight
          routineDate={props.routineDate}
          routineName={props.routineName}
          set={props.set}
          exId={props.ex.id}
          setIndex={props.setIndex}
        />

        <SetExpandButton
          repsAreVisible={repsAreVisible}
          toggleRepsHandler={toggleRepsHandler}
        />

        <SetAddDeleteButton
          exId={props.ex.id}
          setIndex={props.setIndex}
          addOrDelete="delete-set"
          routineName={props.routineName}
          routineDate={props.routineDate}
          output="✖️"
        />
      </div>

      {/* Reps */}
      <div className="exercise-stats--reps" style={repsToggleStyle}>
        {props.set.reps.map((rep, repIndex) => (
          <RepGauge
            rep={rep}
            key={repIndex}
            routineName={props.routineName}
            routineDate={props.routineDate}
            exId={props.ex.id}
            setIndex={props.setIndex}
            repIndex={repIndex}
            onRepClick={(event) =>
              repClickHandler(event, props.setIndex, repIndex)
            }
          />
        ))}
      </div>

      <SetAddDeleteButton
        exId={props.ex.id}
        routineName={props.routineName}
        routineDate={props.routineDate}
        setIndex={props.setIndex}
        addOrDelete="add-set"
        output="+ Add Set"
      />
    </div>
  );
}, arePropsEqual);

export default ExSet;
