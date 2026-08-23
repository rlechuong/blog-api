import type { AdminUser, Role } from "../types/user.js";
import { apiFetch } from "./client.js";

const getUsers = async (): Promise<AdminUser[]> => {
  return apiFetch("/api/users");
};

const updateUserRole = async (id: number, role: Role): Promise<AdminUser> => {
  return apiFetch(`/api/users/${id}/role`, {
    method: "PATCH",
    body: JSON.stringify({ role }),
  });
};

export { getUsers, updateUserRole };
