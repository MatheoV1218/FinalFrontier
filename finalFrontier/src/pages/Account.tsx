import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import type { User } from "@supabase/supabase-js";
import "../styles/account.css";

function Account({ user }: { user: User | null }) {
  const [qr, setQr] = useState<string | null>(null);
  const [factorId, setFactorId] = useState<string | null>(null);
  const [code, setCode] = useState("");
  const [message, setMessage] = useState("");
  const [mfaEnabled, setMfaEnabled] = useState(false);
  const getDeviceInfo = () => {
    const ua = navigator.userAgent;

    let browser = "Unknown Browser";
    let os = "Unknown OS";

    // Browser detection
    if (ua.includes("Edg")) browser = "Microsoft Edge";
    else if (ua.includes("Chrome")) browser = "Chrome";
    else if (ua.includes("Firefox")) browser = "Firefox";
    else if (ua.includes("Safari")) browser = "Safari";

    // OS detection
    if (ua.includes("Windows")) os = "Windows";
    else if (ua.includes("Mac")) os = "MacOS";
    else if (ua.includes("Linux")) os = "Linux";
    else if (ua.includes("Android")) os = "Android";
    else if (ua.includes("iPhone")) os = "iPhone";

    return `${browser} on ${os}`;
  };

  // 🔐 FETCH MFA STATUS
  useEffect(() => {
    const fetchMFA = async () => {
      if (!user) return;

      const { data } = await supabase.auth.mfa.listFactors();
      setMfaEnabled(!!(data?.totp && data.totp.length > 0));
    };

    fetchMFA();
  }, [user]);

  if (!user) return <h1 className="center">Please login first</h1>;

  // 🔐 ENABLE MFA
  const enableMFA = async () => {
    const { data, error } = await supabase.auth.mfa.enroll({
      factorType: "totp",
    });

    if (error) {
      setMessage(error.message);
      return;
    }

    setQr(data.totp.qr_code);
    setFactorId(data.id);
  };

  // 🔐 VERIFY MFA
  const verifyMFA = async () => {
    if (!factorId) return;

    const { data: challengeData, error: challengeError } =
      await supabase.auth.mfa.challenge({
        factorId,
      });

    // ✅ HANDLE ERROR
    if (challengeError || !challengeData) {
      setMessage(challengeError?.message || "Failed to create challenge");
      return;
    }

    // ✅ SAFE TO USE challengeData.id NOW
    const { error } = await supabase.auth.mfa.verify({
      factorId,
      challengeId: challengeData.id,
      code,
    });

    if (error) {
      setMessage(error.message);
    } else {
      setMessage("2FA Enabled!");
      setQr(null);
      setCode("");
      setMfaEnabled(true);
    }
  };

  const securityLevel = mfaEnabled ? "High 🔒" : "Medium";

  return (
    <section className="account-page">
      <div className="account-card">
        <h1>Account Dashboard</h1>

        {/* 🔐 SECURITY OVERVIEW */}
        <div className="security-overview">
          <h2>Security Overview</h2>

          <p>
            <strong>Security Level:</strong>{" "}
            <span className={mfaEnabled ? "security-high" : "security-medium"}>
              {securityLevel}
            </span>
          </p>

          <p>
            <strong>2FA:</strong>{" "}
            {mfaEnabled ? (
              <span className="mfa-enabled">Enabled</span>
            ) : (
              <span className="mfa-disabled">Not Enabled</span>
            )}
          </p>

          {!mfaEnabled && (
            <button className="mfa-btn" onClick={enableMFA}>
              Enable 2FA
            </button>
          )}
        </div>

        {/* 🔲 QR SETUP */}
        {qr && (
          <div className="mfa-setup">
            <p>Scan with Google, Microsoft, or Authy</p>

            <img src={qr} alt="QR Code" />

            <input
              placeholder="Enter 6-digit code"
              value={code}
              onChange={(e) => setCode(e.target.value)}
            />

            <button onClick={verifyMFA}>Verify</button>
          </div>
        )}

        {/* 👤 ACCOUNT INFO */}
        <div className="account-section">
          <h2>Account Info</h2>

          <p>
            <strong>Username:</strong> {user.user_metadata?.username || "N/A"}
          </p>
          <p>
            <strong>Email:</strong> {user.email}
          </p>
          <p>
            <strong>User ID:</strong> {user.id}
          </p>
          <p>
            <strong>Created:</strong>{" "}
            {new Date(user.created_at).toLocaleString()}
          </p>
          <p>
            <strong>Last Login:</strong>{" "}
            {user.last_sign_in_at
              ? new Date(user.last_sign_in_at).toLocaleString()
              : "N/A"}
          </p>
        </div>

        {/* 🖥️ SESSION ACTIVITY (FAKE BUT GOOD FOR PROJECT) */}
        <div className="account-section">
          <h2>Active Sessions</h2>

          <div className="session-card">
            <p>
              <strong>Device:</strong> {getDeviceInfo()}
            </p>
            <p>
              <strong>Status:</strong> Active
            </p>
            <p>
              <strong>Location:</strong> United States
            </p>
          </div>

          <div className="session-card">
            <p>
              <strong>Device:</strong> Mobile Safari
            </p>
            <p>
              <strong>Status:</strong> Last active 2 hours ago
            </p>
            <p>
              <strong>Location:</strong> Unknown
            </p>
          </div>
        </div>

        

        {message && <p className="auth-message">{message}</p>}
      </div>
    </section>
  );
}

export default Account;
