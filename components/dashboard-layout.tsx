import { ChevronLeft, ChevronRight, Menu, Plus } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { useState } from 'react'
import { motion } from 'framer-motion'
import { usePathname } from 'next/navigation'

interface DashboardLayoutProps {
  children: React.ReactNode
}

const courses = [
  { id: 1, name: 'Mathematics', path: '/courses/1' },
  { id: 2, name: 'Physics', path: '/courses/2' },
  { id: 3, name: 'Chemistry', path: '/courses/3' },
  { id: 4, name: 'Biology', path: '/courses/4' },
]

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(true)
  const pathname = usePathname()
  
  const dotVariants = {
    initial: { opacity: 0 },
    animate: { opacity: 0.3 },
    exit: { opacity: 0 }
  }

  return (
    <div className="relative min-h-screen">
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900 via-black to-indigo-900 animate-gradient" />
        
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
      </div>

      <div className="relative z-10 flex min-h-screen p-4">
        <aside
          className={`
            relative flex flex-col
            backdrop-blur-xl bg-black/30
            border border-white/20
            rounded-[32px]
            overflow-hidden
            shadow-[0_0_40px_rgba(139,92,246,0.3)]
            mr-4
            ${isSidebarExpanded ? 'w-[300px]' : 'w-[100px]'}
            transition-all duration-300
          `}
        >
          <div className="relative">
            <div className="flex items-center justify-between p-6">
              {isSidebarExpanded && (
                <h2 className="text-2xl font-bold text-white">
                  Courses
                </h2>
              )}
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsSidebarExpanded(!isSidebarExpanded)}
                className="text-white hover:bg-white/10"
              >
                {isSidebarExpanded ? <ChevronLeft /> : <ChevronRight />}
              </Button>
            </div>

            <div className="px-4">
              <Button 
                className="w-full bg-yellow-300 text-purple-900 hover:bg-yellow-400 flex items-center justify-center gap-2 mb-4"
              >
                <Plus className="w-4 h-4" />
                {isSidebarExpanded && "New Course"}
              </Button>
            </div>

            <nav className="px-4 pb-6">
              {courses.map((course) => (
                <Link href={course.path} key={course.id}>
                  <div
                    className={`
                      flex items-center p-3 mb-2
                      rounded-xl transition-all duration-200
                      ${pathname === course.path 
                        ? 'bg-yellow-300 text-purple-900' 
                        : 'text-white hover:bg-white/10'
                      }
                    `}
                  >
                    <div className="w-8 h-8 flex items-center justify-center bg-yellow-300 rounded-lg mr-3">
                      <span className="text-purple-900 font-semibold">
                        {course.name[0]}
                      </span>
                    </div>
                    {isSidebarExpanded && (
                      course.name
                    )}
                  </div>
                </Link>
              ))}
            </nav>
          </div>
        </aside>

        <div className="flex-1 flex flex-col">
          <header className="bg-transparent h-16 flex items-center justify-between px-4">
            <Button variant="ghost" size="icon" className="md:hidden">
              <Menu />
            </Button>
          </header>
          <main className="flex-1 overflow-y-auto">
            {children}
          </main>
        </div>
      </div>
    </div>
  )
}