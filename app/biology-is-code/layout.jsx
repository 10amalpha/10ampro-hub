const OG = 'https://mercados.10am.pro/api/og/biology-is-code';

export const metadata = {
  title: 'Biology is Code — Bio-OS Value Chain | 10AMPRO',
  description:
    'The next computing supercycle runs on human biology. Read · Orchestrate · Write: 10 tickers, GAAP income statements, FCF per share and the Healthspan per Token thesis.',
  alternates: { canonical: 'https://mercados.10am.pro/biology-is-code' },
  openGraph: {
    title: 'Biology is Code — Read · Orchestrate · Write',
    description:
      'The Bio-OS value chain: 10 tickers organized by layer, with GAAP financials and quarterly FCF. Healthspan per Token.',
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
      'The Bio-OS value chain: 10 tickers by layer, GAAP financials and quarterly FCF. Healthspan per Token.',
    images: [OG],
  },
  robots: { index: true, follow: true },
};

export default function BiologyIsCodeLayout({ children }) {
  return children;
}
