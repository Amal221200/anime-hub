import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import AuthProvider from "@/components/providers/AuthProvider";
import { Toaster } from "@/components/ui/toaster";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Anime Hub",
  description: "Everything for Anime in one place",
  icons: [{
    url:"/favicon-dark.ico",
    href:"/favicon-dark.ico",
    type:"icon/ico"
  }]
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <AuthProvider>
          <Toaster  />
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
