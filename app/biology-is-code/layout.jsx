const OG = 'https://mercados.10am.pro/api/og/biology-is-code';

export const metadata = {
  title: 'Biology is Code — Bio-OS Value Chain | 10AMPRO',
  description:
    'El próximo superciclo de cómputo corre sobre biología humana. Read · Orchestrate · Write: 9 tickers, income statements GAAP, FCF por acción y la tesis de Healthspan per Token.',
  alternates: { canonical: 'https://mercados.10am.pro/biology-is-code' },
  openGraph: {
    title: 'Biology is Code — Read · Orchestrate · Write',
    description:
      'La cadena de valor del Bio-OS: 9 tickers organizados por capa, con financials GAAP y FCF trimestral. Healthspan per Token.',
    url: 'https://mercados.10am.pro/biology-is-code',
    siteName: '10AMPRO',
    type: 'article',
    locale: 'es_ES',
    images: [
      {
        url: OG,
        width: 1200,
        height: 630,
        alt: 'Biology is Code — la cadena de valor Read · Orchestrate · Write del Bio-OS',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Biology is Code — Read · Orchestrate · Write',
    description:
      'La cadena de valor del Bio-OS: 9 tickers por capa, financials GAAP y FCF trimestral. Healthspan per Token.',
    images: [OG],
  },
  robots: { index: true, follow: true },
};

export default function BiologyIsCodeLayout({ children }) {
  return children;
}
