'use client'

import { useState } from 'react'
import { ConnectButton } from '@rainbow-me/rainbowkit'
import { useAccount, useWriteContract } from 'wagmi'
import { isAddress, parseEther } from 'ethers'
import ChatPrompt from '../components/ChatPrompt'
import { CONTRACT_ADDRESS, CONTRACT_ABI } from '../config/contracts'

export default function Home() {
  const { address, isConnected } = useAccount()
  const { writeContractAsync, isPending, error } = useWriteContract()
  const [toAddress, setToAddress] = useState('')
  const [ethAmount, setEthAmount] = useState('')

  const sendETHusingContract = async (to, amount) => {
    if (!isConnected) {
      alert('Please connect your wallet first!')
      return
    }
    if (!to || !amount) {
      alert('Invalid address or amount')
      return
    }
    if (!isAddress(to)) {
      alert('Invalid recipient address')
      return
    }

    let weiAmount
    try {
      weiAmount = parseEther(amount)
    } catch {
      alert('Invalid ETH amount format')
      return
    }
    try {
      const tx = await writeContractAsync({
        address: CONTRACT_ADDRESS,
        abi: CONTRACT_ABI,
        functionName: 'transferEth',
        args: [to, weiAmount],
      })
      console.log('Transaction sent:', tx)
      alert(`Transfer complete! Tx hash: ${tx.hash || tx}`)
    } catch (e) {
      console.error('Transfer failed:', e)
      alert(`Transfer failed: ${e.message || e}`)
      throw e
    }
  }

  // Parses prompt like "send 0.00013 ETH to 0xabc123..."
  const parseTransferPrompt = (prompt) => {
    const regex = /send\s+([\d\.]+)\s*eth\s+to\s+(0x[a-fA-F0-9]{40})/i
    const match = prompt.match(regex)
    if (!match) return null
    return { amount: match[1], toAddress: match[2] }
  }
//handle prompt
  const handlePromptEnter = async (prompt) => {
    const parsed = parseTransferPrompt(prompt)
    if (!parsed) {
      return 'Invalid prompt format. Use: send <amount> ETH to <address>'
    }
    try {
      await sendETHusingContract(parsed.toAddress, parsed.amount)
      return `Transfer of ${parsed.amount} ETH to ${parsed.toAddress} initiated. Check your wallet or transaction explorer for status.`
    } catch (e) {
      return `Transfer failed: ${e.message || e}`
    }
  }

  return (
    <div style={{ padding: 50, maxWidth: 600, margin: '0 auto', fontFamily: 'Arial, sans-serif' }}>
      <h1>ETH Transfer Platform</h1>

      <ConnectButton />

      {isConnected && <p>Connected Wallet: {address}</p>}

      <div style={{ marginTop: 20, marginBottom: 10 }}>
        <label>Recipient Address:</label>
        <input
          type='text'
          value={toAddress}
          onChange={(e) => setToAddress(e.target.value)}
          placeholder='0xabc123...'
          style={{ width: '100%', padding: 8, borderRadius: 6, border: '1px solid #ccc', fontSize: 16, marginTop: 6 }}
        />
      </div>

      <div style={{ marginBottom: 20 }}>
        <label>Amount (ETH):</label>
        <input
          type='text'
          value={ethAmount}
          onChange={(e) => setEthAmount(e.target.value)}
          placeholder='0.00013'
          style={{ width: '100%', padding: 8, borderRadius: 6, border: '1px solid #ccc', fontSize: 16, marginTop: 6 }}
        />
      </div>

      <button
        onClick={() => sendETHusingContract(toAddress, ethAmount)}
        disabled={isPending}
        style={{
          padding: '12px 24px',
          backgroundColor: '#FF9800',
          color: 'white',
          border: 'none',
          borderRadius: 8,
          cursor: isPending ? 'not-allowed' : 'pointer',
          fontSize: 16,
          width: '100%'
        }}
      >
        {isPending ? 'Sending...' : 'Send ETH'}
      </button>

      {error && <p style={{ color: 'red' }}>{error.message}</p>}

      {/* Chatbox style prompt input */}
      <ChatPrompt onEnter={handlePromptEnter} />
    </div>
  )
}
