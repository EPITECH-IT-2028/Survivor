import './globals.css'
import type { Metadata } from 'next'
import Navbar from '@/components/Navbar'
import { AuthProvider } from '@/lib/auth-context'
import { Geist_Mono } from "next/font/google";
import { Button } from '@/components/ui/button';
import Link from 'next/link';

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: '404 - Page Not Found',
  description: 'The page you are looking for does not exist.',
}

export default function GlobalNotFound() {
  return (
    <html lang="en">
      <body
        className={`font-sf-pro ${geistMono.variable} antialiased`}
      >
        <AuthProvider>
          <Navbar />
          <div className="flex min-h-screen flex-col items-center justify-center">
            <div className="flex flex-col items-center gap-8 text-center">
              <h1 className="text-3xl font-bold">404 Page Not Found</h1>
              <p className="text-md">
                The page you try to access is not available, please go back to home
              </p>
              <Link href='/'>
                <Button variant="outline">Return to main page</Button>
              </Link>
            </div>
          </div>
        </AuthProvider>
      </body>
    </html>
  )
}
