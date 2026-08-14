import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const signIn = (username, password) => {
    if (username === 'admin' && password === 'password') {
      setIsAuthenticated(true);
    } else {
      alert('Invalid credentials. Try admin / password');
    }
  };

  const signOut = () => setIsAuthenticated(false);

  return (
    <AuthContext.Provider value={{ isAuthenticated, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
