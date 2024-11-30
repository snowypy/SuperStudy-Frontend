'use client'

import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import DashboardLayout from '@/components/dashboard-layout'
import { Plus } from 'lucide-react'
import Link from 'next/link'

const courses = [
  { id: 1, name: 'Mathematics', description: 'Explore the world of numbers and shapes.' },
  { id: 2, name: 'Physics', description: 'Understand the fundamental laws of the universe.' },
  { id: 3, name: 'Chemistry', description: 'Dive into the science of matter and its properties.' },
  { id: 4, name: 'Biology', description: 'Study life and living organisms.' },
]

export default function CoursesPage() {
  return (
    <DashboardLayout>
      <div className="p-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-10"
        >
          <h1 className="text-4xl font-bold text-white mb-8 text-center">Browse Courses</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {courses.map((course) => (
              <motion.div
                key={course.id}
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: "spring", stiffness: 200, damping: 20 }}
                className="backdrop-blur-xl bg-white/10 rounded-lg shadow-2xl border border-white/20 p-6 flex flex-col"
              >
                <h2 className="text-2xl font-semibold text-white mb-2">{course.name}</h2>
                <p className="text-gray-300 mb-4 flex-grow">{course.description}</p>
                <Link href={`/courses/${course.id}`}>
                  <Button className="w-full bg-yellow-300 text-purple-900 hover:bg-yellow-400">
                    View Course
                  </Button>
                </Link>
              </motion.div>
            ))}
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: "spring", stiffness: 200, damping: 20 }}
              className="backdrop-blur-xl bg-white/10 rounded-lg shadow-2xl border border-white/20 p-6 flex flex-col items-center justify-center cursor-pointer hover:bg-white/20 transition-colors"
            >
              <Plus className="w-12 h-12 text-white mb-4" />
              <h2 className="text-2xl font-semibold text-white">New Course</h2>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </DashboardLayout>
  )
}