import { useState, useCallback, useMemo, useRef } from "react";
import App from "../App";
import { Exercise, Routine, CurrentRoutine, UpdateMutation } from "../types";
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

  const fetchExerciseDatabase = useCallback(async (): Promise<void> => {
    try {
      const data = await firebaseApi.fetchRoutine("routines.json");
      const newRoutineList: Routine[] = data ? Object.values(data) : [];
      setRoutineList(newRoutineList);
    } catch (err) {
      console.log(`💥 ${err}`);
    }
  }, [firebaseApi]);

  const addNewExercise = useCallback(
    async (
      routineName: string,
      exercise: Exercise,
      routineDate: string
    ): Promise<void> => {
      const currentList = routineListRef.current;
      const newRoutineList = currentList.map((r) => {
        if (r.routineName !== routineName) return r;
        return {
          ...r,
          logbook: {
            ...r.logbook,
            [routineDate]: [...r.logbook[routineDate], exercise],
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
      return;
    },
    []
  );

  const updateExercise = useCallback(
    async (
      routineName: string,
      exerciseId: number,
      mutation: UpdateMutation,
      routineDate: string
    ): Promise<void> => {
      const currentList = routineListRef.current;
      const routine = currentList.find((r) => r.routineName === routineName);
      if (!routine) return;

      // For updating existing exercises
      const currentEx = routine.logbook[routineDate][exerciseId - 1];
      if (!currentEx) return;

      let updatedEx: Exercise = { ...currentEx };

      // Apply mutation based on type
      switch (mutation.type) {
        case "updateRepValues":
          updatedEx = {
            ...updatedEx,
            sets: updatedEx.sets.map((set, i) =>
              i === mutation.setIndex ? { ...set, reps: mutation.newReps } : set
            ),
          };
          break;

        case "updateSetWeight":
          updatedEx = {
            ...updatedEx,
            sets: updatedEx.sets.map((set, i) =>
              i === mutation.setIndex
                ? { ...set, weight: mutation.newWeight }
                : set
            ),
          };
          break;

        case "updateExerciseName":
          updatedEx = {
            ...updatedEx,
            name: mutation.newName,
          };
          break;

        case "addOrDeleteRep":
          const currentReps = updatedEx.sets[mutation.setIndex].reps;
          const newReps =
            mutation.action === "delete"
              ? currentReps.filter((_, i) => i !== mutation.repIndex)
              : [
                  ...currentReps.slice(0, mutation.repIndex + 1),
                  0,
                  ...currentReps.slice(mutation.repIndex + 1),
                ];
          updatedEx = {
            ...updatedEx,
            sets: updatedEx.sets.map((set, i) =>
              i === mutation.setIndex ? { ...set, reps: newReps } : set
            ),
          };
          break;

        case "addOrDeleteSet":
          const currentSets = updatedEx.sets;
          const newSets =
            mutation.action === "delete"
              ? currentSets.filter((_, i) => i !== mutation.setIndex)
              : [
                  ...currentSets.slice(0, mutation.setIndex + 1),
                  {
                    weight: currentSets[mutation.setIndex].weight,
                    reps: Array(
                      currentSets[mutation.setIndex].reps.length
                    ).fill(0),
                  },
                  ...currentSets.slice(mutation.setIndex + 1),
                ];
          updatedEx = {
            ...updatedEx,
            sets: newSets,
          };
          break;
      }

      // Update routine list with the modified exercise
      const newRoutineList = currentList.map((r) => {
        if (r.routineName !== routineName) return r;

        return {
          ...r,
          logbook: {
            ...r.logbook,
            [routineDate]: r.logbook[routineDate].map((ex, i) =>
              i === exerciseId - 1 ? updatedEx : ex
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
      setUser: setAuthUser,
      fetchExerciseDatabase,
      updateExercise,
      addNewExercise,
      deleteExercise,
      addNewDate,
      addNewRoutine,
      toggleModal,
    }),
    [
      setAuthUser,
      fetchExerciseDatabase,
      updateExercise,
      addNewExercise,
      deleteExercise,
      addNewDate,
      addNewRoutine,
      toggleModal,
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
