import { Role } from "../generated/prisma/client.js";

declare global {
  namespace Express {
    interface User {
      id: number;
      role: Role;
    }
  }
}

export {};
