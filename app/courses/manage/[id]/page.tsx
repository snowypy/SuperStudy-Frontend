'use client'

import { useToast } from "@/hooks/use-toast"
import {useEffect, useRef, useState} from "react";
import {Loader2, Plus, Trash2} from "lucide-react";
import {Dialog, DialogHeader, DialogContent, DialogTitle, DialogTrigger} from "@/components/ui/dialog";
import {Button} from "@/components/ui/button";
import {Label} from "@/components/ui/label";
import {Textarea} from "@/components/ui/textarea";
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table";

interface FlashCard {
    id: number
    question: string
    answer: string
}

export default function ManageCoursePage() {
    const [isLoading, setIsLoading] = useState(true)
    const [flashcards, setFlashcards] = useState<FlashCard[]>([])
    const [isSubmitting, setIsSubmitting] = useState(false)
    const { toast } = useToast()
    const formRef = useRef<HTMLFormElement>(null)

    useEffect(() => {
        setTimeout(() => {
            setFlashcards([
                {id: 1, question: "What year did awel get a tesla?", answer: "2024"},
                {id: 2, question: "Asadasd", answer: "1661"}
            ])
            setIsLoading(false)
        }, 1000)
    }, []);

    const handleAddFlashcard = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setIsSubmitting(true)

        // fake api call cus no api yet
        await new Promise(resolve => setTimeout(resolve, 1000))

        if (formRef.current) {
            const questionInput = formRef.current.elements.namedItem('question') as HTMLTextAreaElement
            const answerInput = formRef.current.elements.namedItem('answer') as HTMLTextAreaElement

            const newFlashcard = {
                id: flashcards.length + 1,
                question: questionInput.value,
                answer: answerInput.value
            }

            setFlashcards([...flashcards, newFlashcard])

            toast({
                title: "Flashcard Added",
                description: "The new flashcard is now circulating."
            })

            formRef.current.reset()
        }

        setIsSubmitting(false)

    }

    const handleDeleteFlashcard = async (id: number) => {
        if (confirm('Are you sure you want to delete this flashcard?')) {
            setFlashcards(flashcards.filter(flashcard => flashcard.id !== id))
            toast({
                title: "Flashcard Deleted",
                description: "The flashcard has been removed from circulation."
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
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-4xl font-bold">Manage Course</h1>
                <Dialog>
                    <DialogTrigger asChild>
                        <Button>
                            <Plus className="h-4 w-4 mr-2" />
                            Add Flashcard
                        </Button>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Add Flashcard</DialogTitle>
                        </DialogHeader>
                        <form ref={formRef} onSubmit={handleAddFlashcard} className="space-y-4 mt-4">
                            <div className="space-y-2">
                                <Label htmlFor="question">Question</Label>
                                <Textarea
                                    id="question"
                                    name="question"
                                    required
                                    placeholder="Enter question"
                                    className="w-full min-h-[100px]"
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="answer">Answer</Label>
                                <Textarea
                                    id="answer"
                                    name="answer"
                                    required
                                    placeholder="Enter answer"
                                    className="w-full min-h-[100px]"
                                />
                            </div>

                            <Button
                                type="submit"
                                className="w-full"
                                disabled={isSubmitting}
                            >
                                {isSubmitting ? (
                                    <>
                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                        Adding Flashcard to systems...
                                    </>
                                ) : (
                                    'Add Flashcard'
                                )}
                            </Button>
                        </form>
                    </DialogContent>
                </Dialog>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Course Flashcards</CardTitle>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Questions</TableHead>
                                <TableHead>Answers</TableHead>
                                <TableHead className="w-[100px]">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {flashcards.map((flashcard) => (
                                <TableRow key={flashcard.id}>
                                    <TableCell className="font-medium">{flashcard.question}</TableCell>
                                    <TableCell>{flashcard.answer}</TableCell>
                                    <TableCell>
                                        <div className="flex space-x-2">
                                            <Button
                                                variant="outline"
                                                size="icon"
                                                onClick={() => handleDeleteFlashcard(flashcard.id)}
                                            >
                                                <Trash2 className="h-4 w-4" />
                                            </Button>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))}
                            {flashcards.length === 0 && (
                                <TableRow>
                                    <TableCell colSpan={3} className="text-center text-gray-500">
                                        No flashcards yet. Add some using the button above.
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    )

}