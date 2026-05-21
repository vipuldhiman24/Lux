import { useState } from "react";

import { createPortal } from "react-dom";

import { signInWithPopup } from "firebase/auth";

import {
  auth,
  provider,
} from "../firebase/firebase";

import LoginButton from "./LoginButton";

export default function LoginModal({
  isOpen,
  onClose,
}) {

  const [loading, setLoading] =
    useState(false);

  if (!isOpen) return null;

  const login = async () => {

    try {

      setLoading(true);

      const result =
        await signInWithPopup(
          auth,
          provider
        );

      const user = result.user;

      if (!user?.email) return;

      const normalizedEmail =
        user.email
          .trim()
          .toLowerCase();

      window.adobeLoginEmail =
        normalizedEmail;

      setTimeout(() => {

        document.dispatchEvent(
          new CustomEvent(
            "google-login-success",
            {
              bubbles: true,
              detail: {
                email:
                  normalizedEmail,
                provider:
                  "google"
              }
            }
          )
        );

      }, 100);

      onClose?.();

    } catch (err) {

      console.error(err);

    } finally {

      setLoading(false);

    }
  };

  return createPortal(

    <div className="modal-overlay">

      <div className="login-modal">

        <button
          className="close-modal"
          onClick={onClose}
        >
          ✕
        </button>

        <p className="modal-tag">
          SECURE LOGIN
        </p>

        <h2>
          Welcome Back
        </h2>

        <p className="modal-text">
          Continue with Google to
          access your cart.
        </p>

        <LoginButton
          onClick={login}
          loading={loading}
        />

      </div>

    </div>,

    document.body
  );
}