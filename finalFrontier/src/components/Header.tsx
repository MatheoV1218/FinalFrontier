import { Link } from "react-router-dom";
import { supabase } from "../lib/supabase";
import "../styles/header.css";
import type { User } from "@supabase/supabase-js";

function Header({ user }: { user: User | null }) {
  const handleLogout = async () => {
    await supabase.auth.signOut();
  };

  return (
    <header className="header">
      <Link to="/" className="logo">
        Final<span>Frontier</span>
      </Link>

      <nav className="nav">
        <Link to="/">Characters</Link>

        {!user ? (
          <Link to="/login" className="login-link">
            Login / Sign Up
          </Link>
        ) : (
          <>
            <span className="user-name">
              {user.user_metadata?.username || user.email}
            </span>

            <button className="logout-btn" onClick={handleLogout}>
              Logout
            </button>
          </>
        )}
      </nav>
    </header>
  );
}

export default Header;