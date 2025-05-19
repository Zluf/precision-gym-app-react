import React, { useEffect } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../../firebase";
import { AppContext } from "../../context/AppProvider";

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

  // Signs out guest on the next page load
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

  console.log("AUTH DETAILS, CONTEXT", context);

  return (
    <div className="auth-details">
      {context.authUser && (
        <>
          <p>{`Signed in as ${context.authUser}`}</p>
          <button onClick={userSignOut}>Sign Out</button>
        </>
      )}
    </div>
  );
}
