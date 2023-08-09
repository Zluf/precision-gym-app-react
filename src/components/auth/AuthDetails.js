import React, { useState, useEffect } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../../firebase";
import AppContext from "../../context/app-context";

export default function AuthDetails() {
  const context = React.useContext(AppContext);

  useEffect(() => {
    const listen = onAuthStateChanged(auth, (user) => {
      if (user) context.setUser(user.email.split("@")[0]);
      else context.setUser(null);
      // console.log("Auth user:", context.authUser);
    });

    return () => {
      listen();
    };
  }, []);

  const userSignOut = () => {
    signOut(auth)
      .then(() => console.log("Sign Out Successful 🔒"))
      .catch((error) => console.log(error));
  };

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
