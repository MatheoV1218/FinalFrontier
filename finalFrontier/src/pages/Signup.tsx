import "../styles/login.css";

function Signup() {
  return (
    <section className="login-page">
      <div className="login-card">
        <p className="eyebrow">Create Account</p>
        <h1>Sign Up</h1>
        <p className="login-subtitle">
          Join FrinalFrontier and share your combos.
        </p>

        <form className="login-form">
          <label>Username</label>
          <input type="text" placeholder="Enter username" />

          <label>Email</label>
          <input type="email" placeholder="Enter email" />

          <label>Password</label>
          <input type="password" placeholder="Enter password" />

          <button type="button">Create Account</button>
        </form>

        <div className="verification-box">
          <h2>Email Verification</h2>
          <p>This will later send a one-time verification code.</p>

          <input type="text" placeholder="Enter verification code" />
          <button type="button" className="secondary-button">
            Verify Code
          </button>
        </div>
      </div>
    </section>
  );
}

export default Signup;