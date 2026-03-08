import type { Metadata } from 'next'
import './globals.css'
export const metadata: Metadata = {
  title: 'Sharan — Personal Site',
  description: 'CS @ Cal Poly. Distributed Systems, Infrastructure, Machine Learning. Projects, experience, and writing.',

  metadataBase: new URL('https://skrsh.dev'),
  openGraph: {
    title: 'Sharan — Personal Site',
    description: 'CS @ Cal Poly. Distributed Systems, Infrastructure, Machine Learning.',
    url: '/',
    siteName: 'Sharan',
    images: [{ url: '/og.gif', width: 1200, height: 630 }],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Sharan — Personal Site',
    description: 'CS @ Cal Poly. Distributed Systems, Infrastructure, Machine Learning.',
    images: ['/og.gif'],
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="scroll-smooth">
      <body>{children}</body>
    </html>
  )
}