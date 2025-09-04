"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";

interface AuthContextType {
  token: string | null;
  isAuthenticated: boolean;
  login: (token: string) => void;
  logout: () => void;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedToken = localStorage.getItem("session_token");
    setToken(storedToken);
    setLoading(false);
  }, []);

  useEffect(() => {
    if (token) {
      localStorage.setItem("session_token", token);
    } else {
      localStorage.removeItem("session_token");
    }
  }, [token]);

  useEffect(() => {
    const interval = setInterval(() => {
      const storedToken = localStorage.getItem("session_token");
      if (storedToken !== token) {
        setToken(storedToken);
      }
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [token]);

  const login = (newToken: string) => {
    setToken(newToken);
  };

  const logout = () => {
    setToken(null);
  };

  const isAuthenticated = !!token;

  const value = {
    token,
    isAuthenticated,
    login,
    logout,
    loading,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

