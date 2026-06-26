import type { Metadata } from "next";
import { Geist, Geist_Mono, Figtree } from "next/font/google";
import "./globals.css";
import ConvexClientProvider from "./ConvexClientProvider";
import Navbar from "./_components/Navbar";
import { cn } from "@/lib/utils";

const figtree = Figtree({ subsets: ["latin"], variable: "--font-sans" });

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Aidan's Meal Tracker",
  description: "Family meal tracking app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={cn(
        "h-full",
        "antialiased",
        geistSans.variable,
        geistMono.variable,
        "font-sans",
        figtree.variable,
        "dark",
      )}
    >
      <body className="min-h-full flex flex-col">
        <ConvexClientProvider>
          <Navbar />
          <div className="min-w-full min-h-full grow">{children}</div>
        </ConvexClientProvider>
      </body>
    </html>
  );
}
