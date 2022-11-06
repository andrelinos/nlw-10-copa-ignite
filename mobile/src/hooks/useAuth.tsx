import { useContext } from "react";

import {
  AuthContext,
  AuthContextDataProps as AuthContextDataProps,
} from "../contexts/AuthContext";

export function useAuth(): AuthContextDataProps {
  const context = useContext(AuthContext);

  return context;
}
