'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { useTheme } from '@/lib/theme-provider'
import { Sun, Moon, User } from 'lucide-react'

export default function Header() {
    const { theme, toggleTheme } = useTheme()

    return (
        <header className="border-b border-gray-200 bg-white dark:bg-gray-800 dark:border-gray-700 transition-colors duration-300">
            <div className="container mx-auto px-4 py-4 flex justify-between items-center">
                <Link href="/" className="text-2xl font-bold">
                    Zap<span className="text-black dark:text-white">Learn</span>
                </Link>
                <nav className="flex items-center">
                    <ul className="flex space-x-4 mr-4">
                        <li><Link href="/courses" className="hover:text-gray-600 dark:hover:text-gray-300">Courses</Link></li>
                        <li><Link href="/my-courses" className="hover:text-gray-600 dark:hover:text-gray-300">My Courses</Link></li>
                        <li>
                            <Link href="/account">
                                <Button variant="outline" className="text-black dark:text-white border-black dark:border-white hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black">
                                    <User className="h-4 w-4 mr-2" />
                                    Account
                                </Button>
                            </Link>
                        </li>
                    </ul>
                    <Button variant="ghost" size="icon" onClick={toggleTheme}>
                        {theme === 'light' ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
                    </Button>
                </nav>
            </div>
        </header>
    )

}