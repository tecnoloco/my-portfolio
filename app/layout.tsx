import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import NavBar from "@/app/components/ui/NavBar";
import GSAPProvider from "@/app/components/GSAPProvider";
import AnimatedBackground from "@/app/components/ui/AnimatedBackground";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Eduardo Espinosa — Senior Software Engineer",
  description:
    "Senior Software Engineer with 10+ years building fintech, marketplace, and mobile products. React, React Native, TypeScript, Django, payments.",
  openGraph: {
    title: "Eduardo Espinosa — Senior Software Engineer",
    description:
      "Senior Software Engineer with 10+ years building fintech, marketplace, and mobile products.",
    url: "https://eduardoespinosa.dev",
    siteName: "Eduardo Espinosa",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased dark`}
    >
      <body className="bg-surface-base text-text-primary flex flex-col min-h-screen">
        <GSAPProvider>
          {/* <AnimatedBackground /> */}
          <NavBar />
          {children}
        </GSAPProvider>
      </body>
    </html>
  );
}
