import { BookOpen, Loader2, Trash2, Upload } from 'lucide-react'
import React, { useRef, useState } from 'react'
import { embedPdf } from '@/utils/embed'

import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'

interface SingleFileProps {
  onDelete: () => void
}

const SingleFile: React.FC<SingleFileProps> = ({ onDelete }) => {
  const [fileName, setFileName] = useState<string>('Upload File')
  const [file, setFile] = useState<File | null>(null)
  const [isEmbedding, setIsEmbedding] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileClick = () => {
    fileInputRef.current?.click()
  }

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0]

    if (selectedFile) {
      if (selectedFile.type === 'application/pdf') {
        setFile(selectedFile)
        setFileName(selectedFile.name)
      } else {
        alert('Please select a PDF file')
        if (fileInputRef.current) {
          fileInputRef.current.value = ''
        }
      }
    }
  }

  const handleStartLearning = async () => {
    if (!file) return

    setIsEmbedding(true)
    try {
      const result = await embedPdf(file, 'your-openai-key-here')
      
      if (result.success) {
        alert('Document has been processed successfully!')
        window.location.href = '/recording'
      } else {
        throw new Error(result.error)
      }
    } catch (error) {
      alert(error instanceof Error ? error.message : "An unknown error occurred")
    } finally {
      setIsEmbedding(false)
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
              className="flex items-center gap-2 w-full justify-center">
              {!file && <Upload className="w-4 h-4" />}
              {fileName}
            </Button>
          </div>

          <div className="flex gap-2">
            <Button
              variant="outline"
              className="flex items-center gap-2 w-32"
              disabled={!file || isEmbedding}
              onClick={handleStartLearning}>
              {isEmbedding ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <BookOpen className="w-4 h-4" />
              )}
              {isEmbedding ? 'Processing...' : 'Start Learning'}
            </Button>
            <Button
              variant="destructive"
              onClick={onDelete}
              disabled={isEmbedding}
              className="flex items-center gap-2 w-32">
              <Trash2 className="w-4 h-4" />
              Delete
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default SingleFile
