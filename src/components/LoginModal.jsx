import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../firebase/firebase";

export default function LoginModal({ onClose }) {
  console.log("LoginModal rendered");

  const login = async () => {
    alert("login() started");
    console.log("login() started");

    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      console.log("Google login completed successfully");
      console.log("Firebase user email:", user?.email);

      onClose?.();
    } catch (err) {
      console.error("Login Error:", err);
    }
  };

  return (
    <div style={{ padding: "20px", background: "white", zIndex: 9999 }}>
      <button
        type="button"
        onClick={login}
        style={{
          padding: "12px 18px",
          background: "black",
          color: "white",
          border: "none",
          borderRadius: "8px",
          cursor: "pointer",
        }}
      >
        Continue with Google
      </button>
    </div>
  );
}
