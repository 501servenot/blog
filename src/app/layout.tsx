import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./global.css";
import Header from "@/components/Header";
import Cursor from "@/components/Cursor";
import localFont from 'next/font/local';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  weight: ['400', '500', '600', '700']
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const myfont = localFont({
  src: [
    {
      path: "./fonts/MapleMono-NF-CN-Italic.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "./fonts/MapleMono-NF-CN-LightItalic.ttf",
      weight: "300",
      style: "light",
    },
    {
      path: "./fonts/MapleMono-NF-CN-MediumItalic.ttf",
      weight: "500",
      style: "medium",
    },
  ],
  variable: "--font-my-font",
  display: "swap",
});

export const metadata: Metadata = {
  title: "MrZhangBlog",
  description: "The personal blog created by MrZhang",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${myfont.variable} antialiased text-neutral-300`}>
        <Cursor size={24} delay={0.15} color="#e9e9e9ff" />
        <Header />
        {children}
        <footer className="text-xs text-neutral-300 mt-16 flex justify-center items-center flex-col">
          <div className="h-px bg-neutral-800 w-1/3 mb-2"></div>
          ©Mr·Zhang | ©2025
        </footer>
      </body>
    </html>
  );
}
