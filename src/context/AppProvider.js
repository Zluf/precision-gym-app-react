import React from "react";
import AppContext from "./app-context";
import App from "../App";

export default function AppProvider(props) {
  const [routineList, setRoutineList] = React.useState({});
  const [exerciseList, setExerciseList] = React.useState([]);
  const [currentExercise, setCurrentExercise] = React.useState(null);
  const [modalWindow, setModalWindow] = React.useState(false);

  const fetchExerciseDatabase = React.useCallback(async () => {
    try {
      const response = await fetch(
        "https://precision-gym-default-rtdb.firebaseio.com/routines.json"
        // "https://precision-gym-default-rtdb.firebaseio.com/exercises.json"
      );
      if (!response.ok) {
        throw new Error("Could not reach database...");
      }
      const data = await response.json();
      console.log(data);
      // const arr = data ? Object.values(data) : [];
      const newRoutineList = data ? data : {};
      console.log(Object.values(newRoutineList));

      setRoutineList(newRoutineList);
      // setExerciseList(arr);
    } catch (err) {
      console.log(err);
    }
  }, []);

  // !! Find a way to add routine as 1 level before exList
  // Saves automatically as unnamed routine
  const addRoutineToDatabase = async function (newExInput) {
    const newRoutine = [
      {
        id: context.routineList.length + 1,
        current: true,
        exercises: [...newExInput],
      },
    ];

    await fetch(
      "https://precision-gym-default-rtdb.firebaseio.com/routines/new-routine.json",
      {
        method: "POST",
        body: JSON.stringify(newRoutine),
        headers: { "Content-Type": "application-json" },
      }
    );
    setRoutineList((prevRoutineList) => {
      return [...prevRoutineList, newRoutine];
    });
    console.log(newRoutine);
  };

  const addExToDatabase = async function (newExInput) {
    const newRoutineName = "New Routine";

    const newEx = {
      id: context.routineList[newRoutineName]
        ? context.routineList[newRoutineName].length + 1
        : 1,
      ...newExInput,
    };

    await fetch(
      `https://precision-gym-default-rtdb.firebaseio.com/routines/${newRoutineName}.json`,
      // `https://precision-gym-default-rtdb.firebaseio.com/exercises.json`,
      {
        method: "POST",
        // body: JSON.stringify({ name: newRoutineName, exercises: [newEx] }),
        body: JSON.stringify(newEx),
        headers: { "Content-Type": "application-json" },
      }
    );
    // setRoutineList((prevRoutineList) => {
    //   return [
    //     ...prevRoutineList,
    //     prevRoutineList
    //       .find((r) => (r.name = newRoutineName))
    //       .exercises.push(newEx),
    //   ];
    // });
    setRoutineList((prevRoutineList) => {
      console.log(prevRoutineList);
      let updatedRoutineList = prevRoutineList;
      updatedRoutineList[newRoutineName] = [];
      updatedRoutineList[newRoutineName].push(newEx);
      return Object.values(updatedRoutineList);
    });
  };

  const updateExercise = async (newExerciseData) => {
    const updatedEx = { id: context.currentExercise.id, ...newExerciseData };
    const newExList = [
      ...context.exerciseList.filter(
        (ex) => ex.id !== context.currentExercise.id
      ),
      updatedEx,
    ].sort((a, b) => a.name - b.name);

    setExerciseList(newExList);
    setCurrentExercise(null);

    await fetch(
      "https://precision-gym-default-rtdb.firebaseio.com/exercises.json",
      {
        method: "PUT",
        body: JSON.stringify(newExList),
        headers: { "Content-Type": "application-json" },
      }
    );
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
    console.log(exName);
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
      setCurrentExercise(exerciseData);
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
    routineList: routineList,
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
    // console.log(routineList);
    fetchExerciseDatabase();
  }, [fetchExerciseDatabase]);

  return (
    <AppContext.Provider value={context}>
      <App>{props.children}</App>
    </AppContext.Provider>
  );
}
