import './globals.css'
import type { Metadata } from 'next'
import Navbar from '@/components/Navbar'
import { AuthProvider } from '@/lib/auth-context'
import { Geist, Geist_Mono } from "next/font/google";
import { Instrument_Serif } from "next/font/google";
import { Button } from '@/components/ui/button';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument-serif",
  subsets: ["latin"],
  weight: "400",
});

export const metadata: Metadata = {
  title: '404 - Page Not Found',
  description: 'The page you are looking for does not exist.',
}

export default function GlobalNotFound() {
  return (
    <html lang="en">
      <body
        className={`font-sf-pro ${geistSans.variable} ${geistMono.variable} ${instrumentSerif.variable} antialiased`}
      >
        <AuthProvider>
          <Navbar />
          <div className="flex flex-col justify-center items-center min-h-screen">
            <div className="flex flex-col items-center text-center gap-8">
              <h1 className="text-3xl font-bold">404 Page Not Found</h1>
              <p className="text-md">
                The page you try to access is not available, please go back to home
              </p>
              <a href='/'>
                <Button variant="outline">Return to main page</Button>
              </a>
            </div>
          </div>
        </AuthProvider>
      </body>
    </html>
  )
}
