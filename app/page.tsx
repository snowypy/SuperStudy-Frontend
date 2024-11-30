'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { motion } from 'framer-motion'
import { useEffect } from 'react'

export default function Home() {
  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      console.log('Mouse moved:', e.clientX, e.clientY)
    }
    window.addEventListener('mousemove', updateMousePosition)
    return () => {
      window.removeEventListener('mousemove', updateMousePosition)
    }
  }, [])

  const dotVariants = {
    initial: { opacity: 0 },
    animate: { opacity: 0.3 },
    exit: { opacity: 0 }
  }

  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen overflow-hidden">
      {}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900 via-black to-indigo-900 animate-gradient" />
      
      {}
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

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 flex flex-col items-center justify-center w-full flex-1 px-20 text-center"
      >
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="p-12 backdrop-blur-lg bg-white bg-opacity-10 rounded-xl shadow-lg border border-white border-opacity-20"
        >
          <motion.h1
            initial={{ y: -20 }}
            animate={{ y: 0 }}
            transition={{ delay: 0.2, type: 'spring', stiffness: 120 }}
            className="text-6xl font-bold mb-4 text-white"
          >
            Welcome to <span className="text-yellow-300">SuperStudy</span>
          </motion.h1>
          <motion.p
            initial={{ y: 20 }}
            animate={{ y: 0 }}
            transition={{ delay: 0.4, type: 'spring', stiffness: 120 }}
            className="mt-3 text-2xl text-white mb-8"
          >
            Your ultimate study companion.
          </motion.p>
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="flex justify-center mt-6 space-x-4"
          >
            <Link href="/login">
              <Button className="bg-yellow-300 text-purple-700 hover:bg-yellow-400 hover:text-purple-800 transition-all duration-300 transform hover:scale-105">
                Login
              </Button>
            </Link>
            <Link href="/register">
              <Button className="bg-purple-600 text-white hover:bg-purple-700 transition-all duration-300 transform hover:scale-105">
                Register
              </Button>
            </Link>
            <Link href="/flashcards">
              <Button variant="outline" className="text-white border-white hover:bg-white hover:text-purple-700 transition-all duration-300 transform hover:scale-105">
                Hop back in
              </Button>
            </Link>
          </motion.div>
        </motion.div>
      </motion.div>
      <motion.div
        className="absolute bottom-5 right-5 text-white text-opacity-50"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
      >
        This is a development version of SuperStudy.
        <br/>
        Anything on this build does not represent the final product.
        <br/>
        Made with ❤️ by{' '}
        <a href="https://portfolio-cigan.com" className="text-yellow-300 hover:underline">
          Cigan
        </a>
        {' & '}
        <a href="https://github.com/invisgg" className="text-yellow-300 hover:underline">
          Awel
        </a>
        .{' '}
        <a href="https://github.com/snowypy/SuperStudy" className="text-yellow-300 hover:underline">
          Source Code
        </a>
      </motion.div>
    </div>
  )
}