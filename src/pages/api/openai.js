import { NextApiRequest, NextApiResponse } from 'next'
import OpenAI from 'openai'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end()

  const { prompt } = req.body
  if (!prompt) return res.status(400).json({ error: 'Missing prompt' })

  try {
    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini', // or 'gpt-4', 'gpt-4o', etc. based on your subscription
      messages: [
        { role: 'system', 
            content: 'You are an assistant that only replies with a clear Ethereum transfer command in this format: send <amount> ETH to <address>. Do not add any explanations or code blocks.' },
        { role: 'user', content: prompt },
      ],
      temperature: 0.3,
      max_tokens: 100,
    })

    const simplifiedPrompt = completion.choices[0]?.message?.content || ''
    res.status(200).json({ simplifiedPrompt })
  } catch (e) {
    res.status(500).json({ error: e.message || 'Internal Server Error' })
  }
}
