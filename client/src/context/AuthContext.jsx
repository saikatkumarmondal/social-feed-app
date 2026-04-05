// src/context/AuthContext.jsx
import React, { createContext, useContext, useState, useEffect } from "react";
import { fetchCurrentUser } from "../services/api";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser]   = useState(null);
  const [isAuthLoading, setIsAuthLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      setIsAuthLoading(false);
      return;
    }
    fetchCurrentUser()
      .then((res) => setCurrentUser(res.data.user))
      .catch(() => localStorage.removeItem("token"))
      .finally(() => setIsAuthLoading(false));
  }, []);

  const saveSession = (token, user) => {
    localStorage.setItem("token", token);
    setCurrentUser(user); 
  };

  const clearSession = () => {
    localStorage.removeItem("token");
    setCurrentUser(null);
  };

  return (
    <AuthContext.Provider value={{ currentUser, isAuthLoading, saveSession, clearSession }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);