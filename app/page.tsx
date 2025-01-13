'use client'

import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import { Zap, Brain, Rocket, Clock } from 'lucide-react'
import Link from 'next/link'

export default function Home() {
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    setIsLoaded(true)
  }, []);

  return (
      <div
          className={`container mx-auto px-4 trainstion-opacity duration-500 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>

          {/* hero section */}
          <section className="py-20 text-center animate-fade-in">

              <h1 className="text-5xl font-bold mb-6">Supercharge your learning with ZapLearn</h1>
              <p className="text-xl text-gray-600 dark:text-gray-400 mb -8">Created by Students, for Students</p>
              <Button
                  className="bg-black text-white dark:bg-white dark:text-black hover:bg-gray-800 dark:hover:bg-gray-200 text-lg px-8 py-6 transition-all duration-300 transform hover:scale-105">
                  Get Started
              </Button>
          </section>

          {/* features section */}
          <section id="features" className="py-20 animate-fade-in" style={{animationDelay: '0.2s'}}>
              <div className="container mx-auto px-4">
                  <h2 className="text-3xl font-bold text-center mb-12">Features</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                      <Card className="dark:bg-gray-800 transition-all duration-300 hover:shadow-lg hover:scale-105">
                          <CardHeader>
                              <Zap className="w-10 h-10 text-black dark:text-white mb-4"/>
                              <CardTitle>Quick Learning</CardTitle>
                          </CardHeader>
                          <CardContent>
                              <CardDescription className="dark:text-gray-300">Accelerate your study sessions with our
                                  efficient learning techniques.</CardDescription>
                          </CardContent>
                      </Card>
                      <Card className="dark:bg-gray-800 transition-all duration-300 hover:shadow-lg hover:scale-105">
                          <CardHeader>
                              <Brain className="w-10 h-10 text-black dark:text-white mb-4"/>
                              <CardTitle>Private Courses</CardTitle>
                          </CardHeader>
                          <CardContent>
                              <CardDescription className="dark:text-gray-300">Want to learn in a private way with friends? That is 100% fine with us!</CardDescription>
                          </CardContent>
                      </Card>
                      <Card className="dark:bg-gray-800 transition-all duration-300 hover:shadow-lg hover:scale-105">
                          <CardHeader>
                              <Rocket className="w-10 h-10 text-black dark:text-white mb-4"/>
                              <CardTitle>Course Stats</CardTitle>
                          </CardHeader>
                          <CardContent>
                              <CardDescription className="dark:text-gray-300">Build the biggest course possible to be featured!</CardDescription>
                          </CardContent>
                      </Card>
                      <Card className="dark:bg-gray-800 transition-all duration-300 hover:shadow-lg hover:scale-105">
                          <CardHeader>
                              <Clock className="w-10 h-10 text-black dark:text-white mb-4"/>
                              <CardTitle>Time Management</CardTitle>
                          </CardHeader>
                          <CardContent>
                              <CardDescription className="dark:text-gray-300">Optimize your study schedule and make the
                                  most of your time.</CardDescription>
                          </CardContent>
                      </Card>
                  </div>
              </div>
          </section>

          {/* courses section */}
          <section className="py-20 animate-fade-in" style={{animationDelay: '0.4s'}}>
              <div className="container mx-auto px-4 text-center">
                  <h2 className="text-3xl font-bold mb-6">Explore Our Courses</h2>
                  <p className="text-xl text-gray-600 dark:text-gray-400 mb-8">Discover a wide range of courses created
                      by our users.</p>
                  <Link href="/courses">
                      <Button
                          className="bg-black text-white dark:bg-white dark:text-black hover:bg-gray-800 dark:hover:bg-gray-200 text-lg px-8 py-6 transition-all duration-300 transform hover:scale-105">
                          Browse Courses
                      </Button>
                  </Link>
              </div>
          </section>

          {/* cta section */}
          <section className="py-20 text-center animate-fade-in" style={{animationDelay: '0.6s'}}>
              <h2 className="text-3xl font-bold mb-6">Ready to get started?</h2>
              <p className="text-xl text-gray-600 dark:text-gray-400 mb-8">Join ZapLearn today and revolutionize your
                  learning experience.</p>
              <Button
                  className="bg-black text-white dark:bg-white dark:text-black hover:bg-gray-800 dark:hover:bg-gray-200 text-lg px-8 py-6 transition-all duration-300 transform hover:scale-105">
                  Start Free, Forever
              </Button>
          </section>

          <style jsx>{`
              @keyframes fadeIn {
                  from {
                      opacity: 0;
                      transform: translateY(20px);
                  }
                  to {
                      opacity: 1;
                      transform: translateY(0);
                  }
              }

              .animate-fade-in {
                  animation: fadeIn 0.5s ease-out forwards;
                  opacity: 0;
              }
          `}</style>

      </div>
  )

}