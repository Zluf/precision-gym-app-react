import React from "react";
import "./RepGauge.css";
import { useContext } from "react";
import AppContext from "../../../../../../context/app-context";

export default function RepGauge(props) {
  const context = useContext(AppContext);

  let innerGauge = [];
  // Reverse iteration because CSS flex-direction: row-reverse
  for (let i = 5; i > 0; i--) {
    innerGauge.push(
      <div
        key={i}
        onClick={props.onRepClick}
        data-value={i * 20}
        className="circle"
        style={{
          backgroundColor: props.rep >= i * 20 && "green",
        }}
      ></div>
    );
  }

  const addOrDeleteRepHandler = (addOrDelete) => {
    // 1. Locate the targeted rep
    const ex = props.ex;
    const modifiedReps = ex.sets[props.setIndex].reps;
    // 2.1 Remove the targeted rep
    if (addOrDelete === "delete") {
      modifiedReps.splice(props.repIndex, 1);
    }
    // 2.2 Add a new subsequent rep
    if (addOrDelete === "add") {
      modifiedReps.splice(props.repIndex + 1, 0, 0);
    }
    // 3. Update the database
    context.updateDatabase(props.routineName, ex, props.routineDate);
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
