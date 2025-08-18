import React, { createContext, useContext, useState } from 'react';

// Create context
const AuthContext = createContext();

// Provider component
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // null = not logged in

  const login = (email, password) => {
    // Here you could call an API, validate credentials, etc.
    // For now, we mock login:
    setUser({ email });
  };

  const logout = () => {
    setUser(null);
  };

  const register = (name, email, password) => {
    // Call register API or save locally
    setUser({ name, email });
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use Auth
export const useAuth = () => useContext(AuthContext);
