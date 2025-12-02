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

// Exercise update mutation types (discriminated union)
export type UpdateMutation =
  | { type: "updateRepValues"; setIndex: number; newReps: number[] }
  | {
      type: "addOrDeleteRep";
      setIndex: number;
      repIndex: number;
      action: "add" | "delete";
    }
  | { type: "addOrDeleteSet"; setIndex: number; action: "add" | "delete" }
  | { type: "updateSetWeight"; setIndex: number; newWeight: number }
  | { type: "updateExerciseName"; newName: string };

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
  addNewExercise: (
    routineName: string,
    exercise: Exercise,
    routineDate: string
  ) => {};
  updateExercise: (
    routineName: string,
    exerciseId: number,
    mutation: UpdateMutation,
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
export interface AppContextType
  extends AppDataContextType,
    AppActionsContextType {}
