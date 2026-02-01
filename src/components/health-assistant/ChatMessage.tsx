import { Bot, User } from 'lucide-react'
import { BRAND_COLORS } from '../../constants/colors'
import { Message } from './types'

interface ChatMessageProps {
  message: Message
  onOptionClick?: (option: string) => void
}

export default function ChatMessage({ message, onOptionClick }: ChatMessageProps) {
  const isBot = message.sender === 'bot'

  return (
    <div className={`flex items-start gap-3 ${isBot ? '' : 'flex-row-reverse'}`}>
      <div
        className="w-8 h-8 rounded-full flex items-center justify-center shrink-0 mt-1"
        style={{
          backgroundColor: isBot ? BRAND_COLORS.primary : BRAND_COLORS.secondary,
          color: 'white'
        }}
      >
        {isBot ? <Bot className="w-5 h-5" /> : <User className="w-5 h-5" />}
      </div>

      <div className={`flex flex-col max-w-[80%] ${isBot ? 'items-start' : 'items-end'}`}>
        <div
          className={`px-4 py-3 rounded-2xl text-sm ${
            isBot ? 'rounded-tl-none' : 'rounded-tr-none'
          }`}
          style={{
            backgroundColor: isBot ? 'white' : BRAND_COLORS.primary,
            color: isBot ? BRAND_COLORS.textPrimary : 'white',
            border: isBot ? `1px solid ${BRAND_COLORS.border}` : 'none',
            boxShadow: isBot ? '0 2px 4px rgba(0,0,0,0.05)' : '0 2px 4px rgba(29, 98, 175, 0.2)'
          }}
        >
          {message.text}
        </div>
        
        <span className="text-[10px] text-gray-400 mt-1 px-1">
          {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </span>

        {/* Render Options if available */}
        {message.type === 'options' && message.options && (
          <div className="flex flex-wrap gap-2 mt-2">
            {message.options.map((option) => (
              <button
                key={option}
                onClick={() => onOptionClick?.(option)}
                className="px-4 py-2 bg-white border border-blue-200 rounded-full text-sm text-blue-600 hover:bg-blue-50 transition-colors shadow-sm"
              >
                {option}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}