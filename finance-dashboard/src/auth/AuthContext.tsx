import { createContext } from "react";
import type { User } from "../model/User";

export interface AuthContextType {
  user: User | null;
  csrfToken: string | null;
  refreshUser: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);
