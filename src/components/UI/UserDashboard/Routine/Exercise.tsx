import { memo, useContext, useCallback } from "react";
import "./Exercise.css";
import ExName from "./Exercise/ExName";
import ExSet from "./Exercise/ExSet";
import { Exercise as ExerciseType } from "../../../../types";
import { AppActionsContext } from "../../../../context/app-context";

export const keyDownHandler = (
  event: React.KeyboardEvent<HTMLInputElement>
) => {
  if (event.key === "Enter") event.currentTarget.blur();
};

interface ExerciseProps {
  ex: ExerciseType;
  routineName: string;
  routineDate: string;
  onDeleteExercise?: (
    routineName: string,
    exName: string,
    routineDate: string
  ) => Promise<void>;
}

const Exercise = memo((props: ExerciseProps) => {
  console.log(`${props.routineName} EX ${props.ex.name}`);
  const { updateDatabase } = useContext(AppActionsContext);

  const handleRepClick = useCallback((setIndex: number, repIndex: number, newValue: number) => {
    // Calculate new reps array based on clicked rep
    const newReps = props.ex.sets[setIndex].reps.map((rep, i) => {
      if (i !== repIndex && rep > newValue) return rep;
      if (i <= repIndex) return newValue;
      if (i > repIndex) return rep;
      return rep;
    });

    // Create immutable update with new exercise object
    const updatedEx: ExerciseType = {
      ...props.ex,
      sets: props.ex.sets.map((set, i) =>
        i === setIndex ? { ...set, reps: newReps } : set
      ),
    };

    updateDatabase(props.routineName, updatedEx, props.routineDate);
  }, [props.ex, props.routineName, props.routineDate, updateDatabase]);

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
          onRepClick={handleRepClick}
        />
      ))}
    </div>
  );
});

export default Exercise;
