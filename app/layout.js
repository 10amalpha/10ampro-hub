export const metadata = {
    title: '10AMPRO Command Center',
    description: 'Your Financial Intelligence Hub',
}

export default function RootLayout({ children }) {
    return (
          <html lang="en">
            <body style={{ margin: 0 }}>{children}</body>
  </html>
  )
}
