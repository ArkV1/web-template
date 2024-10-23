"use client";

import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from '@/components/Footer'
import { AuthProvider } from "@/app/auth/AuthProvider";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="min-h-screen flex flex-col">
          <Header />
          <main className="flex-1 relative z-0">
            <AuthProvider>
              {children}
            </AuthProvider>
          </main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
