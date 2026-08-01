const OG = 'https://mercados.10am.pro/api/og/nosana';

export const metadata = {
  title: 'Nosana — Network Telemetry | 10AMPRO',
  description:
    'GPU compute hours, jobs, precio y market cap de Nosana en vivo. La tesis, sus tripwires y la señal que confirma o rompe el caso.',
  alternates: { canonical: 'https://mercados.10am.pro/nosana' },
  openGraph: {
    title: 'Nosana — GPU Compute Hours',
    description:
      'Horas de cómputo mensuales de la red Nosana vs el pico de Oct-25. Datos en vivo.',
    url: 'https://mercados.10am.pro/nosana',
    siteName: '10AMPRO',
    type: 'article',
    locale: 'es_ES',
    images: [
      {
        url: OG,
        width: 1200,
        height: 630,
        alt: 'Nosana — GPU compute hours mensuales vs el pico de Oct-25',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Nosana — GPU Compute Hours',
    description:
      'Horas de cómputo mensuales de la red Nosana vs el pico de Oct-25. Datos en vivo.',
    images: [OG],
  },
  robots: { index: true, follow: true },
};

export default function NosanaLayout({ children }) {
  return children;
}
