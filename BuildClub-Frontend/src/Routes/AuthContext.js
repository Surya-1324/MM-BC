import React, { createContext, useContext, useEffect, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    // Initialize state from session storage
    return sessionStorage.getItem('isAuthenticated') === 'true';
  });
  const [userRole, setUserRole] = useState(() => {
    return sessionStorage.getItem('userRole');
  });

  useEffect(() => {
    const checkAuth = async () => {
      // Replace with your actual API call to verify user authentication
      const response = await fetch('/api/check-auth', { credentials: 'include' });
      if (response.ok) {
        const data = await response.json();
        setIsAuthenticated(true);
        setUserRole(data.role);
        sessionStorage.setItem('isAuthenticated', 'true'); // Store in session storage
        sessionStorage.setItem('userRole', data.role); // Store role in session storage
      } else {
        setIsAuthenticated(false);
        sessionStorage.removeItem('isAuthenticated');
        sessionStorage.removeItem('userRole');
      }
    };

    checkAuth();
  }, []);

  const authenticateUser = () => {
    setIsAuthenticated(true);
    sessionStorage.setItem('isAuthenticated', 'true');
  };

  const logoff = () => {
    setIsAuthenticated(false);
    setUserRole(null);
    sessionStorage.removeItem('isAuthenticated');
    sessionStorage.removeItem('userRole');
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, userRole, authenticateUser, logoff }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
