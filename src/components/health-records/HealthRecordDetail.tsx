import { useState } from 'react';
import {
  Calendar,
  FileText,
  AlertCircle,
  Download,
  Check,
  Mail,
  Copy
} from 'lucide-react';
import { BRAND_COLORS } from '../../constants/colors';
import { MedicalRecord } from './types';

interface HealthRecordDetailProps {
  record: MedicalRecord;
  getIcon: (type: string) => React.ReactNode;
  getTypeColor: (type: string) => { bg: string; text: string; icon: string };
}

export default function HealthRecordDetail({ record, getIcon, getTypeColor }: HealthRecordDetailProps) {
  const [downloadProgress, setDownloadProgress] = useState(0);
  const [downloadSuccess, setDownloadSuccess] = useState(false);
  const [shareSuccess, setShareSuccess] = useState(false);
  const [shareMethod, setShareMethod] = useState<'email' | 'link' | null>(null);

  const colors = getTypeColor(record.type);

  const handleDownloadPDF = () => {
    setDownloadProgress(0);
    const interval = setInterval(() => {
      setDownloadProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setDownloadSuccess(true);
          setTimeout(() => setDownloadSuccess(false), 3000);
          return 100;
        }
        return prev + Math.random() * 40;
      });
    }, 200);
  };

  const handleShareRecord = (method: 'email' | 'link') => {
    setShareMethod(method);
    setTimeout(() => {
      setShareSuccess(true);
      setShareMethod(null);
      setTimeout(() => setShareSuccess(false), 3000);
    }, 800);
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6">
      <div className="flex items-start gap-4 mb-6">
        <div className={`${colors.bg} rounded-xl p-3`}>
          <div className={colors.icon}>{getIcon(record.type)}</div>
        </div>
        <div className="flex-1">
          <h2 className="text-2xl font-bold text-gray-900">{record.title}</h2>
          {record.status === 'active' && (
            <span className="inline-block text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full font-semibold mt-2">
              Active
            </span>
          )}
        </div>
      </div>

      <div className="space-y-4 mb-6">
        <div className="flex items-start gap-3 pb-4 border-b">
          <Calendar className="w-5 h-5 text-gray-400 shrink-0 mt-1" />
          <div>
            <p className="text-sm text-gray-600">Date</p>
            <p className="font-semibold text-gray-900">{record.date}</p>
          </div>
        </div>

        <div className="flex items-start gap-3 pb-4 border-b">
           <FileText className="w-5 h-5 text-gray-400 shrink-0 mt-1" />
           <div>
              <p className="text-sm text-gray-600">Type</p>
               <p className="font-semibold text-gray-900">
                  {record.type.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')}
               </p>
           </div>
        </div>

        <div className="flex items-start gap-3">
           <AlertCircle className="w-5 h-5 text-gray-400 shrink-0 mt-1" />
           <div>
              <p className="text-sm text-gray-600">Facility</p>
              <p className="font-semibold text-gray-900">{record.facility}</p>
           </div>
        </div>
      </div>

      <div className="bg-gray-50 rounded-xl p-4 mb-6">
        <h3 className="font-semibold text-gray-900 mb-2">Details</h3>
        <p className="text-gray-700">{record.details}</p>
      </div>

      <div className="space-y-3">
        {/* Download Action */}
        {!downloadSuccess && downloadProgress === 0 && (
          <button
            onClick={handleDownloadPDF}
            className="w-full py-3 rounded-lg text-white font-semibold transition-all flex items-center justify-center gap-2 hover:opacity-90"
            style={{ backgroundColor: BRAND_COLORS.primary }}
          >
            <Download className="w-5 h-5" />
            Download PDF
          </button>
        )}
        
        {/* Progress State */}
        {downloadProgress > 0 && downloadProgress < 100 && (
           <div className="w-full py-3 rounded-lg text-white font-semibold flex items-center justify-center gap-2" style={{ backgroundColor: BRAND_COLORS.primary }}>
               Downloading... {Math.floor(downloadProgress)}%
           </div>
        )}
        
        {/* Success State */}
        {downloadSuccess && (
           <div className="w-full py-3 rounded-lg bg-green-100 text-green-700 font-semibold flex items-center justify-center gap-2">
               <Check className="w-5 h-5" /> Downloaded!
           </div>
        )}

        {/* Share Actions */}
        {shareSuccess ? (
            <div className="w-full py-3 rounded-lg text-center font-semibold transition-all flex items-center justify-center gap-2 animate-pulse" style={{ backgroundColor: '#E8F4F8', color: BRAND_COLORS.primary }}>
                <Check className="w-5 h-5" />
                Record Shared Successfully!
            </div>
        ) : shareMethod ? (
            <div className="space-y-2">
                <div className="w-full py-3 rounded-lg text-center text-white font-semibold" style={{ backgroundColor: BRAND_COLORS.primary }}>
                    {shareMethod === 'email' ? 'Sending via Email...' : 'Generating Share Link...'}
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                        className="h-2 rounded-full transition-all duration-300 animate-pulse"
                        style={{ width: '100%', backgroundColor: BRAND_COLORS.primary }}
                    />
                </div>
            </div>
        ) : (
            <div className="space-y-2">
                <button
                    onClick={() => handleShareRecord('email')}
                    className="w-full py-3 rounded-lg border-2 text-gray-700 font-semibold hover:bg-gray-50 transition-all flex items-center justify-center gap-2"
                    style={{ borderColor: BRAND_COLORS.primary, color: BRAND_COLORS.primary }}
                >
                    <Mail className="w-5 h-5" />
                    Share via Email
                </button>
                <button
                    onClick={() => handleShareRecord('link')}
                    className="w-full py-3 rounded-lg border-2 text-gray-700 font-semibold hover:bg-gray-50 transition-all flex items-center justify-center gap-2"
                    style={{ borderColor: BRAND_COLORS.primary, color: BRAND_COLORS.primary }}
                >
                    <Copy className="w-5 h-5" />
                    Copy Share Link
                </button>
            </div>
        )}
      </div>
    </div>
  );
}