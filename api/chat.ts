import { GoogleGenAI } from '@google/genai'

export default async function handler(req: any, res: any) {
  // Check method
  if (req.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), {
      status: 405, 
      headers: { 'Content-Type': 'application/json' }
    })
  }

  try {
    // Parse body
    const { history, message } = req.body

    // Initialize Server-Side Client
    const apiKey = process.env.GEMINI_API_KEY
    if (!apiKey) throw new Error("Missing API Key on server")

    const ai = new GoogleGenAI({ apiKey })

    
    // Create Chat
    const SYSTEM_INSTRUCTION = "You are Katuwang, a friendly and knowledgeable health assistant for Naga City. Your goal is to provide helpful, accurate, and concise health information, first aid guidance, and local resource recommendations. Only answer health-related questions. If a situation seems like an emergency (severe bleeding, unconsciousness, chest pain, difficulty breathing, etc.), advise the user to call 911 or go to the nearest hospital immediately. Be empathetic and professional. Keep responses easy to understand."

    const chat = ai.chats.create({
      model: "gemini-2.5-flash",
      config: { systemInstruction: SYSTEM_INSTRUCTION },
      history: history
    })

    const result = await chat.sendMessage({ message })

    // Return response to frontend
    return res.status(200).json({ text: result.text })

  } catch (error: any) {
    console.error("Server API Error:", error)

    return res.status(500).json({
      error: error.message || "Internal Server Error"
    })
  }
}