'use client'

import { useState, useRef } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Loader2, Upload } from 'lucide-react'
import Cookie from 'js-cookie'
import { useToast } from "@/hooks/use-toast";

export default function AccountPage() {
    const [isLoading, setIsLoading] = useState(false)
    const [avatar, setAvatar] = useState('/placeholder.svg')

    const fetchUsername = async () => {
        const userId = Cookie.get('userId')?.toString() || ''
        const response = await fetch(`https://zap-api.snowy.codes/users/${userId}`)
        const data = await response.json()
        setUsername(data.username)
    }

    const [username, setUsername] = useState(fetchUsername() || 'Fetching..')
    const fileInputRef = useRef<HTMLInputElement>(null)
    const { toast } = useToast()

    const handleAvatarClick = () => {
        fileInputRef.current?.click()
    }

    

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0]
        if (file) {
            const reader = new FileReader()
            reader.onload = (e) => {
                setAvatar(e.target?.result as string)
            }
            reader.readAsDataURL(file)
        }
    }

    const handlePasswordChange = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsLoading(true)

        const form = e.currentTarget as HTMLFormElement
        const oldPassword = (form.elements[0] as HTMLInputElement).value
        const newPassword = (form.elements[1] as HTMLInputElement).value
        const confirmPassword = (form.elements[2] as HTMLInputElement).value
        const userId = Cookie.get('userId')?.toString() || ''

        if (newPassword !== confirmPassword) {
            toast({
                title: "Password mismatch",
                description: "New password and confirm password do not match.",
                variant: 'destructive'
            })
            setIsLoading(false)
            return
        }

        try {
            const response = await fetch('https://zap-api.snowy.codes/users/change-password', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    userId,
                    oldPassword,
                    newPassword
                })
            })

            const data = await response.json()

            if (!response.ok) {
                toast({
                    title: "Error",
                    description: data.message,
                    variant: 'destructive'
                })
            } else {
                toast({
                    title: "Password Changed",
                    description: data.success,
                })
            }
            form.reset()
        } catch (error) {
            toast({
                title: "Error",
                description: error instanceof Error ? error.message : 'An unexpected error occurred',
                variant: 'destructive'
            })
        } finally {
            setIsLoading(false)
        }
    }

    const handleUsernameChange = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        setIsLoading(true)

        const formData = new FormData(event.currentTarget)
        const newUsername = formData.get('username') as string

        if (newUsername === username) {
            toast({
                title: "Username unchanged",
                description: "You have not changed your username.",
                variant: 'destructive'
            })
            setIsLoading(false)
            return
        } else {
            fetch('https://zap-api.snowy.codes/users/change-username', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    userId: Cookie.get('userId')?.toString() || '',
                    username: newUsername
                })
            })
            .then(res => res.json())
            .then(data => {
                if (data.success) {
                    toast({
                        title: "Username updated",
                        description: data.success,
                    })
                } else {
                    toast({
                        title: "Error",
                        description: data.message,
                        variant: 'destructive'
                    })
                }
            })
        }
        setUsername(newUsername)

        setIsLoading(false)
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-4xl font-bold mb-8">Account Management</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <Card>
                    <CardHeader>
                        <CardTitle>Profile Picture</CardTitle>
                    </CardHeader>
                    <CardContent className="flex flex-col items-center">
                        <Avatar className="w-32 h-32 cursor-pointer" onClick={handleAvatarClick}>
                            <AvatarImage src={avatar} alt="Profile picture" />
                            <AvatarFallback>
                                <Upload className="w-8 h-8" />
                            </AvatarFallback>
                        </Avatar>
                        <input
                            type="file"
                            ref={fileInputRef}
                            onChange={handleFileChange}
                            accept="image/*"
                            className="hidden"
                        />
                        <p className="mt-4 text-sm text-gray-500 dark:text-gray-400">
                            Click on the avatar to upload a new profile picture
                        </p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Change Username</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleUsernameChange} className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="username">New Username</Label>
                                <Input
                                    id="username"
                                    name="username"
                                    type="text"
                                    required
                                    defaultValue={username}
                                />
                            </div>
                            <Button type="submit" disabled={isLoading}>
                                {isLoading ? (
                                    <>
                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                        Updating...
                                    </>
                                ) : (
                                    'Update Username'
                                )}
                            </Button>
                        </form>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Change Password</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handlePasswordChange} className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="current-password">Current Password</Label>
                                <Input id="current-password" type="password" required />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="new-password">New Password</Label>
                                <Input id="new-password" type="password" required />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="confirm-password">Confirm New Password</Label>
                                <Input id="confirm-password" type="password" required />
                            </div>
                            <Button type="submit" disabled={isLoading}>
                                {isLoading ? (
                                    <>
                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                        Updating...
                                    </>
                                ) : (
                                    'Update Password'
                                )}
                            </Button>
                        </form>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Invitation Information</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-gray-600 dark:text-gray-400">
                            You were invited by: <span className="font-semibold">Snowy</span>
                        </p>
                        <p className="text-gray-600 dark:text-gray-400 mt-2">
                            Invitation date: <span className="font-semibold">January 13, 2025</span>
                        </p>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
