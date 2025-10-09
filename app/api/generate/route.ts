import { NextRequest, NextResponse } from 'next/server'
import JSZip from 'jszip'
import { PWA_ICON_SIZES } from '@/app/lib/iconGenerator'

export async function POST(request: NextRequest) {
  try {
    const { icons } = await request.json()
    
    if (!icons || typeof icons !== 'object') {
      return NextResponse.json({ error: 'Invalid icons data' }, { status: 400 })
    }

    const zip = new JSZip()
    
    // Add each icon to the zip
    Object.entries(icons).forEach(([name, dataUrl]) => {
      if (typeof dataUrl === 'string' && dataUrl.startsWith('data:image/png;base64,')) {
        // Extract base64 data
        const base64Data = dataUrl.split(',')[1]
        const buffer = Uint8Array.from(atob(base64Data), c => c.charCodeAt(0))
        
        // Find the corresponding filename
        const iconSize = PWA_ICON_SIZES.find(size => size.name === name)
        const filename = iconSize ? iconSize.filename : `${name}.png`
        
        zip.file(filename, buffer)
      }
    })

    // Generate manifest.json
    const manifest = {
      name: "PWA Icons",
      short_name: "PWA Icons",
      icons: PWA_ICON_SIZES.map(size => ({
        src: `/${size.filename}`,
        sizes: `${size.width}x${size.height}`,
        type: "image/png"
      })),
      theme_color: "#ffffff",
      background_color: "#ffffff",
      display: "standalone"
    }
    
    zip.file('manifest.json', JSON.stringify(manifest, null, 2))

    // Generate favicon.ico (using the 32x32 version)
    if (icons['favicon-32x32']) {
      const faviconData = icons['favicon-32x32'].split(',')[1]
      const faviconBuffer = Buffer.from(faviconData, 'base64')
      zip.file('favicon.ico', faviconBuffer)
    }

    // Generate the zip file
    const zipBuffer = await zip.generateAsync({ type: 'uint8array' })

    return new NextResponse(zipBuffer, {
      headers: {
        'Content-Type': 'application/zip',
        'Content-Disposition': 'attachment; filename="pwa-icons.zip"',
      },
    })
  } catch (error) {
    console.error('Error generating zip:', error)
    return NextResponse.json({ error: 'Failed to generate zip file' }, { status: 500 })
  }
}
