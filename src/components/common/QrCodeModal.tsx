import React, { useState } from 'react';
import { useDemo } from '../../context/DemoContext';
import { Modal } from './Modal';
import { QrCode, CheckCircle2, ShieldCheck, MapPin, Calendar, Clock } from 'lucide-react';

export const QrCodeModal: React.FC = () => {
  const { activeMeetingQrModal, setActiveMeetingQrModal, recordAttendance, currentUser } = useDemo();
  const [scannedSuccess, setScannedSuccess] = useState(false);

  if (!activeMeetingQrModal) return null;

  const handleSimulateScan = () => {
    setScannedSuccess(true);
    recordAttendance(activeMeetingQrModal.id, currentUser.id, 'QR_SCAN');
    setTimeout(() => {
      setScannedSuccess(false);
      setActiveMeetingQrModal(null);
    }, 2000);
  };

  return (
    <Modal
      isOpen={!!activeMeetingQrModal}
      onClose={() => setActiveMeetingQrModal(null)}
      title="VLBVN QR Attendance Scanner"
      subtitle={`Meeting ID: ${activeMeetingQrModal.id}`}
      maxWidth="md"
    >
      <div className="text-center space-y-5">
        {/* Meeting Information Summary */}
        <div className="bg-stone-50 border border-stone-200 rounded-xl p-4 text-left space-y-2">
          <h4 className="font-bold text-sm text-stone-900">{activeMeetingQrModal.title}</h4>
          <div className="text-xs text-stone-600 space-y-1">
            <div className="flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-amber-700 shrink-0" />
              <span>{activeMeetingQrModal.date}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-amber-700 shrink-0" />
              <span>{activeMeetingQrModal.time}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-amber-700 shrink-0" />
              <span className="truncate">{activeMeetingQrModal.venue}</span>
            </div>
          </div>
        </div>

        {/* QR Code Graphic Container */}
        {scannedSuccess ? (
          <div className="py-8 space-y-3 animate-scale-up">
            <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto border-4 border-emerald-500 shadow-lg">
              <CheckCircle2 className="w-12 h-12" />
            </div>
            <h3 className="text-lg font-extrabold text-stone-900">Attendance Recorded!</h3>
            <p className="text-xs text-stone-600">
              Verified for <span className="font-bold text-stone-900">{currentUser.name}</span>. Attendance points updated!
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="bg-gradient-to-b from-stone-900 to-[#1C120C] p-6 rounded-2xl border-2 border-amber-500/40 inline-block shadow-xl relative">
              {/* QR Code SVG Matrix */}
              <svg width="180" height="180" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="mx-auto">
                <rect width="100" height="100" fill="white" rx="8" />
                {/* QR Corner Markers */}
                <rect x="10" y="10" width="24" height="24" fill="#1C120C" rx="4" />
                <rect x="14" y="14" width="16" height="16" fill="white" rx="2" />
                <rect x="18" y="18" width="8" height="8" fill="#D4AF37" />

                <rect x="66" y="10" width="24" height="24" fill="#1C120C" rx="4" />
                <rect x="70" y="14" width="16" height="16" fill="white" rx="2" />
                <rect x="74" y="18" width="8" height="8" fill="#D4AF37" />

                <rect x="10" y="66" width="24" height="24" fill="#1C120C" rx="4" />
                <rect x="14" y="70" width="16" height="16" fill="white" rx="2" />
                <rect x="18" y="74" width="8" height="8" fill="#D4AF37" />

                {/* Random Data Pattern Matrix */}
                <rect x="40" y="10" width="6" height="6" fill="#1C120C" />
                <rect x="50" y="10" width="6" height="6" fill="#E66B27" />
                <rect x="40" y="20" width="16" height="6" fill="#1C120C" />

                <rect x="10" y="40" width="8" height="8" fill="#1C120C" />
                <rect x="22" y="42" width="12" height="6" fill="#E66B27" />

                <rect x="40" y="40" width="20" height="20" fill="#D4AF37" rx="4" />
                <circle cx="50" cy="50" r="6" fill="#1C120C" />

                <rect x="66" y="40" width="8" height="16" fill="#1C120C" />
                <rect x="78" y="40" width="12" height="6" fill="#1C120C" />

                <rect x="40" y="66" width="12" height="12" fill="#1C120C" />
                <rect x="56" y="70" width="24" height="6" fill="#E66B27" />
                <rect x="66" y="80" width="16" height="8" fill="#1C120C" />
              </svg>

              <div className="mt-2 text-[10px] text-amber-300 font-mono tracking-widest uppercase">
                {activeMeetingQrModal.qrCodeToken}
              </div>
            </div>

            <p className="text-xs text-stone-500 max-w-xs mx-auto">
              Scan this code at the venue coordinator desk or click below to simulate instant check-in.
            </p>

            <button
              onClick={handleSimulateScan}
              className="w-full bg-gradient-to-r from-amber-500 to-orange-500 text-stone-950 font-extrabold text-sm py-3 rounded-xl shadow-md hover:brightness-110 transition-all flex items-center justify-center gap-2"
            >
              <ShieldCheck className="w-5 h-5" />
              <span>Simulate Scan & Mark Attendance Now</span>
            </button>
          </div>
        )}
      </div>
    </Modal>
  );
};
