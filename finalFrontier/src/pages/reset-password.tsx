import { useState } from "react";
import { supabase } from "../lib/supabase";
import { useNavigate } from "react-router-dom";

function ResetPassword() {
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleReset = async () => {
    if (!password) {
      setMessage("Enter a new password.");
      return;
    }

    setLoading(true);

    const { error } = await supabase.auth.updateUser({
      password,
    });

    if (error) {
      setMessage(error.message);
    } else {
      setMessage("Password updated successfully.");
      navigate("/login");
    }

    setLoading(false);
  };

  return (
    <section className="login-page">
      <div className="login-card">
        <h1>Reset Password</h1>

        <input
          type="password"
          placeholder="New password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button onClick={handleReset} disabled={loading}>
          {loading ? "Updating..." : "Update Password"}
        </button>

        {message && <p className="auth-message">{message}</p>}
      </div>
    </section>
  );
}

export default ResetPassword;