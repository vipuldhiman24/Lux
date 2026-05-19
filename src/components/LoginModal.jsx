const login = async () => {
  try {
    const result = await signInWithPopup(
      auth,
      provider
    );

    const user = result.user;

    if (window.alloy && user?.email) {
      await window.alloy("sendEvent", {
        xdm: {
          eventType: "user.login",
          identityMap: {
            "TEST-Vipul": [
              {
                id: user.email,
                authenticatedState: "authenticated",
                primary: true
              }
            ]
          }
        }
      });
    }

    onClose();

  } catch (err) {
    console.log(err);
  }
};