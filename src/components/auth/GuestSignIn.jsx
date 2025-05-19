import React from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";
import AppContext from "../../context/AppProvider";
import "./Auth.css";

export default function SignIn() {
  const context = React.useContext(AppContext);

  const signInAsGuest = (event) => {
    event.preventDefault();

    signInWithEmailAndPassword(auth, "guest@no-email.com", "no-password")
      .then((userCredential) => {
        context.setUser("guest");
      })
      .catch((error) => console.log(error));
  };

  return (
    <div className="signin-login-container">
      <h2 className="guest-login" onClick={signInAsGuest}>
        Log In as a Guest
      </h2>
    </div>
  );
}
