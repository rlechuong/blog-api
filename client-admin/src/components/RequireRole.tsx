import { Navigate } from "react-router";
import { useAuth } from "../context/useAuth.js";
import LoadingMessage from "./LoadingMessage.js";
import ErrorMessage from "./ErrorMessage.js";
import type { ReactNode } from "react";
import type { Role } from "../types/user.js";

interface RequireRoleProps {
  allowedRoles: Role[];
  children: ReactNode;
}

const RequireRole = ({ allowedRoles, children }: RequireRoleProps) => {
  const { user, loading } = useAuth();

  if (loading) return <LoadingMessage />;
  if (!user) return <Navigate to="/login" replace />;
  if (!allowedRoles.includes(user.role)) {
    return <ErrorMessage message="You do not have permission to view this page." />;
  }
  
  return children;
};

export default RequireRole;
