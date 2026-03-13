export const metadata = {
    title: '10AM Briefing — Morning Intelligence',
    description: 'Tu briefing macro, earnings y liquidez cada mañana. 10AMPRO.',
}

export const viewport = {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
}

export default function RootLayout({ children }) {
    return (
          <html lang="es">
            <head>
              <link rel="icon" href="/logo.jpg" />
              <link rel="preconnect" href="https://fonts.googleapis.com" />
              <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
              <link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600;700&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
            </head>
            <body style={{ margin: 0 }}>{children}</body>
  </html>
  )
}
