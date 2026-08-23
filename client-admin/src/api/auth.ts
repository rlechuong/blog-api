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

const getMe = async (): Promise<PublicUser> => {
  return apiFetch("/api/auth/me");
};

export { login, getMe };
