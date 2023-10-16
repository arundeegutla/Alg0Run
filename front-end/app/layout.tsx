'use client';

import Navbar from "./navbar"
import './globals.css'

export default function RootLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body style={{ alignItems: "flex-start"}} className="default flex-row items-center justify-center flex-wrap scrollbar-hide">
        <Navbar/>
        {children}
      </body>
    </html>
  )
}