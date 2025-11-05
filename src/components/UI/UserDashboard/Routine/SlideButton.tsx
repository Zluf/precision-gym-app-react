import slideChange from "../../../../assets/icon-slide-change.svg";

interface SlideButtonProps {
  leftOrRight: "left" | "right";
  onClick: () => void;
}

export default function SlideButton(props: SlideButtonProps) {
  return (
    <button
      className={`slide-btn slide-${props.leftOrRight}`}
      onClick={props.onClick}
    >
      <img src={slideChange} alt={`slide-${props.leftOrRight} arrow`} />
    </button>
  );
}
