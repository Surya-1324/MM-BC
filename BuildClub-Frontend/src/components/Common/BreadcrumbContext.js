// BreadcrumbContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';

const BreadcrumbContext = createContext();

export const useBreadcrumb = () => useContext(BreadcrumbContext);

export const BreadcrumbProvider = ({ children }) => {
  const [motorName, setMotorName] = useState(() => {
    // Try to get motorName from sessionStorage on load
    return sessionStorage.getItem('motorName') || null;
  });

  useEffect(() => {
    // When motorName changes, store it in sessionStorage
    if (motorName) {
      sessionStorage.setItem('motorName', motorName);
    }
  }, [motorName]);

  return (
    <BreadcrumbContext.Provider value={{ motorName, setMotorName }}>
      {children}
    </BreadcrumbContext.Provider>
  );
};
