import React from "react";
import "./RepGauge.css";
import { useContext } from "react";
import AppContext from "../../context/app-context";

export default function RepGauge(props) {
  const context = useContext(AppContext);

  let innerGauge = [];
  // Reverse iteration because CSS flex-direction: row-reverse
  for (let i = 5; i > 0; i--) {
    innerGauge.push(
      <span
        key={i}
        onClick={props.onRepClick}
        data-value={i * 20}
        className="circle"
        style={{
          backgroundColor: props.rep >= i * 20 && "green",
        }}
      ></span>
    );
  }

  const addOrDeleteRepHandler = (addOrDelete, event) => {
    // 1. Locate the targeted rep
    const setNum = event.target.closest(".set-expanded").dataset.setNum;
    const repNum = +event.target.closest(".rep-expanded").dataset.repNum;
    const routineDate = event.target.closest(".routine").dataset.date;
    const routineName = event.target.closest(".routine").dataset.routineName;
    const ex = props.ex;
    const modifiedReps = ex.sets[setNum].reps;
    // 2.1 Remove the targeted rep
    if (addOrDelete === "delete") {
      modifiedReps.splice(repNum, 1);
    }
    // 2.2 Add a new subsequent rep
    if (addOrDelete === "add") {
      modifiedReps.splice(repNum + 1, 0, 0);
    }
    // 3. Update the database
    context.updateExerciseList2(routineName, ex, routineDate);
  };

  return (
    <div className="rep-expanded" data-rep-num={props.repIndex}>
      <span>{`Rep ${props.repIndex + 1}:`}</span>
      <div className="gauge">{innerGauge.map((circle) => circle)}</div>
      <button
        className="add-delete-rep"
        onClick={(event) => addOrDeleteRepHandler("delete", event)}
      >
        ➖
      </button>
      <button
        className="add-delete-rep"
        onClick={(event) => addOrDeleteRepHandler("add", event)}
      >
        ➕
      </button>
    </div>
  );
}
