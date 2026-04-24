import "../styles/login.css";

function Login() {
  return (
    <section className="login-page">
      <div className="login-card">
        <p className="eyebrow">Secure Access</p>
        <h1>Login</h1>
        <p className="login-subtitle">
          Sign in to manage your characters and combo lists.
        </p>

        <form className="login-form">
          <label>Email</label>
          <input type="email" placeholder="Enter your email" />

          <label>Password</label>
          <input type="password" placeholder="Enter your password" />

          <button type="button">Login</button>
        </form>

        <div className="verification-box">
          <h2>Email Verification</h2>
          <p>
            Later, this will use Supabase to send a one-time email verification
            code.
          </p>

          <input type="text" placeholder="One-time code" />
          <button type="button" className="secondary-button">
            Verify Code
          </button>
        </div>
      </div>
    </section>
  );
}

export default Login;