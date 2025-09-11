import type { Metadata } from "next";
import { Open_Sans, Montserrat } from "next/font/google";
import { Toaster } from "@/components/ui/sonner";
import { AuthProvider } from "@/lib/auth-context";
import "./globals.css";
import ConditionalNavbar from "@/components/conditionalNavbar";
import ConditionalContainer from "@/components/conditionalContainer";
import ConditionalFooter from "@/components/conditionalFooter";

const openSans = Open_Sans({
  variable: "--font-open-sans",
  subsets: ["latin"],
  weight: ["400", "700"],
});

const montserrat = Montserrat({
  variable: "--font-montserrat",
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
        className={`${openSans.variable} ${montserrat.variable} antialiased`}
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
