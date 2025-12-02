import { useContext } from "react";
import "../ExerciseStats.css";
import { AppActionsContext } from "../../../../../../context/app-context";

interface SetAddDeleteButtonProps {
  exId: number;
  routineName: string;
  routineDate: string;
  setIndex: number;
  addOrDelete: "add-set" | "delete-set";
  output: "+ Add Set" | "✖️";
}

function SetAddDeleteButton(props: SetAddDeleteButtonProps) {
  const { updateExercise } = useContext(AppActionsContext);

  const addOrDeleteSetHandler = (addOrDelete: string, setIndex: number) => {
    const action = addOrDelete === "delete-set" ? "delete" : "add";

    updateExercise(
      props.routineName,
      props.exId,
      {
        type: "addOrDeleteSet",
        setIndex,
        action,
      },
      props.routineDate
    );
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
