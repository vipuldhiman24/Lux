import LoginButton from "./LoginButton";
import LoginModal from "./LoginModal";
import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../firebase/firebase";
import { useEffect, useState } from "react";
import AdobeTracker from "../services/AdobeTracker";

export default function Navbar() {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, []);

  const logout = async () => {
    try {
      await signOut(auth);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
    <AdobeTracker />
      <nav className="navbar">
        <div
          className="logo"
          onClick={() => navigate("/")}
        >
          Random-ahh Shop
        </div>

        <div className="nav-right">
          <button
            className="nav-btn"
            onClick={() => navigate("/cart")}
          >
            Cart
          </button>

          {user ? (
            <button
              className="logout-btn"
              onClick={logout}
            >
              Logout
            </button>
          ) : (
            <LoginButton
              onClick={() => setShowModal(true)}
            />
          )}
        </div>
      </nav>

      <LoginModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
      />
    </>
  );
}
