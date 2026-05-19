import {
  Routes,
  Route,
} from "react-router-dom";

import {
  useEffect,
} from "react";

import {
  onAuthStateChanged,
} from "firebase/auth";

import {
  auth,
} from "./firebase/firebase";

import Home from "./pages/Home";
import ProductDetails from "./pages/ProductDetails";
import CartPage from "./pages/CartPage";

export default function App() {

  useEffect(() => {

    const unsubscribe =
      onAuthStateChanged(
        auth,
        async (user) => {

          console.log(
            "Firebase auth state changed:",
            user?.email
          );

          if (!user?.email) {
            return;
          }

          try {

            // Wait until Adobe Web SDK is fully ready
            const alloy =
              await window.waitForAlloyReady();

            console.log(
              "Alloy is ready"
            );

            await alloy(
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

                data: {
                  debugEvent:
                    "google-login",
                },
              }
            );

            console.log(
              "Adobe identity sent successfully"
            );

          } catch (error) {

            console.error(
              "Adobe identity stitching failed:",
              error
            );
          }
        }
      );

    return () =>
      unsubscribe();

  }, []);

  return (
    <Routes>
      <Route
        path="/"
        element={<Home />}
      />

      <Route
        path="/product/:id"
        element={<ProductDetails />}
      />

      <Route
        path="/cart"
        element={<CartPage />}
      />
    </Routes>
  );
}