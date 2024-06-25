import React from 'react'

const CounterAction = () => {
  return (
    <div>
        <div className="container rounded mx-auto p-4">
    <div className="flex flex-col md:flex-row bg-white shadow-lg rounded-lg overflow-hidden">
      <div className="w-full md:w-1/2 p-8 flex flex-col justify-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          Want to learn Full-Stack developing by building fun and engaging projects?
        </h2>
        <p className="text-gray-600 mb-6">
          Check out these projects website and start building your own projects.
        </p>
        <a href='https://www.geeksforgeeks.org/best-full-stack-project-ideas/' target='_blank' className="bg-gray-700 text-white py-2 px-4 rounded-full transition duration-300 hover:from-gray-600 hover:to-gray-400">
          Full-Stack Projects
        </a>
      </div>
      <div className="w-full md:w-1/2 flex items-center justify-center p-2  bg-gray-100">
        <img 
          src="https://media.geeksforgeeks.org/wp-content/cdn-uploads/20230128123255/12-Best-Full-Stack-Projects-Ideas-in-2023.png" 
          alt="Top JS Project Ideas for Beginners" 
          className="max-w-full h-full"
        />
      </div>
    </div>
  </div></div>
  )
}

export default CounterAction