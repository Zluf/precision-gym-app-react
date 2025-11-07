import React from "react";
import { useState, useEffect, useContext } from "react";
import "./Routine.css";
import Exercise from "./Routine/Exercise";
import SlideButton from "./Routine/SlideButton";
import { todaysDate } from "../../../context/AppProvider";
import DateSelect from "./Routine/DateSelect";
import { Routine as RoutineObj } from "../../../types";
import AppContext from "../../../context/app-context";

interface RoutineProps {
  routine: RoutineObj;
  routineName: string;
  className?: string;
  id?: string;
}

export default function Routine(props: RoutineProps) {
  const routineDates = Object.keys(props.routine.logbook);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [sessionIsToday, setSessionIsToday] = useState(false);

  const context = useContext(AppContext);

  const [displayedDate, setDisplayedDate] = useState(
    routineDates[routineDates.length - 1]
  );
  const exercisesArr = props.routine.logbook[displayedDate];
  const todayIsTheNewDate = routineDates.some((date) => date === todaysDate());

  const onSlideChange = (direction: "left" | "right") => {
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

  const addExerciseHandler = (e: React.MouseEvent) => {
    e.stopPropagation(); // prevents the modal from closing immediately due to it's own outside click handler
    const currentRoutine = {
      routineDate: displayedDate,
      routineName: props.routineName,
      exercises: exercisesArr,
    };
    context.toggleModal(currentRoutine);
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
        onChange={(event: React.ChangeEvent<HTMLSelectElement>) =>
          setDisplayedDate(event.target.value)
        }
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
                routineDate={displayedDate}
                ex={exercise}
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
