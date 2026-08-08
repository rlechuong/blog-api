import { Role } from "../generated/prisma/client.js";

declare global {
  namespace Express {
    interface User {
      id: number;
      email: string;
      name: string;
      role: Role;
    }
  }
}

export {};
