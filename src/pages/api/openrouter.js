import { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end()

  const { prompt } = req.body
  if (!prompt) return res.status(400).json({ error: 'Missing prompt' })

  try {
    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.OPENROUTER_API_KEY}`,
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          { role: 'system', content: 'Simplify and correct the user prompt for Ethereum transfer operation.' },
          { role: 'user', content: prompt }
        ],
        temperature: 0.3,
        max_tokens: 100,
      }),
    })
    if (!response.ok) {
      const text = await response.text()
      throw new Error(`OpenRouter error: ${text}`)
    }
    const data = await response.json()
    const simplifiedPrompt = data.choices?.[0]?.message?.content || ''
    res.status(200).json({ simplifiedPrompt })
  } catch (e) {
    res.status(500).json({ error: e.message || 'Internal Server Error' })
  }
}
