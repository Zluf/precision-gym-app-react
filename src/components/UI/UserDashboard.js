import "./UserDashboard.css";
import React from "react";
import Routine from "./Routine";
import ExerciseFormModal from "./ExerciseFormModal";
import AppContext from "../../context/app-context";

export default function UserDashboard() {
  const context = React.useContext(AppContext);
  const [test, setTest] = React.useState("");

  const dateSelect = (date) => {
    console.log(`To lead selected day's routine: ${date}`);
  };

  // console.log(new Date().toISOString().split("T")[0]);

  return (
    <div className="user-dashboard">
      {context.routineList.map((routine, i) => {
        const routineDates = Object.keys(routine[1].logbook);

        console.log(Object.values(routine[1].logbook)[0]);

        const routineClassName = routine[0].toLowerCase().split(" ").join("-");

        return (
          <section key={routineClassName} className={routineClassName}>
            {/* Routine Name */}
            <h2>{routine[0]}</h2>

            {/* Routine Date Select Menu */}
            <select>
              {Object.keys(routine[1].logbook).map((date) => {
                return (
                  <option key={date} onClick={() => dateSelect(date)}>
                    {date}
                  </option>
                );
              })}
            </select>

            {/* Latest Routine */}
            {!context.curRoutine && (
              <Routine
                key={i}
                className={`routine ${routineClassName}`}
                routineName={routine[0]}
                routine={Object.values(routine[1].logbook)[0]}
                routineIndex={i}
              />
            )}
          </section>
        );
      })}

      {context.modalWindowIsOpen && <ExerciseFormModal />}
    </div>
  );
}
