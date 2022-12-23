import React from "react";
import "./App.css";
import Logo from "./components/Logo/Logo";
import MainWindow from "./components/MainWindow";
import ExerciseFormModal from "./components/ExerciseFormModal";
import AppContext from "./store/app-context";

function App() {
  const context = React.useContext(AppContext);
  console.log(context);

  // const [modalWindow, setModalWindow] = React.useState(false);
  // const [exerciseList, setExerciseList] = React.useState([]);

  // const fetchExerciseDatabase = React.useCallback(async () => {
  //   try {
  //     const response = await fetch(
  //       "https://precision-gym-default-rtdb.firebaseio.com/exercises.json"
  //     );
  //     if (!response.ok) {
  //       throw new Error("Something went wrong!");
  //     }
  //     const data = await response.json();
  //     const arr = data ? Object.values(data) : [];
  //     setExerciseList(arr);
  //   } catch (err) {
  //     console.log(err);
  //   }
  // }, []);

  // const toggleModal = function () {
  //   setModalWindow((prevModalWindow) => {
  //     return !prevModalWindow ? true : false;
  //   });
  // };

  // const addExToDatabase = async function (newEx) {
  //   // console.log(newEx);
  //   await fetch(
  //     "https://precision-gym-default-rtdb.firebaseio.com/exercises.json",
  //     {
  //       method: "POST",
  //       body: JSON.stringify(newEx),
  //       headers: { "Content-Type": "application-json" },
  //     }
  //   );
  //   setExerciseList((prevExerciseList) => {
  //     return [...prevExerciseList, newEx];
  //   });
  // };

  // const deleteExercise = (exName) => {
  //   const updatedExerciseList = exerciseList.filter((ex) => ex.name !== exName);
  //   setExerciseList(updatedExerciseList);
  //   fetch("https://precision-gym-default-rtdb.firebaseio.com/exercises.json", {
  //     method: "PUT",
  //     body: JSON.stringify(updatedExerciseList),
  //     headers: { "Content-Type": "application-json" },
  //   });
  // };

  // const editExercise = () => {
  //   toggleModal();
  //   console.log("Opens Modal Window with passed Data");
  // };

  // React.useEffect(() => {
  //   // localStorage.setItem("workouts", JSON.stringify(exerciseList));
  //   // console.log(JSON.parse(localStorage.workouts));
  //   fetchExerciseDatabase(); // executes upon mount, gets stored in memory, therefore does not executes on further re-renders
  // }, [fetchExerciseDatabase]);

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
      {context.modalWindow && (
        <ExerciseFormModal
          onAddEx={context.addExToDatabase}
          onToggleModal={context.toggleModal}
        />
      )}
    </div>
  );
}

export default App;
