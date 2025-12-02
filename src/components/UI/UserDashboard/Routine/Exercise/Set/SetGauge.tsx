import "../ExerciseStats.css";

interface SetGaugeProps {
  set: { weight: number; reps: number[] };
  setIndex: number;
}

function SetGauge(props: SetGaugeProps) {
  const setGaugeColor = (rep: number): string => {
    let color: string;
    switch (rep) {
      case 100:
        color = "#008000";
        break;
      case 80:
        color = "#008000bb";
        break;
      case 60:
        color = "#00800090";
        break;
      case 40:
        color = "#0080006c";
        break;
      case 20:
        color = "#0080002c";
        break;
      default:
        color = "white";
    }
    return color;
  };

  return (
    <div className="exercise-stats--set-gauge">
      {props.set.reps.map((rep, i) => (
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
