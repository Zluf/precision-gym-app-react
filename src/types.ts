export interface Exercise {
  id: number;
  name: string;
  sets: {
    weight: number;
    reps: number[];
  }[];
}

export interface Routine {
  routineName: string;
  logbook: {
    [date: string]: Exercise[];
  };
  routineId?: number;
}

export interface CurrentRoutine {
  routineDate: string;
  routineName: string;
  exercises: Exercise[];
}

export interface AppContextType {
  authUser: string | null;
  setUser: (user: string | null) => void;
  routineList: Routine[];
  modalWindowIsOpen: boolean;
  deleteExercise: (
    routineName: string,
    exName: string,
    routineDate: string
  ) => Promise<void>;
  toggleModal: (currentRoutine?: CurrentRoutine) => void;
  currentRoutine: CurrentRoutine | null;
  setCurrentRoutine: (currentRoutine: CurrentRoutine) => void;
  updateDatabase: (
    routineName: string,
    updatedEx: Exercise | null,
    routineDate: string
  ) => Promise<void>;
  fetchExerciseDatabase: (uid: string) => Promise<void>;
  addNewDate: (routineName: string, todaysDate: string) => Promise<void>;
  addNewRoutine: (
    prevRoutineIndex: number,
    newRoutine: Routine
  ) => Promise<void>;
}
