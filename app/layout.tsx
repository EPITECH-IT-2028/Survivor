import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Instrument_Serif } from "next/font/google";
import { Toaster } from "@/components/ui/sonner";
import { AuthProvider } from "@/lib/auth-context";
import "./globals.css";
import ConditionalNavbar from "@/components/conditionalNavbar";
import ConditionalContainer from "@/components/conditionalContainer";

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
  title: "JEB Incubator",
  description: "A place to nourish your ideas and develop your projects.",
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`font-sf-pro ${geistSans.variable} ${geistMono.variable} ${instrumentSerif.variable} antialiased`}
      >
        <AuthProvider>
          <ConditionalNavbar />
          <ConditionalContainer>
            {children}
          </ConditionalContainer>
          <Toaster position="bottom-right" richColors />
        </AuthProvider>
      </body >
    </html >
  );
}
