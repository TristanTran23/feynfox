import React, { useState } from 'react'
import { Mic, X } from 'lucide-react'

const VoiceRecorder = () => {
  const [isRecording, setIsRecording] = useState(false)

  const startRecording = () => {
    setIsRecording(true)
  }

  const stopRecording = () => {
    setIsRecording(false)
  }

  return (
    <div className="min-h-screen bg-emerald-50 flex flex-col items-center justify-center">
      <div className="relative">
        <div
          className={`
            w-48 h-48 rounded-full 
            ${isRecording ? 'bg-emerald-400' : 'bg-emerald-200'} 
            flex items-center justify-center
            transition-all duration-300
            ${isRecording ? 'animate-pulse shadow-lg shadow-emerald-300' : ''}
          `}
        >
          <div
            className={`
              w-40 h-40 rounded-full 
              ${isRecording ? 'bg-emerald-300' : 'bg-emerald-100'}
              flex items-center justify-center
              transition-all duration-300
            `}
          >
            <Mic
              className={`w-16 h-16 ${
                isRecording ? 'text-white animate-pulse' : 'text-emerald-600'
              }`}
            />
          </div>
        </div>

        {isRecording && (
          <button
            onClick={stopRecording}
            className="absolute -right-4 -top-4 p-2 bg-red-500 rounded-full text-white hover:bg-red-600 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        )}
      </div>

      {!isRecording && (
        <button
          onClick={startRecording}
          className="mt-8 px-6 py-3 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors font-medium"
        >
          Start Recording
        </button>
      )}
    </div>
  )
}

export default VoiceRecorder
