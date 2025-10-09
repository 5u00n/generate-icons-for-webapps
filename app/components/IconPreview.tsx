'use client'

import { Card, CardContent } from '@/components/ui/card'
import { Monitor, Smartphone, Tablet } from 'lucide-react'

interface IconPreviewProps {
  previewUrl: string
}

const iconSizes = [
  { size: '16x16', platform: 'Web', icon: Monitor, color: 'blue' },
  { size: '32x32', platform: 'Web', icon: Monitor, color: 'blue' },
  { size: '48x48', platform: 'Web', icon: Monitor, color: 'blue' },
  { size: '72x72', platform: 'Android', icon: Smartphone, color: 'green' },
  { size: '96x96', platform: 'Web', icon: Monitor, color: 'blue' },
  { size: '144x144', platform: 'Android', icon: Smartphone, color: 'green' },
  { size: '152x152', platform: 'iOS', icon: Tablet, color: 'purple' },
  { size: '180x180', platform: 'iOS', icon: Tablet, color: 'purple' },
  { size: '192x192', platform: 'PWA', icon: Monitor, color: 'indigo' },
  { size: '512x512', platform: 'PWA', icon: Monitor, color: 'indigo' },
  { size: '1024x1024', platform: 'App Store', icon: Tablet, color: 'purple' },
]

export default function IconPreview({ previewUrl }: IconPreviewProps) {
  return (
    <div className="space-y-8">
      {/* Original Image */}
      <Card>
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold mb-4">Original Image</h3>
          <div className="flex justify-center">
            <img
              src={previewUrl}
              alt="Original"
              className="max-w-xs max-h-48 object-contain rounded-lg border border-gray-200"
            />
          </div>
        </CardContent>
      </Card>

      {/* Required Icon Sizes */}
      <Card>
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold mb-6">Required PWA Icon Sizes</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {iconSizes.map(({ size, platform, icon: Icon, color }) => (
              <div key={size} className="text-center">
                <Card className={`border-2 border-${color}-200 bg-${color}-50`}>
                  <CardContent className="p-4">
                    <div className="w-16 h-16 bg-gray-200 rounded-lg mx-auto mb-2 flex items-center justify-center">
                      <Icon className={`w-6 h-6 text-${color}-600`} />
                    </div>
                    <p className="text-sm font-semibold text-gray-700">{size}</p>
                    <p className={`text-xs text-${color}-600`}>{platform}</p>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}