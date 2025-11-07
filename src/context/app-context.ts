import { createContext } from "react";
import { AppContextType } from "../types";

const AppContext = createContext<AppContextType>({
  authUser: "",
  setUser: () => {},
  routineList: [],
  modalWindowIsOpen: false,
  deleteExercise: async () => {},
  currentRoutine: null,
  setCurrentRoutine: () => {},
  toggleModal: () => {},
  updateDatabase: async () => {},
  fetchExerciseDatabase: async () => {},
  addNewDate: async () => {},
  addNewRoutine: async () => {},
});

export default AppContext;
