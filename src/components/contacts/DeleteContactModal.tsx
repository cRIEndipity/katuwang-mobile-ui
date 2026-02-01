import { Trash2 } from 'lucide-react'
import { BRAND_COLORS } from '../../constants/colors'

interface DeleteContactModalProps {
  isOpen: boolean
  contactName: string
  onConfirm: () => void
  onCancel: () => void
}

export default function DeleteContactModal({ isOpen, contactName, onConfirm, onCancel }: DeleteContactModalProps) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl shadow-xl max-w-sm w-full p-6">
        <div
          className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4"
          style={{ backgroundColor: 'rgba(211, 47, 47, 0.1)' }}
        >
          <Trash2 className="w-6 h-6" style={{ color: BRAND_COLORS.danger }} />
        </div>

        <h2 className="text-lg font-bold text-center mb-2" style={{ color: BRAND_COLORS.textPrimary }}>
          Remove Contact?
        </h2>

        <p className="text-sm text-center mb-1" style={{ color: BRAND_COLORS.textSecondary }}>
          Are you sure you want to remove
        </p>
        <p className="text-sm font-semibold text-center mb-6" style={{ color: BRAND_COLORS.textPrimary }}>
          {contactName}?
        </p>

        <div className="space-y-2">
          <button
            onClick={onConfirm}
            className="w-full flex items-center justify-center gap-2 py-3 rounded-lg font-medium text-white transition-all active:scale-95"
            style={{ backgroundColor: BRAND_COLORS.danger }}
          >
            <Trash2 className="w-4 h-4" />
            Yes, Remove Contact
          </button>

          <button
            onClick={onCancel}
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
  )
}