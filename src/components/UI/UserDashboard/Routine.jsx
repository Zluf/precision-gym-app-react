/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { useState, useEffect, useContext } from "react";
import "./Routine.css";
import Exercise from "./Routine/Exercise";
import SlideButton from "./Routine/SlideButton";
import { todaysDate, AppContext } from "../../../context/AppProvider";
import DateSelect from "./Routine/DateSelect";

export default function Routine(props) {
  const routineDates = Object.keys(props.routine.logbook);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [sessionIsToday, setSessionIsToday] = useState(false);
  const [displayedDate, setDisplayedDate] = useState(
    routineDates[routineDates.length - 1]
  );
  const exercisesArr = props.routine.logbook[displayedDate];
  const todayIsTheNewDate = routineDates.some((date) => date === todaysDate());

  const context = useContext(AppContext);

  const onSlideChange = (direction) => {
    if (direction === "left")
      setCurrentSlide((prevCurrentSlide) => prevCurrentSlide - 1);
    if (direction === "right")
      setCurrentSlide((prevCurrentSlide) => prevCurrentSlide + 1);
  };

  const addNewDateHandler = () => {
    context.addNewDate(props.routineName, todaysDate());
    setSessionIsToday(true);
    setCurrentSlide(0);
  };

  const addExerciseHandler = () => {
    context.toggleModal({
      routineName: props.routineName,
      routineDate: displayedDate,
      exercises: exercisesArr,
    });
  };

  useEffect(() => {
    if (displayedDate !== todaysDate()) setSessionIsToday(false);
    if (routineDates.some((date) => date === todaysDate())) {
      setSessionIsToday(true);
      setDisplayedDate(routineDates[routineDates.length - 1]);
    }
  }, [routineDates.length]);

  return (
    <section className={props.className} id={props.id}>
      {currentSlide !== 0 && (
        <SlideButton
          leftOrRight="left"
          onClick={onSlideChange.bind(null, "left")}
        />
      )}
      {currentSlide !== exercisesArr.length - 1 && (
        <SlideButton
          leftOrRight="right"
          onClick={onSlideChange.bind(null, "right")}
        />
      )}

      <h2>{props.routineName}</h2>

      <DateSelect
        displayedDate={displayedDate}
        onChange={(event) => setDisplayedDate(event.target.value)}
        routineDates={routineDates}
      />

      {!todayIsTheNewDate && (
        <button onClick={addNewDateHandler}>
          + I'm doing a new session today!
        </button>
      )}

      {props.routine.logbook && exercisesArr && (
        <div
          data-date={displayedDate}
          className="exercises-container"
          style={{
            transform: `translateX(-${300 * currentSlide}px)`,
            width: `${exercisesArr.length * 300}px`,
          }}
        >
          {exercisesArr.map((exercise, i) => {
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
