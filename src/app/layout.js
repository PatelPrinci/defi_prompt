import Providers from '../components/providers'

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <title>ETH Transfer Platform</title>
        <meta name="description" content="Transfer ETH with simple prompts" />
      </head>
      <body>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  )
}
