import type { Metadata } from 'next'
import './globals.css'
export const metadata: Metadata = {
  title: 'Sharan — Personal Site',
  description: 'CS @ Cal Poly. React/Next, Mobile, Systems. Projects, experience, and writing.',
  metadataBase: new URL('https://example.com'), // TODO: set to your domain later
  openGraph: {
    title: 'Sharan — Personal Site',
    description: 'CS @ Cal Poly. React/Next, Mobile, Systems.',
    url: '/',
    siteName: 'Sharan',
    images: [{ url: '/og.png', width: 1200, height: 630 }],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Sharan — Personal Site',
    description: 'CS @ Cal Poly. React/Next, Mobile, Systems.',
    images: ['/og.png'],
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>{children}</body>
    </html>
  )
}