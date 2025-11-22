import { useState, useCallback, useMemo, useRef } from "react";
import App from "../App";
import { Exercise, Routine, CurrentRoutine } from "../types";
import { AppDataContext, AppActionsContext } from "./app-context";
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

  // Use ref to access current routineList in callbacks without causing re-creation
  const routineListRef = useRef(routineList);
  routineListRef.current = routineList;

  const setUser = useCallback(
    (user: string | null): void => setAuthUser(user),
    []
  );

  const fetchExerciseDatabase = useCallback(async (): Promise<void> => {
    try {
      const data = await firebaseApi.fetchRoutine("routines.json");
      const newRoutineList: Routine[] = data ? Object.values(data) : [];
      setRoutineList(newRoutineList);
    } catch (err) {
      console.log(`💥 ${err}`);
    }
  }, [firebaseApi]);

  const updateDatabase = useCallback(
    async (
      routineName: string,
      updatedEx: Exercise | null,
      routineDate: string
    ): Promise<void> => {
      const currentList = routineListRef.current;
      const routineIndex = currentList.findIndex(
        (r) => r.routineName === routineName
      );

      const newRoutineList = currentList.map((routine, i) => {
        if (i !== routineIndex) return routine;
        if (!updatedEx) return routine;

        return {
          ...routine,
          logbook: {
            ...routine.logbook,
            [routineDate]: routine.logbook[routineDate].map((ex, j) =>
              j === updatedEx.id - 1 ? updatedEx : ex
            ),
          },
        };
      });

      setRoutineList(newRoutineList);

      const newRoutine = newRoutineList.find(
        (r) => r.routineName === routineName
      );

      await firebaseApi.updateRoutine(
        `routines/${routineName}/.json`,
        newRoutine
      );
    },
    [firebaseApi]
  );

  const deleteExercise = useCallback(
    async (
      routineName: string,
      exName: string,
      routineDate: string
    ): Promise<void> => {
      const currentList = routineListRef.current;
      const routineIndex = currentList.findIndex(
        (r) => r.routineName === routineName
      );

      const newRoutineList = currentList.map((routine, i) => {
        if (i !== routineIndex) return routine;

        const updatedDay = routine.logbook[routineDate]
          .filter((ex) => ex.name !== exName)
          .map((ex, idx) => ({ ...ex, id: idx + 1 }));

        return {
          ...routine,
          logbook: {
            ...routine.logbook,
            [routineDate]: updatedDay,
          },
        };
      });

      setRoutineList(newRoutineList);

      const newRoutine = newRoutineList.find(
        (r) => r.routineName === routineName
      );

      await firebaseApi.updateRoutine(
        `routines/${routineName}/.json`,
        newRoutine
      );
    },
    [firebaseApi]
  );

  const addNewDate = useCallback(
    async (routineName: string, todaysDateStr: string): Promise<void> => {
      const currentList = routineListRef.current;
      const allocatedRoutine = currentList.find(
        (r) => r.routineName === routineName
      );
      if (!allocatedRoutine) return;

      const routineLogs = Object.values(allocatedRoutine.logbook);
      const mostRecentDate = routineLogs[routineLogs.length - 1];
      const copiedExercises = mostRecentDate.map((ex) => ({
        id: ex.id,
        name: ex.name,
        sets: ex.sets.map((set) => ({
          weight: set.weight,
          reps: Array(set.reps.length).fill(0),
        })),
      }));

      const newRoutineList = currentList.map((routine) => {
        if (routine.routineName !== routineName) return routine;

        return {
          ...routine,
          logbook: {
            ...routine.logbook,
            [todaysDateStr]: copiedExercises,
          },
        };
      });

      setRoutineList(newRoutineList);

      await firebaseApi.updateRoutine(
        `routines/${routineName}/logbook/${todaysDateStr}.json`,
        copiedExercises
      );
    },
    [firebaseApi]
  );

  const addNewRoutine = useCallback(
    async (prevRoutineIndex: number, newRoutine: Routine) => {
      const currentList = routineListRef.current;
      const newRoutineList = [
        ...currentList.slice(0, prevRoutineIndex + 1),
        newRoutine,
        ...currentList.slice(prevRoutineIndex + 1),
      ].map((r, i) => ({ ...r, routineId: i + 1 }));

      setRoutineList(newRoutineList);

      await Promise.all(
        newRoutineList.map((r) =>
          firebaseApi.updateRoutine(`routines/${r.routineName}/.json`, r)
        )
      );
    },
    [firebaseApi]
  );

  const toggleModal = useCallback((routine?: CurrentRoutine) => {
    if (routine) setCurrentRoutine(routine);
    setModalWindow((prev) => !prev);
  }, []);

  const handleSetCurrentRoutine = useCallback((routine: CurrentRoutine) => {
    setCurrentRoutine(routine);
  }, []);

  // Data context value - changes when data changes
  const dataContext = useMemo(
    () => ({
      authUser,
      routineList,
      modalWindowIsOpen: modalWindow,
      currentRoutine,
    }),
    [authUser, routineList, modalWindow, currentRoutine]
  );

  // Actions context value - stable, never changes
  const actionsContext = useMemo(
    () => ({
      setUser,
      fetchExerciseDatabase,
      updateDatabase,
      deleteExercise,
      addNewDate,
      addNewRoutine,
      toggleModal,
      setCurrentRoutine: handleSetCurrentRoutine,
    }),
    [
      setUser,
      fetchExerciseDatabase,
      updateDatabase,
      deleteExercise,
      addNewDate,
      addNewRoutine,
      toggleModal,
      handleSetCurrentRoutine,
    ]
  );

  return (
    <AppActionsContext.Provider value={actionsContext}>
      <AppDataContext.Provider value={dataContext}>
        <App />
      </AppDataContext.Provider>
    </AppActionsContext.Provider>
  );
}
