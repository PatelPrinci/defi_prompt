'use client'

import { useState, useRef, useEffect } from 'react'

export default function ChatPrompt({ onEnter }) {
  const [input, setInput] = useState('')
  const [messages, setMessages] = useState([]) // { from: 'user' | 'bot', text: string }
  const messagesEndRef = useRef(null)

  // Scroll chat to bottom when messages update
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const handleSend = () => {
    const trimmed = input.trim()
    if (!trimmed) return alert('Please enter something!')

    // Append user message
    setMessages((msgs) => [...msgs, { from: 'user', text: trimmed }])
    setInput('')

    // Call onEnter callback to handle prompt, expects a Promise returning response string
    if (typeof onEnter === 'function') {
      Promise.resolve(onEnter(trimmed)).then((response) => {
        if (response) {
          setMessages((msgs) => [...msgs, { from: 'bot', text: response }])
        }
      })
    }
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  return (
    <div style={{
      maxWidth: 600,
      margin: '30px auto',
      fontFamily: 'Arial, sans-serif',
      display: 'flex',
      flexDirection: 'column',
      height: '400px',
      border: '1px solid #ccc',
      borderRadius: '8px',
      padding: '10px'
    }}>
      <div style={{ flex: 1, overflowY: 'auto', padding: '10px', backgroundColor: '#fafafa', borderRadius: '4px' }}>
        {messages.length === 0 && (
          <p style={{ color: '#888', textAlign: 'center', marginTop: '50%' }}>
            Enter your prompt below and see responses here.
          </p>
        )}
        {messages.map((msg, i) => (
          <div
            key={i}
            style={{
              marginBottom: 12,
              textAlign: msg.from === 'user' ? 'right' : 'left'
            }}
          >
            <div style={{
              display: 'inline-block',
              backgroundColor: msg.from === 'user' ? '#2196F3' : '#eee',
              color: msg.from === 'user' ? 'white' : 'black',
              borderRadius: 16,
              padding: '8px 12px',
              maxWidth: '75%',
              whiteSpace: 'pre-wrap',
              wordBreak: 'break-word',
            }}>
              {msg.text}
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      <textarea
        rows={2}
        placeholder='Type your prompt here... (Enter to send, Shift+Enter newline)'
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleKeyDown}
        style={{
          marginTop: 10,
          borderRadius: '8px',
          border: '1px solid #ccc',
          padding: '8px',
          fontSize: '16px',
          resize: 'none',
          width: '100%',
          fontFamily: 'Arial, sans-serif'
        }}
      />
      <button
        onClick={handleSend}
        style={{
          marginTop: '10px',
          backgroundColor: '#2196F3',
          border: 'none',
          color: 'white',
          fontSize: '16px',
          padding: '10px',
          borderRadius: '8px',
          cursor: 'pointer',
          width: '100%'
        }}>
        Send
      </button>
    </div>
  )
}
