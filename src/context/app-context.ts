import { createContext } from "react";
import { AppContextType } from "../types";

const AppContext = createContext<AppContextType>({
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
  testBool: false,
  setTestBool: () => {},
});

export default AppContext;
