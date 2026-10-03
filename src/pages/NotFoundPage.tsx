import React from 'react';
import { Link } from 'react-router-dom';
import { Compass } from 'lucide-react';
import { Button } from '../components/common/Button';

export const NotFoundPage: React.FC = () => {
  return (
    <div className="max-w-2xl mx-auto px-4 py-24 text-center">
      <div className="bg-white rounded-3xl border border-slate-200/80 p-8 sm:p-12 shadow-xs space-y-6">
        <div className="w-16 h-16 rounded-2xl bg-wisteria-50 text-wisteria flex items-center justify-center mx-auto">
          <Compass className="w-8 h-8" />
        </div>

        <div>
          <span className="text-xs font-mono font-bold text-wisteria uppercase tracking-widest block mb-2">
            Error 404
          </span>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
            Page Not Found
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-2 max-w-sm mx-auto leading-relaxed">
            The page or product URL you requested could not be located. It might have been moved, renamed, or temporarily unavailable.
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
          <Link to="/">
            <Button variant="primary" size="md">
              Return to Storefront
            </Button>
          </Link>
          <Link to="/products">
            <Button variant="outline" size="md">
              Browse Catalog
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};
