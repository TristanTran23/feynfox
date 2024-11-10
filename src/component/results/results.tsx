import React from 'react'
import { Button } from '@/components/ui/button'

const Results: React.FC = () => {
  // Placeholder score for testing
  const score = 0

  // Determine the color based on score
  const scoreColor =
    score >= 80
      ? 'text-green-600'
      : score >= 50
      ? 'text-yellow-600'
      : 'text-red-600'

  return (
    <div className="p-8 max-w-3xl mx-auto bg-emerald-50 min-h-screen">
      <h1 className="text-4xl font-bold text-center mb-6">Results</h1>

      {/* Score Display */}
      <div className="text-center mb-10">
        <p className="text-3xl font-semibold">
          Score: <span className={scoreColor}>{score}/100</span>
        </p>
      </div>

      {/* Explanation Boxes */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
        {/* Correct Explanation Box */}
        <div className="w-full p-6 border border-green-400 rounded-lg shadow-lg bg-green-50 flex flex-col items-center text-center">
          <h2 className="text-xl font-bold text-green-700 mb-4">
            What You Did Well
          </h2>
          <p className="text-gray-700">placeholder text</p>
        </div>

        {/* Incorrect Explanation Box */}
        <div className="w-full p-6 border border-red-400 rounded-lg shadow-lg bg-red-50 flex flex-col items-center text-center">
          <h2 className="text-xl font-bold text-red-700 mb-4">
            Areas to Focus On
          </h2>
          <p className="text-gray-700">placeholder text</p>
        </div>
      </div>

      {/* Navigation Buttons */}
      <div className="flex justify-center gap-4">
        <Button onClick={() => (window.location.href = '/profile')}>
          Profile Page
        </Button>
        <Button onClick={() => (window.location.href = '/recording')}>
          Try Again
        </Button>
      </div>
    </div>
  )
}

export default Results
