import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/providers/Providers";
import { Navbar } from "@/components/ui/Navbar";
import { Footer } from "@/components/ui/Footer";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "FrameworkHub — The Developer Framework Encyclopedia",
    template: "%s | FrameworkHub",
  },
  description:
    "Explore, compare, and master every web framework. From React to Rust — the ultimate knowledge platform for junior and senior developers.",
  keywords: ["web frameworks", "react", "vue", "angular", "nextjs", "developer tools", "learning"],
  openGraph: {
    title: "FrameworkHub",
    description: "The ultimate developer framework knowledge platform",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable} dark`}>
      <body className="min-h-screen flex flex-col antialiased" suppressHydrationWarning>
        <Providers>
          <Navbar />
          <main className="flex-1 pt-16">{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
