import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";
import AppContext from "../../context/app-context";
import "./Auth.css";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const context = React.useContext(AppContext);

  const signIn = (event) => {
    event.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        context.setUser(
          userCredential.user.displayName
            ? userCredential.user.displayName
            : "zluf"
        );
      })
      .catch((error) => {
        setError(true);
        console.log("💥", error);
      });
  };

  return (
    <div className="signin-login-container">
      <form onSubmit={signIn}>
        <h2>Log In to Your Account</h2>
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onFocus={() => setError(false)}
          onChange={(event) => setEmail(event.target.value)}
        ></input>
        <input
          type="password"
          placeholder="Enter your password"
          value={password}
          onFocus={() => setError(false)}
          onChange={(event) => setPassword(event.target.value)}
        ></input>
        <button type="submit">Log In</button>
        {error && <p>Invalid credentials. Could not log in...</p>}
      </form>
    </div>
  );
}
