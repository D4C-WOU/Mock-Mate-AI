import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "MockMate AI",
  description: "AI Interview Coach",
};

export default function RootLayout({ children }) {
  return (
    // Add "light" class and force a white background to prevent "invisible" text
    <html lang="en" className="light" style={{ colorScheme: 'light' }}>
      <body className="bg-white text-slate-900 antialiased">
        {children}
      </body>
    </html>
  );
}