import React, { createContext, useContext, useState, useCallback } from 'react';

export type UserRole = 'admin' | 'faculty' | 'student';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  departmentId?: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

// Demo users
const DEMO_USERS: Record<string, User & { password: string }> = {
  'admin@university.edu': { id: '1', name: 'Dr. Sarah Mitchell', email: 'admin@university.edu', role: 'admin', password: 'admin123' },
  'faculty@university.edu': { id: '2', name: 'Prof. James Walker', email: 'faculty@university.edu', role: 'faculty', password: 'faculty123', departmentId: 'dep-1' },
  'student@university.edu': { id: '3', name: 'Alice Johnson', email: 'student@university.edu', role: 'student', password: 'student123', departmentId: 'dep-1' },
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(() => {
    const saved = localStorage.getItem('usms_user');
    return saved ? JSON.parse(saved) : null;
  });

  const login = useCallback(async (email: string, password: string) => {
    const demoUser = DEMO_USERS[email.toLowerCase()];
    if (!demoUser || demoUser.password !== password) {
      return { success: false, error: 'Invalid email or password' };
    }
    const { password: _, ...userData } = demoUser;
    setUser(userData);
    localStorage.setItem('usms_user', JSON.stringify(userData));
    return { success: true };
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    localStorage.removeItem('usms_user');
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
};
