import { useState, useEffect, useContext } from "react";
import "./Routine.css";
import Exercise from "./Exercise";
import AppContext from "../../context/app-context";
import slideChange from "../../assets/icon-slide-change.svg";

export default function Routine(props) {
  const date = new Date();
  const month = date.getMonth() < 10 ? `0${date.getMonth()}` : date.getMonth();
  const todaysDate = `${date.getFullYear()}-${month}-${date.getDate()}`;

  const routineDates = Object.keys(props.routine.logbook);
  const updatedAmountOfDates = routineDates.length - 1;
  const [currentSlide, setCurrentSlide] = useState(0);
  const [sessionIsToday, setSessionIsToday] = useState(false);
  const [displayedDate, setDisplayedDate] = useState(
    routineDates[updatedAmountOfDates]
  );
  const addNewSession = routineDates.some((date) => date === todaysDate);
  const context = useContext(AppContext);

  const onRepClickHandler = (event, routineName, exercise) => {
    const setNum = event.target.closest(".set-expanded").dataset.setNum;
    const repPerfNum = event.target.closest(".rep-expanded").dataset.repNum;
    const date = event.target.closest(".rep-expanded");
    const repPerformance = +event.target.dataset.value;
    const updatedEx = exercise;
    updatedEx.sets[setNum].reps[repPerfNum] = repPerformance;
    context.updateExerciseList2(routineName, updatedEx);
  };

  const onBlurHandler = (event, exercise) => {
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

  const setCurrentDateHandler = (date, dateListNum) => {
    setDisplayedDate(date);
  };

  const addNewSessionHandler = () => {
    context.addNewSession(props.routineName, todaysDate);
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
    <section onClick={props.onClick} className={props.className}>
      <div className="slide-buttons">
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
      </div>

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

      {!addNewSession && (
        <button onClick={addNewSessionHandler}>
          + I'm doing a new session today!
        </button>
      )}

      <div
        className={`exercises-container ${!sessionIsToday ? "archive" : ""}`}
        style={{ transform: `translateX(-${50 * currentSlide}%)` }}
      >
        {props.routine.logbook[displayedDate].map((exercise, i) => {
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
        })}
      </div>

      {sessionIsToday && (
        <button
          onClick={() => {
            context.toggleModal({
              name: props.routineName,
              date: routineDates,
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
