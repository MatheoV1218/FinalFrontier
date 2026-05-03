import { Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";

function ProtectedRoute({ children }: { children: JSX.Element }) {
  const [allowed, setAllowed] = useState<boolean | null>(null);
  const [redirect, setRedirect] = useState("/login");

  useEffect(() => {
    const checkMFA = async () => {
      const { data } = await supabase.auth.mfa.getAuthenticatorAssuranceLevel();

      if (data?.nextLevel === "aal2" && data?.currentLevel !== "aal2") {
        await supabase.auth.signOut(); // logs them out if they skip MFA
        setRedirect("/login");
        setAllowed(false);
        return;
      }

      setAllowed(true);
    };

    checkMFA();
  }, []);

  if (allowed === null) return <p>Checking security...</p>;

  return allowed ? children : <Navigate to={redirect} replace />;
}

export default ProtectedRoute;