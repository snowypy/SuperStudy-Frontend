'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { toast } from '@/hooks/use-toast'
import Link from 'next/link'

export default function SignUp() {
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [inviteCode, setInviteCode] = useState('')

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        fetch('https://zap-api.snowy.codes/users/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, email, password, inviteCode })
        })
        .then(res => res.json())
        .then(data => {
            if (data.success) {
                toast({
                    title: 'Successful Registration',
                    description: data.success
                })
                setTimeout(() => {
                    window.location.href = '/signin';
                }, 3000);
            } else {
                toast({
                    title: 'Failed Registration',
                    description: data.message,
                    variant: 'destructive'
                })
            }
        })
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 px-4 sm:px-6 lg:px-8">
            <div className="bg-white dark:bg-gray-800 p-6 sm:p-8 rounded-lg shadow-md w-full max-w-md">
                <h1 className="text-2xl sm:text-3x1 font-bold mb-6 text-center">Sign Up</h1>
                <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
                    <div className="space-y-2">
                        <Label htmlFor="name" className="text-sm font-medium">Username</Label>
                        <Input
                            id="username"
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                            className="w-full"
                        />
                    </div>
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
                    <div className="space-y-2">
                        <Label htmlFor="inviteCode" className="text-sm font-medium">Invite Code</Label>
                        <Input
                            id="inviteCode"
                            type="text"
                            value={inviteCode}
                            onChange={(e) => setInviteCode(e.target.value)}
                            className="w-full"
                        />
                    </div>
                    <Button type="submit" className="w-full text-sm sm:text-base">Sign Up</Button>
                </form>
                <p className="mt-6 text-center text-sm text-gray-600 dark:text-gray-400">
                    Already have an account?{' '}
                    <Link href="/signin" className="text-blue-500 hover:underline">
                        Sign in
                    </Link>
                </p>
            </div>
        </div>
    )

}