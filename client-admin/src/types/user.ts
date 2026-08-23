type Role = "USER" | "AUTHOR" | "ADMIN";

interface PublicUser {
  id: number;
  name: string;
  role: Role;
}

interface AdminUser extends PublicUser {
  email: string;
  createdAt: string;
  updatedAt: string;
}

export type { Role, PublicUser, AdminUser };
