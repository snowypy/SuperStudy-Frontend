'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { motion, AnimatePresence } from 'framer-motion'
import { register } from '@/lib/api'

export default function Register() {
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [inviteCode, setInviteCode] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    
    try {
      await register(username, email, password, inviteCode)
      router.push('/login')
    } catch (error) {
      setIsLoading(false)
      alert('Registration failed')
    }
  }

  const dotVariants = {
    initial: { opacity: 0 },
    animate: { opacity: 0.3 },
    exit: { opacity: 0 }
  }

  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900 via-black to-indigo-900 animate-gradient" />
      
      {/* Dot pattern overlay */}
      <div className="absolute inset-0 grid grid-cols-[repeat(40,1fr)] grid-rows-[repeat(40,1fr)]">
        {[...Array(1600)].map((_, i) => (
          <motion.div
            key={i}
            initial="initial"
            animate="animate"
            exit="exit"
            variants={dotVariants}
            transition={{ delay: Math.random() * 2, duration: 2, repeat: Infinity, repeatType: 'reverse' }}
            className="w-1 h-1 bg-yellow-300 rounded-full"
          />
        ))}
      </div>

      {/* Content */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 w-full max-w-lg px-8"
      >
        <motion.div
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 200, damping: 20 }}
          className="p-12 backdrop-blur-xl bg-white/10 rounded-2xl shadow-2xl border border-white/20"
        >
          <motion.div
            initial={{ y: -20 }}
            animate={{ y: 0 }}
            transition={{ delay: 0.2 }}
            className="mb-12 text-center"
          >
            <motion.h1
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-4xl font-bold text-white mb-4"
            >
              Join SuperStudy
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-xl text-gray-300"
            >
              Create your account to start your study journey
            </motion.p>
          </motion.div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <motion.div
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <Input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-6 py-4 text-lg bg-white/10 border-white/20 text-white placeholder-gray-400 focus:border-yellow-300 focus:ring-yellow-300 transition-all duration-300"
              />
            </motion.div>

            <motion.div
              initial={{ x: 50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              <Input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-6 py-4 text-lg bg-white/10 border-white/20 text-white placeholder-gray-400 focus:border-yellow-300 focus:ring-yellow-300 transition-all duration-300"
              />
            </motion.div>

            <motion.div
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.7 }}
            >
              <Input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-6 py-4 text-lg bg-white/10 border-white/20 text-white placeholder-gray-400 focus:border-yellow-300 focus:ring-yellow-300 transition-all duration-300"
              />
            </motion.div>

            <motion.div
              initial={{ x: 50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.8 }}
            >
              <Input
                type="text"
                placeholder="Invite Code"
                value={inviteCode}
                onChange={(e) => setInviteCode(e.target.value)}
                className="w-full px-6 py-4 text-lg bg-white/10 border-white/20 text-white placeholder-gray-400 focus:border-yellow-300 focus:ring-yellow-300 transition-all duration-300"
              />
            </motion.div>

            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.9 }}
            >
              <Button
                type="submit"
                disabled={isLoading}
                className="w-full py-4 text-lg bg-yellow-300 text-black hover:bg-yellow-400 transition-all duration-300 transform hover:scale-105"
              >
                <AnimatePresence mode="wait">
                  {isLoading ? (
                    <motion.div
                      key="loading"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="flex items-center justify-center"
                    >
                      <div className="w-6 h-6 border-3 border-black border-t-transparent rounded-full animate-spin" />
                    </motion.div>
                  ) : (
                    <motion.span
                      key="text"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    >
                      Register
                    </motion.span>
                  )}
                </AnimatePresence>
              </Button>
            </motion.div>
          </form>
        </motion.div>
      </motion.div>
    </div>
  )
}