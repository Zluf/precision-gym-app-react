import { useEffect, useContext } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../../firebase";
import { AppDataContext, AppActionsContext } from "../../context/app-context";

export default function AuthDetails() {
  const { authUser } = useContext(AppDataContext);
  const { setUser } = useContext(AppActionsContext);

  const userSignOut = async () => {
    const isGuest =
      auth.currentUser && auth.currentUser.displayName === "guest";

    try {
      // Get auth token before signing out
      const token = isGuest ? await auth.currentUser?.getIdToken() : null;

      await signOut(auth);

      // Only delete guest data if user was a guest
      if (isGuest && token) {
        await fetch(
          `https://precision-gym-default-rtdb.firebaseio.com/users/guest.json?auth=${token}`,
          {
            method: "DELETE",
          }
        );
      }

      console.log("Sign Out Successful 🔒");
    } catch (error) {
      console.log(error);
    }
  };

  // Signs out guest on the next page load
  useEffect(() => {
    window.addEventListener("beforeunload", () => {
      if (auth.currentUser && auth.currentUser.displayName === "guest") {
        userSignOut();
      }
    });

    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(
          user.displayName
            ? user.displayName
            : user.email?.split("@")[0] ?? "User"
        );
      } else setUser(null);
    });
  }, [setUser]);

  return (
    <div className="auth-details">
      {authUser && (
        <>
          <p>{`Signed in as ${authUser}`}</p>
          <button onClick={userSignOut}>Sign Out</button>
        </>
      )}
    </div>
  );
}
