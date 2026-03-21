import './globals.css';

export const metadata = {
  title: '10AMPRO Hub — Mercados, Macro & Liquidez',
  description: 'Tu terminal de inteligencia matutina. Mercados, macro, liquidez, earnings y cripto — todo en 30 segundos. 10AMPRO.',
  openGraph: {
    title: '10AMPRO Hub',
    description: 'Una pestaña. 30 segundos. Sabes dónde estás parado.',
    url: 'https://10ampro-hub.vercel.app',
    siteName: '10AMPRO',
    type: 'website',
    images: [{ url: 'https://10ampro-hub.vercel.app/api/og', width: 1200, height: 630, alt: '10AMPRO Hub — Market Briefing' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: '10AMPRO Hub',
    description: 'Una pestaña. 30 segundos. Sabes dónde estás parado.',
    images: ['https://10ampro-hub.vercel.app/api/og'],
  },
  robots: { index: true, follow: true },
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: '#0c0c0e',
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <head>
        <link rel="icon" href="/logo.jpg" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600;700;800&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Space+Grotesk:wght@600;700;800&display=swap" rel="stylesheet" />
      </head>
      <body>{children}</body>
    </html>
  );
}
