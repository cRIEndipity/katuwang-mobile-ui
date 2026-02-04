import { useState, useEffect, useRef } from 'react'
import { useAuth } from '../../context/AuthContext'
import { supabase } from '../../lib/supabase'
import { ChevronLeft, AlertTriangle, Menu, Plus, MessageSquare } from 'lucide-react'
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

interface Session {
  id: string
  title: string
  created_at: string
}

export default function HealthAssistant({ onNavigate }: HealthAssistantProps) {
  const { session } = useAuth()
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
  const [sessions, setSessions] = useState<Session[]>([])
  const [currentSessionId, setCurrentSessionId] = useState<string | null>(null)
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Load Sessions list
  useEffect(() => {
    if (!session?.user) return

    const loadSessions = async () => {
      const { data } = await supabase
        .from('chat_sessions')
        .select('*')
        .eq('user_id', session?.user.id)
        .order('created_at', { ascending: false })

      if (data) {
        setSessions(data)
      }
    }

    loadSessions()
  }, [session])

  // Load chat history from Supabase on mount
  useEffect(() => {
    if (!session?.user) return

    const loadHistory = async () => {
      // If no session selected, show welcome message
      if (!currentSessionId) {
        setMessages([
          {
            id: 'welcome',
            sender: 'bot',
            text: '## 🏥 Naga City Health Assistant\n\n**Katuwang:** Your trusted health companion\n\n*Powered by Naga City Health Department*\n\nI can help you assess symptoms, provide first aid guidance, and connect you with local health resources. How may I assist you today?',
            timestamp: new Date(),
            type: 'options',
            options: ['symptoms', 'firstaid', 'chronic', 'prevention', 'lifestyle', 'maternal']
          }
        ])
        return
      }

      // Load specific session messages
      const { data } = await supabase
        .from('chat_messages')
        .select('*')
        .eq('session_id', currentSessionId)
        .order('created_at', { ascending: true })

      if (data) {
        const history: Message[] = data.map(msg => ({
          id: msg.id,
          sender: msg.role as 'user' | 'bot',
          text: msg.content,
          timestamp: new Date(msg.created_at),
          type: 'text'
        }))

        setMessages(history)
      }
    }

    loadHistory()
  }, [session, currentSessionId])

  useEffect(() => {
    scrollToBottom()
  }, [messages, isTyping])

  const handleNewChat = () => {
    setCurrentSessionId(null)
    setIsSidebarOpen(false)
  }

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

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
      let activeSessionId = currentSessionId

      // Create new session if needed
      if (!activeSessionId && session?.user) {
        const title = userText.slice(0, 30) + (userText.length > 30 ? '...' : '')
        const { data: newSession } = await supabase
          .from('chat_sessions')
          .insert({
            user_id: session.user.id,
            title: title
          })
          .select()
          .single()

        if (newSession) {
          activeSessionId = newSession.id
          setCurrentSessionId(newSession.id)
          
          setSessions(prev => [newSession, ...prev])
        }
      }

      // Save USER message to Supabase
      if (session?.user && activeSessionId) {
        await supabase.from('chat_messages').insert({
          session_id: activeSessionId,
          user_id: session.user.id,
          role: 'user',
          content: userText
        })
      }

      // Emergency Checks 
      const lower = userText.toLowerCase()
      if (lower.includes('emergency') || lower.includes('911') || lower.includes ('bleed')) {
        await simulateTyping(1000)

        const response = getEmergencyResponse()
        addMessage('bot', response.text, 'result', response.options)
        setIsTyping(false)
      }

      // Call Gemini API
      const responseText = await getGeminiResponse(messages, userText)
      setIsTyping(false)
      addMessage('bot', responseText)

      // Save BOT response to Supabase
      if (session?.user && activeSessionId) {
        await supabase.from('chat_messages').insert({
          session_id: activeSessionId,
          user_id: session.user.id,
          role: 'bot',
          content: responseText
        })
      }

    } catch (error) {
      console.error(error)
      setIsTyping(false)
      addMessage('bot',  "I'm having a bit of trouble connecting. Please check your internet connection.")
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col relative overflow-hidden">
      {/* Sidebar Overlay */}
      {isSidebarOpen && (
        <div 
          className="absolute inset-0 bg-black/50 z-20"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar Drawer */}
      <div className={`
        absolute top-0 right-0 h-full w-64 bg-white shadow-xl z-30 transform transition-transform duration-300 ease-in-out
        ${isSidebarOpen ? 'translate-x-0' : 'translate-x-full'}
      `}>
        <div className="p-4 flex flex-col h-full">
          <button 
            onClick={handleNewChat}
            className="w-full flex items-center justify-center gap-2 bg-emerald-600 text-white py-2 rounded-lg mb-4 hover:bg-emerald-700 transition-colors"
          >
            <Plus className="w-4 h-4" /> New Chat
          </button>
          
          <h2 className="text-sm font-semibold text-gray-500 mb-2 uppercase tracking-wider">History</h2>
          
          <div className="flex-1 overflow-y-auto space-y-2">
            {sessions.map(s => (
              <button
                key={s.id}
                onClick={() => {
                  setCurrentSessionId(s.id)
                  setIsSidebarOpen(false)
                }}
                className={`w-full text-left p-3 rounded-lg text-sm flex items-start gap-3 transition-colors ${
                  currentSessionId === s.id ? 'bg-emerald-50 text-emerald-700' : 'hover:bg-gray-50 text-gray-700'
                }`}
              >
                <MessageSquare className="w-4 h-4 mt-0.5 shrink-0" />
                <span className="line-clamp-2">{s.title || 'Untitled Chat'}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Header (Updated with Menu Button) */}
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
            
            <div className="flex items-center gap-2">
              <button onClick={() => onNavigate('emergency')} className="p-2 bg-red-50 text-red-600 rounded-lg">
                <AlertTriangle className="w-5 h-5" />
              </button>
              {/* Menu Button */}
              <button 
                onClick={() => setIsSidebarOpen(true)}
                className="p-2 hover:bg-gray-100 rounded-lg text-emerald-600"
              >
                <Menu className="w-5 h-5" />
              </button>
            </div>
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