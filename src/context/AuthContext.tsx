
import { createContext, useContext, useState, ReactNode } from 'react';

interface AuthContextType {
  isLoggedIn: boolean;
  isAdmin: boolean;
  login: () => void;
  logout: () => void;
  toggleAdmin: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(true); // Set to true for demo purposes
  const [isAdmin, setIsAdmin] = useState(false);

  const login = () => {
    setIsLoggedIn(true);
  };

  const logout = () => {
    setIsLoggedIn(false);
  };
  
  const toggleAdmin = () => {
    setIsAdmin(prev => !prev);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, isAdmin, login, logout, toggleAdmin }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
