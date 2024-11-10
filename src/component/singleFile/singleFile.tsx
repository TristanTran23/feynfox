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
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileClick = () => {
    fileInputRef.current?.click()
  }

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0]

    if (selectedFile) {
      // Check if file is PDF
      if (selectedFile.type === 'application/pdf') {
        setFile(selectedFile)
        setFileName(selectedFile.name)
      } else {
        alert('Please select a PDF file')
        // Reset the input
        if (fileInputRef.current) {
          fileInputRef.current.value = ''
        }
      }
    }
  }

  return (
    <Card className="mb-4 w-full">
      <CardContent className="pt-6 w-full">
        <div className="flex flex-col gap-4 w-full">
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

          <div className="flex flex-wrap gap-2">
            <Button
              variant="outline"
              className="flex items-center gap-2"
              disabled={!file}>
              <BookOpen className="w-4 h-4" />
              Start Learning
            </Button>
            <Button
              variant="destructive"
              onClick={onDelete}
              className="flex items-center gap-2">
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
