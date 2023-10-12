import React from "react";
import AppContext from "../../../../../../context/app-context";
import "../ExerciseStats.css";

function SetGauge(props) {
  const context = React.useContext(AppContext);

  const setGaugeColor = (rep) => {
    return rep === 100
      ? "#008000"
      : rep === 80
      ? "#008000bb"
      : rep === 60
      ? "#00800090"
      : rep === 40
      ? "#0080006c"
      : rep === 20
      ? "#0080002c"
      : "white";
  };

  return (
    <div className="exercise-stats--set-gauge">
      {props.ex.sets[props.setIndex].reps.map((rep, i) => (
        <div
          key={i}
          className="gauge-sector"
          style={{
            backgroundColor: setGaugeColor(rep),
          }}
        ></div>
      ))}
    </div>
  );
}

export default SetGauge;
