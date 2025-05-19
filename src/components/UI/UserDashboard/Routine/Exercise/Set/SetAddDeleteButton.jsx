import React from "react";
import { useContext } from "react";
import "../ExerciseStats.css";
import AppContext from "../../../../../../context/AppProvider";

function SetAddDeleteButton(props) {
  const context = useContext(AppContext);

  const addOrDeleteSetHandler = (addOrDelete, setIndex) => {
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
