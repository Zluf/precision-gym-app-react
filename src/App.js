import React from "react";
import "./App.css";
import Logo from "./components/Logo/Logo";
import MainWindow from "./components/MainWindow";
import ExerciseFormModal from "./components/ExerciseFormModal";
import AppContext from "./store/app-context";

function App() {
  const context = React.useContext(AppContext);

  return (
    <div className="app">
      <div className="linear-gradient-layer"></div>
      <Logo />
      <MainWindow
        onToggleModal={context.toggleModal}
        exerciseList={context.exerciseList}
        onDeleteExercise={context.deleteExercise}
        onEditExercise={context.editExercise}
      />
      {context.modalWindowIsOpen && (
        <ExerciseFormModal
          onAddEx={context.addExToDatabase}
          onToggleModal={context.toggleModal}
        />
      )}
    </div>
  );
}

export default App;
