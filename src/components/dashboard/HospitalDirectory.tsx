import { X, Phone, Copy } from 'lucide-react';
import { motion, AnimatePresence } from "motion/react";

interface HospitalDirectoryProps {
  isOpen: boolean;
  onClose: () => void;
}

interface Hospital {
  id: string;
  name: string;
  address: string;
  phoneNumbers: string[];
}

const hospitals: Hospital[] = [
  {
    id: '1',
    name: 'St. John Hospital, Inc.',
    address: 'Panganiban Drive, Zone 7, Brgy. Tinago, Naga City',
    phoneNumbers: ['(054) 473 8477', '(054) 473 8502', '(054) 473 8919']
  },
  {
    id: '2',
    name: 'NICC Hospital',
    address: 'Roxas Avenue, (Diversion Road), Zone 3, Brgy. Triangulo, Naga City',
    phoneNumbers: ['(054) 475 0000', '(054) 472 6094']
  },
  {
    id: '3',
    name: 'USI Mother Seton Hospital',
    address: 'Roxas Avenue (Diversion Road), Zone 3, Brgy. Triangulo, Naga City',
    phoneNumbers: ['(054) 472 4025', '(054) 473 1358']
  },
  {
    id: '4',
    name: 'Dr. Nilo O. Roa Memorial Foundation Hospital',
    address: 'Dimasalang St., Zone 3, Brgy. San Francisco, Naga City',
    phoneNumbers: ['(054) 472 2998']
  },
  {
    id: '5',
    name: 'Naga City Hospital',
    address: '',
    phoneNumbers: ['+63 970 491 1690', '+63 926 097 2078']
  },
  {
    id: '6',
    name: 'Bicol Access Health Centrum',
    address: 'Central Business District II, Zone 4, Brgy. Triangulo, Naga City',
    phoneNumbers: ['(054) 871 3377', '(054) 884 1861']
  }
];

// Dark theme colors matching the design
import { BRAND_COLORS } from '../../constants/colors';

export default function HospitalDirectory({ isOpen, onClose }: HospitalDirectoryProps) {
  const handlePhoneCall = (phoneNumber: string) => {
    const cleanNumber = phoneNumber.replace(/[^\d+]/g, '');
    window.location.href = `tel:${cleanNumber}`;
  };

  const handleCopyNumber = async (phoneNumber: string) => {
    const cleanNumber = phoneNumber.replace(/[^\d+]/g, '');
    try {
      await navigator.clipboard.writeText(cleanNumber);
      // Could show a toast notification here
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40"
            style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed bottom-0 left-0 right-0 z-50 rounded-t-3xl overflow-hidden"
            style={{
              backgroundColor: BRAND_COLORS.background,
              maxHeight: '85vh',
              boxShadow: '0 -4px 20px rgba(0, 0, 0, 0.5)'
            }}
          >
            {/* Drag Handle */}
            <div className="flex justify-center pt-3 pb-2">
              <div
                className="rounded-full"
                style={{
                  width: '36px',
                  height: '5px',
                  backgroundColor: BRAND_COLORS.border,
                  opacity: 0.3
                }}
              />
            </div>

            {/* Header */}
            <div className="flex items-center justify-between px-6 pt-4 pb-5">
              <h2
                className="text-2xl font-bold"
                style={{
                  color: BRAND_COLORS.textPrimary,
                  fontFamily: 'var(--font-display)'
                }}
              >
                Hospitals
              </h2>
              <button
                onClick={onClose}
                className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-white/10 transition-colors"
                style={{
                  backgroundColor: BRAND_COLORS.surface
                }}
              >
                <X size={20} color={BRAND_COLORS.textPrimary} strokeWidth={2.5} />
              </button>
            </div>

            {/* Hospital List - Scrollable */}
            <div
              className="overflow-y-auto px-6 pb-6"
              style={{
                maxHeight: 'calc(85vh - 120px)'
              }}
            >
              {hospitals.map((hospital, index) => (
                <div key={hospital.id} className="mb-6">
                  {/* Hospital Info */}
                  <div className="mb-4">
                    <h3
                      className="text-xl font-bold mb-2"
                      style={{
                        color: BRAND_COLORS.textPrimary,
                        fontFamily: 'var(--font-display)'
                      }}
                    >
                      {hospital.name}
                    </h3>
                    {hospital.address && (
                      <p
                        className="text-base leading-relaxed"
                        style={{
                          color: BRAND_COLORS.textSecondary,
                          fontFamily: 'var(--font-body)'
                        }}
                      >
                        {hospital.address}
                      </p>
                    )}
                  </div>

                  {/* Phone Numbers */}
                  <div className="space-y-3 mb-4">
                    {hospital.phoneNumbers.map((phoneNumber, phoneIndex) => (
                      <div
                        key={phoneIndex}
                        className="flex items-center justify-between px-5 py-4 rounded-2xl"
                        style={{
                          backgroundColor: BRAND_COLORS.surface
                        }}
                      >
                        <span
                          className="text-lg font-normal"
                          style={{
                            color: BRAND_COLORS.textPrimary,
                            fontFamily: 'var(--font-body)',
                            letterSpacing: '0.01em'
                          }}
                        >
                          {phoneNumber}
                        </span>
                        <div className="flex items-center gap-3">
                          <button
                            onClick={() => handlePhoneCall(phoneNumber)}
                            className="w-11 h-11 rounded-full flex items-center justify-center"
                            style={{ backgroundColor: BRAND_COLORS.background }}
                          >
                            <Phone size={20} color={BRAND_COLORS.danger} />
                          </button>
                          <button
                            onClick={() => handleCopyNumber(phoneNumber)}
                            className="w-11 h-11 rounded-full flex items-center justify-center"
                            style={{ backgroundColor: BRAND_COLORS.background }}
                          >
                            <Copy size={20} color={BRAND_COLORS.textSecondary} />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Can't reach this office link */}
                  {index < hospitals.length - 1 && (
                    <div className="text-center mt-5 mb-2">
                      <button
                        className="text-base font-normal"
                        style={{
                          color: BRAND_COLORS.accent,
                          fontFamily: 'var(--font-body)'
                        }}
                      >
                        Can't reach this office?
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
