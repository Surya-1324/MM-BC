import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from './AuthContext';

const ProtectedRoute = ({ element: Component }) => { // add requiredRole in props to enable RBAC
  const { isAuthenticated } = useAuth();// add userRole in props to enable RBAC

  if (!isAuthenticated) {
    return <Navigate to="/Auth/login" />;
  }

  //  Optional: Role-based access control
  // if (requiredRole && userRole !== requiredRole) {
  //   return <Navigate to="/unauthorized" />; // Adjust the path for unauthorized access
  // }

  return Component;
};

export default ProtectedRoute;
