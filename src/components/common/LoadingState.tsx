import React from 'react';
import { Loader2 } from 'lucide-react';

export const LoadingState: React.FC<{ message?: string }> = ({
  message = 'Loading product catalog...',
}) => {
  return (
    <div className="flex flex-col items-center justify-center py-20 px-4 text-center">
      <Loader2 className="w-8 h-8 text-wisteria animate-spin mb-3" />
      <p className="text-sm font-medium text-slate-600">{message}</p>
    </div>
  );
};
