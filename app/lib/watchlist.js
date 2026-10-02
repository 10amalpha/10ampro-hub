// Single source of truth for the watchlist tickers.
// Used by page.jsx (ISR render) AND /api/prices (client-side refresh every 5 min) — keep them identical or the
// client refresh silently overwrites the server list (that is how NAUT/PUMP went missing on Oct 2, 2026).

export const STOCK_TICKERS = [
  'PLTR', 'HOOD', 'TSLA', 'HIMS', 'QSI', 'DUOL', 'STKE', 'MP', 'OKLO', 'AMD', 'NVDA', 'MSTR', 'BE', 'IBIT', 'STRC', 'IREN',
  // Biology Is Code basket (HIMS, QSI above)
  'TEM', 'IBRX', 'CAI', 'PBLS', 'RXRX', 'NGEN', 'NAUT', 'INKT',
];

// ticker → CoinGecko id. 2Z is fetched by Solana contract address and merged under the synthetic key '2z-protocol'.
export const CRYPTO_MAP = {
  BTC: 'bitcoin', SOL: 'solana', SUI: 'sui', ETH: 'ethereum',
  JUP: 'jupiter-exchange-solana', NOS: 'nosana',
  JTO: 'jito-governance-token', SHDW: 'genesysgo-shadow',
  '2Z': '2z-protocol', MET: 'meteora', HNT: 'helium', ZEC: 'zcash',
  JITOSOL: 'jito-staked-sol', XRP: 'ripple', JLP: 'jupiter-perpetuals-liquidity-provider-token',
  PUMP: 'pump-fun',
};

// Every CoinGecko id to request in one call (watchlist + Solana basket extras). Excludes the contract-fetched 2Z.
export const CRYPTO_IDS = [...new Set([...Object.values(CRYPTO_MAP).filter(id => id !== '2z-protocol'), 'meteora', 'pump-fun'])];
