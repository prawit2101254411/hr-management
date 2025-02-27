import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { CustomProvider } from './provider'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang='en'>
      <body className={` ${inter.className} h-screen w-screen bg-gradient-to-r bg-gray-200 overflow-y-scroll`}>
        <CustomProvider>
      {children}
        </CustomProvider>
      </body>
    </html>
  )
}
// from-gray-500 via-gray-400 to-gray-300