import React from "react";
import firebase from "../firebase.js";

const auth = firebase.auth();

const provider = new firebase.auth.GoogleAuthProvider();

function SignedOut(props) {
  function clickHandler() {
    auth.signInWithPopup(provider);
  }

  return (
    <div className="toggleHide" hidden={!props.hide}>
      <section id="SignedOut">
        <div>Please sign in to continue.</div>
        <button id="signInBtn" onClick={clickHandler}>
          Sign in with Google
        </button>
      </section>
    </div>
  );
}

export default SignedOut;
