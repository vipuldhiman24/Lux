import {
  useEffect,
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

function getViewName(pathname) {

  if (pathname === "/") {

    return "home";

  }

  if (pathname === "/cart") {

    return "cart";

  }

  if (
    pathname.startsWith("/product/")
  ) {

    return "products";

  }

  return pathname;

}

export default function AdobeTracker() {

  const location =
    useLocation();

  // Keep Adobe Client Data Layer
  // in sync with Firebase
  useEffect(() => {

    const unsubscribe =
      onAuthStateChanged(
        auth,
        (user) => {

          window.adobeDataLayer =
            window.adobeDataLayer || [];

          if (user?.email) {

            window.adobeDataLayer.push({

              user: {

                email:
                  user.email
                    .trim()
                    .toLowerCase(),

                isLoggedIn: true

              }

            });

          } else {

            window.adobeDataLayer.push({

              user: {

                email: "",

                isLoggedIn: false

              }

            });

          }

          console.log(
            "Adobe State:",
            window.adobeDataLayer.getState?.()
          );

        }
      );

    return () =>
      unsubscribe();

  }, []);

  // Push page state on every route change
  useEffect(() => {

    const pathname =
      location.pathname;

    const viewName =
      getViewName(pathname);

    window.adobeDataLayer =
      window.adobeDataLayer || [];

    window.adobeDataLayer.push({

      page: {

        pathname,

        viewName

      }

    });

    window.adobeDataLayer.push({

      event: "viewChange"

    });

    console.log(
      "Adobe Page:",
      window.adobeDataLayer.getState?.()
    );

  }, [location.pathname]);

  return null;

}