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
      const newRoutineList = data
        ? Object.values(data).sort((a, b) => a.routineId - b.routineId)
        : [];

      setRoutineList(newRoutineList);
    } catch (err) {
      console.log(`💥 ${err}`);
    }
  }, [authUser]);

  const updateExerciseList2 = async (routineName, updatedEx, routineDate) => {
    const routineIndex = context.routineList.findIndex(
      (r) => r.routineName === routineName
    );

    // Updates local context
    const newRoutineList = context.routineList.slice();
    newRoutineList[routineIndex].logbook[routineDate][updatedEx.id - 1] =
      updatedEx;

    // Assigns new IDs to the updated exercise list
    newRoutineList[routineIndex].logbook[routineDate].forEach(
      (ex, i) => (ex.id = i + 1)
    );

    setRoutineList(newRoutineList);

    // Updates database
    await fetch(
      `https://precision-gym-default-rtdb.firebaseio.com/users/${authUser}/routines.json`,
      {
        method: "PUT",
        body: JSON.stringify(newRoutineList),
        headers: { "Content-Type": "application-json" },
      }
    );
  };

  const deleteExercise = (routineName, exName, routineDate) => {
    const updatedDay = routineList
      .find((r) => r.routineName === routineName)
      .logbook[routineDate].filter((ex) => ex.name !== exName);

    const routineIndex = routineList.findIndex(
      (r) => r.routineName === routineName
    );

    const newRoutineList = routineList.slice();
    newRoutineList[routineIndex].logbook[routineDate] = updatedDay;

    // Assigns new IDs to the updated exercise list
    newRoutineList[routineIndex].logbook[routineDate].forEach(
      (ex, i) => (ex.id = i + 1)
    );

    setRoutineList(newRoutineList);

    fetch(
      `https://precision-gym-default-rtdb.firebaseio.com/users/${authUser}/routines.json`,
      {
        method: "PUT",
        body: JSON.stringify(newRoutineList),
        headers: { "Content-Type": "application-json" },
      }
    );
  };

  const addNewSession = async (routineName, todaysDate) => {
    const allocatedRoutine = routineList.find(
      (r) => r.routineName == routineName
    );
    const routineLogs = Object.values(allocatedRoutine.logbook);
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
    allocatedRoutine.logbook[todaysDate] = newDate;

    const newRoutineList = routineList.filter((r) => r[0] !== routineName);
    newRoutineList.push(allocatedRoutine);
    setRoutineList(newRoutineList);

    // Updates database
    await fetch(
      `https://precision-gym-default-rtdb.firebaseio.com/users/${authUser}/routines/${routineName}/logbook/${todaysDate}.json`,
      {
        method: "PUT",
        body: JSON.stringify(newDate),
        headers: { "Content-Type": "application-json" },
      }
    );
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
    deleteExercise: deleteExercise,
    toggleModal: toggleModal,
    currentRoutine: currentRoutine,
    updateExerciseList2: updateExerciseList2,
    fetchExerciseDatabase: fetchExerciseDatabase,
    addNewSession: addNewSession,
  };

  useEffect(() => {
    // console.log("Stored Routine List:", routineList);
    // console.log("Currently edited routine is:", currentRoutine);
  }, [routineList, currentRoutine]);

  return (
    <AppContext.Provider value={context}>
      <App>{props.children}</App>
    </AppContext.Provider>
  );
}
