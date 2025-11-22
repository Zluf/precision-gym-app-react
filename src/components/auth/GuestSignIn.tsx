import React, { useContext } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";
import { AppActionsContext } from "../../context/app-context";
import "./Auth.css";

export default function GuestSignIn() {
  const { setUser } = useContext(AppActionsContext);

  const signInAsGuest = (event: React.MouseEvent<HTMLHeadingElement>) => {
    event.preventDefault();

    signInWithEmailAndPassword(auth, "guest@no-email.com", "no-password")
      .then(() => {
        setUser("guest");
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
