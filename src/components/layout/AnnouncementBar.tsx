import React, { useState } from 'react';
import { Tag, X } from 'lucide-react';

export const AnnouncementBar: React.FC = () => {
  const [isVisible, setIsVisible] = useState(() => {
    return !sessionStorage.getItem('nexastore_announcement_dismissed');
  });

  const handleDismiss = () => {
    setIsVisible(false);
    sessionStorage.setItem('nexastore_announcement_dismissed', 'true');
  };

  if (!isVisible) return null;

  return (
    <div className="bg-wisteria-900 text-white text-xs py-2 px-4 transition-all duration-200 border-b border-wisteria-800">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        <div className="flex-1 flex items-center justify-center gap-2 text-center text-wisteria-100">
          <Tag className="w-3.5 h-3.5 text-aurora shrink-0 hidden sm:inline" />
          <span>
            <strong className="font-semibold text-white">Festive Special:</strong> Free express shipping on orders above ₹1,999 · Use code <code className="bg-white/15 px-1.5 py-0.5 rounded text-aurora font-mono text-[11px] font-semibold">NEXAFREE</code> for 10% off
          </span>
        </div>

        <button
          onClick={handleDismiss}
          className="text-wisteria-300 hover:text-white transition-colors p-0.5 rounded hover:bg-white/10 shrink-0"
          aria-label="Dismiss announcement"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
