import React from "react";
import "./RepGauge.css";
import { useContext } from "react";
import { AppActionsContext } from "../../../../../../context/app-context";

interface RepGaugeProps {
  rep: number;
  routineName: string;
  routineDate: string;
  exId: number;
  setIndex: number;
  repIndex: number;
  onRepClick: (event: React.MouseEvent<HTMLDivElement>) => void;
}

export default function RepGauge(props: RepGaugeProps) {
  const { updateExercise } = useContext(AppActionsContext);

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
    updateExercise(
      props.routineName,
      props.exId,
      {
        type: "addOrDeleteRep",
        setIndex: props.setIndex,
        repIndex: props.repIndex,
        action: addOrDelete,
      },
      props.routineDate
    );
  };

  return (
    <div className="rep-expanded" data-rep-num={props.repIndex}>
      <span>{`Rep ${props.repIndex + 1}:`}</span>

      <div className="gauge">{innerGauge}</div>

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
