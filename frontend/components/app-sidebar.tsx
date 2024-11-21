"use client"

import * as React from 'react'
import { motion } from 'framer-motion'
import { Home, Book, Settings, MessageCircle } from 'lucide-react'
import { Sidebar, SidebarHeader, SidebarContent, SidebarFooter } from './ui/sidebar'
import { Button } from '@/components/ui/button'

const menuItems = [
  { icon: Home, label: 'Dashboard', isActive: true },
  { icon: Book, label: 'Courses' },
  { icon: Settings, label: 'Settings' },
]

export function AppSidebar({ className, ...props }: React.ComponentProps<typeof Sidebar>) {
    function cn(...classes: (string | undefined)[]): string {
        return classes.filter(Boolean).join(' ');
    }

  return (
    <Sidebar 
      variant="custom"
      className={cn(
        "w-64 bg-gradient-to-b from-purple-900 to-indigo-900 border-r-0 rounded-r-3xl overflow-hidden sidebar-shadow sidebar-grid-bg",
        className
      )}
      {...props}
    >
      <SidebarHeader className="px-6 py-8">
        <motion.h2 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-2xl font-bold text-white"
        >
          SuperStudy
        </motion.h2>
      </SidebarHeader>
      <SidebarContent className="px-4">
        {menuItems.map((item, index) => (
          <motion.div
            key={item.label}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 * (index + 1) }}
          >
            <Button 
              variant="ghost"
              className={cn(
                "w-full justify-start rounded-full py-3 px-4 transition-all duration-200 mb-2",
                item.isActive 
                  ? "bg-white text-purple-900 shadow-lg" 
                  : "text-white hover:bg-white/10"
              )}
            >
              <item.icon className="mr-3 h-5 w-5" />
              {item.label}
            </Button>
          </motion.div>
        ))}
      </SidebarContent>
      <SidebarFooter className="px-4 pb-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <Button 
            variant="default"
            className="w-full rounded-full py-3 px-4 bg-yellow-300 text-purple-900 hover:bg-yellow-400 transition-all duration-200 shadow-lg"
          >
            <MessageCircle className="mr-3 h-5 w-5" />
            Contact Us
          </Button>
        </motion.div>
      </SidebarFooter>
    </Sidebar>
  )
}
