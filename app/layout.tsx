import type { Metadata } from 'next';
import './globals.css';
import 'rsuite/dist/rsuite.min.css';

export const metadata: Metadata = {
  title: 'Cynegie',
  description: 'HR admin flow dashboard',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <head>
        <meta name='viewport' content='width=device-width, initial-scale=1.0' />
      </head>
      <body className='antialiased font-sans'>{children}</body>
    </html>
  );
}
