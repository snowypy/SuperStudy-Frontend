'use client'

import { useState } from "react";
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import { Label } from "@radix-ui/react-label";
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";

export default function CreateCoursesPage() {
    const [isSubmitting, setisSubmitting] = useState(false)
    const { toast } = useToast()

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setisSubmitting(true)

        // fake api call cus no api yet
        await new Promise(resolve => setTimeout(resolve, 1000))

        toast({
            title: "Course Created",
            description: "You can now add flashcards to your course!"
        })

        setisSubmitting(false)
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-4xl font-bold mb-8">Create Course</h1>

            <Card className="max-w-2xl mx-auto">
                <CardHeader>
                    <CardTitle>Course Info</CardTitle>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="space-y-2">
                            <Label htmlFor="title">Course Title</Label>
                            <Input
                                id="title"
                                required
                                placeholder="The course title"
                                className="w-full"
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="description">Course Description</Label>
                            <Input
                                id="description"
                                required
                                placeholder="The description"
                                className="w-full min-h-[50px]"
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="category">Category</Label>
                            <Input
                                id="category"
                                required
                                placeholder="Your custom category."
                                className="w-full"
                            />
                        </div>

                        <Button
                            type="submit"
                            className="w-full"
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin"/>
                                </>
                            ) : (
                                'Create Course'
                            )}
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    )
}