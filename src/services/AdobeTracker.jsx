import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function AdobeTracker() {
  const location = useLocation();

  useEffect(() => {

    if (!window.alloy) return;

    window.alloy("sendEvent", {
      renderDecisions: true,

      xdm: {
        web: {
          webPageDetails: {
            viewName: location.pathname
          }
        }
      }
    });

    console.log("Adobe SPA view tracked:", location.pathname);

  }, [location.pathname]);

  return null;
}