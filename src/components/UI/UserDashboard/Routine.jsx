import { useState, useEffect, useContext } from "react";
import "./Routine.css";
import Exercise from "./Routine/Exercise";
import AppContext from "../../../context/app-context";
import slideChange from "../../../assets/icon-slide-change.svg";
import DateSelect from "./Routine/DateSelect";
import { todaysDate } from "../../../context/AppProvider";

export default function Routine(props) {
  const context = useContext(AppContext);

  const routineDates = props.routine.logbook
    ? Object.keys(props.routine.logbook)
    : [];

  const [currentSlide, setCurrentSlide] = useState(0);
  const [sessionIsToday, setSessionIsToday] = useState(false);
  const [displayedDate, setDisplayedDate] = useState(
    routineDates[routineDates.length - 1]
  );
  const todayIsTheNewDate = routineDates.some((date) => date === todaysDate());

  // const onBlurHandler = (event, exercise) => {
  //   let updatedEx = exercise;
  //   const inputKeyName = Object.keys(updatedEx).find(
  //     (key) => updatedEx[key] === updatedEx[event.target.name]
  //   );
  //   updatedEx[inputKeyName] = event.target.value;
  //   context.updateDatabase(props.routineName, updatedEx, displayedDate);
  // };

  const onSlideChange = (event, direction) => {
    if (direction === "prev")
      setCurrentSlide((prevCurrentSlide) => prevCurrentSlide - 1);
    if (direction === "next")
      setCurrentSlide((prevCurrentSlide) => prevCurrentSlide + 1);
  };

  const addNewDateHandler = () => {
    context.addNewDate(props.routineName, todaysDate());
    setSessionIsToday(true);
    setCurrentSlide(0);
  };

  const setCurrentDateHandler = (event) => {
    if (event.target.value !== "Select a date")
      setDisplayedDate(event.target.value);
  };

  const addExerciseHandler = () => {
    context.toggleModal({
      routineName: props.routineName,
      routineDate: displayedDate,
      exercises: props.routine.logbook[displayedDate],
    });
  };

  useEffect(() => {
    if (displayedDate === todaysDate()) setSessionIsToday(true);
    if (displayedDate !== todaysDate()) setSessionIsToday(false);
  }, [displayedDate]);

  useEffect(() => {
    if (routineDates.some((date) => date === todaysDate())) {
      setSessionIsToday(true);
      setDisplayedDate(routineDates[routineDates.length - 1]);
    }
  }, [routineDates.length]);

  return (
    <section
      className={props.className}
      id={props.id}
      data-routine-name={props.routineName}
      data-date={displayedDate}
    >
      <button
        className="slide-btn slide-left"
        style={{
          visibility: currentSlide === 0 && "hidden",
        }}
        onClick={(event) => onSlideChange(event, "prev")}
      >
        <img src={slideChange} alt="slide-left arrow" />
      </button>

      <button
        className="slide-btn slide-right"
        style={{
          visibility:
            displayedDate &&
            currentSlide === props.routine.logbook[displayedDate].length - 1 &&
            "hidden",
        }}
        onClick={(event) => onSlideChange(event, "next")}
      >
        <img src={slideChange} alt="slide-right arrow" />
      </button>

      <h2>{props.routineName}</h2>

      <DateSelect
        displayedDate={displayedDate}
        onSetCurrentDate={setCurrentDateHandler}
        routineDates={routineDates}
      />

      {!todayIsTheNewDate && (
        <button onClick={addNewDateHandler}>
          + I'm doing a new session today!
        </button>
      )}

      {props.routine.logbook && props.routine.logbook[displayedDate] && (
        <div
          data-date={displayedDate}
          className="exercises-container"
          style={{
            transform: `translateX(-${300 * currentSlide}px)`,
            width: `${props.routine.logbook[displayedDate].length * 300}px`,
          }}
        >
          {props.routine.logbook[displayedDate].map((exercise, i) => {
            return (
              <Exercise
                key={`${exercise.name}-${i + 1}`}
                routineName={props.routineName}
                routineIndex={props.routineIndex}
                routineDate={displayedDate}
                ex={exercise}
                onEditExercise={() => {
                  context.toggleModal(exercise);
                }}
                onDeleteExercise={context.deleteExercise}
              />
            );
          })}
        </div>
      )}

      {sessionIsToday && (
        <button className="add-ex-btn" onClick={addExerciseHandler}>
          + Add Exercise
        </button>
      )}
    </section>
  );
}
