import { useState } from 'react'
import {
  ArrowLeft,
  UserPlus,
  Users,
  AlertCircle
} from 'lucide-react'
import { Screen } from "../../types"
import { BRAND_COLORS } from '../../constants/colors'
import { Contact } from './types'
import ContactList from './ContactList'
import ContactFormModal from './ContactFormModal'
import DeleteContactModal from './DeleteContactModal'

interface EmergencyContactsProps {
  onNavigate: (screen: Screen) => void
}

export default function EmergencyContacts({ onNavigate }: EmergencyContactsProps) {
  const [contacts, setContacts] = useState<Contact[]>([
    { id: '1', name: 'Maria Santos', relationship: 'Spouse', phone: '09171234567', email: 'maria@email.com', isPrimary: true },
    { id: '2', name: 'Dr. Juan Cruz', relationship: 'Doctor', phone: '09189876543', email: 'drcruz@clinic.com' },
    { id: '3', name: 'Pedro Reyes', relationship: 'Sibling', phone: '09151112222' },
    { id: '4', name: 'Ana Lopez', relationship: 'Parent', phone: '09152223333', email: 'ana.lopez@email.com' }
  ])

  const [modalState, setModalState] = useState<{
    type: 'add' | 'edit' | 'delete' | null
    selectedContact?: Contact
  }>({ type: null })

  const handleAddSubmit = (data: Omit<Contact, 'id' | 'isPrimary'>) => {
    const newContact: Contact = {
      ...data,
      id: Date.now().toString(),
      isPrimary: contacts.length === 0
    }
    setContacts([...contacts, newContact])
    setModalState({ type: null })
  }

  const handleEditSubmit = (data: Omit<Contact, 'id' | 'isPrimary'>) => {
    if (!modalState.selectedContact) return
    const updatedContact: Contact = {
      ...modalState.selectedContact,
      ...data
    }
    setContacts(contacts.map(c => c.id === modalState.selectedContact?.id ? updatedContact : c))
    setModalState({ type: null })
  }

  const handleDeleteSubmit = () => {
    if (!modalState.selectedContact) return
    setContacts(contacts.filter(c => c.id !== modalState.selectedContact?.id))
    setModalState({ type: null })
  }

  const handleSetPrimary = (contactId: string) => {
    setContacts(contacts.map(contact => ({
      ...contact,
      isPrimary: contact.id === contactId
    })))
  }

  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: BRAND_COLORS.surface }}>
      {/* Header */}
      <div
        className="px-6 pt-8 pb-6 text-white"
        style={{ backgroundColor: BRAND_COLORS.primary }}
      >
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={() => onNavigate('dashboard')}
            className="flex items-center gap-2 text-white/80 hover:text-white transition-colors p-2 rounded-lg hover:bg-white/10"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="text-sm font-medium">Back</span>
          </button>

          <button
            onClick={() => setModalState({ type: 'add' })}
            className="flex items-center gap-2 px-4 py-2.5 rounded-lg font-medium transition-all active:scale-95"
            style={{ backgroundColor: BRAND_COLORS.primary }}
          >
            <UserPlus className="w-4 h-4" />
            <span className="text-sm">Add Contact</span>
          </button>
        </div>

        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-xl flex items-center justify-center" style={{ backgroundColor: 'rgba(255, 255, 255, 0.15)' }}>
            <Users className="w-7 h-7 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold mb-1">Emergency Contacts</h1>
            <p className="text-white/80 text-sm">Your trusted emergency network</p>
          </div>
        </div>
      </div>

      {/* Stats Bar */}
      <div className="px-6 py-4" style={{ backgroundColor: BRAND_COLORS.background }}>
        <div className="flex items-center justify-between">
          <div>
            <div className="text-sm font-medium" style={{ color: BRAND_COLORS.textSecondary }}>
              Emergency Network
            </div>
            <div className="text-xl font-bold" style={{ color: BRAND_COLORS.textPrimary }}>
              {contacts.length} Contacts
            </div>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: BRAND_COLORS.success }}></div>
            <span className="text-xs font-medium" style={{ color: BRAND_COLORS.success }}>
              Active
            </span>
          </div>
        </div>
      </div>

      {/* Notification Info */}
      <div className="px-6 py-4">
        <div
          className="rounded-xl p-4 border"
          style={{
            backgroundColor: 'rgba(29, 98, 175, 0.08)',
            borderColor: BRAND_COLORS.border
          }}
        >
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0" style={{ backgroundColor: 'rgba(29, 98, 175, 0.2)' }}>
              <AlertCircle className="w-5 h-5" style={{ color: BRAND_COLORS.primary }} />
            </div>
            <div>
              <h3 className="text-sm font-semibold mb-1" style={{ color: BRAND_COLORS.textPrimary }}>
                Emergency Notification Protocol
              </h3>
              <p className="text-xs" style={{ color: BRAND_COLORS.textSecondary }}>
                In case of emergency, all contacts will receive SMS alerts and phone call notifications with your location.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Contacts List */}
      <div className="px-6 py-4">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-base font-semibold" style={{ color: BRAND_COLORS.textPrimary }}>
            Emergency Contacts
          </h2>
          <span className="text-xs font-medium px-2 py-1 rounded-full" style={{ backgroundColor: 'rgba(56, 189, 248, 0.15)', color: BRAND_COLORS.primary }}>
            {contacts.length} saved
          </span>
        </div>

        {contacts.length === 0 ? (
          <div
            className="rounded-xl p-8 text-center border-2 border-dashed"
            style={{
              backgroundColor: BRAND_COLORS.background,
              borderColor: BRAND_COLORS.border
            }}
          >
            <div className="w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center" style={{ backgroundColor: 'rgba(29, 98, 175, 0.1)' }}>
              <Users className="w-8 h-8" style={{ color: BRAND_COLORS.primary }} />
            </div>
            <h3 className="text-lg font-semibold mb-2" style={{ color: BRAND_COLORS.textPrimary }}>
              No Emergency Contacts
            </h3>
            <p className="text-sm mb-6" style={{ color: BRAND_COLORS.textSecondary }}>
              Add trusted contacts to notify in case of emergencies
            </p>
            <button
              onClick={() => setModalState({ type: 'add' })}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all active:scale-95"
              style={{ backgroundColor: BRAND_COLORS.primary, color: 'white' }}
            >
              <UserPlus className="w-4 h-4" />
              Add First Contact
            </button>
          </div>
        ) : (
          <ContactList
            contacts={contacts}
            onEdit={(contact) => setModalState({ type: 'edit', selectedContact: contact })}
            onDelete={(contact) => setModalState({ type: 'delete', selectedContact: contact })}
            onSetPrimary={handleSetPrimary}
          />
        )}

        {contacts.length > 0 && (
          <div className="mt-6">
            <button
              onClick={() => setModalState({ type: 'add' })}
              className="w-full flex items-center justify-center gap-2 py-3.5 rounded-lg font-medium transition-all active:scale-95"
              style={{
                backgroundColor: BRAND_COLORS.primary,
                color: 'white'
              }}
            >
              <UserPlus className="w-5 h-5" />
              Add Another Contact
            </button>
          </div>
        )}
      </div>

      {/* Modals */}
      <ContactFormModal
        isOpen={modalState.type === 'add' || modalState.type === 'edit'}
        initialData={modalState.type === 'edit' ? modalState.selectedContact : null}
        onClose={() => setModalState({ type: null })}
        onSubmit={modalState.type === 'add' ? handleAddSubmit : handleEditSubmit}
      />

      <DeleteContactModal
        isOpen={modalState.type === 'delete'}
        contactName={modalState.selectedContact?.name || ''}
        onConfirm={handleDeleteSubmit}
        onCancel={() => setModalState({ type: null })}
      />
    </div>
  )
}