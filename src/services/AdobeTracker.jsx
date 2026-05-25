import { useEffect } from "react";

import { useLocation } from "react-router-dom";

import { auth } from "../firebase/firebase";

export default function AdobeTracker() {

  const location =
    useLocation();

  useEffect(() => {

    if (!window.alloy) return;

    const user =
      auth.currentUser;

    let viewName =
      location.pathname;

    if (
      location.pathname.startsWith(
        "/product/"
      )
    ) {

      viewName = "products";
    }

    if (
      location.pathname === "/cart"
    ) {

      viewName = "cart";
    }

    if (
      location.pathname === "/"
    ) {

      viewName = "home";
    }

    const userEmail =
      user?.email
        ?.trim()
        .toLowerCase();

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

        isLoggedIn:
          !!userEmail
      }
    };

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

    setTimeout(() => {

      window.alloy(
        "sendEvent",
        payload
      );

    }, 300);

  }, [location.pathname]);

  return null;
}