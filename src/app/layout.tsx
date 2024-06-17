import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { dark } from "@clerk/themes";
import { ClerkProvider } from "@clerk/nextjs"
import ThemeProvider from "@/components/providers/ThemeProvider";
import ProgressProvider from "@/components/providers/ProgressProvider";
import QueryProvider from "@/components/providers/QueryProvider";
import BackgroundStyle from "@/components/styled-components/BackgroundStyle";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: "Anime Hub",
    template: "Anime Hub | %s"
  },
  description: "Everything for Anime in one place",
  manifest: '/manifest.webmanifest',
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
                <BackgroundStyle image="" opacity={1} />
                {children}
              </QueryProvider>
            </ProgressProvider>
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
