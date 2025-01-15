'use client'

import { useState, useEffect } from "react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {BookOpen} from "lucide-react";
import Link from "next/link";
import {Button} from "@/components/ui/button";

// this is hard coded static data cus no api yet
const initialMyCourses = [
    { id: 1, title: "NYC History 101", author: "Cigan", category: "History", flashCardCount: 50 },
    { id: 2, title: "Grade 9 Graphical", author: "Snowy", category: "Medias", flashCardCount: 75 },
]

export default function MyCoursesPage() {
    const [myCourses] = useState(initialMyCourses)

    useEffect(() => {
        // placement for an api call when I get round to making one
    }, []);

    return(
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-4xl font-bold mb-8">My Courses</h1>

            {myCourses.length === 0 ? (
                <p className="text-gray-600 dark:text-gray-400">You have not joined any courses yet?</p>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {myCourses.map(course => (
                        <Card key={course.id} className="dark:bg-gray-800">
                            <CardHeader>
                                <CardTitle className="flex justify-between items-start">
                                    <span className="text-xl font-bold">{course.title}</span>
                                    <Badge variant="outline" className="bg-white dark:bg-gray-800 text-black dark:text-white border-black dark:border-white">
                                        {course.category}
                                    </Badge>
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-gray-600 dark:text-gray-400 mb-2">By {course.author}</p>
                                <p className="flex items-center text-gray-600 dark:text-gray-400">
                                    <BookOpen className="w-4 h-4 mr-2" />
                                        {course.flashCardCount} flashcards
                                </p>
                            </CardContent>
                            <CardFooter>
                                <Link href={`/courses/${course.id}`} className="w-full">
                                    <Button className="w-full bg-black text-white dark:bg-white dark:text-black hover:bg-gray-800 dark:hover:bg-gray-200">
                                        Study Flashcards
                                    </Button>
                                </Link>
                            </CardFooter>
                        </Card>
                    ))}
                </div>
            )}

        </div>
    )

}