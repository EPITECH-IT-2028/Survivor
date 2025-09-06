"use client";

import { getUsersById } from "@/app/hooks/users/getUsersById";
import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";

interface AuthContextType {
  token: string | null;
  isAuthenticated: boolean;
  isAdmin: boolean;
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
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [user, setUser] = useState<any>(null);

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
    if (!token) return;

    const fetchUser = async () => {
      try {
        setLoading(true);
        const payload = JSON.parse(atob(token.split(".")[1]));
        const userId = payload.userId;
        const fetchedUser = await getUsersById(userId);
        setUser(fetchedUser);
        setLoading(false);
      } catch (error) {
        console.error("Error decoding token or fetching user:", error);
        setUser(null);
      }
    };

    fetchUser();
  }, [token]);

  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === "session_token" || e.key === null) {
        setToken(localStorage.getItem("session_token"));
      }
    };


    const handleVisibilityChange = () => {
      if (document.visibilityState === "visible") {
        setToken(localStorage.getItem("session_token"));
      }
    };

    window.addEventListener("storage", handleStorageChange);
    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  const login = (newToken: string) => {
    setToken(newToken);
  };

  const logout = () => {
    setToken(null);
  };

  const isAuthenticated = !!token;
  const isAdmin = user?.role === "admin";

  const value = {
    token,
    isAuthenticated,
    login,
    logout,
    isAdmin,
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
