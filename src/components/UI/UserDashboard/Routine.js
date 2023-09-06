import { useState, useEffect, useContext } from "react";
import "./Routine.css";
import Exercise from "./Exercise";
import AppContext from "../../../context/app-context";
import slideChange from "../../../assets/icon-slide-change.svg";

export default function Routine(props) {
  const date = new Date();
  const day = date.getDate() < 10 ? `0${date.getDate()}` : date.getDate();
  const month =
    date.getMonth() < 10 ? `0${date.getMonth() + 1}` : `${date.getMonth() + 1}`;
  const todaysDate = `${date.getFullYear()}-${month}-${day}`;

  const routineDates = Object.keys(props.routine.logbook);
  const updatedAmountOfDates = routineDates.length - 1;
  const [currentSlide, setCurrentSlide] = useState(0);
  const [sessionIsToday, setSessionIsToday] = useState(false);
  const [displayedDate, setDisplayedDate] = useState(
    routineDates[updatedAmountOfDates]
  );
  const todayIsTheNewDate = routineDates.some((date) => date === todaysDate);
  const context = useContext(AppContext);

  const onBlurHandler = (event, exercise) => {
    let updatedEx = exercise;
    const inputKeyName = Object.keys(updatedEx).find(
      (key) => updatedEx[key] === updatedEx[event.target.name]
    );
    updatedEx[inputKeyName] = event.target.value;
    context.updateExerciseList2(props.routineName, updatedEx, displayedDate);
  };

  const onSlideChange = (event, direction) => {
    if (direction === "prev")
      setCurrentSlide((prevCurrentSlide) => prevCurrentSlide - 1);
    if (direction === "next")
      setCurrentSlide((prevCurrentSlide) => prevCurrentSlide + 1);
  };

  const setCurrentDateHandler = (date, dateListNum) => {
    setDisplayedDate(date);
  };

  const addNewDateHandler = () => {
    context.addNewDate(props.routineName, todaysDate);
    setCurrentSlide(0);
  };

  useEffect(() => {
    if (displayedDate === todaysDate) setSessionIsToday(true);
    if (displayedDate !== todaysDate) setSessionIsToday(false);
  }, [displayedDate]);

  useEffect(() => {
    setDisplayedDate(routineDates[updatedAmountOfDates]);
  }, [context.routineList]);

  return (
    <section
      onClick={props.onClick}
      className={props.className}
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
            currentSlide === props.routine.logbook[displayedDate].length - 1 &&
            "hidden",
        }}
        onClick={(event) => onSlideChange(event, "next")}
      >
        <img src={slideChange} alt="slide-right arrow" />
      </button>

      <h2>{props.routineName}</h2>

      <select
        name="routine-dates"
        value={displayedDate}
        readOnly={displayedDate}
      >
        <option>Select a date</option>
        {routineDates
          .map((date, i) => (
            <option
              onClick={() => setCurrentDateHandler(date, i)}
              key={date}
              value={date}
            >
              {date}
            </option>
          ))
          .sort((a, b) => a - b)}
      </select>

      {!todayIsTheNewDate && (
        <button onClick={addNewDateHandler}>
          + I'm doing a new session today!
        </button>
      )}

      <div
        data-date={displayedDate}
        className={`exercises-container ${!sessionIsToday ? "archive" : ""}`}
        style={{ transform: `translateX(-${50 * currentSlide}%)` }}
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
              onBlur={(event) => onBlurHandler(event, exercise)}
              onDeleteExercise={context.deleteExercise}
            />
          );
        })}
      </div>

      {sessionIsToday && (
        <button
          className="add-ex-btn"
          onClick={() => {
            context.toggleModal({
              routineName: props.routineName,
              routineDate: displayedDate,
              exercises: props.routine.logbook[displayedDate],
            });
          }}
        >
          + Add Exercise
        </button>
      )}
    </section>
  );
}
