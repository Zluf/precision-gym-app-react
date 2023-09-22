import React, { useState } from "react";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../../firebase";
import "./Auth.css";
import AppContext from "../../context/app-context";

export default function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userName, setUserName] = useState("");
  const context = React.useContext(AppContext);

  const signUp = (event) => {
    event.preventDefault();
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        updateProfile(auth.currentUser, {
          displayName: userName,
        });
        context.setUser(userName);
      })
      .catch((error) => console.log(error));
  };

  return (
    <div className="signin-login-container">
      <form onSubmit={signUp}>
        <h2>Create Account</h2>
        <input
          type="name"
          placeholder="Enter your name"
          value={userName}
          required
          onChange={(event) => setUserName(event.target.value)}
        ></input>
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          required
          onChange={(event) => setEmail(event.target.value)}
        ></input>
        <input
          type="password"
          placeholder="Enter new password"
          value={password}
          required
          onChange={(event) => setPassword(event.target.value)}
        ></input>
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
}
