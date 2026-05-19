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

      if (
        window.alloy &&
        user?.email
      ) {

        await window.alloy(
          "sendEvent",
          {
            xdm: {
              eventType:
                "user.login",

              identityMap: {
                "TEST-Vipul": [
                  {
                    id: user.email,
                    authenticatedState:
                      "authenticated",
                    primary: true,
                  },
                ],
              },
            },
          }
        );
      }

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