import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'PWA Icon Generator - Create Perfect Progressive Web App Icons | Free Online Tool',
  description: 'Transform your logo into all required PWA icon sizes instantly. Generate 11 different icon sizes for Progressive Web Apps, Android, iOS, and web browsers. Professional, secure, and trusted by thousands of developers worldwide.',
  keywords: 'PWA icons, Progressive Web App, icon generator, favicon generator, Android icons, iOS icons, web app icons, PWA favicon, apple touch icon, android chrome icon, manifest icons, free icon generator, online icon tool',
  authors: [{ name: 'PWA Icon Generator Team' }],
  creator: 'PWA Icon Generator',
  publisher: 'PWA Icon Generator',
  applicationName: 'PWA Icon Generator',
  category: 'Web Development Tools',
  classification: 'Web Development',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://pwa-icon-generator.vercel.app'),
  alternates: {
    canonical: 'https://pwa-icon-generator.vercel.app',
  },
  openGraph: {
    title: 'PWA Icon Generator - Create Perfect Progressive Web App Icons',
    description: 'Transform your logo into all required PWA icon sizes instantly. Generate 11 different icon sizes for Progressive Web Apps, Android, iOS, and web browsers.',
    url: 'https://pwa-icon-generator.vercel.app',
    siteName: 'PWA Icon Generator',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'PWA Icon Generator - Create Perfect Progressive Web App Icons',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'PWA Icon Generator - Create Perfect Progressive Web App Icons',
    description: 'Transform your logo into all required PWA icon sizes instantly. Generate 11 different icon sizes for Progressive Web Apps, Android, iOS, and web browsers.',
    images: ['/og-image.png'],
    creator: '@pwaicongenerator',
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: '809afeb33438e713',
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
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="format-detection" content="telephone=no" />
        <link rel="canonical" href="https://pwa-icon-generator.vercel.app" />
        <link rel="alternate" type="application/rss+xml" title="PWA Icon Generator" href="/rss.xml" />
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  )
}
