import React from 'react';
import { PlusCircle } from 'lucide-react';

interface NavbarProps {
  onResetGallery: () => void;
  onOpenReportModal: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onResetGallery,
  onOpenReportModal,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-stone-900 text-stone-100 border-b border-stone-800 shadow-sm backdrop-blur-md bg-stone-900/95">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* Brand Wordmark */}
        <button
          onClick={onResetGallery}
          className="flex items-center gap-2.5 text-left text-lg font-bold tracking-tight text-white hover:text-amber-400 transition-colors whitespace-nowrap shrink-0 group cursor-pointer"
        >
          <div className="w-8 h-8 rounded-lg bg-amber-500 text-stone-950 flex items-center justify-center font-black text-sm tracking-tighter shadow">
            K.ID
          </div>
          <span className="font-serif tracking-normal text-xl text-stone-50 group-hover:text-amber-400 transition-colors">
            KoruptorID
          </span>
          <span className="hidden sm:inline text-xs text-stone-400 font-sans font-normal border-l border-stone-700 pl-2.5 ml-0.5">
            Galeri Rekam Jejak Korupsi Indonesia
          </span>
        </button>

        {/* Primary Action Button */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={onOpenReportModal}
            className="flex items-center gap-2 px-3.5 py-2 text-xs font-semibold text-stone-950 bg-amber-400 rounded-lg hover:bg-amber-300 transition-colors shadow-sm whitespace-nowrap shrink-0 active:scale-95 cursor-pointer"
          >
            <PlusCircle className="w-4 h-4 text-stone-950" />
            <span>Laporkan Posisi Baru</span>
          </button>
        </div>
      </div>
    </header>
  );
};
