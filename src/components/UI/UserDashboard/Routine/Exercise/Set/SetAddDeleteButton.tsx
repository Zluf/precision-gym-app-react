import { useContext } from "react";
import "../ExerciseStats.css";
import { AppActionsContext } from "../../../../../../context/app-context";
import { Exercise } from "../../../../../../types";

interface SetAddDeleteButtonProps {
  ex?: Exercise;
  routineName: string;
  routineDate: string;
  setIndex: number;
  addOrDelete: "add-set" | "delete-set";
  output: "+ Add Set" | "✖️";
}

function SetAddDeleteButton(props: SetAddDeleteButtonProps) {
  const { updateDatabase } = useContext(AppActionsContext);

  const addOrDeleteSetHandler = (addOrDelete: string, setIndex: number) => {
    if (!props.ex) return;

    let newSets;
    if (addOrDelete === "delete-set") {
      newSets = props.ex.sets.filter((_, i) => i !== setIndex);
    } else {
      const newSet = {
        weight: props.ex.sets[setIndex].weight,
        reps: Array(props.ex.sets[setIndex].reps.length).fill(0),
      };
      newSets = [
        ...props.ex.sets.slice(0, setIndex + 1),
        newSet,
        ...props.ex.sets.slice(setIndex + 1),
      ];
    }

    const updatedEx: Exercise = {
      ...props.ex,
      sets: newSets,
    };

    updateDatabase(props.routineName, updatedEx, props.routineDate);
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
      {props.output}
    </button>
  );
}

export default SetAddDeleteButton;
