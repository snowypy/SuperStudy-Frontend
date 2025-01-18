'use client'

import React, {useEffect, useState} from "react";
import {useToast} from "@/hooks/use-toast";
import {Loader2, Plus, Trash2} from "lucide-react";
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import {Dialog, DialogHeader, DialogTrigger, DialogContent, DialogTitle} from "@/components/ui/dialog";
import {Button} from "@/components/ui/button";
import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input";
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table";

interface InviteCode {
    id: number
    code: string
    usageCap: number
    usageCount: number
    expiration: string
}

interface User {
    id: number
    name: string
    email: string
    role: string
    regdate: string
}

export default function AdminPage() {
    const [inviteCodes, setInviteCodes] = useState<InviteCode[]>([])
    const [users, setUsers] = useState<User[]>([])
    const [isLoading, setIsLoading] = useState(true)
    const [isSubmitting, setIsSubmitting] = useState(false)
    const { toast } = useToast()

    useEffect(() => {
        // fake api call cus no api yet :<>
        setTimeout(() => {
            setInviteCodes([
                {id: 1, code: "HI2025", usageCap: 2025, usageCount: 165, expiration: "2025-12-31"},
                {id: 2, code: "COMINGSOON", usageCap: 25, usageCount: 3, expiration: "2029-12-31"},
                {id: 3, code: "ZAPZAPZAP", usageCap: 5, usageCount: 1, expiration: "2025-4-20"},
            ])
            setUsers([
                {id: 1, name: "Awel", email: "awel@zap.learn", role: 'Contributor', regdate: "2024-12-31"},
                {id: 2, name: "Cigan", email: "cigan@zap.laern", role: 'Maintainer', regdate: "2024-12-31"}
            ])
            setIsLoading(false)
        }, 1000)
    }, [])

    const handleCreateInviteCode = async (e: React.FormEvent<HTMLFormElement>) => {

        e.preventDefault()
        setIsSubmitting(true)

        // fake api call cus no api yet
        await new Promise(resolve => setTimeout(resolve, 1000))

        const formData = new FormData(e.currentTarget)
        const newInviteCode = {
            id: inviteCodes.length + 1,
            code: formData.get('code') as string,
            usageCap: Number(formData.get('usageCap') as string),
            usageCount: 0,
            expiration: formData.get('expiration') as string
        }

        setInviteCodes([...inviteCodes, newInviteCode])

        toast({
            title: "Invite Code Created",
            description: "The new invite code is now circulating."
        })

        setIsSubmitting(false)
        ;(e.target as HTMLFormElement).reset()

    }

    const handleDeleteInviteCode = async (id: number) => {

        if (confirm('Are you certain you want to delete this code?')) {

            // fake api call cus no api yet
            await new Promise(resolve => setTimeout(resolve, 500))
            setInviteCodes(inviteCodes.filter(inviteCode => inviteCode.id !== id))
            toast({
                title: "Invite Code Deleted",
                description: "The invite code has been removed from circulation."
            })
        }

    }

    const handleDeleteUser = async (id: number) => {

            if (confirm('Are you certain you want to delete this user?')) {

                // fake api call cus no api yet
                await new Promise(resolve => setTimeout(resolve, 500))
                setUsers(users.filter(user => user.id !== id))
                toast({
                    title: "User Deleted",
                    description: "The user has been removed from the system."
                })
            }
    }

    if (isLoading) {
        return (
            <div className="container mx-auto px-4 py-8 flex justify-center items-center min-h-[400px]">
                <Loader2 className="h-8 w-8 animate-spin"/>
            </div>
        )
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-4xl font0bold mb-8">Admin Panel</h1>
            <Card className="mb-8">
                <CardHeader>
                    <CardTitle className="flex justify-between items-center">
                        <span>Invite Codes</span>
                        <Dialog>
                            <DialogTrigger>
                                <Button>
                                    <Plus className="h-4 w-4 mr-2"/>
                                    Create Invite Code
                                </Button>
                            </DialogTrigger>
                            <DialogContent>
                                <DialogHeader>
                                    <DialogTitle>Create New Invite Code</DialogTitle>
                                </DialogHeader>
                                <form onSubmit={handleCreateInviteCode} className="space-y-4 mt-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="code">Code</Label>
                                        <Input id="code" name="code" required/>
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="usageCap">Usage Cap</Label>
                                        <Input id="usageCap" name="usageCap" type="number" required/>
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="expiration">Expiration</Label>
                                        <Input id="expiration" name="expiration" type="date" required/>
                                    </div>
                                    <Button type="submit" disabled={isSubmitting}>
                                        {isSubmitting ? (
                                            <>
                                                <Loader2 className="mr-2 h-4 w-4 animate-spin"/>
                                                Creating...
                                            </>
                                        ) : (
                                            "Generate Invite Code"
                                        )}
                                    </Button>
                                </form>
                            </DialogContent>
                        </Dialog>
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Code</TableHead>
                                <TableHead>Usage Cap</TableHead>
                                <TableHead>Usage Count</TableHead>
                                <TableHead>Expiration</TableHead>
                                <TableHead>Action</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {inviteCodes.map(inviteCode => (
                                <TableRow key={inviteCode.id}>
                                    <TableCell>{inviteCode.code}</TableCell>
                                    <TableCell>{inviteCode.usageCount}</TableCell>
                                    <TableCell>{inviteCode.expiration}</TableCell>
                                    <TableCell>{inviteCode.usageCap}</TableCell>
                                    <TableCell>
                                        <Button
                                            variant="destructive"
                                            size="sm"
                                            onClick={() => handleDeleteInviteCode(inviteCode.id)}
                                        >
                                            <Trash2 className="h-4 w-4"/>
                                            Delete
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    )

}