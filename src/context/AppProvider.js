import React, { useEffect } from "react";
import AppContext from "./app-context";
import App from "../App";

export default function AppProvider(props) {
  const [authUser, setAuthUser] = React.useState(null);
  const [routineList, setRoutineList] = React.useState([]);
  const [modalWindow, setModalWindow] = React.useState(false);
  const [currentRoutine, setCurrentRoutine] = React.useState({
    name: "",
    date: "",
    exercises: [],
  });

  const setUser = (user) => setAuthUser(user);

  const fetchExerciseDatabase = React.useCallback(async () => {
    try {
      const response = await fetch(
        `https://precision-gym-default-rtdb.firebaseio.com/users/${authUser}/routines.json`
      );
      if (!response.ok) {
        // for some reason response is always ok
        throw new Error("Could not reach database...");
      }
      const data = await response.json();
      const newRoutineList = data ? Object.entries(data) : [];

      setRoutineList(newRoutineList);
    } catch (err) {
      console.log(`💥 ${err}`);
    }
  }, [authUser]);

  // !! To find a way to save automatically as unnamed routine
  const addRoutineToDatabase = async function (newExInput) {
    // const newRoutine = [
    //   {
    //     id: routineList.length + 1,
    //     exercises: [...newExInput],
    //   },
    // ];
    // await fetch(
    //   "https://precision-gym-default-rtdb.firebaseio.com/routines/new-routine.json",
    //   {
    //     method: "POST",
    //     body: JSON.stringify(newRoutine),
    //     headers: { "Content-Type": "application-json" },
    //   }
    // );
    // setRoutineList((prevRoutineList) => {
    //   return [...prevRoutineList, newRoutine];
    // });
    // console.log(newRoutine);
  };

  const addExToDatabase = async function (newExInput) {
    // fired by:  Routine -> Button (+ Add Exercise)
    console.log(newExInput);
    const newInputId =
      currentRoutine.exercises.length > 0 ? currentRoutine.exercises.length : 0;
    console.log(newInputId);
    // await fetch(
    //   `https://precision-gym-default-rtdb.firebaseio.com/users/${authUser}/routines/logbook/${currentRoutine.name}/logbook/${currentRoutine.date}/${
    //     newExInput.id - 1
    //   }.json`,
    //   {
    //     method: "PUT",
    //     body: JSON.stringify(newExInput),
    //     headers: { "Content-Type": "application-json" },
    //   }
    // );

    // let newRoutine = routineList.find((r) => (r[0] = currentRoutine));
    // newRoutine[1].push(newExInput);
    // setRoutineList((prevRoutineList) => {
    //   return [
    //     ...prevRoutineList.filter((r) => r[0] !== currentRoutine),
    //     newRoutine,
    //   ];
    // });
  };

  const updateExerciseList2 = async (routineName, updatedEx, displayedDate) => {
    console.log("Updated Exercise:", updatedEx);
    console.log("Displayed Date:", displayedDate);
    console.log("Exercise to Be Updated:", routineName, "->", updatedEx.name);
    // Updates local context
    const newRoutineList = context.routineList.filter((r) => r[1]);
    setRoutineList(newRoutineList);

    // Updates database
    await fetch(
      `https://precision-gym-default-rtdb.firebaseio.com/users/zluf/routines/${routineName}/logbook/${displayedDate}/${
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

  const addNewSession = (routineName, todaysDate) => {
    const allocatedRoutine = routineList.find((r) => r[0] == routineName);
    const routineLogs = Object.values(allocatedRoutine[1].logbook);
    const mostRecentDate = routineLogs[routineLogs.length - 1];
    const newDate = mostRecentDate.map((ex) => {
      const newEx = { id: ex.id, name: ex.name, sets: ex.sets };
      const newSets = [];
      for (let i = 0; i < ex.sets.length; i++) {
        newSets.push({
          weight: ex.sets[i].weight,
          reps: Array(5)
            .fill(0)
            .map((arr) => arr * ex.sets[i].reps.length),
        });
      }
      newEx.sets = newSets;
      return newEx;
    });
    allocatedRoutine[1].logbook[todaysDate] = newDate;
    console.log(allocatedRoutine);

    const newRoutineList = routineList.filter((r) => r[0] !== routineName);
    newRoutineList.push(allocatedRoutine);
    setRoutineList(newRoutineList);
  };

  const toggleModal = function (routineDetails) {
    // fired by ExerciseFormModal -> submitHandler()
    // fired by Routine -> button onClick (+ Add Exercise)

    setModalWindow(!modalWindow);
    setCurrentRoutine(routineDetails);
  };

  const context = {
    authUser: authUser,
    setUser: setUser,
    routineList: routineList,
    modalWindowIsOpen: modalWindow,
    addExToDatabase: addExToDatabase,
    deleteExercise: deleteExercise,
    toggleModal: toggleModal,
    currentRoutine: currentRoutine,
    updateExerciseList2: updateExerciseList2,
    fetchExerciseDatabase: fetchExerciseDatabase,
    addNewSession: addNewSession,
  };

  // useEffect(() => {
  //   console.log("Stored Routine List:", routineList);
  //   console.log("Currently edited routine is:", currentRoutine);
  // }, [routineList, currentRoutine]);

  return (
    <AppContext.Provider value={context}>
      <App>{props.children}</App>
    </AppContext.Provider>
  );
}
