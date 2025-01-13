'use client'

import { useState } from 'react'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Search, BookOpen, Plus, Lock } from 'lucide-react'
import {useToast} from "@/hooks/use-toast";
import Link from "next/link";
import {CourseInvitation} from "@/app/components/CourseInvitation";
import {Toaster} from "@/components/ui/toaster";

const initialCourses = [
    { id: 1, title: "NYC History 101", author: "Snowy", authorAvatar: "/avatars/snowy.png", category: "History", enrolledCount: 12, isOwner: true, isPrivate: false },
]

const initialInvitations = [
    { id: 2, title: "Graphic Design Grade 9", author: "Cigan", authorAvatar: "/avatars/jayden.png", category: "Medias" }
]

export default function CoursesPage() {
    const [courses, setCourses] = useState(initialCourses)
    const [invitations, setInvitations] = useState(initialInvitations)
    const { toast } = useToast()

    const joinCourse = (courseId: number) => {
        setCourses(courses.map(course =>
            course.id === courseId
                ? { ...course, enrolledCount: course.enrolledCount + 1 }
                : course
        ))
        toast({
            title: "Course Joined",
            description: "The course has been added to your Courses list.",
        })
    }

    const acceptInvitation = (invitationId: number) => {
        const acceptedInvitation = invitations.find(inv => inv.id === invitationId)
        if (acceptedInvitation) {
            setCourses([...courses, { ...acceptedInvitation, enrolledCount: 1, isOwner: false, isPrivate: true }])
            setInvitations(invitations.filter(inv => inv.id !== invitationId))
        }
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-4xl font-bold">Browse Available Courses</h1>
                <Link href="/courses/create">
                    <Button>
                        <Plus className="h-4 w-4 mr-2" />
                        Create Course
                    </Button>
                </Link>
            </div>

            <div className="flex gap-4 mb-8">
                <div className="relative flex-grow">
                    <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <Input type="text" placeholder="Search all courses.." className="pl-10 bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-700 text-black dark:text-white" />
                </div>
                <Button className="bg-black text-white dark:bg-white dark:text-black hover:bg-gray-800 dark:hover:bg-gray-200">
                    Search
                </Button>
            </div>

            {invitations.length > 0 && (
                <div className="mb-12">
                    <h2 className="text-2xl font-bold mb-4">Private Course Invitations</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {invitations.map((invitation) => (
                            <CourseInvitation
                                key={invitation.id}
                                id={invitation.id}
                                title={invitation.title}
                                author={invitation.author}
                                authorAvatar={invitation.authorAvatar}
                                onAccept={acceptInvitation}
                            />
                        ))}
                    </div>
                </div>
            )}

            <h2 className="text-2xl font-bold mb-4">Available Courses</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {courses.map((course) => (
                    <Card key={course.id} className="dark:bg-gray-800">
                        <CardHeader>
                            <CardTitle className="flex justify-between items-start">
                                <span className="text-xl font-bold">{course.title}</span>
                                <div className="flex items-center">
                                    {course.isPrivate && <Lock className="h-4 w-4 mr-2 text-gray-500"/>}
                                    <Badge variant="outline"
                                           className="bg-white dark:bg-gray-800 text-black dark:text-white border-black dark:border-white">
                                        {course.category}
                                    </Badge>
                                </div>
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="flex items-center mb-4">
                                <Avatar className="h-10 w-10 mr-3">
                                    <AvatarImage src={course.authorAvatar} alt={course.author}/>
                                    <AvatarFallback>{course.author.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                                </Avatar>
                                <div>
                                    <p className="text-sm font-medium text-gray-900 dark:text-gray-100">{course.author}</p>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">Course Creator</p>
                                </div>
                            </div>
                            <p className="flex items-center text-gray-600 dark:text-gray-400 mb-4">
                                <BookOpen className="w-4 h-4 mr-2"/>
                                {course.enrolledCount.toLocaleString()} students enrolled
                            </p>
                            <div className="flex flex-wrap gap-2">
                                <Link href={`/courses/preview/${course.id}`} className="flex-1">
                                    <Button variant="outline" className="w-full">
                                        Preview
                                    </Button>
                                </Link>
                                {course.isOwner ? (
                                    <Link href={`/courses/manage/${course.id}`} className="flex-1">
                                        <Button variant="outline" className="w-full">
                                            Manage
                                        </Button>
                                    </Link>
                                ) : (
                                    <Button
                                        className="flex-1 w-full bg-black text-white dark:bg-white dark:text-black hover:bg-gray-800 dark:hover:bg-gray-200"
                                        onClick={() => joinCourse(course.id)}
                                    >
                                        Join Course
                                    </Button>
                                )}
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>

            <Toaster />
        </div>
    )
}