import React, { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";
import "./Auth.css";
import "../UI/Card.css";
import AppContext from "../../context/app-context";

export default function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const context = React.useContext(AppContext);

  const signUp = (event) => {
    event.preventDefault();
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => console.log(userCredential))
      .catch((error) => console.log(error));
  };

  return (
    <div className="auth-container">
      <form onSubmit={signUp}>
        <h2>Create Account</h2>
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        ></input>
        <input
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        ></input>
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
}
