import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

const ProtectedRoute = () => {
  const location = useLocation();

  const { isAuthenticated, isInitialized, user } = useSelector(
    (state) => state.auth,
  );

  /*
   * AuthInitializer handles initialization.
   *
   * This check is mostly defensive because
   * AuthInitializer doesn't render children until
   * initialization is complete.
   */
  if (!isInitialized) {
    return null;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  /*
   * Force password change.
   */
  if (user?.mustChangePassword && location.pathname !== "/change-password") {
    return <Navigate to="/change-password" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
