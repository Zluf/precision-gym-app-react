import React from "react";
import "./App.css";
import Logo from "./components/Logo/Logo";
import MainWindow from "./components/MainWindow";
import ExerciseFormModal from "./components/ExerciseFormModal";

function App() {
  const [modalWindow, setModalWindow] = React.useState(false);

  let exerciseStorage = JSON.parse(localStorage.getItem("workouts"));

  let fetchExerciseDatabase = async function () {
    try {
      const response = await fetch(
        "https://precision-gym-default-rtdb.firebaseio.com/exercises.json"
      );
      if (!response.ok) {
        throw new Error("Something went wrong!");
      }
      console.log(response);
    } catch (err) {
      console.log(err);
    }
  };

  const [exerciseList, setExerciseList] = React.useState(exerciseStorage);
  // const [exerciseList, setExerciseList] = React.useState(fetchExerciseDatabase);

  const toggleModal = function () {
    setModalWindow((prevModalWindow) => {
      return !prevModalWindow ? true : false;
    });
  };

  const addExToStorage = (newEx) => {
    exerciseList.push(newEx);
    localStorage.setItem("workouts", JSON.stringify(exerciseList));
  };

  const addExToDatabase = async function (newEx) {
    const response = await fetch(
      "https://precision-gym-default-rtdb.firebaseio.com/exercises.json",
      {
        method: "POST",
        body: JSON.stringify(newEx),
        headers: { "Content-Type": "application-json" },
      }
    );
  };

  const deleteExercise = (exName) => {
    setExerciseList((prevExerciseList) => {
      return prevExerciseList.filter((ex) => ex.name !== exName);
    });
  };

  React.useEffect(() => {
    localStorage.setItem("workouts", JSON.stringify(exerciseList));
    console.log(exerciseList);
    console.log(JSON.parse(localStorage.workouts));
  }, [deleteExercise]);

  return (
    <div className="app">
      <div className="linear-gradient-layer"></div>
      <Logo />
      <MainWindow
        exerciseList={exerciseList}
        onToggleModal={toggleModal}
        onDeleteExercise={deleteExercise}
      />
      {modalWindow && (
        <ExerciseFormModal
          onAddExToStorage={addExToDatabase}
          onToggleModal={toggleModal}
        />
      )}
    </div>
  );
}

export default App;
