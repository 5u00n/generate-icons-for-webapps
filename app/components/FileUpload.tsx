'use client'

import { Upload, X, CheckCircle } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'

interface FileUploadProps {
  onFileUpload: (file: File | null) => void
  fileInputRef: React.RefObject<HTMLInputElement>
  uploadedFile: File | null
}

export default function FileUpload({ onFileUpload, fileInputRef, uploadedFile }: FileUploadProps) {
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    const files = e.dataTransfer.files
    if (files.length > 0) {
      onFileUpload(files[0])
    }
  }

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files && files.length > 0) {
      onFileUpload(files[0])
    }
  }

  const clearFile = () => {
    onFileUpload(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  return (
    <div className="w-full">
      {!uploadedFile ? (
        <div
          className="border-2 border-dashed border-gray-300 rounded-xl p-12 text-center hover:border-blue-400 transition-colors cursor-pointer bg-gray-50 hover:bg-gray-100"
          onDrop={handleDrop}
          onDragOver={(e) => e.preventDefault()}
          onClick={() => fileInputRef.current?.click()}
        >
          <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-700 mb-2">Upload Your Icon</h3>
          <p className="text-gray-500 mb-4">Drag and drop your file here, or click to browse</p>
          <div className="flex flex-wrap justify-center gap-2">
            <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">PNG</span>
            <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">JPG</span>
            <span className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm">SVG</span>
          </div>
        </div>
      ) : (
        <Card className="bg-green-50 border-green-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <CheckCircle className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800">{uploadedFile.name}</h3>
                  <p className="text-sm text-gray-600">
                    {(uploadedFile.size / 1024).toFixed(1)} KB
                  </p>
                </div>
              </div>
              <button
                onClick={clearFile}
                className="p-2 hover:bg-red-100 rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-red-500" />
              </button>
            </div>
            <div className="mt-4">
              <img
                src={URL.createObjectURL(uploadedFile)}
                alt="Preview"
                className="w-20 h-20 object-contain mx-auto rounded-lg border border-gray-200"
              />
            </div>
          </CardContent>
        </Card>
      )}
      
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileSelect}
        className="hidden"
      />
    </div>
  )
}