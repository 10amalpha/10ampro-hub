'use client';
import { useState } from 'react';

const CommandCenter = () => {
  const [hoveredCard, setHoveredCard] = useState(null);

  const dashboards = [
    {
      id: 'liquidity',
      icon: '💧',
      title: 'LiquidityFlow',
      metric: '$5.73T',
      metricLabel: 'Net Liquidity',
      signal: 'BULLISH',
      signalColor: '#10b981',
      tagline: 'Macro Liquidity Dashboard',
      description: 'Track the Fed Balance Sheet, TGA, RRP, and key liquidity indicators that drive risk asset performance. Know when liquidity conditions favor Bitcoin and equities.',
      highlights: ['Fed Balance Sheet', 'TGA & RRP Tracking', 'Real-time Signals'],
      url: 'https://liquidityflow-five.vercel.app/',
    },
    {
      id: 'carrera',
      icon: '🏇',
      title: 'Race to Target 2026',
      metric: 'PLTR',
      metricLabel: 'Current Leader',
      signal: 'RACING',
      signalColor: '#a855f7',
      tagline: 'Portfolio Race Tracker',
      description: 'Track your portfolio progress toward 2026 targets. Compare ROI velocity, positions and progress of each asset in the race.',
      highlights: ['Progress Tracking', 'ROI Velocity', '8 Assets Racing'],
      url: 'https://forecast2026.vercel.app/',
    },
    {
      id: 'earnings',
      icon: '📅',
      title: 'EarningsWatch',
      metric: 'PLTR 10d',
      metricLabel: 'Next Earnings',
      signal: 'TRACKING',
      signalColor: '#10b981',
      tagline: 'Earnings Calendar',
      description: 'Track upcoming earnings dates for your portfolio. Never miss an earnings call with countdown timers and quick links to IR research.',
      highlights: ['Earnings Dates', 'IR Links', '9 Stocks Tracked'],
      url: 'https://earningswatch.vercel.app/',
    },
    {
      id: 'btc-pension',
      icon: '₿',
      title: 'BTC Pension',
      metric: '3.6x',
      metricLabel: 'vs Pensión',
      signal: 'SIMULATOR',
      signalColor: '#f7931a',
      tagline: 'Retirement Simulator',
      description: 'Simula tu retiro con Bitcoin. Compara el poder de acumulación BTC vs pensión tradicional con proyecciones personalizadas.',
      highlights: ['Simulador', 'Proyecciones', 'BTC vs Pensión'],
      url: 'https://btc-pension-psi.vercel.app/',
    },
    {
      id: 'info-diet',
      icon: '📓',
      title: 'Information Diet',
      metric: '4.5h',
      metricLabel: 'Data Transfer Rate',
      signal: 'LIVE',
      signalColor: '#ef4444',
      tagline: 'Content Curation Feed',
      description: 'Lo que estamos consumiendo y compartiendo en el chat de 10ampro. Curación de contenido de alta calidad sobre crypto, tech y macro.',
      highlights: ['Content Feed', 'YouTube & X', 'Crypto & Tech'],
      url: 'https://info-diet.vercel.app/',
    },
    {
      id: 'coming2',
      icon: '➕',
      title: 'Add Dashboard',
      metric: '∞',
      metricLabel: 'Possibilities',
      signal: 'BUILD',
      signalColor: '#4b5563',
      tagline: 'Expand the Hub',
      description: 'The 10AMPRO ecosystem keeps growing. More financial intelligence tools coming soon.',
      highlights: [],
      url: null,
    }
  ];

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#000000',
      color: '#ffffff',
      padding: '40px 24px',
      fontFamily: 'system-ui, -apple-system, sans-serif'
    }}>
      {/* Header with Logo */}
      <header style={{
        maxWidth: '1100px',
        margin: '0 auto 48px auto',
        textAlign: 'center'
      }}>
        {/* 10AMPRO Logo - Using actual image */}
        <img 
          src="/logo.jpg" 
          alt="10AMPRO" 
          style={{
            width: '100px',
            height: '100px',
            borderRadius: '50%',
            margin: '0 auto 20px auto',
            display: 'block'
          }}
        />
        <h1 style={{ fontSize: '24px', fontWeight: '600', margin: '0 0 8px 0' }}>Command Center</h1>
        <p style={{ fontSize: '13px', color: '#6b7280', margin: 0 }}>Your Financial Intelligence Hub</p>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '24px', marginTop: '16px', fontSize: '12px' }}>
          <a href="https://10am.substack.com" target="_blank" style={{ color: '#6b7280', textDecoration: 'none' }}>10am.pro</a>
          <a href="https://x.com/holdmybirra" target="_blank" style={{ color: '#10b981', textDecoration: 'none' }}>@holdmybirra</a>
        </div>
      </header>

      {/* Dashboard Cards - Side by Side Grid */}
      <main style={{
        maxWidth: '1100px',
        margin: '0 auto',
        display: 'grid',
        gridTemplateColumns: 'repeat(2, 1fr)',
        gap: '20px'
      }}>
        {dashboards.map((dashboard) => (
          <div
            key={dashboard.id}
            onClick={() => dashboard.url && window.open(dashboard.url, '_blank')}
            onMouseEnter={() => setHoveredCard(dashboard.id)}
            onMouseLeave={() => setHoveredCard(null)}
            style={{
              padding: '24px',
              borderRadius: '16px',
              backgroundColor: hoveredCard === dashboard.id && dashboard.url ? 'rgba(30, 30, 30, 0.95)' : 'rgba(17, 17, 17, 0.7)',
              border: `1px solid ${hoveredCard === dashboard.id && dashboard.url ? dashboard.signalColor + '50' : 'rgba(55, 65, 81, 0.3)'}`,
              cursor: dashboard.url ? 'pointer' : 'default',
              opacity: dashboard.url ? 1 : 0.45,
              transition: 'all 0.25s ease',
              transform: hoveredCard === dashboard.id && dashboard.url ? 'translateY(-2px)' : 'translateY(0)',
              boxShadow: hoveredCard === dashboard.id && dashboard.url ? `0 8px 32px ${dashboard.signalColor}15` : 'none'
            }}
          >
            {/* Card Header */}
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'flex-start',
              marginBottom: '16px'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <span style={{ fontSize: '36px' }}>{dashboard.icon}</span>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <span style={{ fontSize: '18px', fontWeight: '700' }}>{dashboard.title}</span>
                    <span style={{
                      padding: '3px 8px',
                      borderRadius: '6px',
                      fontSize: '9px',
                      fontWeight: '700',
                      letterSpacing: '0.5px',
                      backgroundColor: dashboard.signalColor + '20',
                      color: dashboard.signalColor,
                    }}>
                      {dashboard.signal}
                    </span>
                  </div>
                  <p style={{ fontSize: '11px', color: '#9ca3af', margin: '4px 0 0 0' }}>{dashboard.tagline}</p>
                </div>
              </div>
              
              {/* Metric */}
              <div style={{ textAlign: 'right' }}>
                <div style={{
                  fontSize: '28px',
                  fontWeight: '700',
                  color: dashboard.url ? dashboard.signalColor : '#4b5563',
                  lineHeight: 1
                }}>
                  {dashboard.metric}
                </div>
                <div style={{
                  fontSize: '9px',
                  color: '#6b7280',
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px',
                  marginTop: '4px'
                }}>
                  {dashboard.metricLabel}
                </div>
              </div>
            </div>

            {/* Description */}
            <p style={{
              fontSize: '13px',
              color: '#9ca3af',
              margin: '0 0 16px 0',
              lineHeight: '1.5'
            }}>
              {dashboard.description}
            </p>

            {/* Highlights + CTA */}
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}>
              {/* Highlights */}
              {dashboard.highlights.length > 0 && (
                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                  {dashboard.highlights.map((highlight, idx) => (
                    <span
                      key={idx}
                      style={{
                        padding: '4px 10px',
                        borderRadius: '20px',
                        fontSize: '10px',
                        fontWeight: '500',
                        backgroundColor: 'rgba(255,255,255,0.05)',
                        color: '#9ca3af',
                        border: '1px solid rgba(255,255,255,0.08)'
                      }}
                    >
                      {highlight}
                    </span>
                  ))}
                </div>
              )}

              {/* CTA Arrow */}
              {dashboard.url && (
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  color: dashboard.signalColor,
                  fontSize: '12px',
                  fontWeight: '600',
                  marginLeft: 'auto'
                }}>
                  <span>Open</span>
                  <svg 
                    width="16" 
                    height="16" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    stroke="currentColor" 
                    strokeWidth="2"
                    style={{
                      transform: hoveredCard === dashboard.id ? 'translateX(4px)' : 'translateX(0)',
                      transition: 'transform 0.2s ease'
                    }}
                  >
                    <path d="M9 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
              )}
            </div>
          </div>
        ))}
      </main>

      {/* Footer */}
      <footer style={{
        maxWidth: '1100px',
        margin: '48px auto 0 auto',
        paddingTop: '24px',
        borderTop: '1px solid rgba(55, 65, 81, 0.2)',
        display: 'flex',
        justifyContent: 'space-between',
        fontSize: '11px',
        color: '#4b5563'
      }}>
        <span>Built for the 10AMPRO community</span>
        <span style={{ fontStyle: 'italic' }}>"Calm mind, fit body, house full of love"</span>
      </footer>
    </div>
  );
};

export default CommandCenter;
