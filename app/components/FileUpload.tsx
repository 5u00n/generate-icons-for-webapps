'use client'

import { useRef, useCallback } from 'react'
import { Upload, X, FileImage, CheckCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'

interface FileUploadProps {
  onFileUpload: (file: File | null) => void
  fileInputRef: React.RefObject<HTMLInputElement>
  uploadedFile: File | null
}

export default function FileUpload({ onFileUpload, fileInputRef, uploadedFile }: FileUploadProps) {
  const handleFileChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      onFileUpload(file)
    }
  }, [onFileUpload])

  const handleDrop = useCallback((event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault()
    const file = event.dataTransfer.files[0]
    if (file) {
      onFileUpload(file)
    }
  }, [onFileUpload])

  const handleDragOver = useCallback((event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault()
  }, [])

  const clearFile = () => {
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
    onFileUpload(null)
  }

  return (
    <div className="w-full">
      {!uploadedFile ? (
        <Card className="border-2 border-dashed border-muted-foreground/25 hover:border-primary/50 transition-all duration-200 bg-gradient-to-br from-background to-muted/20">
          <CardContent className="p-12">
            <div
              className="text-center cursor-pointer group"
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              onClick={() => fileInputRef.current?.click()}
            >
              <div className="w-20 h-20 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-200">
                <Upload className="w-10 h-10 text-blue-600" />
              </div>
              
              <h3 className="text-2xl font-semibold mb-3 text-foreground">
                Drop your image here
              </h3>
              
              <p className="text-lg text-muted-foreground mb-6">
                or <span className="text-primary font-medium underline">click to browse</span>
              </p>
              
              <div className="flex flex-wrap justify-center gap-2 text-sm text-muted-foreground">
                <span className="bg-muted px-3 py-1 rounded-full">PNG</span>
                <span className="bg-muted px-3 py-1 rounded-full">JPG</span>
                <span className="bg-muted px-3 py-1 rounded-full">JPEG</span>
                <span className="bg-muted px-3 py-1 rounded-full">SVG</span>
              </div>
              
              <input
                ref={fileInputRef}
                type="file"
                accept="image/png,image/jpeg,image/jpg,image/svg+xml"
                onChange={handleFileChange}
                className="hidden"
              />
            </div>
          </CardContent>
        </Card>
      ) : (
        <Card className="border border-border bg-gradient-to-br from-green-50 to-emerald-50">
          <CardContent className="p-6">
            <div className="flex items-start justify-between mb-6">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-gradient-to-br from-green-100 to-emerald-100 rounded-xl flex items-center justify-center">
                  <FileImage className="w-8 h-8 text-green-600" />
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="text-lg font-semibold text-foreground">{uploadedFile.name}</h3>
                    <CheckCircle className="w-5 h-5 text-green-600" />
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {(uploadedFile.size / 1024 / 1024).toFixed(2)} MB • Ready to process
                  </p>
                </div>
              </div>
              
              <Button
                variant="ghost"
                size="sm"
                onClick={clearFile}
                className="text-muted-foreground hover:text-destructive"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
            
            <div className="bg-white rounded-xl p-6 border border-border/50 shadow-sm">
              <img
                src={URL.createObjectURL(uploadedFile)}
                alt="Uploaded file preview"
                className="max-w-full max-h-64 mx-auto rounded-lg shadow-sm"
              />
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
