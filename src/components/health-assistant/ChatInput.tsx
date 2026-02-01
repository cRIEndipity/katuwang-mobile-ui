import { Send, Loader } from 'lucide-react'
import { BRAND_COLORS } from '../../constants/colors'

interface ChatInputProps {
  value: string
  onChange: (value: string) => void
  onSend: () => void
  isLoading?: boolean
  placeholder?: string
}

export default function ChatInput({ value, onChange, onSend, isLoading, placeholder }: ChatInputProps) {
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      onSend()
    }
  }

  return (
    <div className="p-4 bg-white border-t" style={{ borderColor: BRAND_COLORS.border }}>
      <div className="flex gap-2">
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={handleKeyPress}
          placeholder={placeholder || "Type your symptoms..."}
          className="flex-1 px-4 py-3 rounded-xl border focus:outline-none focus:ring-2 focus:ring-blue-500/20"
          style={{
            borderColor: BRAND_COLORS.border,
            backgroundColor: BRAND_COLORS.background
          }}
        />
        <button
          onClick={onSend}
          disabled={!value.trim() || isLoading}
          className="p-3 rounded-xl transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
          style={{
            backgroundColor: BRAND_COLORS.primary,
            color: 'white'
          }}
        >
          {isLoading ? (
            <Loader className="w-5 h-5 animate-spin" />
          ) : (
            <Send className="w-5 h-5" />
          )}
        </button>
      </div>
    </div>
  )
}