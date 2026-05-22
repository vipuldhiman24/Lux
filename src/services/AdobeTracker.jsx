import { useEffect } from "react";

import { useLocation } from "react-router-dom";

import { auth } from "../firebase/firebase";

export default function AdobeTracker() {

  const location = useLocation();

  useEffect(() => {

    if (!window.alloy) return;

    const user =
      auth.currentUser;

    const userEmail =
      user?.email
        ?.trim()
        .toLowerCase();

    let viewName =
      location.pathname;

    // normalize product pages
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

    setTimeout(() => {

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

      // authenticated identity
      if (userEmail) {

        payload.xdm.identityMap = {

          "TEST-Vipul": [

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
        "ADOBE PAYLOAD:",
        payload
      );

      window.alloy(
        "sendEvent",
        payload
      );

    }, 300);

  }, [location.pathname]);

  return null;
}