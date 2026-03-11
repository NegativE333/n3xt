import type { Metadata } from 'next'
import { Inter, JetBrains_Mono } from 'next/font/google'
import './globals.css'

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const jetbrainsMono = JetBrains_Mono({ 
  subsets: ['latin'],
  variable: '--font-jetbrains-mono',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://n3xt.dev'),
  title: {
    default: 'N3XT – Premium Browser Extensions',
    template: '%s | N3XT',
  },
  description:
    'N3XT is a digital studio building premium, privacy-first browser extensions like Alias, Draft, Vanish, and Hotstar IMDb Connect.',
  openGraph: {
    type: 'website',
    url: 'https://n3xt.dev',
    title: 'N3XT – Premium Browser Extensions',
    description:
      'Upgrade your browser with privacy-first extensions for productivity, focus, and a cleaner streaming experience.',
    siteName: 'N3XT',
    images: [
      {
        url: '/images/opengraph-image.png',
        width: 1200,
        height: 630,
        alt: 'N3XT – Premium Browser Extensions',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'N3XT – Premium Browser Extensions',
    description:
      'Alias, Draft, Vanish, and Hotstar IMDb Connect – premium extensions for a calmer, faster web.',
    images: ['/images/opengraph-image.png'],
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: 'https://n3xt.dev',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable}`}>
      <body className="font-sans">{children}</body>
    </html>
  )
}
