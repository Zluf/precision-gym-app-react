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
    if (addOrDelete === "delete") {
      const setNum = event.target.closest(".set-expanded").dataset.setNum;
      const repNum = event.target.closest(".rep-expanded").dataset.repNum;
      const ex = props.ex;
      const modifiedReps = ex.sets[setNum].reps.filter(
        (rep, i) => ex.sets[setNum].reps[repNum] !== rep && i !== repNum
      );
      ex.sets[setNum].reps = modifiedReps;
      console.log(ex);
    }
    // if (addOrDelete === "add") {
    // }
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
