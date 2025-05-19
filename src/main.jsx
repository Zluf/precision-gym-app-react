import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import { createRoot } from "react-dom/client";
import AppProvider from "./context/AppProvider";

const root = createRoot(document.getElementById("root"));
root.render(<AppProvider />);
