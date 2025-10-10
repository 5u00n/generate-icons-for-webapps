export interface IconSize {
  width: number
  height: number
  name: string
  filename: string
}

export const PWA_ICON_SIZES: IconSize[] = [
  { width: 16, height: 16, name: 'favicon-16x16', filename: 'favicon-16x16.png' },
  { width: 32, height: 32, name: 'favicon-32x32', filename: 'favicon-32x32.png' },
  { width: 48, height: 48, name: 'android-chrome-48x48', filename: 'android-chrome-48x48.png' },
  { width: 72, height: 72, name: 'android-chrome-72x72', filename: 'android-chrome-72x72.png' },
  { width: 96, height: 96, name: 'android-chrome-96x96', filename: 'android-chrome-96x96.png' },
  { width: 144, height: 144, name: 'android-chrome-144x144', filename: 'android-chrome-144x144.png' },
  { width: 152, height: 152, name: 'apple-touch-icon-152x152', filename: 'apple-touch-icon-152x152.png' },
  { width: 180, height: 180, name: 'apple-touch-icon', filename: 'apple-touch-icon.png' },
  { width: 192, height: 192, name: 'android-chrome-192x192', filename: 'android-chrome-192x192.png' },
  { width: 512, height: 512, name: 'android-chrome-512x512', filename: 'android-chrome-512x512.png' },
  { width: 1024, height: 1024, name: 'apple-splash-screen', filename: 'apple-splash-screen-1024x1024.png' },
]

export async function generateIcons(file: File): Promise<Record<string, string>> {
  const canvas = document.createElement('canvas')
  const ctx = canvas.getContext('2d')
  if (!ctx) throw new Error('Could not get canvas context')

  return new Promise((resolve, reject) => {
    const img = new Image()
    img.onload = () => {
      try {
        const icons: Record<string, string> = {}
        
        PWA_ICON_SIZES.forEach(({ width, height, name }) => {
          // Set canvas size
          canvas.width = width
          canvas.height = height
          
          // Clear canvas with transparent background
          ctx.clearRect(0, 0, width, height)
          
          // Calculate scaling to fill the entire canvas (crop if necessary)
          const scale = Math.max(width / img.width, height / img.height)
          const scaledWidth = img.width * scale
          const scaledHeight = img.height * scale
          
          // Center the image (this will crop excess parts)
          const x = (width - scaledWidth) / 2
          const y = (height - scaledHeight) / 2
          
          // Draw the image to fill the entire canvas
          ctx.drawImage(img, x, y, scaledWidth, scaledHeight)
          
          // Convert to data URL with transparency
          icons[name] = canvas.toDataURL('image/png')
          
          // Debug log for apple-touch-icon
          if (name === 'apple-touch-icon') {
            console.log('Generated apple-touch-icon:', name, width, height)
          }
        })
        
        resolve(icons)
      } catch (error) {
        reject(error)
      }
    }
    
    img.onerror = () => reject(new Error('Could not load image'))
    img.src = URL.createObjectURL(file)
  })
}
