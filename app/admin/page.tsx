'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { getUsers, createInvite, getUserIdByEmail } from '@/lib/admin-api'
import { motion } from 'framer-motion'

export default function AdminDashboard() {
  const [users, setUsers] = useState([])
  const [inviteCode, setInviteCode] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [adminEmail, setAdminEmail] = useState('')
  const [adminPassword, setAdminPassword] = useState('')
  const [adminId, setAdminId] = useState('')
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const storedAdminId = localStorage.getItem('adminId')
    if (storedAdminId) {
      setAdminId(storedAdminId)
      setIsLoggedIn(true)
    }
  }, [])

  useEffect(() => {
    if (isLoggedIn) {
      const fetchUsers = async () => {
        try {
          const users = await getUsers(adminId, adminPassword)
          setUsers(users)
        } catch (error) {
          console.error('Failed to fetch users:', error)
        }
      }
      fetchUsers()
    }
  }, [isLoggedIn, adminId, adminPassword])

  const handleLogin = async () => {
    try {
      const { userId } = await getUserIdByEmail(adminEmail)
      setAdminId(userId)
      localStorage.setItem('adminId', userId)
      setIsLoggedIn(true)
    } catch (error) {
      console.error('Failed to login:', error)
    }
  }

  const handleCreateInvite = async () => {
    setIsLoading(true)
    try {
      const { code } = await createInvite(adminId)
      setInviteCode(code)
    } catch (error) {
      console.error('Failed to create invite code:', error)
    } finally {
      setIsLoading(false)
    }
  }

  if (!isLoggedIn) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-900">
        <div className="p-8 bg-gray-800 rounded-lg shadow-lg">
          <h1 className="text-2xl font-bold text-white mb-4">Admin Login</h1>
          <Input
            type="email"
            placeholder="Admin Email"
            value={adminEmail}
            onChange={(e) => setAdminEmail(e.target.value)}
            className="w-full px-6 py-4 text-lg bg-white/10 border-white/20 text-white placeholder-gray-400 focus:border-yellow-300 focus:ring-yellow-300 transition-all duration-300 mb-4"
          />
          <Input
            type="password"
            placeholder="Admin Password"
            value={adminPassword}
            onChange={(e) => setAdminPassword(e.target.value)}
            className="w-full px-6 py-4 text-lg bg-white/10 border-white/20 text-white placeholder-gray-400 focus:border-yellow-300 focus:ring-yellow-300 transition-all duration-300 mb-4"
          />
          <Button
            onClick={handleLogin}
            className="w-full py-4 text-lg bg-yellow-300 text-black hover:bg-yellow-400 transition-all duration-300 transform hover:scale-105"
          >
            Login
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900">
      <div className="w-full max-w-6xl p-8 bg-gray-800 rounded-lg shadow-lg">
        <h1 className="text-4xl font-bold text-white mb-8">Admin Dashboard</h1>
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-white mb-4">Users</h2>
          <ul className="space-y-4">
            {users.map((user) => (
              <li key={user.id} className="text-white">
                {user.username} ({user.email})
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h2 className="text-2xl font-bold text-white mb-4">Create Invite Code</h2>
          <Button
            onClick={handleCreateInvite}
            disabled={isLoading}
            className="w-full py-4 text-lg bg-yellow-300 text-black hover:bg-yellow-400 transition-all duration-300 transform hover:scale-105"
          >
            {isLoading ? 'Creating...' : 'Create Invite Code'}
          </Button>
          {inviteCode && (
            <p className="mt-4 text-white">Invite Code: {inviteCode}</p>
          )}
        </div>
      </div>
    </div>
  )
}