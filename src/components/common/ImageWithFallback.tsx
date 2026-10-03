import React, { useState } from 'react';
import { Package } from 'lucide-react';

interface ImageWithFallbackProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  fallbackTitle?: string;
  fallbackGradient?: string;
  aspectRatioClass?: string;
}

export const ImageWithFallback: React.FC<ImageWithFallbackProps> = ({
  src,
  alt = 'Product image',
  fallbackTitle,
  fallbackGradient = 'from-slate-800 to-slate-900',
  aspectRatioClass = 'aspect-[4/3]',
  className = '',
  ...props
}) => {
  const [hasError, setHasError] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  if (hasError || !src) {
    return (
      <div
        className={`w-full ${aspectRatioClass} bg-gradient-to-br ${fallbackGradient} flex flex-col items-center justify-center p-4 text-white/90 select-none relative overflow-hidden`}
        role="img"
        aria-label={alt}
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-white/10 to-transparent pointer-events-none" />
        <div className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center mb-2 shadow-inner border border-white/15">
          <Package className="w-5 h-5 text-white/80" />
        </div>
        {fallbackTitle && (
          <span className="text-xs font-medium text-center text-white/80 line-clamp-2 max-w-[85%]">
            {fallbackTitle}
          </span>
        )}
      </div>
    );
  }

  return (
    <div className={`relative w-full ${aspectRatioClass} overflow-hidden bg-slate-100`}>
      {/* Skeleton / Placeholder while loading */}
      {!isLoaded && (
        <div className="absolute inset-0 bg-slate-200/70 animate-pulse flex items-center justify-center">
          <Package className="w-6 h-6 text-slate-400/50" />
        </div>
      )}

      <img
        src={src}
        alt={alt}
        referrerPolicy="no-referrer"
        loading="lazy"
        onLoad={() => setIsLoaded(true)}
        onError={() => setHasError(true)}
        className={`w-full h-full object-cover transition-opacity duration-300 ${
          isLoaded ? 'opacity-100' : 'opacity-0'
        } ${className}`}
        {...props}
      />
    </div>
  );
};
