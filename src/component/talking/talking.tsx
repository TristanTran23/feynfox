import React, { useState } from 'react'
import { Mic, RefreshCw, Check } from 'lucide-react'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import TopBar from '../topbar/bar'

const INITIAL_TOPICS = [
  {
    id: '1',
    title: 'Describe your perfect vacation',
    difficulty: 'Easy',
    duration: '2-3 mins',
  },
  {
    id: '2',
    title: 'The future of artificial intelligence',
    difficulty: 'Medium',
    duration: '3-4 mins',
  },
]

const Talking = () => {
  const [isRecording, setIsRecording] = useState(false)
  const [selectedTopic, setSelectedTopic] = useState('')
  const [confirmedTopic, setConfirmedTopic] = useState('')
  const [topics, setTopics] = useState(INITIAL_TOPICS)

  const currentTopic = topics.find((topic) => topic.id === confirmedTopic)

  const startRecording = () => {
    if (!confirmedTopic) {
      alert('Please confirm your topic first')
      return
    }
    setIsRecording(true)
  }

  const stopRecording = () => {
    setIsRecording(false)
  }

  const regenerateTopics = () => {
    setTopics([...topics].sort(() => Math.random() - 0.5))
    setSelectedTopic('')
    setConfirmedTopic('')
  }

  const confirmTopic = () => {
    if (!selectedTopic) {
      alert('Please select a topic first')
      return
    }
    setConfirmedTopic(selectedTopic)
  }

  const resetSelection = () => {
    setConfirmedTopic('')
    setSelectedTopic('')
  }

  return (
    <>
      <TopBar/>
      <div className="min-h-screen bg-emerald-50 flex flex-col items-center p-4 sm:p-8">
        <div className="w-full max-w-3xl flex flex-col items-center gap-8">
          <div className="w-full bg-white rounded-lg shadow-lg p-4 sm:p-6">
            {!confirmedTopic ? (
              <>
                <h2 className="text-xl sm:text-2xl font-semibold mb-4 text-emerald-800">
                  Pick Your Topic
                </h2>

                <div className="h-[400px] overflow-y-auto mb-4">
                  <RadioGroup
                    value={selectedTopic}
                    onValueChange={setSelectedTopic}
                  >
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead className="w-12"></TableHead>
                          <TableHead className="w-1/2">Topic</TableHead>
                          <TableHead className="w-1/4">Difficulty</TableHead>
                          <TableHead className="w-1/4">Duration</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {topics.map((topic) => (
                          <TableRow
                            key={topic.id}
                            className={
                              selectedTopic === topic.id ? 'bg-emerald-50' : ''
                            }
                          >
                            <TableCell className="p-2 sm:p-4">
                              <RadioGroupItem
                                value={topic.id}
                                id={topic.id}
                                className="text-emerald-600"
                              />
                            </TableCell>
                            <TableCell className="p-2 sm:p-4">
                              <Label
                                htmlFor={topic.id}
                                className="cursor-pointer text-sm sm:text-base"
                              >
                                {topic.title}
                              </Label>
                            </TableCell>
                            <TableCell className="p-2 sm:p-4 text-sm sm:text-base">
                              {topic.difficulty}
                            </TableCell>
                            <TableCell className="p-2 sm:p-4 text-sm sm:text-base">
                              {topic.duration}
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </RadioGroup>
                </div>

                <div className="flex justify-between items-center border-t pt-4">
                  <Button
                    onClick={regenerateTopics}
                    variant="outline"
                    className="flex items-center gap-2 text-emerald-600 hover:text-emerald-700"
                    size="sm"
                  >
                    <RefreshCw className="w-4 h-4" />
                    New Topics
                  </Button>

                  <Button
                    onClick={confirmTopic}
                    className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700"
                    size="sm"
                    disabled={!selectedTopic}
                  >
                    <Check className="w-4 h-4" />
                    Confirm Topic
                  </Button>
                </div>
              </>
            ) : (
              <>
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl sm:text-2xl font-semibold text-emerald-800">
                    Current Topic:
                  </h2>
                  <span className="text-md sm:text-2xl text-emerald-800">
                    {currentTopic?.title}
                  </span>
                  <Button
                    onClick={resetSelection}
                    variant="outline"
                    className="flex items-center gap-2 text-emerald-600 hover:text-emerald-700"
                    size="sm"
                  >
                    <RefreshCw className="w-4 h-4" />
                    Change Topic
                  </Button>
                </div>

                <div className="relative w-full h-[400px] bg-gray-100 rounded-lg mb-6 overflow-hidden">
                  <div className="absolute inset-0 flex justify-center items-center">
                    <div className="relative h-full w-[256px] flex items-center justify-center">
                      <img
                        src="/assets/fox1.png"
                        alt="Character"
                        className="h-[256px] w-[256px] object-contain mb-auto"
                      />
                    </div>

                    <div className="absolute bottom-8 left-8 right-8 bg-emerald-200 rounded-2xl p-4 shadow-lg">
                      <div
                        className="absolute -top-4 left-1/2 w-8 h-8 bg-emerald-200 -translate-x-1/2"
                        style={{ transform: 'rotate(225deg)' }}
                      />
                      <div className="relative bg-white rounded-xl p-4">
                        <p className="text-lg sm:text-xl font-medium text-gray-800">
                          Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                          sed do eiusmod tempor incididunt ut labore et dolore
                          magna aliqua. Ut enim ad minim veniam, quis nostrud
                          exercitation ullamco laboris nisi ut aliquip ex ea
                          commodo consequat.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>

          <div className="relative">
            <div
              className={`
                w-32 h-32 sm:w-48 sm:h-48 rounded-full 
                ${isRecording ? 'bg-emerald-400' : 'bg-emerald-200'} 
                flex items-center justify-center
                transition-all duration-300
                ${isRecording ? 'animate-pulse shadow-lg shadow-emerald-300' : ''}
              `}
            >
              <div
                className={`
                  w-24 h-24 sm:w-40 sm:h-40 rounded-full 
                  ${isRecording ? 'bg-emerald-300' : 'bg-emerald-100'}
                  flex items-center justify-center
                  transition-all duration-300
                `}
              >
                <Mic
                  className={`w-12 h-12 sm:w-16 sm:h-16 ${
                    isRecording ? 'text-white animate-pulse' : 'text-emerald-600'
                  }`}
                />
              </div>
            </div>
          </div>

          {isRecording && (
            <Button
              onClick={stopRecording}
              size="lg"
              className="bg-gray-500 hover:bg-gray-700"
              disabled={!confirmedTopic}
            >
              Cancel
            </Button>
          )}
          {!isRecording && (
            <Button
              onClick={startRecording}
              size="lg"
              className="bg-emerald-600 hover:bg-emerald-700"
              disabled={!confirmedTopic}
            >
              Start Recording
            </Button>
          )}
        </div>
      </div>
    </>
  )
}

export default Talking
