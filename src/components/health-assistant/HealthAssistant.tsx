import { useState, useEffect, useRef } from 'react'
import { ChevronLeft, AlertTriangle } from 'lucide-react'
import { Screen } from "../../types"
import { Message } from './types'
import { categories, symptoms } from './data'
import { analyzeSymptom, getEmergencyResponse } from './SymptomChecker'
import ChatMessage from './ChatMessage'
import ChatInput from './ChatInput'
import { getGeminiResponse } from '../../services/gemini'

interface HealthAssistantProps {
  onNavigate: (screen: Screen) => void
}

export default function HealthAssistant({ onNavigate }: HealthAssistantProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      sender: 'bot',
      text: '## 🏥 Naga City Health Assistant\n\n**Katuwang:** Your trusted health companion\n\n*Powered by Naga City Health Department*\n\nI can help you assess symptoms, provide first aid guidance, and connect you with local health resources. How may I assist you today?',
      timestamp: new Date(),
      type: 'options',
      options: ['symptoms', 'firstaid', 'chronic', 'prevention', 'lifestyle', 'maternal']
    }
  ])
  
  // Track the current symptom being assessed to handle level selection context
  const [currentSymptomId, setCurrentSymptomId] = useState<string | null>(null)
  const [inputMessage, setInputMessage] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages, isTyping])

  const addMessage = (sender: 'bot' | 'user', text: string, type: 'text' | 'options' | 'result' = 'text', options?: string[]) => {
    const newMessage: Message = {
      id: Date.now().toString(),
      sender,
      text,
      timestamp: new Date(),
      type,
      options
    }
    setMessages(prev => [...prev, newMessage])
  }

  const simulateTyping = (duration: number = 1000) => {
    setIsTyping(true)
    return new Promise(resolve => {
      setTimeout(() => {
        setIsTyping(false)
        resolve(true)
      }, duration)
    })
  }

  const handleOptionClick = async (option: string) => {
    // 1. Navigation overrides
    if (['call-911', 'emergency'].includes(option)) { 
      onNavigate('emergency') 
      return 
    }
    if (option === 'find-hospital') { 
      onNavigate('hospitals') 
      return 
    }
    if (option === 'find-clinic') { 
      onNavigate('contacts') 
      return 
    }

    // 2. Add user selection to chat
    addMessage('user', option)
    await simulateTyping(600)

    // 3. Handle 'Back' flow
    if (option === 'back') {
       setCurrentSymptomId(null)
       addMessage('bot', '## Main Menu\n\nHow can I assist you today?', 'options', categories.map(c => c.id))
       return
    }

    // 4. Handle Category Selection
    const category = categories.find(c => c.id === option)
    if (category) {
       if (category.id === 'symptoms') {
         addMessage('bot', `## ${category.name}\n\nSelect a symptom:`, 'options', [...symptoms.map(s => s.id), 'back'])
       } else {
         addMessage('bot', `## ${category.name}\n\nHow can I help with ${category.name}?`, 'options', ['back'])
       }
       return
    }

    // 5. Handle Symptom Selection
    const symptom = symptoms.find(s => s.id === option)
    if (symptom) {
       setCurrentSymptomId(symptom.id)
       addMessage('bot', `## ${symptom.name}\n\nSelect severity level:`, 'options', ['level1', 'level2', 'level3', 'not-sure', 'back'])
       return
    }

    // 6. Handle Level Selection
    if (['level1', 'level2', 'level3'].includes(option) && currentSymptomId) {
       const level = parseInt(option.replace('level', ''))
       const result = analyzeSymptom(currentSymptomId, level)
       addMessage('bot', result.text, 'result', result.options)
       return
    }

    // 7. Handle Other Quick Actions
    switch (option) {
      case 'describe-symptoms':
        addMessage('bot', 'Please describe your symptoms in detail. Include:\n\n• When symptoms started\n• Severity (1-10 scale)\n• What makes it better/worse')
        break
      case 'schedule-appointment':
        addMessage('bot', 'To schedule an appointment:\n\n1. **Online:** Visit Naga City Health Portal\n2. **Phone:** Call 1555\n3. **In-person:** Visit City Health Office')
        break
      case 'monitor-symptoms':
        addMessage('bot', '**Symptom Monitoring Guide:**\n\n📋 Keep a symptom diary:\n• Record symptoms daily\n• Note severity\n• Track triggers')
        break
       case 'not-sure':
        addMessage('bot', '**If you\'re unsure:**\n\n1. Describe your symptoms\n2. Contact health hotline: 1555\n3. Visit nearest clinic')
        break
    }
  }
  
  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return
    
    const userText = inputMessage.trim()

    addMessage('user', userText)
    setInputMessage('')
    setIsTyping(true)

    try {
      // Safety/Emergency Override
      const lower = userText.toLowerCase()

      if (lower.includes('emergency') || lower.includes('911') || lower.includes('bleed')) {
        await simulateTyping(1000)

        const response = getEmergencyResponse()
        addMessage('bot', response.text, 'result', response.options)
        setIsTyping(false)

        return
      }

      // Call Gemini Service
      const responseText = await getGeminiResponse(messages, userText)

      setIsTyping(false)
      addMessage('bot', responseText)
    } catch (error) {
      setIsTyping(false)
      addMessage('bot',  "I'm having a bit of trouble connecting. Please check your internet connection.")
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <div className="bg-white border-b shadow-sm sticky top-0 z-10">
        <div className="px-4 py-3 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <button onClick={() => onNavigate('dashboard')} className="p-2 hover:bg-gray-100 rounded-lg">
                <ChevronLeft className="w-5 h-5 text-gray-600" />
              </button>
              <div>
                <h1 className="text-base font-bold text-gray-900">Health Assistant</h1>
                <div className="flex items-center gap-1.5">
                  <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></div>
                  <span className="text-xs text-gray-500">Online</span>
                </div>
              </div>
            </div>
            <button onClick={() => onNavigate('emergency')} className="p-2 bg-red-50 text-red-600 rounded-lg">
              <AlertTriangle className="w-5 h-5" />
            </button>
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg) => (
          <ChatMessage 
            key={msg.id} 
            message={msg} 
            onOptionClick={handleOptionClick} 
          />
        ))}
        {isTyping && (
           <div className="flex items-center gap-2 text-gray-400 text-xs ml-12">
             <span className="animate-bounce">●</span>
             <span className="animate-bounce delay-100">●</span>
             <span className="animate-bounce delay-200">●</span>
           </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <ChatInput 
        value={inputMessage}
        onChange={setInputMessage}
        onSend={handleSendMessage}
        isLoading={isTyping}
      />
    </div>
  )
}