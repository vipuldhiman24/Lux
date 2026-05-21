import { useEffect } from "react";

import { useLocation } from "react-router-dom";

export default function AdobeTracker() {

  const location = useLocation();

  useEffect(() => {

    if (!window.alloy) return;

    let viewName = location.pathname;

    // normalize product pages
    if (
      location.pathname.startsWith(
        "/product/"
      )
    ) {

      viewName = "/products";
    }

    // normalize cart
    if (
      location.pathname === "/cart"
    ) {

      viewName = "/cart";
    }

    // normalize home
    if (
      location.pathname === "/"
    ) {

      viewName = "/home";
    }

    window.alloy("sendEvent", {

      renderDecisions: true,

      xdm: {
        web: {
          webPageDetails: {
            viewName
          }
        }
      }
    });

    console.log(
      "Adobe SPA view tracked:",
      viewName
    );

  }, [location.pathname]);

  return null;
}