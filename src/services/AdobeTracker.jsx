import {
  useEffect,
  useState,
} from "react";

import {
  useLocation,
} from "react-router-dom";

import {
  auth,
} from "../firebase/firebase";

import {
  onAuthStateChanged,
} from "firebase/auth";

export default function AdobeTracker() {

  const location =
    useLocation();

  const [
    authReady,
    setAuthReady
  ] = useState(false);

  const [
    currentUser,
    setCurrentUser
  ] = useState(null);

  // wait for firebase auth restore
  useEffect(() => {

    const unsubscribe =
      onAuthStateChanged(
        auth,
        (user) => {

          setCurrentUser(user);

          setAuthReady(true);
        }
      );

    return () => unsubscribe();

  }, []);

  // track after auth ready
  useEffect(() => {

    if (!window.alloy) return;

    if (!authReady) return;

    let viewName =
      location.pathname;

    // normalize PDP
    if (
      location.pathname.startsWith(
        "/product/"
      )
    ) {

      viewName = "products";
    }

    // normalize cart
    if (
      location.pathname === "/cart"
    ) {

      viewName = "cart";
    }

    // normalize home
    if (
      location.pathname === "/"
    ) {

      viewName = "home";
    }

    const userEmail =
      currentUser?.email
        ?.trim()
        ?.toLowerCase();

    const payload = {

      renderDecisions: true,

      xdm: {

        web: {

          webPageDetails: {

            viewName
          }
        }
      },

      data: {

        __adobe: {

          target: {

            "profile.isLoggedIn":
              userEmail
                ? "true"
                : "false"
          }
        }
      }
    };

    // authenticated identity
    if (userEmail) {

      payload.xdm.identityMap = {

        GOOGLE_EMAIL: [

          {

            id: userEmail,

            authenticatedState:
              "authenticated",

            primary: false
          }
        ]
      };
    }

    console.log(
      "FINAL ADOBE PAYLOAD:",
      payload
    );

    window.alloy(
      "sendEvent",
      payload
    );

  }, [
    authReady,
    currentUser,
    location.pathname
  ]);

  return null;
}