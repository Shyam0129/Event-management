import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import jwtDecode from "jwt-decode";

const ProtectedRoute = ({ requiredRole }) => {
  const { token } = useAuth();

  if (!token) return <Navigate to="/login" replace />;

  const user = jwtDecode(token);

  if (requiredRole && user.role !== requiredRole) return <Navigate to="/" replace />;

  return <Outlet />;
};

export default ProtectedRoute;
