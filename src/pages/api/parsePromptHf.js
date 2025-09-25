// import { HfInference } from '@huggingface/inference'

// const hf = new HfInference(process.env.HUGGINGFACE_API_KEY)

// export default async function handler(req, res) {
//   if (req.method !== 'POST') {
//     res.setHeader('Allow', ['POST'])
//     return res.status(405).json({ error: `Method ${req.method} Not Allowed` })
//   }

//   const { prompt } = req.body
//   if (!prompt || typeof prompt !== 'string') {
//     return res.status(400).json({ error: 'Invalid or missing "prompt" in request body' })
//   }

//   try {
//     const modelId = "HuggingFaceTB/SmolLM3-3B"

//     const result = await hf.request({
//       model: modelId,
//       inputs: prompt,
//       task: "conversational",
//       options: { use_cache: false }
//     })

//     // Some conversational responses return with 'generated_text' or 'generated_responses'
//     const generatedText = result.generated_text || result.generated_responses?.[0] || ""

//     // Extract ETH amount and address with regex
//     const regex = /send\s+([\d\.]+)\s*eth\s+to\s+(0x[a-fA-F0-9]{40})/i
//     const match = generatedText.match(regex)

//     if (!match) {
//       return res.status(422).json({ error: "Could not parse amount and address from model output", generatedText })
//     }

//     const amount = match[1]
//     const toAddress = match[2]

//     res.status(200).json({
//       amount,  
//       toAddress                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             6,
//       generatedText,
//     })
//   } catch (error) {
//     console.error('Hugging Face inference error:', error)
//     res.status(500).json({ error: error.message || 'Internal server error' })
//   }
// }
