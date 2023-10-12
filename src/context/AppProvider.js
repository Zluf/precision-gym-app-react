import React, { useEffect } from "react";
import AppContext from "./app-context";
import App from "../App";

export const todaysDate = () => {
  const date = new Date();
  const day = date.getDate() < 10 ? `0${date.getDate()}` : date.getDate();
  const month =
    date.getMonth() < 9 ? `0${date.getMonth() + 1}` : `${date.getMonth() + 1}`;
  return `${date.getFullYear()}-${month}-${day}`;
};

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
      const newRoutineList = data ? Object.values(data) : [];

      setRoutineList(newRoutineList);
    } catch (err) {
      console.log(`💥 ${err}`);
    }
  }, [authUser]);

  const updateDatabase = async (routineName, updatedEx, routineDate) => {
    console.log(routineName, updatedEx, routineDate);
    let newRoutineList = context.routineList.slice();

    const routineIndex = context.routineList.findIndex(
      (r) => r.routineName === routineName
    );

    if (updatedEx) {
      // Updates local context
      newRoutineList[routineIndex].logbook[routineDate][updatedEx.id - 1] =
        updatedEx;

      // Assigns new IDs to the updated exercise list
      newRoutineList[routineIndex].logbook[routineDate].forEach(
        (ex, i) => (ex.id = i + 1)
      );
    }

    setRoutineList(newRoutineList);

    // Updates targeted routine in database
    const newRoutine = newRoutineList.find(
      (r) => r.routineName === routineName
    );
    await fetch(
      `https://precision-gym-default-rtdb.firebaseio.com/users/${authUser}/routines/${routineName}/.json`,
      {
        method: "PUT",
        body: JSON.stringify(newRoutine),
        headers: { "Content-Type": "application-json" },
      }
    );
  };

  const deleteExercise = async (routineName, exName, routineDate) => {
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

    // Updates targeted routine in database
    const newRoutine = newRoutineList.find(
      (r) => r.routineName === routineName
    );
    await fetch(
      `https://precision-gym-default-rtdb.firebaseio.com/users/${authUser}/routines/${routineName}/.json`,
      {
        method: "PUT",
        body: JSON.stringify(newRoutine),
        headers: { "Content-Type": "application-json" },
      }
    );
  };

  const addNewDate = async (routineName, todaysDate) => {
    // 1. Get exercise list from th most recent date
    const allocatedRoutine = routineList.find(
      (r) => r.routineName === routineName
    );
    const routineLogs = Object.values(allocatedRoutine.logbook);
    const mostRecentDate = routineLogs[routineLogs.length - 1];
    const copiedExercises = mostRecentDate.map((ex) => {
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

    // 2. Copy the ex.list from the most recent date to the new date
    allocatedRoutine.logbook[todaysDate] = copiedExercises;

    // 3. Update state and database
    const newRoutineList = routineList.filter(
      (r) => r.routineName !== routineName
    );

    newRoutineList.push(allocatedRoutine);

    setRoutineList(newRoutineList);

    await fetch(
      `https://precision-gym-default-rtdb.firebaseio.com/users/${authUser}/routines/${routineName}/logbook/${todaysDate}.json`,
      {
        method: "PUT",
        body: JSON.stringify(copiedExercises),
        headers: { "Content-Type": "application-json" },
      }
    );
  };

  const addNewRoutine = (prevRoutineIndex, newRoutine) => {
    const newRoutineList = [...routineList];
    newRoutineList.splice(prevRoutineIndex + 1, 0, newRoutine);
    newRoutineList.forEach((r, i) => (r.routineId = i + 1));
    setRoutineList(newRoutineList);

    newRoutineList.forEach((r, i) =>
      fetch(
        `https://precision-gym-default-rtdb.firebaseio.com/users/${authUser}/routines/${r.routineName}.json`,
        {
          method: "PUT",
          body: JSON.stringify(r),
          headers: { "Content-Type": "application-json" },
        }
      )
    );
  };

  const toggleModal = function (routineDetails) {
    // fired by ExerciseFormModal -> submitHandler()
    // fired by Routine -> button onClick (+ Add Exercise)
    console.log(routineDetails);
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
    updateDatabase: updateDatabase,
    fetchExerciseDatabase: fetchExerciseDatabase,
    addNewDate: addNewDate,
    addNewRoutine: addNewRoutine,
  };

  useEffect(() => {
    console.log("Stored Routine List:", routineList);
    // console.log("Currently edited routine is:", currentRoutine);
  }, [routineList, currentRoutine]);

  return (
    <AppContext.Provider value={context}>
      <App>{props.children}</App>
    </AppContext.Provider>
  );
}
