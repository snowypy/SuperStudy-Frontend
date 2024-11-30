'use client'

import axios from 'axios';
import { useState, useEffect, createContext, useContext } from 'react';

interface User {
  id: number;
  username: string;
}

interface AuthContextType {
  user: User | null;
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => void;
  register: (username: string, password: string) => Promise<boolean>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    const storedToken = localStorage.getItem('token');
    if (storedUser && storedToken) {
      setUser(JSON.parse(storedUser));
      setToken(storedToken);
    }
  }, []);

  const login = async (username: string, password: string) => {
    try {
      const response = await axios.post('http://localhost:8080/api/v1/auth/login', { username, password }, {
        headers: {
          'Authorization': `Basic ${btoa(`${username}:${password}`)}`
        }
      });
      if (response.status === 200) {
        const { token, user } = response.data;
        setUser(user);
        setToken(token);
        localStorage.setItem('user', JSON.stringify(user));
        return true;
      }
    } catch (error) {
      console.error('Login failed:', error);
    }
    return false;
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('user');
    localStorage.removeItem('token');
  };

  const register = async (username: string, password: string) => {
    try {
      const response = await axios.post('http://localhost:8080/api/v1/auth/register', { username, password }, {
        headers: {
          'Authorization': `Basic ${btoa(`${username}:${password}`)}`
        }
      });
      if (response.status === 200) {
        return await login(username, password);
      }
    } catch (error) {
      console.error('Registration failed:', error);
    }
    return false;
  };

  const authAxios = axios.create();

  authAxios.interceptors.request.use(
    config => {
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    error => {
      return Promise.reject(error);
    }
  );

  return (
    <AuthContext.Provider value={{ user, login, logout, register }}>
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