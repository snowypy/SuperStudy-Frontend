'use client'

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ChevronLeft, ChevronRight } from "lucide-react";

const flashcards = [
    { id: 1, question: "What year did awel get a tesla?", answer: "2024" },
    { id: 2, question: "Asadasd", answer: "1661" }
]

export default function CourseFlashCardsPage() {
    const [currentCardIndex, setCurrentCardIndex] = useState(0)
    const [showAnswer, setShowAnswer] = useState(false)
    const [direction, setDirection] = useState(0)

    const nextCard = () => {
        setDirection(1)
        setCurrentCardIndex((prevIndex) => (prevIndex + 1) % flashcards.length)
        setShowAnswer(false)
    }

    const prevCard = () => {
        setDirection(-1)
        setCurrentCardIndex((prevIndex) => (prevIndex -1 + flashcards.length) % flashcards.length)
        setShowAnswer(false)
    }

    const toggleAnswer = () => {
        setShowAnswer(!showAnswer)
    }

    const currentCard = flashcards[currentCardIndex]

    const slideVariants = {
        enter: (direction: number) => ({
            x: direction > 0 ? 1000 : -1000,
            opacity: 0,
        }),
        center: {
            x: 0,
            opacity: 1,
        },
        exit: (direction: number) => ({
            x: direction < 0 ? 1000 : -1000,
            opacity: 0,
        }),
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-4xl font-bold mb-8">Flash Cards</h1>
            <div className="flex flex-col items-center max-w-3xl mx-auto">
                <div className="w-full mb-4 flex items-center justify-between">
                    <Button
                        onClick={prevCard}
                        variant="outline"
                        className="border-black dark:border-white text-black dark:text-white hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black"
                    >
                        <ChevronLeft className="h-4 w-4 mr-2"/>
                        Back
                    </Button>
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      Card {currentCardIndex + 1} of {flashcards.length}
                    </span>
                    <Button
                        onClick={nextCard}
                        variant="outline"
                        className="border-black dark:border-white text-black dark:text-white hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black"
                    >
                        Next
                        <ChevronRight className="h-4 w-4 ml-2"/>
                    </Button>
                </div>

                <AnimatePresence mode="wait" custom={direction}>
                    <motion.div
                        key={currentCardIndex}
                        custom={direction}
                        variants={slideVariants}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        transition={{ type: 'tween', duration: 0.5 }}
                        className="w-full"
                    >
                        <Card className="w-full min-h-[300px] bg-white dark:bg-gray-800 border-black dark:border-white shadow-lg">
                            <CardContent className="flex items-center justify-center h-full p-8">
                                <AnimatePresence mode="wait">
                                    <motion.div
                                        key={showAnswer ? 'answer' : 'question'}
                                        initial={{ rotateY: 90, opacity: 0 }}
                                        animate={{ rotateY: 0, opacity: 1 }}
                                        exit={{ rotateY: -90, opacity: 0 }}
                                        transition={{ duration: 0.3 }}
                                        className="w-full h-full flex flex-col items-center justify-center text-center"
                                    >
                                        <h2 className="text-xl font-semibold mb-4">{showAnswer ? 'Answer' : 'Question'}</h2>
                                        <p className="text-lg">
                                            {showAnswer ? currentCard.answer : currentCard.question}
                                        </p>
                                    </motion.div>
                                </AnimatePresence>
                            </CardContent>
                        </Card>
                    </motion.div>
                </AnimatePresence>

                <Button
                    onClick={toggleAnswer}
                    className="mt-6 bg-black text-white dark:bg-white dark:text-black hover:bg-gray-800 dark:hover:bg-gray-200"
                >
                    {showAnswer ? 'Show Question' : 'Show Answer'}
                </Button>

                <div className="mt-6 text-center">
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                        Use the arrow buttons to navigate through cards. Click the button to flip!
                    </p>
                </div>

            </div>
        </div>
    )
}