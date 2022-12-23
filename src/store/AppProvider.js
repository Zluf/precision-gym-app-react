import React from "react";
import AppContext from "./app-context";
import App from "../App";

export default function AppProvider(props) {
  const [modalWindow, setModalWindow] = React.useState(false);
  const [exerciseList, setExerciseList] = React.useState([]);

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

  const toggleModal = function () {
    setModalWindow((prevModalWindow) => {
      return !prevModalWindow ? true : false;
    });
  };

  const editExercise = () => {
    toggleModal();
    console.log("Opens Modal Window with passed Data");
    console.log(exerciseList);
  };

  React.useEffect(() => {
    fetchExerciseDatabase(); // executes upon mount, gets stored in memory, therefore does not execute on further re-renders
  }, [fetchExerciseDatabase]);

  const context = {
    exerciseList: exerciseList,
    modalWindow: modalWindow,
    addExToDatabase: addExToDatabase,
    deleteExercise: deleteExercise,
    toggleModal: toggleModal,
    editExercise: editExercise,
  };
  return (
    <AppContext.Provider value={context}>
      <App>{props.children}</App>
    </AppContext.Provider>
  );
}
