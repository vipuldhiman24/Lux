import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../firebase/firebase";
import { FcGoogle } from "react-icons/fc";

export default function LoginButton({ onClose }) {
  const login = async () => {
    try {
      console.log("Login started");

      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      console.log("User logged in:", user?.email);

      if (!user?.email) {
        console.log("No user email found");
        return;
      }

      if (!window.alloy) {
        console.error("window.alloy is not available");
        return;
      }

      // If you really need a custom ready helper, keep it.
      // But first make sure it actually resolves.
      if (window.waitForAlloyReady) {
        await window.waitForAlloyReady();
      }

      console.log("Alloy is ready, sending login event");

      const response = await window.alloy("sendEvent", {
        renderDecisions: true,
        xdm: {
          eventType: "user.login",
          identityMap: {
            "TEST-Vipul": [
              {
                id: user.email,
                authenticatedState: "authenticated",
                primary: true,
              },
            ],
          },
        },
        data: {
          debugEvent: "google-login",
        },
      });

      console.log("Adobe identity sent successfully", response);

      onClose?.();
    } catch (err) {
      console.error("Login Error:", err);
    }
  };

  return (
    <button onClick={login} className="google-btn">
      <FcGoogle size={22} />
      <span>Continue with Google</span>
    </button>
  );
}
