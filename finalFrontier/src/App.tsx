import { Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import { supabase } from "./lib/supabase";
import type { User } from "@supabase/supabase-js";

import Header from "./components/Header";
import Home from "./pages/Home";
import CharacterPage from "./pages/CharacterPage";
import Login from "./pages/Login";
import Account from "./pages/Account";

function App() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    // get current user
    supabase.auth.getUser().then(({ data }) => {
      setUser(data.user);
    });

    // listen for changes
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
          <Route
            path="/character/:id"
            element={<CharacterPage user={user} />}
          />
          <Route path="/login" element={<Login />} />
          <Route path="/account" element={<Account user={user} />} />
        </Routes>
      </main>
    </>
  );
}

export default App;