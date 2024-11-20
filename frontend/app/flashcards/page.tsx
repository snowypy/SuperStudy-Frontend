'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus, X, Eye, EyeOff } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

interface Flashcard {
  id: number
  question: string
  answer: string
}

export default function Flashcards() {
  const [flashcards, setFlashcards] = useState<Flashcard[]>([])
  const [newCard, setNewCard] = useState({ question: '', answer: '' })
  const [revealedCards, setRevealedCards] = useState<number[]>([])
  const [isCreating, setIsCreating] = useState(false)

  const createFlashcard = () => {
    if (newCard.question && newCard.answer) {
      setFlashcards([...flashcards, { ...newCard, id: Date.now() }])
      setNewCard({ question: '', answer: '' })
      setIsCreating(false)
    }
  }

  const toggleReveal = (id: number) => {
    setRevealedCards(prev =>
      prev.includes(id) ? prev.filter(cardId => cardId !== id) : [...prev, id]
    )
  }

  const deleteFlashcard = (id: number) => {
    setFlashcards(flashcards.filter(card => card.id !== id))
    setRevealedCards(revealedCards.filter(cardId => cardId !== id))
  }

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-purple-900 via-black to-indigo-900 p-8">
      <div className="absolute inset-0 grid grid-cols-[repeat(40,1fr)] grid-rows-[repeat(40,1fr)]">
        {[...Array(1600)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.3 }}
            transition={{ delay: Math.random() * 2, duration: 2, repeat: Infinity, repeatType: 'reverse' }}
            className="w-1 h-1 bg-yellow-300 rounded-full"
          />
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10"
      >
        <h1 className="text-4xl font-bold text-white mb-8 text-center">Flashcards</h1>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 max-w-7xl mx-auto">
          {flashcards.map(card => (
            <motion.div
            key={card.id}
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 200, damping: 20 }}
            className="backdrop-blur-xl bg-white/10 rounded-lg shadow-2xl border border-white/20 p-4 aspect-[5/3] flex flex-col max-w-sm"
          >
              <div className="flex justify-between items-start mb-4">
                <h2 className="text-xl font-semibold text-white">{card.question}</h2>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => deleteFlashcard(card.id)}
                  className="text-white hover:text-red-500"
                >
                  <X size={20} />
                </Button>
              </div>
              <AnimatePresence>
                {revealedCards.includes(card.id) && (
                  <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="text-gray-300 flex-grow"
                  >
                    {card.answer}
                  </motion.p>
                )}
              </AnimatePresence>
              <Button
                onClick={() => toggleReveal(card.id)}
                className="mt-4 bg-yellow-300 text-purple-900 hover:bg-yellow-400"
              >
                {revealedCards.includes(card.id) ? (
                  <>
                    <EyeOff size={20} className="mr-2" /> Hide Answer
                  </>
                ) : (
                  <>
                    <Eye size={20} className="mr-2" /> Reveal Answer
                  </>
                )}
              </Button>
            </motion.div>
          ))}

          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 200, damping: 20 }}
            className="backdrop-blur-xl bg-purple-500/30 rounded-lg shadow-2xl border border-white/20 p-4 aspect-[5/3] flex flex-col justify-center items-center cursor-pointer max-w-sm"
            onClick={() => setIsCreating(true)}
          >
            {isCreating ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="w-full space-y-4"
              >
                <Input
                  placeholder="Question"
                  value={newCard.question}
                  onChange={(e) => setNewCard({ ...newCard, question: e.target.value })}
                  className="bg-white/10 border-white/20 text-white placeholder-gray-400"
                />
                <Input
                  placeholder="Answer"
                  value={newCard.answer}
                  onChange={(e) => setNewCard({ ...newCard, answer: e.target.value })}
                  className="bg-white/10 border-white/20 text-white placeholder-gray-400"
                />
                <Button onClick={createFlashcard} className="w-full bg-yellow-300 text-purple-900 hover:bg-yellow-400">
                  Create Flashcard
                </Button>
              </motion.div>
            ) : (
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="flex flex-col items-center text-white"
              >
                <Plus size={40} />
                <p className="mt-2 text-lg font-semibold">Create New Flashcard</p>
              </motion.div>
            )}
          </motion.div>
        </div>
      </motion.div>
    </div>
  )
}