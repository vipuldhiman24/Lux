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

      console.log(
        "window.alloy:",
        window.alloy
      );

      if (user?.email) {

        if (window.alloy) {

          console.log(
            "Before sendEvent"
          );

          try {

            await window.alloy(
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
              }
            );

            console.log(
              "After sendEvent"
            );

          } catch (adobeError) {

            console.error(
              "Adobe Web SDK Error:",
              adobeError
            );
          }

        } else {

          console.log(
            "window.alloy is not available"
          );
        }
      }

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