import React from "react";
import "./RepGauge.css";
import { useContext } from "react";
import { AppActionsContext } from "../../../../../../context/app-context";
import { Exercise } from "../../../../../../types";

interface RepGaugeProps {
  rep: number;
  routineName: string;
  routineDate: string;
  ex: Exercise;
  setIndex: number;
  repIndex: number;
  onRepClick: (event: React.MouseEvent<HTMLDivElement>) => void;
}

export default function RepGauge(props: RepGaugeProps) {
  const { updateDatabase } = useContext(AppActionsContext);

  let innerGauge: React.ReactElement[] = [];
  // Reverse iteration because CSS flex-direction: row-reverse
  for (let i = 5; i > 0; i--) {
    innerGauge.push(
      <div
        key={i}
        onClick={props.onRepClick}
        data-value={i * 20}
        className="circle"
        style={{
          backgroundColor: props.rep >= i * 20 ? "green" : undefined,
        }}
      ></div>
    );
  }

  const addOrDeleteRepHandler = (addOrDelete: "add" | "delete") => {
    const currentReps = props.ex.sets[props.setIndex].reps;
    let newReps: number[];

    if (addOrDelete === "delete") {
      newReps = currentReps.filter((_, i) => i !== props.repIndex);
    } else {
      newReps = [
        ...currentReps.slice(0, props.repIndex + 1),
        0,
        ...currentReps.slice(props.repIndex + 1),
      ];
    }

    // Create immutable update
    const updatedEx: Exercise = {
      ...props.ex,
      sets: props.ex.sets.map((set, i) =>
        i === props.setIndex ? { ...set, reps: newReps } : set
      ),
    };

    updateDatabase(props.routineName, updatedEx, props.routineDate);
  };

  return (
    <div className="rep-expanded" data-rep-num={props.repIndex}>
      <span>{`Rep ${props.repIndex + 1}:`}</span>

      <div className="gauge">{innerGauge.map((circle) => circle)}</div>

      <button
        className="add-delete-rep btn-transparent"
        onClick={addOrDeleteRepHandler.bind(null, "delete")}
      >
        ➖
      </button>

      <button
        className="add-delete-rep btn-transparent"
        onClick={addOrDeleteRepHandler.bind(null, "add")}
      >
        ➕
      </button>
    </div>
  );
}
