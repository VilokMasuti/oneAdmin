'use client';
import { createContext, useContext, useEffect, useState } from 'react';

interface AuthContextType {
  isAuthenticated: boolean;
  adminEmail: string | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [adminEmail, setAdminEmail] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for existing token on mount
    const checkAuth = () => {
      try {
        const token = localStorage.getItem('admin-token');
        const email = localStorage.getItem('admin-email');

        if (token && email) {
          // Verify token is not expired (simple check)
          const tokenData = token.split('-');
          const timestamp = tokenData[tokenData.length - 1];
          const tokenAge = Date.now() - Number.parseInt(timestamp);

          // Token expires after 24 hours
          if (tokenAge < 24 * 60 * 60 * 1000) {
            setIsAuthenticated(true);
            setAdminEmail(email);
          } else {
            // Token expired, clear it
            localStorage.removeItem('admin-token');
            localStorage.removeItem('admin-email');
          }
        }
      } catch (error) {
        console.error('Error checking authentication:', error);
        // Clear potentially corrupted data
        localStorage.removeItem('admin-token');
        localStorage.removeItem('admin-email');
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      // Mock authentication - accept any email/password
      if (email && password) {
        const token = 'mock-admin-token-' + Date.now();
        localStorage.setItem('admin-token', token);
        localStorage.setItem('admin-email', email);
        setIsAuthenticated(true);
        setAdminEmail(email);
        return true;
      }
      return false;
    } catch (error) {
      console.error('Login error:', error);
      return false;
    }
  };

  const logout = () => {
    try {
      localStorage.removeItem('admin-token');
      localStorage.removeItem('admin-email');
      setIsAuthenticated(false);
      setAdminEmail(null);
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, adminEmail, login, logout, isLoading }}
    >
      {children}
    </AuthContext.Provider>
  );
}
export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
