import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'PWA Icon Generator - Create Perfect Progressive Web App Icons',
  description: 'Transform your logo into all required PWA icon sizes instantly. Professional, secure, and trusted by thousands of developers worldwide.',
  keywords: 'PWA icons, Progressive Web App, icon generator, favicon, Android icons, iOS icons, web app icons',
  authors: [{ name: 'PWA Icon Generator' }],
  creator: 'PWA Icon Generator',
  publisher: 'PWA Icon Generator',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://pwa-icon-generator.vercel.app'),
  openGraph: {
    title: 'PWA Icon Generator - Create Perfect Progressive Web App Icons',
    description: 'Transform your logo into all required PWA icon sizes instantly. Professional, secure, and trusted by thousands of developers worldwide.',
    url: 'https://pwa-icon-generator.vercel.app',
    siteName: 'PWA Icon Generator',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'PWA Icon Generator',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'PWA Icon Generator - Create Perfect Progressive Web App Icons',
    description: 'Transform your logo into all required PWA icon sizes instantly. Professional, secure, and trusted by thousands of developers worldwide.',
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <meta name="theme-color" content="#3b82f6" />
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  )
}
