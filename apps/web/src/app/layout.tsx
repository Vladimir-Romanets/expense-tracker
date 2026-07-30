import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({
  subsets: ['latin', 'cyrillic'],
  variable: '--font-inter',
})

export const metadata: Metadata = {
  title: 'Expense Tracker — Detailed Budget & Price Dynamic',
  description:
    'Track every detail, analyze price history and plan smart budgets.',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} h-full scroll-smooth text-base leading-normal antialiased`}
      data-scroll-behavior="smooth"
    >
      <body className="min-h-screen font-normal">{children}</body>
    </html>
  )
}
