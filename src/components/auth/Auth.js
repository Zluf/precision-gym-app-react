import React from "react";
import SignIn from "./SignIn";
import SignUp from "./SignUp";
import GuestSignIn from "./GuestSignIn";
import "./Auth.css";

export default function Auth() {
  return (
    <section className="auth">
      <SignUp />
      <SignIn />
      <GuestSignIn />
    </section>
  );
}
