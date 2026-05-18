import {
  signInWithPopup,
} from "firebase/auth";

import {
  auth,
  provider,
} from "../firebase/firebase";

import { FcGoogle } from "react-icons/fc";

import { motion } from "framer-motion";

export default function LoginModal({

  isOpen,
  onClose,

}) {

  if (!isOpen) return null;

  const login = async () => {

    try {

      await signInWithPopup(
        auth,
        provider
      );

      onClose();

    } catch (err) {

      console.log(err);

    }
  };

  return (

    <div className="modal-overlay">

      <motion.div
        className="login-modal"
        initial={{
          opacity: 0,
          scale: 0.92,
          y: 20,
        }}
        animate={{
          opacity: 1,
          scale: 1,
          y: 0,
        }}
      >

        <button
          className="close-modal"
          onClick={onClose}
        >
          ✕
        </button>

        <p className="modal-tag">
          AUTH REQUIRED
        </p>

        <h2>
          Login To Continue
        </h2>

        <p className="modal-text">

          Sign in with Google to
          preserve your extremely
          important shopping decisions.

        </p>

        <button
          className="modal-google-btn"
          onClick={login}
        >

          <FcGoogle size={24} />

          <span>
            Continue with Google
          </span>

        </button>

      </motion.div>

    </div>
  );
}