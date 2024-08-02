import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

import { cn } from '@/util/shadcn'
import MainNav from '@/components/layout/MainNav'

import './globals.css'

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' })

export const metadata: Metadata = {
  title: 'Free Quant',
  description: 'Free Quant',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={cn('min-h-screen bg-background font-sans antialiased', inter.variable)}>
        <div className="flex-col md:flex">
          <div className="border-b">
            <div className="flex h-16 items-center px-4">
              <MainNav className="sm:mx-6" />
            </div>
          </div>
          <div className="py-8 px-16">{children}</div>
        </div>
      </body>
    </html>
  )
}
