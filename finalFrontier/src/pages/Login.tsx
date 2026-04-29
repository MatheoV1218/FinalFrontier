import { useState } from "react";
import { supabase } from "../lib/supabase";
import { useNavigate } from "react-router-dom";
import "../styles/login.css";

function Login() {
  const navigate = useNavigate();

  const [isLogin, setIsLogin] = useState(true);

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [otp, setOtp] = useState("");
  const [factorId, setFactorId] = useState<string | null>(null);
  const [challengeId, setChallengeId] = useState<string | null>(null);

  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleAuth = async () => {
    setMessage("");

    if (!email || !password) {
      setMessage("Please enter email and password.");
      return;
    }

    if (!isLogin && !username) {
      setMessage("Please enter a username.");
      return;
    }

    setLoading(true);

    try {
      if (isLogin) {
        // 🔐 STEP 1: LOGIN
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });

        if (error) {
          setMessage(error.message);
          setLoading(false);
          return;
        }

        // 🔐 STEP 2: CHECK IF MFA IS ENABLED
        const { data: factorsData } =
          await supabase.auth.mfa.listFactors();

        const totpFactor = factorsData?.totp?.[0];

        if (totpFactor) {
          // 🔐 STEP 3: CREATE CHALLENGE
          const { data: challenge, error: challengeError } =
            await supabase.auth.mfa.challenge({
              factorId: totpFactor.id,
            });

          if (challengeError) {
            setMessage(challengeError.message);
            setLoading(false);
            return;
          }

          setFactorId(totpFactor.id);
          setChallengeId(challenge.id);
          setMessage("Enter your 2FA code");
          setLoading(false);
          return;
        }

        // ✅ NO MFA → GO HOME
        navigate("/");
      } else {
        // 📝 SIGNUP
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: { username },
          },
        });

        if (error) {
          setMessage(error.message);
        } else {
          setMessage("Check your email to confirm your account.");
        }
      }
    } catch (err) {
      console.error(err);
      setMessage("Something went wrong.");
    }

    setLoading(false);
  };

  // 🔐 STEP 4: VERIFY OTP
  const handleVerifyOTP = async () => {
    if (!otp || !factorId || !challengeId) return;

    setLoading(true);

    const { error } = await supabase.auth.mfa.verify({
      factorId,
      challengeId,
      code: otp,
    });

    if (error) {
      setMessage(error.message);
    } else {
      navigate("/");
    }

    setLoading(false);
  };

  return (
    <section className="login-page">
      <div className="login-card">
        <p className="eyebrow">FinalFrontier</p>

        <h1>{isLogin ? "Login" : "Sign Up"}</h1>

        <p className="login-subtitle">
          {isLogin
            ? "Sign in to access your account"
            : "Create an account to share combos"}
        </p>

        {/* NORMAL FORM */}
        {!challengeId && (
          <form
            className="login-form"
            onSubmit={(e) => e.preventDefault()}
          >
            {!isLogin && (
              <>
                <label>Username</label>
                <input
                  type="text"
                  placeholder="Enter username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </>
            )}

            <label>Email</label>
            <input
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <label>Password</label>
            <input
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <button
              type="button"
              onClick={handleAuth}
              disabled={loading}
            >
              {loading
                ? "Loading..."
                : isLogin
                ? "Login"
                : "Create Account"}
            </button>
          </form>
        )}

        {/* 🔐 OTP UI */}
        {challengeId && (
          <div className="otp-section">
            <h2>2FA Verification</h2>
            <p>Enter the 6-digit code from your authenticator app</p>

            <input
              type="text"
              placeholder="123456"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
            />

            <button onClick={handleVerifyOTP} disabled={loading}>
              Verify Code
            </button>
          </div>
        )}

        {/* MESSAGE */}
        {message && <p className="auth-message">{message}</p>}

        {/* TOGGLE */}
        {!challengeId && (
          <div className="auth-toggle">
            <p>
              {isLogin
                ? "Don't have an account?"
                : "Already have an account?"}
            </p>

            <button
              className="toggle-btn"
              onClick={() => {
                setIsLogin(!isLogin);
                setMessage("");
              }}
            >
              {isLogin ? "Sign Up" : "Login"}
            </button>
          </div>
        )}
      </div>
    </section>
  );
}

export default Login;