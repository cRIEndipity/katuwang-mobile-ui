import { Message } from "../components/health-assistant/types"

export const getGeminiResponse = async (
  history: Message[], 
  newMessage: string
) => {
  try {
    // Format history
    const chatHistory = history
      .filter(msg => msg.type === 'text')
      .map(msg => ({
        role: msg.sender === 'user' ? 'user' : 'model',
        parts: [{ text: msg.text }]
      }))

    // Call backend API
    const response = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 
        history: chatHistory, 
        message: newMessage 
      })
    })

    if (!response.ok) {
      throw new Error(`API Error: ${response.statusText}`)
    }

    const data = await response.json()
    return data.text || "I'm having trouble thinking right now."

  } catch (error) {
    console.error("Error fetching from backend: " , error)

    return "I apologize, but I'm having trouble connecting to the health database right now. Please try again later."
  }
}