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

function getViewName(pathname) {
  if (pathname === "/") return "home";
  if (pathname === "/cart") return "cart";
  if (pathname.startsWith("/product/")) return "products";
  return pathname;
}

export default function AdobeTracker() {
  const location = useLocation();

  const [authReady, setAuthReady] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setAuthReady(true);
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (!authReady) return;

    const pathname = location.pathname;
    const viewName = getViewName(pathname);

    const userEmail =
      currentUser?.email?.trim()?.toLowerCase() || null;

    window.appContext = window.appContext || {};
    window.appContext.adobe = {
      page: {
        pathname,
        viewName,
      },
      user: {
        isLoggedIn: !!userEmail,
        // optional for testing only:
        // email: userEmail
      },
    };

    console.log("window.appContext.adobe", window.appContext.adobe);

    if (window._satellite) {
      window._satellite.track("app-tracking-context-updated");
    }
  }, [authReady, currentUser, location.pathname]);

  return null;
}
