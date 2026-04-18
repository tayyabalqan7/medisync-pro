'use client';
import { createContext, useContext, useEffect, useState } from 'react';

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  login: (email: string, password: string) => Promise<void>;
  signup: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem('medisync_user');
    const storedToken = localStorage.getItem('medisync_token');
    if (stored && storedToken) {
      setUser(JSON.parse(stored));
      setToken(storedToken);
    }
    setLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    // Try real backend first, fall back to demo mode
    try {
      const res = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      if (res.ok) {
        const data = await res.json();
        setUser(data.user);
        setToken(data.token);
        localStorage.setItem('medisync_user', JSON.stringify(data.user));
        localStorage.setItem('medisync_token', data.token);
        return;
      }
    } catch {
      // Backend unavailable - use demo mode
    }
    // Demo mode fallback
    const demoUser = { id: '1', name: email.split('@')[0], email, role: 'patient' };
    const demoToken = 'demo-token-' + Date.now();
    setUser(demoUser);
    setToken(demoToken);
    localStorage.setItem('medisync_user', JSON.stringify(demoUser));
    localStorage.setItem('medisync_token', demoToken);
  };

  const signup = async (name: string, email: string, password: string) => {
    try {
      const res = await fetch('http://localhost:5000/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password }),
      });
      if (res.ok) {
        const data = await res.json();
        setUser(data.user);
        setToken(data.token);
        localStorage.setItem('medisync_user', JSON.stringify(data.user));
        localStorage.setItem('medisync_token', data.token);
        return;
      }
    } catch {
      // Backend unavailable - use demo mode
    }
    const demoUser = { id: '1', name, email, role: 'patient' };
    const demoToken = 'demo-token-' + Date.now();
    setUser(demoUser);
    setToken(demoToken);
    localStorage.setItem('medisync_user', JSON.stringify(demoUser));
    localStorage.setItem('medisync_token', demoToken);
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('medisync_user');
    localStorage.removeItem('medisync_token');
  };

  return (
    <AuthContext.Provider value={{ user, token, login, signup, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
};
