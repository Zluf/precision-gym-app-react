import angle from "../../../../../../assets/angle-bracket.png";
import "../ExerciseStats.css";

interface SetExpandButtonProps {
  repsAreVisible: boolean;
  toggleRepsHandler: () => void;
}

function SetExpandButton(props: SetExpandButtonProps) {
  return (
    <button
      className="expand-stats-btn btn-transparent "
      onClick={props.toggleRepsHandler}
    >
      <img
        src={angle}
        style={{
          transform: props.repsAreVisible
            ? "rotate(-90deg)"
            : "rotate(-180deg)",
        }}
        alt="toggle reps button"
      />
    </button>
  );
}

export default SetExpandButton;
