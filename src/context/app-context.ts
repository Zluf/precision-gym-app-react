import { createContext } from "react";
import { AppDataContextType, AppActionsContextType } from "../types";

// Data context - subscribing components re-render when data changes
export const AppDataContext = createContext<AppDataContextType>({
  authUser: null,
  routineList: [],
  modalWindowIsOpen: false,
  currentRoutine: null,
});

// Actions context - stable functions, won't cause re-renders
export const AppActionsContext = createContext<AppActionsContextType>({
  setUser: () => {},
  deleteExercise: async () => {},
  setCurrentRoutine: () => {},
  toggleModal: () => {},
  updateDatabase: async () => {},
  fetchExerciseDatabase: async () => {},
  addNewDate: async () => {},
  addNewRoutine: async () => {},
});
