import { auth } from "services/firebase";
import { useMemo } from "react";
import { signOut } from "firebase/auth";

import { useAuthState } from "react-firebase-hooks/auth";
import { signInWithEmailAndPassword } from "firebase/auth";

export const useAuthentication = () => {
  const [user] = useAuthState(auth);

  const isLogged = useMemo(() => !!user, [user]);

  const logout = () => signOut(auth);

  return {
    user,
    logout,
    isLogged,
    login: signInWithEmailAndPassword,
  };
};
