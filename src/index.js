import ReactDOM from "react-dom";

import "./index.css";
import AppProvider from "./context/AppProvider";

console.warn = () => {};

ReactDOM.render(<AppProvider />, document.getElementById("root"));
