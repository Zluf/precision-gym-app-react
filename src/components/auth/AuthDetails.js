import React, { useState, useEffect } from "react";
import { onAuthStateChanged, signOut, updateProfile } from "firebase/auth";
import { auth } from "../../firebase";
import AppContext from "../../context/app-context";

export default function AuthDetails() {
  const context = React.useContext(AppContext);

  const userSignOut = () => {
    signOut(auth)
      .then(() => {
        fetch(
          `https://precision-gym-default-rtdb.firebaseio.com/users/guest.json`,
          {
            method: "DELETE",
          }
        );

        console.log("Sign Out Successful 🔒");
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    window.addEventListener("beforeunload", () => {
      if (auth.currentUser && auth.currentUser.displayName === "guest") {
        userSignOut(auth);
      }
    });

    onAuthStateChanged(auth, (user) => {
      if (user) {
        context.setUser(
          user.displayName ? user.displayName : user.email.split("@")[0]
        );
      } else context.setUser(null);
    });
  }, []);

  return (
    <div className="auth-details">
      {context.authUser ? (
        <>
          <p>{`Signed in as ${context.authUser}`}</p>
          <button onClick={userSignOut}>Sign Out</button>
        </>
      ) : (
        <p>Signed Out</p>
      )}
    </div>
  );
}
