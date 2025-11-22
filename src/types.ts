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

// Data that changes frequently - causes re-renders
export interface AppDataContextType {
  authUser: string | null;
  routineList: Routine[];
  modalWindowIsOpen: boolean;
  currentRoutine: CurrentRoutine | null;
}

// Stable action functions - won't cause re-renders
export interface AppActionsContextType {
  setUser: (user: string | null) => void;
  deleteExercise: (
    routineName: string,
    exName: string,
    routineDate: string
  ) => Promise<void>;
  toggleModal: (currentRoutine?: CurrentRoutine) => void;
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

// Combined type for backwards compatibility during migration
export interface AppContextType extends AppDataContextType, AppActionsContextType {}
