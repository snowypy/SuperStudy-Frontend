'use client'

import React, { createContext, useState, useContext, useEffect } from 'react'

type User = string | null

interface AuthContextType {
  user: User
  login: (username: string, password: string) => Promise<boolean>
  logout: () => void
  register: (username: string, password: string, inviteCode: string) => Promise<boolean>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User>(null)

  useEffect(() => {
    // Check if user is stored in localStorage on component mount
    const storedUser = localStorage.getItem('user')
    if (storedUser) {
      setUser(storedUser)
    }
  }, [])

  const login = async (username: string, password: string) => {
    // This is a mock login.
    if (username && password) {
      setUser(username)
      localStorage.setItem('user', username)
      return true
    }
    return false
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem('user')
  }

  const register = async (username: string, password: string, inviteCode: string) => {
    // This is a mock registration.
    if (inviteCode === 'SUPERSTUDY2024') {
      localStorage.setItem('registeredUser', JSON.stringify({ username, password }))
      return true
    }
    return false
  }

  return (
    <AuthContext.Provider value={{ user, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}