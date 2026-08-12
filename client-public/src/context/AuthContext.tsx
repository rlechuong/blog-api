import { createContext, useState } from "react";
import type { ReactNode } from "react";
import type { PublicUser } from "../types/user.js";
import { login as loginRequest, register as registerRequest } from "../api/auth.js";

interface AuthContextValue {
  user: PublicUser | null;
  token: string | null;
  login: (email: string, password: string) => Promise<void>;
  register: (
    email: string,
    name: string,
    password: string,
    confirmPassword: string,
  ) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<PublicUser | null>(null);
  const [token, setToken] = useState<string | null>(null);

  const login = async (email: string, password: string) => {
    const data = await loginRequest(email, password);
    setUser(data.user);
    setToken(data.token);
    localStorage.setItem("token", data.token);
  };

  const register = async (
    email: string,
    name: string,
    password: string,
    confirmPassword: string,
  ) => {
    const data = await registerRequest(email, name, password, confirmPassword);
    setUser(data.user);
    setToken(data.token);
    localStorage.setItem("token", data.token);
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("token");
  };

  return (
    <AuthContext.Provider value={{ user, token, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
export type { AuthContextValue };
