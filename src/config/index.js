import { getDefaultConfig } from '@rainbow-me/rainbowkit'
import { mainnet, polygon, optimism, arbitrum, base, sepolia } from 'wagmi/chains'

export const config = getDefaultConfig({
  appName: 'ETH Transfer Platform',
  projectId: process.env.NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID || 'YOUR_PROJECT_ID',
  chains: [
    mainnet,
    polygon,
    optimism,
    arbitrum,
    base,
    ...(process.env.NODE_ENV === 'development' ? [sepolia] : [])
  ],
  ssr: true,
})
