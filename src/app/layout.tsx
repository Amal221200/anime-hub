import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { dark } from "@clerk/themes";
import { ClerkProvider } from "@clerk/nextjs"
import { Toaster } from "@/components/ui/toaster";
import ThemeProvider from "@/components/providers/ThemeProvider";
import ProgressProvider from "@/components/providers/ProgressProvider";
import QueryProvider from "@/components/providers/QueryProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Anime Hub",
  description: "Everything for Anime in one place",
  icons: [{
    url: "/logo-dark.png",
    href: "/logo-dark.png",
    type: "image/png"
  }]
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider appearance={{ baseTheme: dark }}>
      <html lang="en" suppressHydrationWarning>
        <body className={inter.className}>
          <ThemeProvider attribute="class" defaultTheme="dark">
            <ProgressProvider>
              <QueryProvider>
                <Toaster />
                {children}
              </QueryProvider>
            </ProgressProvider>
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
