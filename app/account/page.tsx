'use client'

import { useState, useRef } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Loader2, Upload } from 'lucide-react'
import { useToast } from "@/hooks/use-toast";

export default function AccountPage() {
    const [isLoading, setIsLoading] = useState(false)
    const [avatar, setAvatar] = useState('/placeholder.svg')
    const [username, setUsername] = useState('Hard Koded')
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

    const handlePasswordChange = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        setIsLoading(true)

        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1500))

        toast({
            title: "Password updated",
            description: "Your password has been changed.",
        })

        setIsLoading(false)
    }

    const handleUsernameChange = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        setIsLoading(true)

        // fake api call
        await new Promise(resolve => setTimeout(resolve, 1500))

        const formData = new FormData(event.currentTarget)
        const newUsername = formData.get('username') as string

        setUsername(newUsername)

        toast({
            title: "Username updated",
            description: "Your username has been changed.",
        })

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

