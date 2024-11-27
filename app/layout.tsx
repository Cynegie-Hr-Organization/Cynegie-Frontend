import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Cynegie",
  description: "HR admin flow dashboard",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased font-sans">
        {children}
      </body>
    </html>
  );
}