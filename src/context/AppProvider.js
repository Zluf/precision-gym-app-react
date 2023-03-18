import React from "react";
import AppContext from "./app-context";
import App from "../App";

export default function AppProvider(props) {
  const [exerciseList, setExerciseList] = React.useState([]);
  const [currentExercise, setCurrentExercise] = React.useState(null);
  const [modalWindow, setModalWindow] = React.useState(false);

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

  const addExToDatabase = async function (newExInput) {
    const newEx = {
      id: context.exerciseList.length + 1,
      ...newExInput,
    };

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
    console.log(newEx);
  };

  const updateExercise = (newExerciseData) => {
    const updatedEx = { id: context.currentExercise.id, ...newExerciseData };
    const newExList = [
      ...context.exerciseList.filter(
        (ex) => ex.id !== context.currentExercise.id
      ),
      updatedEx,
    ].sort((a, b) => a.id - b.id);

    setExerciseList(newExList);
    setCurrentExercise(null);

    fetch("https://precision-gym-default-rtdb.firebaseio.com/exercises.json", {
      method: "PUT",
      body: JSON.stringify(newExList),
      headers: { "Content-Type": "application-json" },
    });
  };

  const updateExerciseList2 = (updatedEx) => {
    console.log(updatedEx);
    const newExList = [
      ...context.exerciseList.filter((ex) => ex.id !== updatedEx.id),
      updatedEx,
    ].sort((a, b) => a.id - b.id);

    setExerciseList(newExList);

    fetch("https://precision-gym-default-rtdb.firebaseio.com/exercises.json", {
      method: "PUT",
      body: JSON.stringify(newExList),
      headers: { "Content-Type": "application-json" },
    });
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
    if (exerciseData && modalWindow === false) {
      setCurrentExercise({ ...exerciseData });
      setModalWindow(true);
    }
    if (exerciseData && modalWindow === true) {
      setCurrentExercise(null);
      setModalWindow(false);
    }
    if (!exerciseData) {
      setCurrentExercise(null);
      setModalWindow(!modalWindow);
    }
  };

  const context = {
    exerciseList: exerciseList,
    modalWindowIsOpen: modalWindow,
    addExToDatabase: addExToDatabase,
    deleteExercise: deleteExercise,
    toggleModal: toggleModal,
    currentExercise: currentExercise,
    updateExercise: updateExercise,
    updateExerciseList2: updateExerciseList2,
  };

  React.useEffect(() => {
    // executes upon mount, gets stored in memory, therefore does not execute on further re-renders
    fetchExerciseDatabase();
  }, [fetchExerciseDatabase]);

  return (
    <AppContext.Provider value={context}>
      <App>{props.children}</App>
    </AppContext.Provider>
  );
}
