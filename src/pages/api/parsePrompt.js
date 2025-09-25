'use client'

import { useState } from 'react'

export default function PromptInput({ onEnter }) {
  const [prompt, setPrompt] = useState('')

  const handleEnter = () => {
    if (!prompt.trim()) {
      alert('Please enter something!')
      return
    }
    if (typeof onEnter === 'function') {
      onEnter(prompt)
    }
    setPrompt('')
  }

  return (
    <div style={{ marginTop: '30px', marginBottom: '30px' }}>
      <textarea
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        placeholder='Type your prompt like "send 0.00013 ETH to 0xabc123..."'
        style={{
          width: '100%',
          height: '100px',
          padding: '12px',
          border: '2px solid #ddd',
          borderRadius: '8px',
          fontSize: '16px',
          resize: 'vertical',
          fontFamily: 'Arial, sans-serif'
        }}
      />
      <button
        onClick={handleEnter}
        style={{
          marginTop: '10px',
          padding: '12px 24px',
          backgroundColor: '#2196F3',
          color: 'white',
          border: 'none',
          borderRadius: '8px',
          cursor: 'pointer',
          fontSize: '16px',
          width: '100%'
        }}
      >
        Enter
      </button>
    </div>
  )
}
