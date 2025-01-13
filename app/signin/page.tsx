'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import Link from 'next/link'

export default function SignIn() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        console.log('Hey, this route actually does nothing right now ;3 I am just a placeholder')
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 px-4 sm:px-6 lg:px-8">
            <div className="bg-white dark:bg-gray-800 p-6 sm:p-8 rounded-lg shadow-md w-full max-w-md">
                <h1 className="text-2xl sm:text-3xl font-bold mb-6 text-center">Sign In</h1>
                <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
                    <div className="space-y-2">
                        <Label htmlFor="email" className="text-sm font-medium">Email</Label>
                        <Input
                            id="email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="w-full"
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="password" className="text-sm font-medium">Password</Label>
                        <Input
                            id="password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="w-full"
                        />
                    </div>
                    <Button type="submit" className="w-full text-sm sm:text-base">Sign In</Button>
                </form>
                <p className="mt-6 text-center text-sm text-gray-600 dark:text-gray-400">
                    Need an account?{' '}
                    <Link href="/signup" className="text-blue-500 hover:underline">
                        Sign up
                    </Link>
                </p>
            </div>
        </div>
    )
}