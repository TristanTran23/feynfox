import { BookOpen, Trash2, Upload } from 'lucide-react'
import React, { useRef, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'

interface SingleFileProps {
  onDelete: () => void
}

const SingleFile: React.FC<SingleFileProps> = ({ onDelete }) => {
  const [fileName, setFileName] = useState<string>('Upload File')
  const [file, setFile] = useState<File | null>(null)
  const [isProcessing, setIsProcessing] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  // Hardcoded UUID format user_id
  const HARDCODED_USER_ID = "123e4567-e89b-12d3-a456-426614174000" // This is a valid UUID format

  const handleFileClick = () => {
    fileInputRef.current?.click()
  }

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0]
    setError(null)

    if (selectedFile) {
      if (selectedFile.type === 'application/pdf') {
        setFile(selectedFile)
        setFileName(selectedFile.name)
        await processFile(selectedFile)
      } else {
        setError('Please select a PDF file')
        if (fileInputRef.current) {
          fileInputRef.current.value = ''
        }
      }
    }
  }

  const processFile = async (selectedFile: File) => {
    try {
      setIsProcessing(true)
      setError(null)

      const formData = new FormData()
      formData.append('file', selectedFile)
      formData.append('user_id', HARDCODED_USER_ID)  // Using UUID format

      const response = await fetch('http://localhost:8000/upload-pdf/', {
        method: 'POST',
        body: formData,
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.detail || 'Error processing PDF')
      }

      console.log('PDF processed successfully')
      
    } catch (error) {
      console.error('Processing error:', error)
      setError(error instanceof Error ? error.message : 'Failed to process PDF')
      setFile(null)
      setFileName('Upload File')
      if (fileInputRef.current) {
        fileInputRef.current.value = ''
      }
    } finally {
      setIsProcessing(false)
    }
  }

  return (
    <Card className="mb-4">
      <CardContent className="pt-6">
        <div className="flex justify-between items-start">
          <div className="w-64">
            <input
              type="file"
              ref={fileInputRef}
              accept=".pdf"
              onChange={handleFileChange}
              className="hidden"
            />

            <Button
              onClick={handleFileClick}
              disabled={isProcessing}
              className="flex items-center gap-2 w-full justify-center">
              {!file && <Upload className="w-4 h-4" />}
              {isProcessing ? 'Processing PDF...' : fileName}
            </Button>

            {error && (
              <p className="text-red-500 text-sm mt-2">{error}</p>
            )}
          </div>

          <div className="flex gap-2">
            <Button
              variant="outline"
              className="flex items-center gap-2 w-32"
              disabled={!file || isProcessing}
              onClick={() => (window.location.href = '/recording')}>
              <BookOpen className="w-4 h-4" />
              Start Learning
            </Button>
            <Button
              variant="destructive"
              onClick={onDelete}
              disabled={isProcessing}
              className="flex items-center gap-2 w-32">
              <Trash2 className="w-4 h-4" />
              Delete
            </Button>
          </div>
        </div>

        {isProcessing && (
          <p className="text-sm text-gray-500 mt-2">
            Processing PDF, please wait...
          </p>
        )}
      </CardContent>
    </Card>
  )
}

export default SingleFile
