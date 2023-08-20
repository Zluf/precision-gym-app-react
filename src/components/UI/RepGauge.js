import React from "react";
import "./RepGauge.css";

export default function RepGauge(props) {
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

  return (
    <div className="rep-expanded" data-rep-num={props.repIndex}>
      <span>{`Rep ${props.repIndex + 1}:`}</span>
      <div className="gauge">{innerGauge.map((circle) => circle)}</div>
    </div>
  );
}
