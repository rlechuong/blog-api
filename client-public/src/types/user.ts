type Role = "USER" | "AUTHOR" | "ADMIN";

interface PublicUser {
  id: number;
  name: string;
  role: Role;
}

export type { PublicUser, Role };
