'use client'

import { useState, useRef } from 'react'
import { Upload, Download, Image as ImageIcon, Loader2, Sparkles, Shield, Zap, CheckCircle, Star, Users, Clock } from 'lucide-react'
import FileUpload from './components/FileUpload'
import IconPreview from './components/IconPreview'
import { generateIcons } from './lib/iconGenerator'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

export default function Home() {
  const [uploadedFile, setUploadedFile] = useState<File | null>(null)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const [isGenerating, setIsGenerating] = useState(false)
  const [generatedIcons, setGeneratedIcons] = useState<Record<string, string> | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileUpload = (file: File | null) => {
    setUploadedFile(file)
    if (file) {
      const url = URL.createObjectURL(file)
      setPreviewUrl(url)
    } else {
      setPreviewUrl(null)
    }
    setGeneratedIcons(null)
  }

  const handleGenerate = async () => {
    if (!uploadedFile) return

    setIsGenerating(true)
    try {
      const icons = await generateIcons(uploadedFile)
      console.log('Generated icons:', Object.keys(icons))
      console.log('Apple touch icon present:', 'apple-touch-icon' in icons)
      setGeneratedIcons(icons)
    } catch (error) {
      console.error('Error generating icons:', error)
      alert('Error generating icons. Please try again.')
    } finally {
      setIsGenerating(false)
    }
  }

  const handleDownload = async () => {
    if (!generatedIcons) return

    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ icons: generatedIcons }),
      })

      if (!response.ok) {
        throw new Error('Failed to generate zip file')
      }

      const blob = await response.blob()
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = 'pwa-icons.zip'
      document.body.appendChild(a)
      a.click()
      window.URL.revokeObjectURL(url)
      document.body.removeChild(a)
    } catch (error) {
      console.error('Error downloading zip:', error)
      alert('Error downloading zip file. Please try again.')
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Hero Section */}
      <div className="relative overflow-hidden min-h-screen flex items-center">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/5 via-purple-600/5 to-indigo-600/5"></div>
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
        </div>
        
        <div className="relative mx-auto ">
          <div className="text-center mx-auto py-6">
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-100 to-purple-100 text-blue-800 px-6 py-3 rounded-full text-sm font-medium mb-8 shadow-lg">
              <Sparkles className="w-5 h-5" />
              Professional PWA Icon Generator
            </div>
            
            <h1 className="text-xl md:text-2xl lg:text-4xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent mb-8 leading-tight">
              Create Perfect 
              PWA Icons
            </h1>
            
            <div className="container bg-white/40 backdrop-blur-sm rounded-2xl p-4 mb-6 mx-auto border border-white/10 shadow-lg">
              <h2 className="text-base font-semibold text-gray-800 mb-2">What are PWA Icons?</h2>
              <p className="text-sm text-gray-700 leading-relaxed">
                Progressive Web App (PWA) icons represent your web app across devices and platforms—browser tabs, home screens, app stores, and bookmarks.
                <span className="font-semibold text-blue-600"> You need 11 different sizes</span> to make your app look professional everywhere.
              </p>
            </div>
            <p className="text-base md:text-sm text-muted-foreground mb-8 mx-auto leading-relaxed">
              Transform your logo into all the required Progressive Web App icon sizes instantly. 
              <span className="text-primary font-semibold"> Trusted by thousands of developers worldwide.</span>
            </p>

            {/* Upload Section in Hero */}
            <div className="container  mx-auto mb-16">
              <Card className="shadow-2xl border-0 bg-white/95 backdrop-blur-sm">
                <CardHeader className="text-center pb-4">
                  
                </CardHeader>
                <CardContent>
                  <FileUpload
                    onFileUpload={handleFileUpload}
                    fileInputRef={fileInputRef}
                    uploadedFile={uploadedFile}
                  />
                </CardContent>
              </Card>
            </div>

            {/* Trust Indicators */}
            <div className="flex flex-wrap justify-center gap-12 mb-16">
              <div className="flex items-center gap-3 text-muted-foreground bg-white/50 px-6 py-3 rounded-full backdrop-blur-sm">
                <Users className="w-6 h-6 text-blue-600" />
                <span className="font-semibold text-lg">10,000+ Users</span>
              </div>
              <div className="flex items-center gap-3 text-muted-foreground bg-white/50 px-6 py-3 rounded-full backdrop-blur-sm">
                <Shield className="w-6 h-6 text-green-600" />
                <span className="font-semibold text-lg">100% Secure</span>
              </div>
              <div className="flex items-center gap-3 text-muted-foreground bg-white/50 px-6 py-3 rounded-full backdrop-blur-sm">
                <Zap className="w-6 h-6 text-purple-600" />
                <span className="font-semibold text-lg">Instant Generation</span>
              </div>
            </div>

            {/* Last Updated Section */}
            <div className="flex justify-center mb-8">
              <div className="flex items-center gap-3 text-muted-foreground bg-white/40 px-6 py-3 rounded-full backdrop-blur-sm border border-white/20">
                <Clock className="w-5 h-5 text-indigo-600" />
                <span className="text-sm font-medium">Last Updated: {new Date(process.env.BUILD_TIME || new Date().toISOString()).toLocaleDateString('en-US', { 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit'
                })}</span>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
              <div className="text-center">
                <div className="text-4xl font-bold text-primary mb-2">11</div>
                <div className="text-muted-foreground">Icon Sizes</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-primary mb-2">5</div>
                <div className="text-muted-foreground">File Formats</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-primary mb-2">100%</div>
                <div className="text-muted-foreground">Free to Use</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-primary mb-2">24/7</div>
                <div className="text-muted-foreground">Available</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Preview and Generated Icons Sections */}
      {(previewUrl || generatedIcons) && (
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-4xl mx-auto">
            {/* Preview Section */}
            {previewUrl && (
              <Card className="mb-8 shadow-xl border-0 bg-white/90 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-2xl font-bold flex items-center gap-3">
                    <div className="p-2 bg-green-100 rounded-lg">
                      <ImageIcon className="w-5 h-5 text-green-600" />
                    </div>
                    Icon Preview & Generation
                  </CardTitle>
                  <CardDescription>
                    Preview all required PWA icon sizes and generate optimized versions
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <IconPreview previewUrl={previewUrl} />
                  
                  <div className="mt-8 flex justify-center">
                    <Button
                      onClick={handleGenerate}
                      disabled={isGenerating}
                      size="lg"
                      className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-3 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-200"
                    >
                      {isGenerating ? (
                        <>
                          <Loader2 className="mr-2 animate-spin" size={20} />
                          Generating Icons...
                        </>
                      ) : (
                        <>
                          <Sparkles className="mr-2" size={20} />
                          Generate All Icons
                        </>
                      )}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Generated Icons Section */}
            {generatedIcons && (
              <Card className="shadow-xl border-0 bg-white/90 backdrop-blur-sm">
                <CardHeader className="text-center">
                  <CardTitle className="text-3xl font-bold flex items-center justify-center gap-3">
                    <div className="p-2 bg-green-100 rounded-lg">
                      <CheckCircle className="w-6 h-6 text-green-600" />
                    </div>
                    Your PWA Icons Are Ready!
                  </CardTitle>
                  <CardDescription className="text-lg">
                    Download your complete icon package with manifest.json
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 mb-8">
                    {Object.entries(generatedIcons).map(([size, dataUrl]) => (
                      <div key={size} className="text-center group">
                        <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-4 mb-3 group-hover:shadow-lg transition-all duration-200 border border-gray-200">
                          <img
                            src={dataUrl}
                            alt={`${size} icon`}
                            className="mx-auto transition-transform group-hover:scale-105"
                            style={{ maxWidth: '100%', height: 'auto' }}
                          />
                        </div>
                        <p className="text-sm font-semibold text-gray-700">{size}</p>
                      </div>
                    ))}
                  </div>
                  
                  <div className="text-center">
                    <Button
                      onClick={handleDownload}
                      size="lg"
                      className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white px-12 py-4 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-200"
                    >
                      <Download className="mr-2" size={20} />
                      Download Complete Package
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="bg-gradient-to-r from-slate-900 to-slate-800 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-4 gap-8">
              <div className="md:col-span-2">
                <h3 className="text-2xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                  PWA Icon Generator
                </h3>
                <p className="text-slate-300 mb-4 max-w-md">
                  The most trusted tool for creating perfect Progressive Web App icons. 
                  Used by thousands of developers worldwide to create professional PWA experiences.
                </p>
                <div className="flex gap-4">
                  <div className="flex items-center gap-2 text-sm text-slate-400">
                    <Users className="w-4 h-4" />
                    <span>10,000+ Users</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-slate-400">
                    <Shield className="w-4 h-4" />
                    <span>100% Secure</span>
                  </div>
                </div>
              </div>
              
              <div>
                <h4 className="font-semibold mb-4">Features</h4>
                <ul className="space-y-2 text-sm text-slate-300">
                  <li>• All PWA icon sizes</li>
                  <li>• Instant generation</li>
                  <li>• High-quality output</li>
                  <li>• Manifest.json included</li>
                  <li>• Multiple formats</li>
                </ul>
              </div>
              
              <div>
                <h4 className="font-semibold mb-4">Supported Formats</h4>
                <ul className="space-y-2 text-sm text-slate-300">
                  <li>• PNG</li>
                  <li>• JPG/JPEG</li>
                  <li>• SVG</li>
                  <li>• WebP</li>
                  <li>• ICO</li>
                </ul>
              </div>
            </div>
            
            <div className="border-t border-slate-700 mt-8 pt-8 text-center text-sm text-slate-400">
              <p>&copy; 2024 PWA Icon Generator. Built with Next.js and deployed on Vercel.</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}