import { useState } from "react";
import { supabase } from "../lib/supabase";
import "../styles/login.css";

function Login() {
  const [isLogin, setIsLogin] = useState(true);

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

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
        // LOGIN
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });

        if (error) {
          setMessage(error.message);
        } else {
          setMessage("Logged in successfully!");
        }
      } else {
        // SIGNUP
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: {
              username,
            },
          },
        });

        if (error) {
          setMessage(error.message);
        } else {
          setMessage("Account created! Check your email to confirm.");
        }
      }
    } catch (err) {
      console.error(err);
      setMessage("Something went wrong.");
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

        <form
          className="login-form"
          onSubmit={(e) => e.preventDefault()}
        >
          {/* Username only for signup */}
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

        {/* MESSAGE */}
        {message && <p className="auth-message">{message}</p>}

        {/* TOGGLE */}
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
      </div>
    </section>
  );
}

export default Login;