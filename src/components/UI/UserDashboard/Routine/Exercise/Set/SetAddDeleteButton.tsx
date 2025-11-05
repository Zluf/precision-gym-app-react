import React from "react";
import { useContext } from "react";
import "../ExerciseStats.css";
import AppContext from "../../../../../../context/app-context";
import { Exercise } from "../../../../../../types";

interface SetAddDeleteButtonProps {
  ex?: Exercise;
  routineName: string;
  routineDate: string;
  setIndex: number;
  addOrDelete: "add-set" | "delete-set";
  children: React.ReactNode;
}

function SetAddDeleteButton(props: SetAddDeleteButtonProps) {
  const context = useContext(AppContext);

  const addOrDeleteSetHandler = (addOrDelete: string, setIndex: number) => {
    if (!props.ex) return;

    const newEx = Object.assign({}, props.ex);
    // Remove the targeted set
    if (addOrDelete === "delete-set") {
      newEx.sets.splice(setIndex, 1);
    }
    // Add a new subsequent set with new rep stats
    if (addOrDelete === "add-set") {
      const newSet = Object.assign({}, newEx.sets[setIndex]);
      newSet.reps = Array(newSet.reps.length).fill(0);
      newEx.sets.splice(setIndex + 1, 0, newSet);
    }
    // 3. Update the database
    context.updateDatabase(props.routineName, newEx, props.routineDate);
  };

  return (
    <button
      className={props.addOrDelete}
      onClick={addOrDeleteSetHandler.bind(
        null,
        props.addOrDelete,
        props.setIndex
      )}
    >
      {props.children}
    </button>
  );
}

export default SetAddDeleteButton;
