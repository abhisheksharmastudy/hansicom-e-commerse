import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import { adminLogin as apiLogin, adminLogout as apiLogout, isAdminLoggedIn } from '../lib/api';

interface AuthContextType {
  isAuthenticated: boolean;
  isLoading: boolean;
  admin: { email: string; role: string } | null;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [admin, setAdmin] = useState<{ email: string; role: string } | null>(null);

  // Check auth state on mount
  useEffect(() => {
    const checkAuth = () => {
      const loggedIn = isAdminLoggedIn();
      setIsAuthenticated(loggedIn);
      if (loggedIn) {
        // Get admin info from token (simplified)
        const token = localStorage.getItem('admin_token');
        if (token) {
          try {
            const payload = JSON.parse(atob(token.split('.')[1]));
            setAdmin({ email: payload.email, role: payload.role });
          } catch {
            setAdmin(null);
          }
        }
      }
      setIsLoading(false);
    };
    checkAuth();
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const response = await apiLogin(email, password);
      if (response.success) {
        setIsAuthenticated(true);
        setAdmin(response.admin);
        return { success: true };
      }
      return { success: false, error: 'Login failed' };
    } catch (error: any) {
      return { success: false, error: error.message || 'Invalid credentials' };
    }
  };

  const logout = () => {
    apiLogout();
    setIsAuthenticated(false);
    setAdmin(null);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, isLoading, admin, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
