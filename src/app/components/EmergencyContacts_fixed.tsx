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

type Screen = 'user-type' | 'dashboard' | 'health-assistant' | 'emergency' | 'hospitals' | 'contacts' | 'health-records';
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
      isPrimary: contacts.length === 0
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
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-blue-700 text-white px-6 pt-8 pb-6">
        <div className="flex items-center justify-between mb-6">
          <button 
            onClick={() => onNavigate('dashboard')}
            className="flex items-center gap-2 hover:opacity-80"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="text-sm font-medium">Back</span>
          </button>
          
          <button
            onClick={openAddModal}
            className="flex items-center gap-2 px-4 py-2 rounded-lg font-medium bg-red-500 hover:bg-red-600 text-white"
          >
            <UserPlus className="w-4 h-4" />
            <span className="text-sm">Add Contact</span>
          </button>
        </div>

        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-xl flex items-center justify-center bg-white/20">
            <Users className="w-7 h-7" />
          </div>
          <div>
            <h1 className="text-2xl font-bold">Emergency Contacts</h1>
            <p className="text-blue-100 text-sm">Your trusted emergency network</p>
          </div>
        </div>
      </div>

      {/* Stats Bar */}
      <div className="bg-white px-6 py-4 border-b">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-sm font-medium text-gray-600">Emergency Network</div>
            <div className="text-xl font-bold text-gray-900">{contacts.length} Contacts</div>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
            <span className="text-xs font-medium text-green-600">Active</span>
          </div>
        </div>
      </div>

      {/* Notification Info */}
      <div className="px-6 py-4">
        <div className="rounded-xl p-4 border border-gray-200 bg-blue-50">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 bg-blue-100">
              <AlertCircle className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-gray-900">Emergency Notification Protocol</h3>
              <p className="text-xs text-gray-600 mt-1">
                In case of emergency, all contacts will receive SMS alerts and phone call notifications with your location.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Contacts List */}
      <div className="px-6 py-4">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-base font-semibold text-gray-900">Emergency Contacts</h2>
          <span className="text-xs font-medium px-2 py-1 rounded-full bg-red-100 text-red-600">
            {contacts.length} saved
          </span>
        </div>

        {contacts.length === 0 ? (
          <div className="rounded-xl p-8 text-center border-2 border-dashed border-gray-300 bg-white">
            <div className="w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center bg-blue-100">
              <Users className="w-8 h-8 text-blue-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No Emergency Contacts</h3>
            <p className="text-sm text-gray-600 mb-6">Add trusted contacts to notify in case of emergencies</p>
            <button
              onClick={openAddModal}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg font-medium bg-blue-600 text-white hover:bg-blue-700"
            >
              <UserPlus className="w-4 h-4" />
              Add First Contact
            </button>
          </div>
        ) : (
          <div className="space-y-3 mb-6">
            {contacts.map((contact) => (
              <div 
                key={contact.id}
                className="rounded-xl bg-white border border-gray-200 overflow-hidden hover:shadow-md transition-shadow"
              >
                <div className="p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div 
                        className="w-12 h-12 rounded-lg flex items-center justify-center text-white font-semibold"
                        style={{ backgroundColor: contact.isPrimary ? '#F7502F' : '#1D62AF' }}
                      >
                        {getInitials(contact.name)}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="font-semibold text-gray-900">{contact.name}</h3>
                          {contact.isPrimary && (
                            <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-green-100 text-green-700">
                              Primary
                            </span>
                          )}
                        </div>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-sm text-gray-600">
                            {getRelationshipIcon(contact.relationship)} {contact.relationship}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2 mb-4">
                    <a 
                      href={`tel:${contact.phone}`}
                      className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      <div className="w-8 h-8 rounded-md flex items-center justify-center bg-blue-100">
                        <Phone className="w-4 h-4 text-blue-600" />
                      </div>
                      <div className="flex-1">
                        <div className="text-xs font-medium text-gray-600">Mobile Number</div>
                        <div className="text-sm font-medium text-gray-900">{contact.phone}</div>
                      </div>
                      <PhoneCall className="w-4 h-4 text-blue-600 opacity-60" />
                    </a>

                    {contact.email && (
                      <a 
                        href={`mailto:${contact.email}`}
                        className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 transition-colors"
                      >
                        <div className="w-8 h-8 rounded-md flex items-center justify-center bg-blue-100">
                          <Mail className="w-4 h-4 text-blue-600" />
                        </div>
                        <div className="flex-1">
                          <div className="text-xs font-medium text-gray-600">Email Address</div>
                          <div className="text-sm font-medium text-gray-900 truncate">{contact.email}</div>
                        </div>
                      </a>
                    )}
                  </div>

                  <div className="flex gap-2 flex-wrap">
                    {!contact.isPrimary && (
                      <button
                        onClick={() => handleSetPrimary(contact.id)}
                        className="flex-1 text-center py-2 rounded-lg text-sm font-medium bg-blue-100 text-blue-600 hover:bg-blue-200 transition-colors"
                      >
                        Set as Primary
                      </button>
                    )}
                    <button
                      onClick={() => openEditModal(contact)}
                      className="flex-1 flex items-center justify-center gap-1 py-2 rounded-lg text-sm font-medium bg-blue-100 text-blue-600 hover:bg-blue-200 transition-colors"
                    >
                      <Edit2 className="w-4 h-4" />
                      Edit
                    </button>
                    <button
                      onClick={() => openDeleteModal(contact)}
                      className="flex-1 flex items-center justify-center gap-1 py-2 rounded-lg text-sm font-medium bg-red-100 text-red-600 hover:bg-red-200 transition-colors"
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
          <button
            onClick={openAddModal}
            className="w-full flex items-center justify-center gap-2 py-3 rounded-lg font-medium bg-blue-600 text-white hover:bg-blue-700 transition-colors"
          >
            <UserPlus className="w-5 h-5" />
            Add Another Contact
          </button>
        )}
      </div>

      {/* Add Contact Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-xl max-w-md w-full overflow-hidden">
            <div className="bg-blue-600 text-white px-6 py-5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-white/20">
                    <UserPlus className="w-5 h-5" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold">Add Emergency Contact</h2>
                    <p className="text-blue-100 text-sm">Add a trusted contact for emergencies</p>
                  </div>
                </div>
                <button
                  onClick={() => {
                    setShowAddModal(false);
                    resetForm();
                  }}
                  className="p-2 hover:bg-white/20 rounded-lg"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">Full Name *</label>
                <input
                  type="text"
                  value={formName}
                  onChange={(e) => setFormName(e.target.value)}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                  placeholder="Enter full name"
                />
                {formErrors.name && <p className="text-red-600 text-xs mt-1">{formErrors.name}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">Relationship *</label>
                <div className="grid grid-cols-4 gap-2">
                  {relationshipOptions.map((option) => (
                    <button
                      key={option.value}
                      type="button"
                      onClick={() => setFormRelationship(option.value)}
                      className={`py-2 rounded-lg border text-sm font-medium transition-all ${
                        formRelationship === option.value
                          ? 'border-blue-500 bg-blue-50 text-blue-600'
                          : 'border-gray-300 text-gray-700 hover:border-gray-400'
                      }`}
                    >
                      <div className="text-lg mb-1">{option.icon}</div>
                      <div className="text-xs">{option.value}</div>
                    </button>
                  ))}
                </div>
                {formErrors.relationship && <p className="text-red-600 text-xs mt-1">{formErrors.relationship}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">Mobile Number *</label>
                <input
                  type="tel"
                  value={formPhone}
                  onChange={(e) => setFormPhone(e.target.value)}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                  placeholder="09171234567"
                />
                {formErrors.phone && <p className="text-red-600 text-xs mt-1">{formErrors.phone}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">Email Address (Optional)</label>
                <input
                  type="email"
                  value={formEmail}
                  onChange={(e) => setFormEmail(e.target.value)}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                  placeholder="email@example.com"
                />
              </div>

              <button
                onClick={handleAddSubmit}
                className="w-full flex items-center justify-center gap-2 py-2 rounded-lg font-medium bg-blue-600 text-white hover:bg-blue-700"
              >
                <Check className="w-5 h-5" />
                Add Emergency Contact
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Contact Modal */}
      {showEditModal && selectedContact && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-xl max-w-md w-full overflow-hidden">
            <div className="bg-blue-600 text-white px-6 py-5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-white/20">
                    <Edit2 className="w-5 h-5" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold">Edit Contact</h2>
                    <p className="text-blue-100 text-sm">Update contact information</p>
                  </div>
                </div>
                <button
                  onClick={() => {
                    setShowEditModal(false);
                    setSelectedContact(null);
                    resetForm();
                  }}
                  className="p-2 hover:bg-white/20 rounded-lg"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">Full Name *</label>
                <input
                  type="text"
                  value={formName}
                  onChange={(e) => setFormName(e.target.value)}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                  placeholder="Enter full name"
                />
                {formErrors.name && <p className="text-red-600 text-xs mt-1">{formErrors.name}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">Relationship *</label>
                <div className="grid grid-cols-4 gap-2">
                  {relationshipOptions.map((option) => (
                    <button
                      key={option.value}
                      type="button"
                      onClick={() => setFormRelationship(option.value)}
                      className={`py-2 rounded-lg border text-sm font-medium transition-all ${
                        formRelationship === option.value
                          ? 'border-blue-500 bg-blue-50 text-blue-600'
                          : 'border-gray-300 text-gray-700 hover:border-gray-400'
                      }`}
                    >
                      <div className="text-lg mb-1">{option.icon}</div>
                      <div className="text-xs">{option.value}</div>
                    </button>
                  ))}
                </div>
                {formErrors.relationship && <p className="text-red-600 text-xs mt-1">{formErrors.relationship}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">Mobile Number *</label>
                <input
                  type="tel"
                  value={formPhone}
                  onChange={(e) => setFormPhone(e.target.value)}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                  placeholder="09171234567"
                />
                {formErrors.phone && <p className="text-red-600 text-xs mt-1">{formErrors.phone}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">Email Address (Optional)</label>
                <input
                  type="email"
                  value={formEmail}
                  onChange={(e) => setFormEmail(e.target.value)}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                  placeholder="email@example.com"
                />
              </div>

              <button
                onClick={handleEditSubmit}
                className="w-full flex items-center justify-center gap-2 py-2 rounded-lg font-medium bg-blue-600 text-white hover:bg-blue-700"
              >
                <Check className="w-5 h-5" />
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteModal && selectedContact && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-xl max-w-sm w-full p-6">
            <div className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4 bg-red-100">
              <Trash2 className="w-6 h-6 text-red-600" />
            </div>
            
            <h2 className="text-lg font-bold text-center mb-2 text-gray-900">Remove Contact?</h2>
            <p className="text-sm text-center mb-1 text-gray-600">Are you sure you want to remove</p>
            <p className="text-sm font-semibold text-center mb-6 text-gray-900">{selectedContact.name}?</p>

            <div className="space-y-2">
              <button
                onClick={handleDeleteSubmit}
                className="w-full flex items-center justify-center gap-2 py-2 rounded-lg font-medium bg-red-600 text-white hover:bg-red-700"
              >
                <Trash2 className="w-4 h-4" />
                Yes, Remove Contact
              </button>
              
              <button
                onClick={() => {
                  setShowDeleteModal(false);
                  setSelectedContact(null);
                }}
                className="w-full py-2 rounded-lg border border-gray-300 font-medium text-gray-900 hover:bg-gray-50"
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
