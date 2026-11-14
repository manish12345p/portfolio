import type { Metadata, Viewport } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Manish Chandra Maity – Flutter Developer',
  description:
    'Manish Chandra Maity, Flutter developer and B.Tech CSE (AI) student. Builds production Flutter apps with BLoC and clean architecture.',
  authors: [{ name: 'Manish Chandra Maity' }],
  openGraph: {
    type: 'website',
    title: 'Manish Chandra Maity – Flutter Developer',
    description:
      'Production Flutter apps with BLoC and clean architecture. A client CRM with 1,500+ service visits logged.',
  },
  twitter: {
    card: 'summary',
    title: 'Manish Chandra Maity – Flutter Developer',
    description:
      'Production Flutter apps with BLoC and clean architecture. A client CRM with 1,500+ service visits logged.',
  },
  icons: {
    icon: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 64 64'%3E%3Crect width='64' height='64' rx='16' fill='%23D7142F'/%3E%3Cpath d='M16 46V18l16 16 16-16v28' fill='none' stroke='white' stroke-width='7' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E",
  },
};

export const viewport: Viewport = {
  themeColor: '#C8102E',
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Unbounded:wght@600;700;800&family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
