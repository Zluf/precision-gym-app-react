import { useState, useCallback } from "react";
import App from "../App";
import { Exercise, AppContextType, Routine, CurrentRoutine } from "../types";
import AppContext from "./app-context";
import { useFirebaseApi } from "../hooks/useFirebaseApi";

export const todaysDate = (): string => {
  const date = new Date();
  const day = date.getDate() < 10 ? `0${date.getDate()}` : date.getDate();
  const month =
    date.getMonth() < 9 ? `0${date.getMonth() + 1}` : `${date.getMonth() + 1}`;
  return `${date.getFullYear()}-${month}-${day}`;
};

export default function AppProvider() {
  const [authUser, setAuthUser] = useState<string | null>(null);
  const [routineList, setRoutineList] = useState<Routine[]>([]);
  const [modalWindow, setModalWindow] = useState(false);
  const [currentRoutine, setCurrentRoutine] = useState<CurrentRoutine | null>(
    null
  );
  const firebaseApi = useFirebaseApi();

  const setUser = (user: string | null): void => setAuthUser(user);

  const fetchExerciseDatabase = useCallback(
    async (uid: string): Promise<void> => {
      try {
        const url = await firebaseApi.fetchRoutine(
          `https://precision-gym-default-rtdb.firebaseio.com/users/${uid}/routines.json`
        );
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error("Could not reach database...");
        }
        const data = await response.json();
        const newRoutineList: Routine[] = data ? Object.values(data) : [];

        setRoutineList(newRoutineList);
      } catch (err) {
        console.log(`💥 ${err}`);
      }
    },
    [firebaseApi, authUser]
  );

  const updateDatabase = async (
    routineName: string,
    updatedEx: Exercise | null,
    routineDate: string
  ): Promise<void> => {
    let newRoutineList = routineList.slice();

    const routineIndex = routineList.findIndex(
      (r) => r.routineName === routineName
    );

    if (updatedEx) {
      newRoutineList[routineIndex].logbook[routineDate][updatedEx.id - 1] =
        updatedEx;
      newRoutineList[routineIndex].logbook[routineDate].forEach(
        (ex, i) => (ex.id = i + 1)
      );
    }

    setRoutineList(newRoutineList);

    const newRoutine = newRoutineList.find(
      (r) => r.routineName === routineName
    );

    await firebaseApi.updateRoutine(
      `routines/${routineName}/.json`,
      newRoutine
    );
  };

  const deleteExercise = async (
    routineName: string,
    exName: string,
    routineDate: string
  ): Promise<void> => {
    const updatedDay = routineList
      .find((r) => r.routineName === routineName)
      ?.logbook[routineDate].filter((ex) => ex.name !== exName);

    const routineIndex = routineList.findIndex(
      (r) => r.routineName === routineName
    );

    const newRoutineList = routineList.slice();
    if (updatedDay) {
      newRoutineList[routineIndex].logbook[routineDate] = updatedDay;

      newRoutineList[routineIndex].logbook[routineDate].forEach(
        (ex, i) => (ex.id = i + 1)
      );
    }

    setRoutineList(newRoutineList);

    const newRoutine = newRoutineList.find(
      (r) => r.routineName === routineName
    );

    await firebaseApi.updateRoutine(
      `routines/${routineName}/.json`,
      newRoutine
    );
  };

  const addNewDate = async (
    routineName: string,
    todaysDate: string
  ): Promise<void> => {
    const allocatedRoutine = routineList.find(
      (r) => r.routineName === routineName
    );
    if (!allocatedRoutine) return;

    const routineLogs = Object.values(allocatedRoutine.logbook);
    const mostRecentDate = routineLogs[routineLogs.length - 1];
    const copiedExercises = mostRecentDate.map((ex) => {
      const newEx = { id: ex.id, name: ex.name, sets: ex.sets };
      const newSets = ex.sets.map((set) => {
        return {
          weight: set.weight,
          reps: Array(set.reps.length).fill(0),
        };
      });
      newEx.sets = newSets;
      return newEx;
    });

    allocatedRoutine.logbook[todaysDate] = copiedExercises;

    const newRoutineList = routineList.filter(
      (r) => r.routineName !== routineName
    );
    newRoutineList.push(allocatedRoutine);
    setRoutineList(newRoutineList);

    await firebaseApi.updateRoutine(
      `routines/${routineName}/.json`,
      copiedExercises
    );
  };

  const addNewRoutine = async (
    prevRoutineIndex: number,
    newRoutine: Routine
  ) => {
    const newRoutineList = [...routineList];
    newRoutineList.splice(prevRoutineIndex + 1, 0, newRoutine);
    newRoutineList.forEach((r, i) => (r.routineId = i + 1));
    setRoutineList(newRoutineList);

    // Update all routines with their new IDs
    await Promise.all(
      newRoutineList.map((r) =>
        firebaseApi.updateRoutine(`routines/${r.routineName}/.json`, r)
      )
    );
  };

  const toggleModal = (currentRoutine?: CurrentRoutine) => {
    currentRoutine && setCurrentRoutine(currentRoutine);
    setModalWindow((prevModalWindow) => {
      return !prevModalWindow;
    });
  };

  const context: AppContextType = {
    authUser,
    setUser,
    routineList,
    modalWindowIsOpen: modalWindow,
    toggleModal,
    deleteExercise,
    currentRoutine,
    setCurrentRoutine,
    updateDatabase,
    fetchExerciseDatabase,
    addNewDate,
    addNewRoutine,
  };

  return (
    <AppContext.Provider value={context}>
      <App />
    </AppContext.Provider>
  );
}
