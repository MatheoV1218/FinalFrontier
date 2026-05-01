import { Routes, Route, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { supabase } from "./lib/supabase";
import type { User } from "@supabase/supabase-js";

import Header from "./components/Header";
import Home from "./pages/Home";
import CharacterPage from "./pages/CharacterPage";
import Login from "./pages/Login";
import Account from "./pages/Account";
import ResetPassword from "./pages/reset-password";
import type { ReactElement } from "react";

function ProtectedRoute({
  children,
}: {
  children: ReactElement;
}) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      setUser(data.user);
      setLoading(false);
    });
  }, []);

  if (loading) return null;

  return user ? children : <Navigate to="/login" replace />;
}

function App() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      setUser(data.user);
    });

    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setUser(session?.user ?? null);
      }
    );

    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  return (
    <>
      <Header user={user} />

      <main className="app-main">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route
            path="/character/:id"
            element={<CharacterPage user={user} />}
          />
          <Route
            path="/account"
            element={
              <ProtectedRoute>
                <Account user={user} />
              </ProtectedRoute>
            }
          />
        </Routes>
      </main>
    </>
  );
}

export default App;