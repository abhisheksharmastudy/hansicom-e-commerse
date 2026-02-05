import { createContext, useContext, useState, useEffect, useRef, type ReactNode } from 'react';
import { adminLogin as apiLogin, adminLogout as apiLogout } from '../lib/api';

interface AuthContextType {
  isAuthenticated: boolean;
  isLoading: boolean;
  admin: AdminInfo | null;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
}

type AdminInfo = { email: string; role: string };
type AdminTokenPayload = { email?: string; role?: string; exp?: number };

function decodeAdminToken(token: string | null): { valid: boolean; admin: AdminInfo | null; exp: number | null } {
  if (!token) {
    return { valid: false, admin: null, exp: null };
  }

  const parts = token.split('.');
  if (parts.length < 2) {
    return { valid: false, admin: null, exp: null };
  }

  try {
    const base64 = parts[1].replace(/-/g, '+').replace(/_/g, '/');
    const padded = base64 + '='.repeat((4 - (base64.length % 4)) % 4);
    const payload = JSON.parse(atob(padded)) as AdminTokenPayload;

    if (!payload.email || payload.role !== 'admin' || !payload.exp) {
      return { valid: false, admin: null, exp: null };
    }

    if (payload.exp * 1000 <= Date.now()) {
      return { valid: false, admin: null, exp: null };
    }

    return { valid: true, admin: { email: payload.email, role: payload.role }, exp: payload.exp };
  } catch {
    return { valid: false, admin: null, exp: null };
  }
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [admin, setAdmin] = useState<AdminInfo | null>(null);
  const logoutTimerRef = useRef<number | null>(null);

  const clearLogoutTimer = () => {
    if (logoutTimerRef.current !== null) {
      window.clearTimeout(logoutTimerRef.current);
      logoutTimerRef.current = null;
    }
  };

  const clearAuth = () => {
    apiLogout();
    setIsAuthenticated(false);
    setAdmin(null);
    clearLogoutTimer();
  };

  const scheduleLogout = (exp: number | null) => {
    if (!exp) return;
    const msUntilExpiry = exp * 1000 - Date.now();

    if (msUntilExpiry <= 0) {
      clearAuth();
      return;
    }

    clearLogoutTimer();
    logoutTimerRef.current = window.setTimeout(() => {
      clearAuth();
    }, msUntilExpiry);
  };

  // Check auth state on mount
  useEffect(() => {
    const { valid, admin: adminFromToken, exp } = decodeAdminToken(localStorage.getItem('admin_token'));

    if (!valid || !adminFromToken) {
      clearAuth();
      setIsLoading(false);
      return;
    }

    setIsAuthenticated(true);
    setAdmin(adminFromToken);
    scheduleLogout(exp);
    setIsLoading(false);

    return () => {
      clearLogoutTimer();
    };
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const response = await apiLogin(email, password);
      if (response.success) {
        setIsAuthenticated(true);
        setAdmin(response.admin);
        const { valid, exp } = decodeAdminToken(localStorage.getItem('admin_token'));
        if (!valid) {
          clearAuth();
          return { success: false, error: 'Invalid login token' };
        }
        scheduleLogout(exp);
        return { success: true };
      }
      return { success: false, error: 'Login failed' };
    } catch (error: any) {
      return { success: false, error: error.message || 'Invalid credentials' };
    }
  };

  const logout = () => {
    clearAuth();
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
