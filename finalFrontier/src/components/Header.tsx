import { Link } from "react-router-dom";
import "../styles/header.css";

function Header() {
  return (
    <header className="header">
      <Link to="/" className="logo">
        Final<span>Frontier</span>
      </Link>

      <nav className="nav">
        <Link to="/">Characters</Link>
        <Link to="/login">Login</Link>
        <Link to="/signup" className="login-link">
          Sign Up
        </Link>
      </nav>
    </header>
  );
}

export default Header;