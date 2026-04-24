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
        <Link to="/login" className="login-link">
          Login / Sign Up
        </Link>
      </nav>
    </header>
  );
}

export default Header;