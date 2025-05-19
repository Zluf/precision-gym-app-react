import React, { useEffect, useState, useCallback, createContext } from "react";
import App from "../App";
import {
  Exercise,
  AppContextType,
  Routine,
  AppProviderProps,
} from "../../types";

export const AppContext = createContext<AppContextType>({
  authUser: "",
  setUser: () => {},
  routineList: [],
  modalWindowIsOpen: false,
  deleteExercise: async () => {},
  toggleModal: () => {},
  currentRoutine: null,
  updateDatabase: async () => {},
  fetchExerciseDatabase: async () => {},
  addNewDate: async () => {},
  addNewRoutine: async () => {},
});

export const todaysDate = (): string => {
  const date = new Date();
  const day = date.getDate() < 10 ? `0${date.getDate()}` : date.getDate();
  const month =
    date.getMonth() < 9 ? `0${date.getMonth() + 1}` : `${date.getMonth() + 1}`;
  return `${date.getFullYear()}-${month}-${day}`;
};

export default function AppProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [authUser, setAuthUser] = useState<string | null>(null);
  const [routineList, setRoutineList] = useState<Routine[]>([]);
  const [modalWindow, setModalWindow] = useState<boolean>(false);
  const [currentRoutine, setCurrentRoutine] = useState<Routine>({
    routineName: "",
    logbook: {},
  });

  const setUser = (user: string | null): void => setAuthUser(user);

  const fetchExerciseDatabase = useCallback(async (): Promise<void> => {
    try {
      const response = await fetch(
        `https://precision-gym-default-rtdb.firebaseio.com/users/${authUser}/routines.json`
      );
      if (!response.ok) {
        throw new Error("Could not reach database...");
      }
      const data = await response.json();
      const newRoutineList = data ? Object.values(data) : [];

      setRoutineList(newRoutineList);
    } catch (err) {
      console.log(`💥 ${err}`);
    }
  }, [authUser]);

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
    await fetch(
      `https://precision-gym-default-rtdb.firebaseio.com/users/${authUser}/routines/${routineName}/.json`,
      {
        method: "PUT",
        body: JSON.stringify(newRoutine),
        headers: { "Content-Type": "application-json" },
      }
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
    await fetch(
      `https://precision-gym-default-rtdb.firebaseio.com/users/${authUser}/routines/${routineName}/.json`,
      {
        method: "PUT",
        body: JSON.stringify(newRoutine),
        headers: { "Content-Type": "application-json" },
      }
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
    await fetch(
      `https://precision-gym-default-rtdb.firebaseio.com/users/${authUser}/routines/${routineName}/logbook/${todaysDate}.json`,
      {
        method: "PUT",
        body: JSON.stringify(copiedExercises),
        headers: { "Content-Type": "application-json" },
      }
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

    newRoutineList.forEach((r) =>
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

  const toggleModal = (routineDetails: Routine): void => {
    setModalWindow(!modalWindow);
    setCurrentRoutine(routineDetails);
  };

  const context: AppContextType = {
    authUser,
    setUser,
    routineList,
    modalWindowIsOpen: modalWindow,
    deleteExercise,
    toggleModal,
    currentRoutine,
    updateDatabase,
    fetchExerciseDatabase,
    addNewDate,
    addNewRoutine,
  };

  useEffect(() => {
    console.log("Stored Routine List:", routineList);
  }, [routineList, currentRoutine]);

  return (
    <AppContext.Provider value={context}>
      <App>{children}</App>
    </AppContext.Provider>
  );
}
