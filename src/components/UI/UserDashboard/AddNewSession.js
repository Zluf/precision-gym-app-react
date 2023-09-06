import React, { useRef, useState } from "react";
import AppContext from "../../../context/app-context";
import "./AddNewSession.css";

export default function AddNewSession(props) {
  const context = React.useContext(AppContext);
  const [addingNewSession, setAddingNewSession] = useState(false);
  const newSessionInputRef = useRef();

  const addNewSessionHandler = (event) => {
    event.preventDefault();
    const inputValue = newSessionInputRef.current.value;
    console.log(inputValue);
  };

  return (
    <div>
      {!addingNewSession && (
        <button
          onClick={() => {
            setAddingNewSession(true);
          }}
        >
          + Add a new session
        </button>
      )}

      {addingNewSession && (
        <form onSubmit={addNewSessionHandler} className="new-session-form">
          <input placeholder="Enter session name" ref={newSessionInputRef} />
          <button type="submit" className="btn-transparent">
            ➕
          </button>
        </form>
      )}
    </div>
  );
}
