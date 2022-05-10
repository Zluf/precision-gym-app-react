import React from "react";
import "./App.css";
import Logo from "./components/Logo/Logo";
import MainWindow from "./components/MainWindow";
import ExerciseFormModal from "./components/ExerciseFormModal";

function App() {
  const [modalWindow, setModalWindow] = React.useState(false);

  let exerciseStorage = JSON.parse(localStorage.getItem("workouts"));
  const [exerciseList, setExerciseList] = React.useState(exerciseStorage);

  const toggleModal = function () {
    setModalWindow((prevModalWindow) => {
      return !prevModalWindow ? true : false;
    });
  };

  const addEx = (newEx) => {
    exerciseList.push(newEx);
    localStorage.setItem("workouts", JSON.stringify(exerciseList));
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
        <ExerciseFormModal onAddEx={addEx} onToggleModal={toggleModal} />
      )}
    </div>
  );
}

export default App;
