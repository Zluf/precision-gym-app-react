import React, { useEffect } from "react";
import "./Routine.css";
import Exercise from "./Exercise";
import AppContext from "../../context/app-context";
import slideChange from "../../assets/icon-slide-change.svg";

export default function Routine(props) {
  const [currentSlide, setCurrentSlide] = React.useState(0);
  const context = React.useContext(AppContext);

  const onRepClickHandler = (event, routineName, exercise) => {
    const setNum = event.target.closest(".set-expanded").dataset.setNum;
    const repPerfNum = event.target.closest(".rep-expanded").dataset.repNum;
    const repPerformance = +event.target.dataset.value;
    const updatedEx = exercise;
    updatedEx.sets[setNum][repPerfNum] = repPerformance;
    context.updateExerciseList2(routineName, updatedEx);
  };

  const onBlurHandler = (event, exercise) => {
    console.log(event.target.value);
    console.log(exercise);
    let updatedEx = exercise;
    const inputKeyName = Object.keys(updatedEx).find(
      (key) => updatedEx[key] === updatedEx[event.target.name]
    );
    updatedEx[inputKeyName] = event.target.value;
    context.updateExerciseList2(props.routineName, updatedEx);
  };

  const onSlideChange = (event, direction) => {
    if (direction === "prev")
      setCurrentSlide((prevCurrentSlide) => prevCurrentSlide - 1);
    if (direction === "next")
      setCurrentSlide((prevCurrentSlide) => prevCurrentSlide + 1);
  };

  console.log(props.routineName, Object.keys(props.routine.logbook));

  return (
    <section onClick={props.onClick} className={props.className}>
      {/* <div className="slide-buttons">
        <button
          className="slide-btn slide-left"
          style={{ visibility: currentSlide === 0 && "hidden" }}
          onClick={(event) => onSlideChange(event, "prev")}
        >
          <img src={slideChange} alt="slide-left arrow" />
        </button>

        <button
          className="slide-btn slide-right"
          style={{
            visibility: currentSlide === props.routine.length - 1 && "hidden",
          }}
          onClick={(event) => onSlideChange(event, "next")}
        >
          <img src={slideChange} alt="slide-right arrow" />
        </button>
      </div> */}

      <h2>{props.routineName}</h2>

      <select name="routine-dates" id="routine-dates">
        {Object.keys(props.routine.logbook).map((date) => (
          <option value="">{date}</option>
        ))}
      </select>

      <div
        className="exercises-container"
        style={{ transform: `translateX(-${50 * currentSlide}%)` }}
      >
        {/* {props.routine.map((exercise, i) => {
          return (
            <Exercise
              key={`${exercise.name}-${i + 1}`}
              exIndex={i}
              routine={props.routine}
              routineName={props.routineName}
              routineIndex={props.routineIndex}
              ex={exercise}
              onEditExercise={() => {
                context.toggleModal(exercise);
              }}
              onRepClick={(event) => {
                onRepClickHandler(event, props.routineName, exercise);
              }}
              onBlur={(event) => onBlurHandler(event, exercise)}
              onDeleteExercise={context.deleteExercise}
            />
          );
        })} */}
      </div>

      <button
        onClick={() => {
          context.toggleModal(props.routineName);
        }}
      >
        + Add Exercise
      </button>

      <button onClick={props.onClickButton}>+ Add to Logbook</button>
    </section>
  );
}
