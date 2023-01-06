import React from "react";
import AppContext from "./app-context";
import App from "../App";

export default function AppProvider(props) {
  const [modalWindow, setModalWindow] = React.useState(false);
  const [exerciseList, setExerciseList] = React.useState([]);
  const [currentExercise, setCurrentExercise] = React.useState(null);

  const fetchExerciseDatabase = React.useCallback(async () => {
    try {
      const response = await fetch(
        "https://precision-gym-default-rtdb.firebaseio.com/exercises.json"
      );
      if (!response.ok) {
        throw new Error("Something went wrong!");
      }
      const data = await response.json();
      const arr = data ? Object.values(data) : [];
      setExerciseList(arr);
    } catch (err) {
      console.log(err);
    }
  }, []);

  const addExToDatabase = async function (newEx) {
    // console.log(newEx);
    await fetch(
      "https://precision-gym-default-rtdb.firebaseio.com/exercises.json",
      {
        method: "POST",
        body: JSON.stringify(newEx),
        headers: { "Content-Type": "application-json" },
      }
    );
    setExerciseList((prevExerciseList) => {
      return [...prevExerciseList, newEx];
    });
    console.log(exerciseList);
  };

  const deleteExercise = (exName) => {
    const updatedExerciseList = exerciseList.filter((ex) => ex.name !== exName);
    setExerciseList(updatedExerciseList);
    fetch("https://precision-gym-default-rtdb.firebaseio.com/exercises.json", {
      method: "PUT",
      body: JSON.stringify(updatedExerciseList),
      headers: { "Content-Type": "application-json" },
    });
  };

  const toggleModal = function (exerciseData) {
    if (exerciseData) setCurrentExercise({ ...exerciseData });
    setModalWindow(!modalWindow);
    if (!exerciseData) setModalWindow(!modalWindow);
  };

  const context = {
    exerciseList: exerciseList,
    modalWindowIsOpen: modalWindow,
    addExToDatabase: addExToDatabase,
    deleteExercise: deleteExercise,
    toggleModal: toggleModal,
    currentExercise: currentExercise,
  };

  React.useEffect(() => {
    fetchExerciseDatabase(); // executes upon mount, gets stored in memory, therefore does not execute on further re-renders
  }, [fetchExerciseDatabase]);

  return (
    <AppContext.Provider value={context}>
      <App>{props.children}</App>
    </AppContext.Provider>
  );
}
