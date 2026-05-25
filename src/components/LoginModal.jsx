import { useEffect } from "react";

import { useLocation } from "react-router-dom";

import { auth } from "../firebase/firebase";

import {
  onAuthStateChanged
} from "firebase/auth";

export default function AdobeTracker() {

  const location = useLocation();

  useEffect(() => {

    if (!window.alloy) return;

    const unsubscribe =
      onAuthStateChanged(
        auth,
        (user) => {

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

          // logged in identity
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
        }
      );

    return () => unsubscribe();

  }, [location.pathname]);

  return null;
}