import { useState, useEffect, useContext } from "react";
import "./Routine.css";
import Exercise from "./Exercise";
import AppContext from "../../context/app-context";
import slideChange from "../../assets/icon-slide-change.svg";

export default function Routine(props) {
  const updatedAmountOfDates = Object.keys(props.routine.logbook).length - 1;
  const [currentSlide, setCurrentSlide] = useState(0);
  const [sessionIsToday, setSessionIsToday] = useState(false);
  const [currentDateIndex, setCurrentDateIndex] =
    useState(updatedAmountOfDates);
  const context = useContext(AppContext);

  const onRepClickHandler = (event, routineName, exercise) => {
    const setNum = event.target.closest(".set-expanded").dataset.setNum;
    const repPerfNum = event.target.closest(".rep-expanded").dataset.repNum;
    const repPerformance = +event.target.dataset.value;
    const updatedEx = exercise;
    updatedEx.sets[setNum].reps[repPerfNum] = repPerformance;
    console.log(updatedEx);
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

  const setCurrentDateIndexHandler = (date, dateListNum) => {
    setCurrentDateIndex(dateListNum);
    if (dateListNum !== currentDateIndex) setSessionIsToday(!sessionIsToday);
  };

  const addNewSessionHandler = () => {
    setSessionIsToday(true);
    context.addNewSession(props.routineName);
  };

  useEffect(() => {
    setCurrentDateIndex(updatedAmountOfDates);
  }, [context.routineList]);

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
      <h3>{Object.keys(props.routine.logbook)[currentDateIndex]}</h3>

      <select name="routine-dates" id="routine-dates">
        <option>Select a date</option>
        {Object.keys(props.routine.logbook)
          .map((date, i) => (
            <option
              onClick={() => setCurrentDateIndexHandler(date, i)}
              key={date}
            >
              {date}
            </option>
          ))
          .sort((a, b) => a - b)}
      </select>

      {!sessionIsToday && (
        <button onClick={addNewSessionHandler}>
          + I'm doing a new session today!
        </button>
      )}

      <div
        className="exercises-container"
        style={{ transform: `translateX(-${50 * currentSlide}%)` }}
      >
        {Object.values(props.routine.logbook)[currentDateIndex].map(
          (exercise, i) => {
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
          }
        )}
      </div>

      {sessionIsToday && (
        <button
          onClick={() => {
            context.toggleModal({
              name: props.routineName,
              date: Object.keys(props.routine.logbook),
              exercises: props.routine.logbook[currentDateIndex],
            });
          }}
        >
          + Add Exercise
        </button>
      )}
    </section>
  );
}
