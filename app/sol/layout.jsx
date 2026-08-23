import { TOKEN } from '../lib/thesis/configs/sol.config';
const BASE = 'https://mercados.10am.pro/sol';
const OG = 'https://mercados.10am.pro/api/og/sol';
export const metadata = {
  title: `${TOKEN.name} ($${TOKEN.symbol}) — Thesis Telemetry | 10AMPRO`,
  description: TOKEN.description,
  alternates: { canonical: BASE },
  openGraph: { title: `${TOKEN.name} — ${TOKEN.tagline}`, description: TOKEN.description, url: BASE, siteName: '10AMPRO', type: 'article', locale: 'es_ES', images: [{ url: OG, width: 1200, height: 630, alt: `${TOKEN.name} — ${TOKEN.tagline}` }] },
  twitter: { card: 'summary_large_image', title: `${TOKEN.name} — ${TOKEN.tagline}`, description: TOKEN.description, images: [OG] },
  robots: { index: true, follow: true },
};
export default function Layout({ children }) { return children; }
