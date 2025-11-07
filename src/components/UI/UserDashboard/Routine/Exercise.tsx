import React from "react";
import "./Exercise.css";
import ExName from "./Exercise/ExName";
import ExSet from "./Exercise/ExSet";
import { Exercise as ExerciseType } from "../../../../types";

export const keyDownHandler = (
  event: React.KeyboardEvent<HTMLInputElement>
) => {
  if (event.key === "Enter") (event.target as HTMLInputElement).blur();
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

export default function Exercise(props: ExerciseProps) {
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
