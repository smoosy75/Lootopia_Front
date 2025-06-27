import { createContext, useContext, useState } from "react";

type AuthContextType = {
  isAuthenticated: boolean;
  user: User | null;
  login: (user: User) => void;
  logout: () => void;
};

/*type User = {
  name: string;
  email: string;
  role: "admin" | "organisateur" | "joueur" | "pro";
};*/

export type UserRole = "admin" | "joueur" | "organisateur" | "pro";

export interface User {
  name: string;
  email: string;
  role: UserRole;
  token: string;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(
    () => localStorage.getItem("isAuthenticated") === "true"
  );
  const [user, setUser] = useState<User | null>(
    () => JSON.parse(localStorage.getItem("user") || "null") || null
  );

  const login = (userData: User) => {
    setIsAuthenticated(true);
    setUser(userData);
    localStorage.setItem("isAuthenticated", "true");
    localStorage.setItem("user", JSON.stringify(userData));
  };
  const logout = () => {
    setIsAuthenticated(false);
    setUser(null);
    localStorage.setItem("isAuthenticated", "false");
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
