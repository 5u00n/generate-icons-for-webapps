'use client'

import { Smartphone, Monitor, Tablet, Globe } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'

interface IconPreviewProps {
  previewUrl: string
}

export default function IconPreview({ previewUrl }: IconPreviewProps) {
  const iconSizes = [
    { size: '16x16', name: 'Favicon Small', description: 'Browser tab icon', category: 'Web', icon: Globe },
    { size: '32x32', name: 'Favicon Medium', description: 'Browser tab icon', category: 'Web', icon: Globe },
    { size: '48x48', name: 'Android Small', description: 'Android launcher', category: 'Android', icon: Smartphone },
    { size: '72x72', name: 'Android Medium', description: 'Android launcher', category: 'Android', icon: Smartphone },
    { size: '96x96', name: 'Android Large', description: 'Android launcher', category: 'Android', icon: Smartphone },
    { size: '144x144', name: 'Android XL', description: 'Android launcher', category: 'Android', icon: Smartphone },
    { size: '152x152', name: 'iOS Small', description: 'iOS home screen', category: 'iOS', icon: Smartphone },
    { size: '180x180', name: 'iOS Medium', description: 'iOS home screen', category: 'iOS', icon: Smartphone },
    { size: '192x192', name: 'Android XXL', description: 'Android launcher', category: 'Android', icon: Smartphone },
    { size: '512x512', name: 'Android XXXL', description: 'Android launcher', category: 'Android', icon: Smartphone },
    { size: '1024x1024', name: 'Apple Splash', description: 'iOS splash screen', category: 'iOS', icon: Tablet },
  ]

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Web': return 'from-blue-100 to-blue-200 text-blue-700'
      case 'Android': return 'from-green-100 to-green-200 text-green-700'
      case 'iOS': return 'from-gray-100 to-gray-200 text-gray-700'
      default: return 'from-purple-100 to-purple-200 text-purple-700'
    }
  }

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Web': return Globe
      case 'Android': return Smartphone
      case 'iOS': return Smartphone
      default: return Monitor
    }
  }

  return (
    <div className="space-y-8">
      {/* Original Image Preview */}
      <div className="text-center">
        <h3 className="text-xl font-semibold text-foreground mb-4">Your Original Image</h3>
        <Card className="inline-block bg-gradient-to-br from-muted/50 to-background border-2 border-dashed border-muted-foreground/25">
          <CardContent className="p-6">
            <img
              src={previewUrl}
              alt="Original uploaded image"
              className="max-w-xs max-h-48 rounded-lg shadow-sm"
            />
          </CardContent>
        </Card>
      </div>

      {/* Icon Sizes Grid */}
      <div>
        <h3 className="text-xl font-semibold text-foreground mb-6 text-center">
          Required PWA Icon Sizes
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {iconSizes.map((icon) => {
            const [width, height] = icon.size.split('x').map(Number)
            const IconComponent = getCategoryIcon(icon.category)
            const colorClass = getCategoryColor(icon.category)
            
            return (
              <Card key={icon.size} className="group hover:shadow-lg transition-all duration-200 border-border/50">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div className={`px-2 py-1 rounded-full text-xs font-medium bg-gradient-to-r ${colorClass}`}>
                      {icon.category}
                    </div>
                    <IconComponent className="w-4 h-4 text-muted-foreground" />
                  </div>
                  
                  <div className="text-center mb-3">
                    <div 
                      className="bg-gradient-to-br from-muted/30 to-muted/60 rounded-lg flex items-center justify-center mx-auto mb-2 border-2 border-dashed border-muted-foreground/25 group-hover:border-primary/25 transition-colors" 
                      style={{ width: Math.min(width, 60), height: Math.min(height, 60) }}
                    >
                      <span className="text-xs font-medium text-muted-foreground">{icon.size}</span>
                    </div>
                    <p className="text-sm font-semibold text-foreground">{icon.size}</p>
                  </div>
                  
                  <div className="text-center">
                    <p className="text-xs font-medium text-foreground mb-1">{icon.name}</p>
                    <p className="text-xs text-muted-foreground">{icon.description}</p>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>
        
        <div className="mt-6 text-center">
          <p className="text-sm text-muted-foreground">
            All these sizes will be generated automatically from your uploaded image
          </p>
        </div>
      </div>
    </div>
  )
}
