import React from "react";
import AppContext from "./app-context";
import App from "../App";

export default function AppProvider(props) {
  const [routineList, setRoutineList] = React.useState([]);
  const [currentRoutine, setCurrentRoutine] = React.useState("");
  const [modalWindow, setModalWindow] = React.useState(false);
  const [authUser, setAuthUser] = React.useState(null);

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
      console.log("Stored Routine List:", newRoutineList);

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

  // firedby:  Routine -> Button (+ Add Exercise)
  const addExToDatabase = async function (newExInput) {
    await fetch(
      `https://precision-gym-default-rtdb.firebaseio.com/users/zluf/routines/${currentRoutine}/${
        newExInput.id - 1
      }.json`,
      {
        method: "PUT",
        body: JSON.stringify(newExInput),
        headers: { "Content-Type": "application-json" },
      }
    );

    let newRoutine = routineList.find((r) => (r[0] = currentRoutine));
    newRoutine[1].push(newExInput);
    setRoutineList((prevRoutineList) => {
      return [
        ...prevRoutineList.filter((r) => r[0] !== currentRoutine),
        newRoutine,
      ];
    });
  };

  const updateExerciseList2 = async (routineName, updatedEx) => {
    console.log("Exercise to Be Updated:", routineName, "->", updatedEx.name);
    // Updates local context
    const newRoutineList = context.routineList.filter((r) => r[1]);
    setRoutineList(newRoutineList);

    // Updates database
    await fetch(
      `https://precision-gym-default-rtdb.firebaseio.com/users/zluf/routines/${routineName}/${
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

  const addNewSession = async (routineName) => {
    console.log(`Add new session for ${routineName}`);
    const date = new Date();
    const month =
      date.getMonth() < 10 ? `0${date.getMonth()}` : date.getMonth();
    const todaysDate = `${date.getFullYear()}-${month}-${date.getDate()}`;
    console.log(todaysDate);

    await fetch(
      `https://precision-gym-default-rtdb.firebaseio.com/users/${authUser}/routines/${routineName}/logbook/${todaysDate}.json`,
      {
        method: "POST",
        body: JSON.stringify({ test: todaysDate }),
        headers: { "Content-Type": "application-json" },
      }
    );
  };

  // fired by ExerciseFormModal -> submitHandler()
  // fired by Routine -> button onClick (+ Add Exercise)
  const toggleModal = function (routineName) {
    setModalWindow(!modalWindow);
    setCurrentRoutine(routineName);
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

  // React.useEffect(() => {
  //   // executes upon mount, gets stored in memory, therefore does not execute on further re-renders
  //   // console.log(`Authed User: ${authUser}`);
  //   fetchExerciseDatabase();
  // }, [fetchExerciseDatabase]);

  return (
    <AppContext.Provider value={context}>
      <App>{props.children}</App>
    </AppContext.Provider>
  );
}
