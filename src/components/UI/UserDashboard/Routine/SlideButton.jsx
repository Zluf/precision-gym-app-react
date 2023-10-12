import React from "react";
import slideChange from "../../../../assets/icon-slide-change.svg";

export default function SlideButton(props) {
  return (
    <button
      className={`slide-btn slide-${props.leftOrRight}`}
      onClick={props.onClick}
    >
      <img src={slideChange} alt={`slide-${props.leftOrRight} arrow`} />
    </button>
  );
}
