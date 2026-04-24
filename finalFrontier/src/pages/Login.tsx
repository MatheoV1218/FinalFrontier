import { useState } from "react";
import "../styles/login.css";

function Login() {
  const [isLogin, setIsLogin] = useState(true);

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

        <form className="login-form">
          {/* Username only for signup */}
          {!isLogin && (
            <>
              <label>Username</label>
              <input type="text" placeholder="Enter username" />
            </>
          )}

          <label>Email</label>
          <input type="email" placeholder="Enter email" />

          <label>Password</label>
          <input type="password" placeholder="Enter password" />

          <button type="button">
            {isLogin ? "Login" : "Create Account"}
          </button>
        </form>

        {/* Verification (only show on signup) */}
        {!isLogin && (
          <div className="verification-box">
            <h2>Email Verification</h2>
            <p>This will later send a one-time verification code.</p>

            <input type="text" placeholder="Enter verification code" />
            <button type="button" className="secondary-button">
              Verify Code
            </button>
          </div>
        )}

        {/* TOGGLE */}
        <div className="auth-toggle">
          <p>
            {isLogin ? "Don't have an account?" : "Already have an account?"}
          </p>

          <button
            className="toggle-btn"
            onClick={() => setIsLogin(!isLogin)}
          >
            {isLogin ? "Sign Up" : "Login"}
          </button>
        </div>
      </div>
    </section>
  );
}

export default Login;