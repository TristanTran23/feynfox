import React, { useEffect, useState } from 'react'

import { Button } from '@/components/ui/button'
import { generateRightAndWrong } from '@/utils/claude'

const Results: React.FC = () => {
  // State to store the results from generateRightAndWrong function
  const [result, setResult] = useState<{
    score: number
    correct: string
    wrong: string
  } | null>(null)

  // Placeholder score for testing
  const [score, setScore] = useState<number>(0)

  // Determine the color based on score
  const scoreColor =
    score >= 80
      ? 'text-green-600'
      : score >= 50
      ? 'text-yellow-600'
      : 'text-red-600'

  // Fetch the comparison result on component mount
  useEffect(() => {
    const fetchComparison = async () => {
      const comparisonResult = await generateRightAndWrong() // Call the function to get result from Claude API
      console.log('comparisonResult: ', comparisonResult)

      // Parse the response (assuming it's a JSON formatted string)
      try {
        const jsonResult = JSON.parse(comparisonResult)
        setResult({
          score: jsonResult.score,
          correct: jsonResult.correct,
          wrong: jsonResult.wrong,
        })
        setScore(jsonResult.score)
      } catch (error) {
        console.error('Error parsing JSON response:', error)
      }
    }

    fetchComparison()
  }, []) // Empty dependency array to run this effect once on mount

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
          <p className="text-gray-700">{result?.correct || 'Loading...'}</p>
        </div>

        {/* Incorrect Explanation Box */}
        <div className="w-full p-6 border border-red-400 rounded-lg shadow-lg bg-red-50 flex flex-col items-center text-center">
          <h2 className="text-xl font-bold text-red-700 mb-4">
            Areas to Focus On
          </h2>
          <p className="text-gray-700">{result?.wrong || 'Loading...'}</p>
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
