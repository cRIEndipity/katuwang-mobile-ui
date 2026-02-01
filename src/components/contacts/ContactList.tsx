import { Edit2, Trash2, Phone, Mail, PhoneCall } from 'lucide-react'
import { BRAND_COLORS } from '../../constants/colors'
import { Contact, RELATIONSHIP_OPTIONS } from './types'

interface ContactListProps {
  contacts: Contact[]
  onEdit: (contact: Contact) => void
  onDelete: (contact: Contact) => void
  onSetPrimary: (contactId: string) => void
}

export default function ContactList({ contacts, onEdit, onDelete, onSetPrimary }: ContactListProps) {
  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)
  }

  const getRelationshipIcon = (relationship: string) => {
    const option = RELATIONSHIP_OPTIONS.find(opt => opt.value === relationship)
    return option ? option.icon : '👤'
  }

  return (
    <div className="space-y-3">
      {contacts.map((contact) => (
        <div
          key={contact.id}
          className="rounded-xl overflow-hidden transition-all hover:shadow-md"
          style={{
            backgroundColor: BRAND_COLORS.background,
            border: `1px solid ${BRAND_COLORS.border}`
          }}
        >
          <div className="p-4">
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-3">
                <div
                  className="w-12 h-12 rounded-lg flex items-center justify-center text-white font-semibold"
                  style={{ backgroundColor: contact.isPrimary ? BRAND_COLORS.primary : BRAND_COLORS.secondary }}
                >
                  {getInitials(contact.name)}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold" style={{ color: BRAND_COLORS.textPrimary }}>
                      {contact.name}
                    </h3>
                    {contact.isPrimary && (
                      <span className="text-xs font-medium px-2 py-0.5 rounded-full" style={{ backgroundColor: 'rgba(0, 166, 81, 0.15)', color: BRAND_COLORS.success }}>
                        Primary
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-sm" style={{ color: BRAND_COLORS.textSecondary }}>
                      {getRelationshipIcon(contact.relationship)} {contact.relationship}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-2 mb-4">
              <a
                href={`tel:${contact.phone}`}
                className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 transition-colors group"
              >
                <div className="w-8 h-8 rounded-md flex items-center justify-center" style={{ backgroundColor: 'rgba(29, 98, 175, 0.1)' }}>
                  <Phone className="w-4 h-4" style={{ color: BRAND_COLORS.primary }} />
                </div>
                <div className="flex-1">
                  <div className="text-xs font-medium" style={{ color: BRAND_COLORS.textSecondary }}>
                    Mobile Number
                  </div>
                  <div className="text-sm font-medium" style={{ color: BRAND_COLORS.textPrimary }}>
                    {contact.phone}
                  </div>
                </div>
                <PhoneCall className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" style={{ color: BRAND_COLORS.primary }} />
              </a>

              {contact.email && (
                <a
                  href={`mailto:${contact.email}`}
                  className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 transition-colors group"
                >
                  <div className="w-8 h-8 rounded-md flex items-center justify-center" style={{ backgroundColor: 'rgba(29, 98, 175, 0.1)' }}>
                    <Mail className="w-4 h-4" style={{ color: BRAND_COLORS.primary }} />
                  </div>
                  <div className="flex-1">
                    <div className="text-xs font-medium" style={{ color: BRAND_COLORS.textSecondary }}>
                      Email Address
                    </div>
                    <div className="text-sm font-medium truncate" style={{ color: BRAND_COLORS.textPrimary }}>
                      {contact.email}
                    </div>
                  </div>
                </a>
              )}
            </div>

            <div className="flex gap-2">
              {!contact.isPrimary && (
                <button
                  onClick={() => onSetPrimary(contact.id)}
                  className="flex-1 text-center py-2.5 rounded-lg text-sm font-medium transition-all active:scale-95"
                  style={{
                    backgroundColor: 'rgba(29, 98, 175, 0.1)',
                    color: BRAND_COLORS.primary
                  }}
                >
                  Set as Primary
                </button>
              )}
              <button
                onClick={() => onEdit(contact)}
                className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-lg text-sm font-medium transition-all active:scale-95"
                style={{
                  backgroundColor: 'rgba(29, 98, 175, 0.1)',
                  color: BRAND_COLORS.secondary
                }}
              >
                <Edit2 className="w-4 h-4" />
                Edit
              </button>
              <button
                onClick={() => onDelete(contact)}
                className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-lg text-sm font-medium transition-all active:scale-95"
                style={{
                  backgroundColor: 'rgba(211, 47, 47, 0.1)',
                  color: BRAND_COLORS.danger
                }}
              >
                <Trash2 className="w-4 h-4" />
                Delete
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}