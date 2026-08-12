import { apiFetch } from "./client.js";
import type { PublicUser } from "../types/user.js";

interface AuthResponse {
  token: string;
  user: PublicUser;
}

const login = async (email: string, password: string): Promise<AuthResponse> => {
  return apiFetch("/api/auth/login", {
    method: "POST",
    body: JSON.stringify({ email, password }),
  });
};

const register = async (
  email: string,
  name: string,
  password: string,
  confirmPassword: string,
): Promise<AuthResponse> => {
  return apiFetch("/api/auth/register", {
    method: "POST",
    body: JSON.stringify({ email, name, password, confirmPassword }),
  });
};

export { login, register };
export type { AuthResponse };
