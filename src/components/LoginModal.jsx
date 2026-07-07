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

      const user =
        result.user;

      if (!user?.email) return;

      const email =
        user.email
          .trim()
          .toLowerCase();

      console.log(
        "LOGIN SUCCESS",
        email
      );

      window.adobeDataLayer =
        window.adobeDataLayer || [];

      // Update Adobe Client Data Layer state
      window.adobeDataLayer.push({

        user: {

          email,

          isLoggedIn: true

        }

      });

      // Fire login event
      window.adobeDataLayer.push({

        event: "userLogin"

      });

      console.log(
        "Adobe State:",
        window.adobeDataLayer.getState?.()
      );

      onClose?.();

      // Give Tags time to process the event,
      // then reload so Page Top runs again.
      setTimeout(() => {

        window.location.reload();

      }, 1000);

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