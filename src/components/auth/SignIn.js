import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";
import AppContext from "../../context/app-context";
import "./Auth.css";
import "../UI/Card.css";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const context = React.useContext(AppContext);

  const signIn = (event) => {
    event.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // console.log(userCredential.user.email);
        context.setUser(userCredential.user.email.split("@")[0]);
      })
      .catch((error) => console.log(error));
  };

  return (
    <div className="auth-container">
      <form onSubmit={signIn}>
        <h2>Log In to Your Account</h2>
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
        <button type="submit">Log In</button>
      </form>
    </div>
  );
}
