import { ReactNode } from "react";
import { Navigate } from "react-router";
import { Spinner } from "@cloudscape-design/components";
import { useUser } from "../../contexts/UserContext/UserProvider";

interface AdminRouteProps {
  children: ReactNode;
}

export const AdminRoute = ({ children }: AdminRouteProps) => {
  const { isAdmin, loading } = useUser();

  if (loading) return <Spinner size="large" />;
  if (!isAdmin) return <Navigate to="/" replace />;

  return <>{children}</>;
};
