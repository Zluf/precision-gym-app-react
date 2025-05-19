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
  toggleModal: (routineDetails: Routine) => void;
  currentRoutine: Routine | null;
  updateDatabase: (
    routineName: string,
    updatedEx: Exercise | null,
    routineDate: string
  ) => Promise<void>;
  fetchExerciseDatabase: () => Promise<void>;
  addNewDate: (routineName: string, todaysDate: string) => Promise<void>;
  addNewRoutine: (
    prevRoutineIndex: number,
    newRoutine: Routine
  ) => Promise<void>;
}

export interface AppProviderProps {
  children: React.ReactNode;
}
