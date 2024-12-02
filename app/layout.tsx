import type { Metadata } from "next";
import "./globals.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import QueryClientProvider from "@/contexts/ReactQueryProvider";

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
        <ToastContainer />
        <QueryClientProvider>{children}</QueryClientProvider>
      </body>
    </html>
  );
}
