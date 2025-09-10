import type { Metadata } from "next";
import { Geist, Geist_Mono, Montserrat, Open_Sans } from "next/font/google";
import { Toaster } from "@/components/ui/sonner";
import { AuthProvider } from "@/lib/auth-context";
import Footer from "@/components/Footer";
import "./globals.css";
import ConditionalNavbar from "@/components/conditionalNavbar";
import ConditionalContainer from "@/components/conditionalContainer";
import ConditionalFooter from "@/components/conditionalFooter";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["400", "700"],
});

const openSans = Open_Sans({
  variable: "--font-open-sans",
  subsets: ["latin"],
  weight: ["400", "700"],
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
        className={`${montserrat.variable} ${openSans.variable} ${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <AuthProvider>
          <ConditionalNavbar />
          <ConditionalContainer>
            {children}
          </ConditionalContainer>
          <Toaster position="bottom-right" richColors />
        </AuthProvider>
        <ConditionalFooter />
      </body>
    </html>
  );
}
