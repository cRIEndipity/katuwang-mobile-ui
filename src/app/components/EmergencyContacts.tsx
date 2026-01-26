import { useState } from 'react';
import { 
  ChevronLeft, 
  UserPlus, 
  Phone, 
  Mail,
  Trash2,
  X, 
  Check, 
  Shield,
  Edit2,
  Users,
  AlertCircle,
  ArrowLeft,
  User,
  PhoneCall,
  MessageSquare,
  BadgeCheck
} from 'lucide-react';

type Screen = 'entry' | 'dashboard' | 'health-assistant' | 'emergency' | 'hospitals' | 'contacts';
type UserType = 'patient' | 'professional' | null;

interface EmergencyContactsProps {
  onNavigate: (screen: Screen) => void;
  userType?: UserType;
}

interface Contact {
  id: string;
  name: string;
  relationship: string;
  phone: string;
  email?: string;
  isPrimary?: boolean;
}

const relationshipOptions = [
  { value: 'Spouse', icon: '👰' },
  { value: 'Parent', icon: '👨‍👧' },
  { value: 'Child', icon: '👶' },
  { value: 'Sibling', icon: '👥' },
  { value: 'Friend', icon: '🤝' },
  { value: 'Neighbor', icon: '🏘️' },
  { value: 'Doctor', icon: '👨‍⚕️' },
  { value: 'Other', icon: '👤' }
];

// Professional Government Color Scheme
const BRAND_COLORS = {
  primary: '#F7502F',    // Naga Coral - Primary actions, alerts
  secondary: '#1D62AF',  // Fun Blue - Main theme, buttons
  success: '#00A651',    // Green - Confirmations, status
  background: '#FAFBFC', // Athens Gray - Background
  surface: '#FFFFFF',    // White - Cards, surfaces
  textPrimary: '#1E293B',// Slate 800 - Primary text
  textSecondary: '#64748B', // Slate 500 - Secondary text
  border: '#E2E8F0',     // Slate 200 - Borders
  error: '#DC2626',      // Red - Errors, warnings
};

export default function EmergencyContacts({ onNavigate, userType }: EmergencyContactsProps) {
  const [contacts, setContacts] = useState<Contact[]>([
    { id: '1', name: 'Maria Santos', relationship: 'Spouse', phone: '09171234567', email: 'maria@email.com', isPrimary: true },
    { id: '2', name: 'Dr. Juan Cruz', relationship: 'Doctor', phone: '09189876543', email: 'drcruz@clinic.com' },
    { id: '3', name: 'Pedro Reyes', relationship: 'Sibling', phone: '09151112222' },
    { id: '4', name: 'Ana Lopez', relationship: 'Parent', phone: '09152223333', email: 'ana.lopez@email.com' }
  ]);

  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
  const [formName, setFormName] = useState('');
  const [formRelationship, setFormRelationship] = useState('');
  const [formPhone, setFormPhone] = useState('');
  const [formEmail, setFormEmail] = useState('');
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  const resetForm = () => {
    setFormName('');
    setFormRelationship('');
    setFormPhone('');
    setFormEmail('');
    setFormErrors({});
  };

  const validateForm = () => {
    const errors: Record<string, string> = {};
    if (!formName.trim()) errors.name = 'Full name is required';
    if (!formRelationship) errors.relationship = 'Please select relationship';
    if (!formPhone.trim()) errors.phone = 'Phone number is required';
    else if (!/^09\d{9}$/.test(formPhone.replace(/\s/g, ''))) errors.phone = 'Please use format: 09171234567';
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleAddSubmit = () => {
    if (!validateForm()) return;
    const newContact: Contact = {
      id: Date.now().toString(),
      name: formName.trim(),
      relationship: formRelationship,
      phone: formPhone,
      email: formEmail.trim() || undefined,
      isPrimary: contacts.length === 0 // First contact becomes primary
    };
    setContacts([...contacts, newContact]);
    setShowAddModal(false);
    resetForm();
  };

  const handleEditSubmit = () => {
    if (!validateForm() || !selectedContact) return;
    const updatedContact: Contact = {
      ...selectedContact,
      name: formName.trim(),
      relationship: formRelationship,
      phone: formPhone,
      email: formEmail.trim() || undefined
    };
    setContacts(contacts.map(c => c.id === selectedContact.id ? updatedContact : c));
    setShowEditModal(false);
    setSelectedContact(null);
    resetForm();
  };

  const handleDeleteSubmit = () => {
    if (!selectedContact) return;
    setContacts(contacts.filter(c => c.id !== selectedContact.id));
    setShowDeleteModal(false);
    setSelectedContact(null);
  };

  const handleSetPrimary = (contactId: string) => {
    setContacts(contacts.map(contact => ({
      ...contact,
      isPrimary: contact.id === contactId
    })));
  };

  const openAddModal = () => {
    resetForm();
    setShowAddModal(true);
  };

  const openEditModal = (contact: Contact) => {
    setSelectedContact(contact);
    setFormName(contact.name);
    setFormRelationship(contact.relationship);
    setFormPhone(contact.phone);
    setFormEmail(contact.email || '');
    setShowEditModal(true);
  };

  const openDeleteModal = (contact: Contact) => {
    setSelectedContact(contact);
    setShowDeleteModal(true);
  };

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
  };

  const getRelationshipIcon = (relationship: string) => {
    const option = relationshipOptions.find(opt => opt.value === relationship);
    return option ? option.icon : '👤';
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: BRAND_COLORS.background }}>
      {/* Header */}
      <div 
        className="px-6 pt-8 pb-6 text-white"
        style={{ backgroundColor: BRAND_COLORS.secondary }}
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
            onClick={openAddModal}
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
      <div className="px-6 py-4" style={{ backgroundColor: BRAND_COLORS.surface }}>
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
            backgroundColor: `${BRAND_COLORS.secondary}08`,
            borderColor: BRAND_COLORS.border
          }}
        >
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0" style={{ backgroundColor: `${BRAND_COLORS.secondary}20` }}>
              <AlertCircle className="w-5 h-5" style={{ color: BRAND_COLORS.secondary }} />
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
          <span className="text-xs font-medium px-2 py-1 rounded-full" style={{ backgroundColor: `${BRAND_COLORS.primary}15`, color: BRAND_COLORS.primary }}>
            {contacts.length} saved
          </span>
        </div>

        {contacts.length === 0 ? (
          <div 
            className="rounded-xl p-8 text-center border-2 border-dashed"
            style={{ 
              backgroundColor: BRAND_COLORS.surface,
              borderColor: BRAND_COLORS.border
            }}
          >
            <div className="w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center" style={{ backgroundColor: `${BRAND_COLORS.secondary}10` }}>
              <Users className="w-8 h-8" style={{ color: BRAND_COLORS.secondary }} />
            </div>
            <h3 className="text-lg font-semibold mb-2" style={{ color: BRAND_COLORS.textPrimary }}>
              No Emergency Contacts
            </h3>
            <p className="text-sm mb-6" style={{ color: BRAND_COLORS.textSecondary }}>
              Add trusted contacts to notify in case of emergencies
            </p>
            <button
              onClick={openAddModal}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all active:scale-95"
              style={{ backgroundColor: BRAND_COLORS.secondary, color: 'white' }}
            >
              <UserPlus className="w-4 h-4" />
              Add First Contact
            </button>
          </div>
        ) : (
          <div className="space-y-3">
            {contacts.map((contact) => (
              <div 
                key={contact.id}
                className="rounded-xl overflow-hidden transition-all hover:shadow-md"
                style={{ 
                  backgroundColor: BRAND_COLORS.surface,
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
                            <span className="text-xs font-medium px-2 py-0.5 rounded-full" style={{ backgroundColor: `${BRAND_COLORS.success}15`, color: BRAND_COLORS.success }}>
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
                      <div className="w-8 h-8 rounded-md flex items-center justify-center" style={{ backgroundColor: `${BRAND_COLORS.secondary}10` }}>
                        <Phone className="w-4 h-4" style={{ color: BRAND_COLORS.secondary }} />
                      </div>
                      <div className="flex-1">
                        <div className="text-xs font-medium" style={{ color: BRAND_COLORS.textSecondary }}>
                          Mobile Number
                        </div>
                        <div className="text-sm font-medium" style={{ color: BRAND_COLORS.textPrimary }}>
                          {contact.phone}
                        </div>
                      </div>
                      <PhoneCall className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" style={{ color: BRAND_COLORS.secondary }} />
                    </a>

                    {contact.email && (
                      <a 
                        href={`mailto:${contact.email}`}
                        className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 transition-colors group"
                      >
                        <div className="w-8 h-8 rounded-md flex items-center justify-center" style={{ backgroundColor: `${BRAND_COLORS.secondary}10` }}>
                          <Mail className="w-4 h-4" style={{ color: BRAND_COLORS.secondary }} />
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
                        onClick={() => handleSetPrimary(contact.id)}
                        className="flex-1 text-center py-2.5 rounded-lg text-sm font-medium transition-all active:scale-95"
                        style={{ 
                          backgroundColor: `${BRAND_COLORS.secondary}10`,
                          color: BRAND_COLORS.secondary
                        }}
                      >
                        Set as Primary
                      </button>
                    )}
                    <button
                      onClick={() => openEditModal(contact)}
                      className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-lg text-sm font-medium transition-all active:scale-95"
                      style={{ 
                        backgroundColor: `${BRAND_COLORS.secondary}10`,
                        color: BRAND_COLORS.secondary
                      }}
                    >
                      <Edit2 className="w-4 h-4" />
                      Edit
                    </button>
                    <button
                      onClick={() => openDeleteModal(contact)}
                      className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-lg text-sm font-medium transition-all active:scale-95"
                      style={{ 
                        backgroundColor: `${BRAND_COLORS.primary}10`,
                        color: BRAND_COLORS.primary
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
        )}

        {contacts.length > 0 && (
          <div className="mt-6">
            <button
              onClick={openAddModal}
              className="w-full flex items-center justify-center gap-2 py-3.5 rounded-lg font-medium transition-all active:scale-95"
              style={{ 
                backgroundColor: BRAND_COLORS.secondary,
                color: 'white'
              }}
            >
              <UserPlus className="w-5 h-5" />
              Add Another Contact
            </button>
          </div>
        )}
      </div>

      {/* Add Contact Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-xl max-w-md w-full overflow-hidden">
            {/* Modal Header */}
            <div 
              className="px-6 py-5 text-white"
              style={{ backgroundColor: BRAND_COLORS.secondary }}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: 'rgba(255, 255, 255, 0.2)' }}>
                    <UserPlus className="w-5 h-5" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold">Add Emergency Contact</h2>
                    <p className="text-white/80 text-sm">Add a trusted contact for emergencies</p>
                  </div>
                </div>
                <button
                  onClick={() => {
                    setShowAddModal(false);
                    resetForm();
                  }}
                  className="p-2 hover:bg-white/20 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Modal Form */}
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: BRAND_COLORS.textPrimary }}>
                  Full Name *
                </label>
                <input
                  type="text"
                  value={formName}
                  onChange={(e) => setFormName(e.target.value)}
                  className={`w-full px-4 py-3 rounded-lg border text-sm focus:outline-none focus:ring-2 focus:ring-offset-1 ${
                    formErrors.name 
                      ? 'border-red-300 focus:border-red-500 focus:ring-red-100' 
                      : 'border-gray-300 focus:border-blue-500 focus:ring-blue-100'
                  }`}
                  placeholder="Enter full name"
                  style={{ backgroundColor: BRAND_COLORS.background }}
                />
                {formErrors.name && (
                  <p className="text-red-600 text-xs mt-1">{formErrors.name}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: BRAND_COLORS.textPrimary }}>
                  Relationship *
                </label>
                <div className="grid grid-cols-4 gap-2">
                  {relationshipOptions.map((option) => (
                    <button
                      key={option.value}
                      type="button"
                      onClick={() => setFormRelationship(option.value)}
                      className={`py-2.5 rounded-lg border text-sm font-medium transition-all ${
                        formRelationship === option.value
                          ? 'border-blue-500 text-blue-600'
                          : 'border-gray-300 text-gray-700 hover:border-gray-400'
                      }`}
                      style={{
                        backgroundColor: formRelationship === option.value 
                          ? `${BRAND_COLORS.secondary}10` 
                          : 'white'
                      }}
                    >
                      <div className="text-lg mb-1">{option.icon}</div>
                      <div>{option.value}</div>
                    </button>
                  ))}
                </div>
                {formErrors.relationship && (
                  <p className="text-red-600 text-xs mt-1">{formErrors.relationship}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: BRAND_COLORS.textPrimary }}>
                  Mobile Number *
                </label>
                <input
                  type="tel"
                  value={formPhone}
                  onChange={(e) => setFormPhone(e.target.value)}
                  className={`w-full px-4 py-3 rounded-lg border text-sm focus:outline-none focus:ring-2 focus:ring-offset-1 ${
                    formErrors.phone 
                      ? 'border-red-300 focus:border-red-500 focus:ring-red-100' 
                      : 'border-gray-300 focus:border-blue-500 focus:ring-blue-100'
                  }`}
                  placeholder="09171234567"
                  style={{ backgroundColor: BRAND_COLORS.background }}
                />
                {formErrors.phone && (
                  <p className="text-red-600 text-xs mt-1">{formErrors.phone}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: BRAND_COLORS.textPrimary }}>
                  Email Address (Optional)
                </label>
                <input
                  type="email"
                  value={formEmail}
                  onChange={(e) => setFormEmail(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 text-sm focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 focus:ring-offset-1"
                  placeholder="email@example.com"
                  style={{ backgroundColor: BRAND_COLORS.background }}
                />
              </div>

              <div className="pt-2">
                <button
                  onClick={handleAddSubmit}
                  className="w-full flex items-center justify-center gap-2 py-3.5 rounded-lg font-medium text-white transition-all active:scale-95"
                  style={{ backgroundColor: BRAND_COLORS.secondary }}
                >
                  <Check className="w-5 h-5" />
                  Add Emergency Contact
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteModal && selectedContact && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-xl max-w-sm w-full p-6">
            <div 
              className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4"
              style={{ backgroundColor: `${BRAND_COLORS.primary}10` }}
            >
              <Trash2 className="w-6 h-6" style={{ color: BRAND_COLORS.primary }} />
            </div>
            
            <h2 className="text-lg font-bold text-center mb-2" style={{ color: BRAND_COLORS.textPrimary }}>
              Remove Contact?
            </h2>
            
            <p className="text-sm text-center mb-1" style={{ color: BRAND_COLORS.textSecondary }}>
              Are you sure you want to remove
            </p>
            <p className="text-sm font-semibold text-center mb-6" style={{ color: BRAND_COLORS.textPrimary }}>
              {selectedContact.name}?
            </p>

            <div className="space-y-2">
              <button
                onClick={handleDeleteSubmit}
                className="w-full flex items-center justify-center gap-2 py-3 rounded-lg font-medium text-white transition-all active:scale-95"
                style={{ backgroundColor: BRAND_COLORS.primary }}
              >
                <Trash2 className="w-4 h-4" />
                Yes, Remove Contact
              </button>
              
              <button
                onClick={() => {
                  setShowDeleteModal(false);
                  setSelectedContact(null);
                }}
                className="w-full py-3 rounded-lg border font-medium transition-all active:scale-95"
                style={{ 
                  borderColor: BRAND_COLORS.border,
                  color: BRAND_COLORS.textPrimary
                }}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}