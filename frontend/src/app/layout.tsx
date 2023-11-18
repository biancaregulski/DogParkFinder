import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import 'bootstrap/dist/css/bootstrap.css';
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import 'scss/custom.scss'
import './globals.css'

import NavBar from "./components/navbar";

require('dotenv').config()
const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Park Finder',
  description: 'Find nearest parks between two points with Google Maps API',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <NavBar />
        <div className="container h-100">
          {children}
        </div>
      </body>
    </html>
  )
}
