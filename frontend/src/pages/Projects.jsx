import React from 'react'
import CounterAction from '@/assets/Counteraction'

const Projects = () => {
  return (
    <div className="min-h-screen bg-gradient-to-r from-gray-800 to-gray-500 text-white p-6">
      <div className="max-w-5xl mt-16 text-center mx-auto">
        <h1 className="text-3xl font-bold mb-4">Projects...</h1>
        <h2 className="text-2xl font-bold text-gray-950 mb-4">
          Want to learn Full-Stack developing by building fun and engaging projects?
        </h2>
        <CounterAction/>
      </div>
    </div>
  )
}

export default Projects