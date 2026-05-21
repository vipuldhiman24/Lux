import { FcGoogle } from "react-icons/fc";

export default function LoginButton({ onClick, loading = false }) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={loading}
      className="google-btn"
      style={{
        display: "flex",
        alignItems: "center",
        gap: "10px",
        padding: "12px 18px",
        background: "white",
        color: "black",
        border: "1px solid #ddd",
        borderRadius: "8px",
        cursor: loading ? "not-allowed" : "pointer",
        fontSize: "16px",
        fontWeight: 500,
      }}
    >
      <FcGoogle size={22} />
      <span>{loading ? "Signing in..." : "Continue with Google"}</span>
    </button>
  );
}
