import { useContext } from "react";
import { AuthContext } from "../contexts/FakeAuthContext";

function useAuthContext() {
  const context = useContext(AuthContext);
  if (context === undefined)
    throw new Error("AuthContext was used by the AuthProvider");
  return context;
}

export { useAuthContext };
