const login = async () => {
  try {
    console.log("Login component triggered");

    await signInWithPopup(
      auth,
      provider
    );

    console.log(
      "Google login completed successfully"
    );

    onClose();

  } catch (err) {
    console.error(
      "Login Error:",
      err
    );
  }
};