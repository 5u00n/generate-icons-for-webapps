# PWA Icon Generator

A Next.js application for generating PWA icons and logos from uploaded images.

## Features

- Upload PNG, JPG, SVG images
- Preview all required PWA icon sizes
- Generate optimized icons for web apps
- Download as ZIP file with manifest.json

## Getting Started

1. Install dependencies:

```bash
npm install
```

2. Run the development server:

```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Deployment

This app is optimized for deployment on Vercel. Simply connect your GitHub repository to Vercel and deploy.

## Supported Icon Sizes

- 16x16 (favicon)
- 32x32 (favicon)
- 48x48 (Android)
- 72x72 (Android)
- 96x96 (Android)
- 144x144 (Android)
- 152x152 (iOS)
- 180x180 (iOS)
- 192x192 (Android)
- 512x512 (Android)
- Apple Splash Screen (1024x1024)

## How to Use

1. **Upload**: Drag and drop or click to upload your logo/image
2. **Preview**: See all the required icon sizes for PWA
3. **Generate**: Click "Generate Icons" to create all sizes
4. **Download**: Download the ZIP file containing all icons and manifest.json

## Tech Stack

- Next.js 14
- React 18
- TypeScript
- Tailwind CSS
- JSZip for file compression
- Canvas API for image processing
