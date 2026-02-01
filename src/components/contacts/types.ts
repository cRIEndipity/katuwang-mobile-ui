export interface Contact {
  id: string
  name: string
  relationship: string
  phone: string
  email?: string
  isPrimary?: boolean
}

export const RELATIONSHIP_OPTIONS = [
  { value: 'Spouse', icon: '👰' },
  { value: 'Parent', icon: '👨‍👧' },
  { value: 'Child', icon: '👶' },
  { value: 'Sibling', icon: '👥' },
  { value: 'Friend', icon: '🤝' },
  { value: 'Neighbor', icon: '🏘️' },
  { value: 'Doctor', icon: '👨‍⚕️' },
  { value: 'Other', icon: '👤' }
]