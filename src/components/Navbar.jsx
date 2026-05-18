import LoginButton from "./LoginButton";

import {
  useNavigate,
} from "react-router-dom";

import {
  signOut,
} from "firebase/auth";

import {
  auth,
} from "../firebase/firebase";

import {
  useEffect,
  useState,
} from "react";

export default function Navbar() {

  const navigate = useNavigate();

  const [user, setUser] = useState(null);

  useEffect(() => {

    const unsubscribe =
      auth.onAuthStateChanged((currentUser) => {
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

          <>



            <button
              className="logout-btn"
              onClick={logout}
            >
              Logout
            </button>

          </>

        ) : (

          <LoginButton />

        )}

      </div>

    </nav>
  );
}