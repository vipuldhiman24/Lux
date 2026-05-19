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
      console.log("Login started");

      const result =
        await signInWithPopup(
          auth,
          provider
        );

      const user =
        result.user;

      console.log(
        "User logged in:",
        user?.email
      );

      if (!user?.email) {
        console.log(
          "No user email found"
        );
        return;
      }

      const alloy =
        await window.waitForAlloyReady();

      console.log(
        "Alloy is ready"
      );

      await alloy(
        "sendEvent",
        {
          xdm: {
            eventType:
              "user.login",

            identityMap: {
              "TEST-Vipul": [
                {
                  id:
                    user.email,
                  authenticatedState:
                    "authenticated",
                  primary: true,
                },
              ],
            },
          },

          data: {
            debugEvent:
              "google-login",
          },
        }
      );

      console.log(
        "Adobe identity sent successfully"
      );

    } catch (err) {
      console.error(
        "Login Error:",
        err
      );
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