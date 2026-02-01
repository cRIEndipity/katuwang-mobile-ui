export interface Message {
  id: string
  text: string
  sender: 'user' | 'bot'
  timestamp: Date
  type?: 'text' | 'options' | 'result'
  options?: string[]
  relatedCondition?: string
}

export type AssistantMode = 'chat' | 'symptom-checker'