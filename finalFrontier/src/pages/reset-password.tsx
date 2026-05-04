import { useState } from "react";
import { supabase } from "../lib/supabase";
import { useNavigate } from "react-router-dom";

function ResetPassword() {
  const navigate = useNavigate();
  const hashParams = new URLSearchParams(window.location.hash.substring(1));
  const resetError = hashParams.get("error_code");


  const [mfaCode, setMfaCode] = useState("");
  const [mfaVerified, setMfaVerified] = useState(false);

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  if (resetError) {
  return (
    <section className="login-page">
      <div className="login-card">
        <h1>Reset Link Invalid</h1>
        <p className="auth-message">
          This password reset link is expired or already used. Please request a new one.
        </p>
      </div>
    </section>
  );
}

  const verifyMFA = async () => {
    if (!mfaCode) {
      setMessage("Enter your 6-digit MFA code.");
      return;
    }

    setLoading(true);

    const { data: factors, error: factorError } =
      await supabase.auth.mfa.listFactors();

    if (factorError) {
      setMessage(factorError.message);
      setLoading(false);
      return;
    }

    const factorId = factors?.totp?.[0]?.id;

    if (!factorId) {
      setMessage("No MFA factor found for this account.");
      setLoading(false);
      return;
    }

    const { data: challenge, error: challengeError } =
      await supabase.auth.mfa.challenge({ factorId });

    if (challengeError || !challenge) {
      setMessage(challengeError?.message || "Failed to create MFA challenge.");
      setLoading(false);
      return;
    }

    const { error: verifyError } = await supabase.auth.mfa.verify({
      factorId,
      challengeId: challenge.id,
      code: mfaCode,
    });

    if (verifyError) {
      setMessage(verifyError.message);
    } else {
      setMessage("MFA verified. Enter your new password.");
      setMfaVerified(true);
    }

    setLoading(false);
  };

  const handleReset = async () => {
    if (!password || !confirmPassword) {
      setMessage("Enter and confirm your new password.");
      return;
    }

    if (password !== confirmPassword) {
      setMessage("Passwords do not match.");
      return;
    }

    if (password.length < 8) {
      setMessage("Password must be at least 8 characters.");
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
      await supabase.auth.signOut();
      navigate("/login");
    }

    setLoading(false);
  };

  return (
    <section className="login-page">
      <div className="login-card">
        <h1>Reset Password</h1>

        {!mfaVerified ? (
          <>
            <p>Enter your MFA code before resetting your password.</p>

            <input
              type="text"
              placeholder="6-digit MFA code"
              value={mfaCode}
              onChange={(e) => setMfaCode(e.target.value)}
            />

            <button onClick={verifyMFA} disabled={loading}>
              {loading ? "Verifying..." : "Verify MFA"}
            </button>
          </>
        ) : (
          <>
            <input
              type="password"
              placeholder="New password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <input
              type="password"
              placeholder="Retype new password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />

            <button onClick={handleReset} disabled={loading}>
              {loading ? "Updating..." : "Update Password"}
            </button>
          </>
        )}

        {message && <p className="auth-message">{message}</p>}
      </div>
    </section>
  );
}

export default ResetPassword;