import {
  signInWithPopup,
} from "firebase/auth";

import {
  auth,
  provider,
} from "../firebase/firebase";

import { FcGoogle } from "react-icons/fc";

export default function LoginButton() {

  const login = async () => {

    try {

      await signInWithPopup(
        auth,
        provider
      );

    } catch (err) {

      console.log(err);

    }
  };

  return (

    <button
      onClick={login}
      className="google-btn"
    >

      <FcGoogle size={22} />

      <span>
        Continue with Google
      </span>

    </button>
  );
}