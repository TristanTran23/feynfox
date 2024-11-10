import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'
import SingleFile from '../singleFile/singleFile'
import TopBar from '../topbar/bar'

const ProfileHome: React.FC = () => {
  const [files, setFiles] = useState<number[]>([])

  const addNewFile = () => {
    setFiles((prev) => [...prev, Date.now()]) // Using timestamp as unique key
  }

  const deleteFile = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index))
  }

  return (
    <>
      <TopBar />  
      <div className="p-6 bg-emerald-50 min-h-screen">
        <h2 className="text-2xl font-bold text-center">Your Profile</h2>
        <div className="items-center justify-between mb-6">
          <Button onClick={addNewFile} className="flex items-center gap-2">
            <Plus className="w-4 h-4" />
            Add New File
          </Button>
        </div>

        {files.map((fileId, index) => (
          <SingleFile key={fileId} onDelete={() => deleteFile(index)} />
        ))}

        {files.length === 0 && (
          <p className="text-center text-gray-500 mt-8">
            No files added yet. Click "Add New File" to get started.
          </p>
        )}
      </div>
    </>
  )
}

export default ProfileHome
