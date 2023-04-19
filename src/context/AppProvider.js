import React from "react";
import AppContext from "./app-context";
import App from "../App";

export default function AppProvider(props) {
  const [routineList, setRoutineList] = React.useState([]);
  const [exerciseList, setExerciseList] = React.useState([]);
  const [currentExercise, setCurrentExercise] = React.useState(null);
  const [modalWindow, setModalWindow] = React.useState(false);

  const fetchExerciseDatabase = React.useCallback(async () => {
    try {
      const response = await fetch(
        "https://precision-gym-default-rtdb.firebaseio.com/routines.json"
      );
      if (!response.ok) {
        throw new Error("Could not reach database...");
      }
      const data = await response.json();
      console.log("Fetched Routines as Objects:", data);
      const newRoutineList = data ? Object.entries(data) : [];
      console.log("Stored Routine List:", newRoutineList);

      setRoutineList(newRoutineList);
    } catch (err) {
      console.log(err);
    }
  }, []);

  // !! To find a way to save automatically as unnamed routine
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
    // const newEx = {
    //   id: context.routineList[currentExercise[0]]
    //     ? context.routineList[currentExercise[0]].length + 1
    //     : 1,
    //   ...newExInput,
    // };
    // await fetch(
    //   `https://precision-gym-default-rtdb.firebaseio.com/routines/${newRoutineName}.json`,
    //   {
    //     method: "POST",
    //     // body: JSON.stringify({ name: newRoutineName, exercises: [newEx] }),
    //     body: JSON.stringify(newEx),
    //     headers: { "Content-Type": "application-json" },
    //   }
    // );
    // setRoutineList((prevRoutineList) => {
    //   return [
    //     ...prevRoutineList,
    //     prevRoutineList
    //       .find((r) => (r.name = newRoutineName))
    //       .exercises.push(newEx),
    //   ];
    // });
    // setRoutineList((prevRoutineList) => {
    //   console.log(prevRoutineList);
    //   let updatedRoutineList = prevRoutineList;
    //   updatedRoutineList[newRoutineName] = [];
    //   updatedRoutineList[newRoutineName].push(newEx);
    //   return Object.values(updatedRoutineList);
    // });
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

  const updateExerciseList2 = async (routineName, updatedEx) => {
    console.log("Exercise to Be Updated:", routineName, "->", updatedEx.name);
    // Updates local context
    const newRoutineList = context.routineList.filter((r) => r[1]);
    setExerciseList(newRoutineList);

    // Updates database
    await fetch(
      `https://precision-gym-default-rtdb.firebaseio.com/routines/${routineName}/${
        updatedEx.id - 1
      }.json`,
      {
        method: "PUT",
        body: JSON.stringify(updatedEx),
        headers: { "Content-Type": "application-json" },
      }
    );
  };

  const deleteExercise = (routineName, exName) => {
    // Updates local context
    const newRoutine = [
      routineName,
      context.routineList
        .find((r) => r[0] === routineName)[1]
        .filter((ex) => ex.name !== exName),
    ];

    console.log("New Routine:", newRoutine);

    let newRoutineList = [
      ...context.routineList.filter((r) => r[0] !== routineName),
      newRoutine,
    ];

    setRoutineList((prevRoutineList) => {
      console.log("New Routine List:", newRoutineList);
      return newRoutineList;
    });

    // Updates database
    fetch(
      `https://precision-gym-default-rtdb.firebaseio.com/routines/${routineName}.json`,
      {
        method: "PUT",
        body: JSON.stringify(newRoutine[1]),
        headers: { "Content-Type": "application-json" },
      }
    );
  };

  // fired by ExerciseFormModal -> submitHandler()
  // fired by Routine -> button onClick (+ Add Exercise)
  const toggleModal = function (routineName, exerciseData) {
    // // when exercise gets edited
    // if (exerciseData && modalWindow === false) {
    //   setCurrentExercise([routineName, exerciseData]);
    //   setModalWindow(true);
    // }

    // // when new exercise gets added
    // if (exerciseData && modalWindow === true) {
    //   setCurrentExercise(null);
    //   setModalWindow(false);
    // }

    // when Modal Window gets opened or closed
    if (!exerciseData) {
      setCurrentExercise([routineName, null]);
      setModalWindow(!modalWindow);
      // console.log(`Current Exercise Info:`, currentExercise);
    }
  };

  const context = {
    routineList: routineList,
    modalWindowIsOpen: modalWindow,
    addExToDatabase: addExToDatabase,
    deleteExercise: deleteExercise,
    toggleModal: toggleModal,
    currentExercise: currentExercise,
    updateExercise: updateExercise,
    updateExerciseList2: updateExerciseList2,
    fetchExerciseDatabase: fetchExerciseDatabase,
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
