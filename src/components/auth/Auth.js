import React from "react";
import SignIn from "./SignIn";
import SignUp from "./SignUp";

export default function Auth() {
  return (
    <section>
      <SignUp />
      <SignIn />
    </section>
  );
}
