// src/context/AuthContext.jsx
import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // При загрузке проверяем токен
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      // Можно проверить валидность токена через /api/me
      setIsAuthenticated(true);
      // setUser(...) если нужно
    }
  }, []);

  const login = async (email, password) => {
    const res = await fetch('http://localhost:3000/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();

    if (!res.ok) throw new Error(data.error || 'Ошибка входа');

    localStorage.setItem('token', data.token); // ← КРИТИЧНО!
    setIsAuthenticated(true);                  // ← КРИТИЧНО!
    setUser(data.user || { email });
  };

  const logout = () => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);