import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, Briefcase, UserPlus, Plus } from 'lucide-react';

interface NavbarProps {
  onResetGallery: () => void;
  onOpenReportModal: () => void;
  onOpenAddCorruptorModal: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onResetGallery,
  onOpenReportModal,
  onOpenAddCorruptorModal,
}) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown on click outside or Escape
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setDropdownOpen(false);
      }
    };

    if (dropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [dropdownOpen]);

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

        {/* Dropdown Action Menu */}
        <div className="relative shrink-0" ref={dropdownRef}>
          <button
            onClick={() => setDropdownOpen((prev) => !prev)}
            aria-expanded={dropdownOpen}
            aria-haspopup="true"
            className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-stone-950 bg-amber-400 rounded-lg hover:bg-amber-300 transition-all shadow-sm whitespace-nowrap shrink-0 active:scale-95 cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5 stroke-[2.5]" />
            <span>Tambah</span>
            <ChevronDown
              className={`w-3.5 h-3.5 text-stone-950 transition-transform duration-200 ${
                dropdownOpen ? 'rotate-180' : ''
              }`}
            />
          </button>

          {/* Dropdown Options Box */}
          {dropdownOpen && (
            <div className="absolute right-0 mt-2 w-72 bg-stone-900 border border-stone-700 rounded-xl shadow-2xl py-1.5 z-50 animate-in fade-in-50 zoom-in-95 duration-150">
              <div className="px-3 py-1.5 border-b border-stone-800 text-[10px] font-bold uppercase tracking-wider text-stone-400">
                Pilih Jenis Laporan Publik
              </div>

              {/* Option 1: Laporkan Posisi Baru */}
              <button
                onClick={() => {
                  setDropdownOpen(false);
                  onOpenReportModal();
                }}
                className="w-full text-left px-3.5 py-2.5 hover:bg-stone-800/90 flex items-start gap-3 transition-colors group cursor-pointer"
              >
                <div className="w-8 h-8 rounded-lg bg-amber-500/15 border border-amber-500/30 text-amber-400 flex items-center justify-center shrink-0 mt-0.5 group-hover:bg-amber-400 group-hover:text-stone-950 transition-colors">
                  <Briefcase className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-bold text-stone-100 group-hover:text-amber-400 transition-colors">
                    Laporkan Posisi Baru
                  </div>
                  <div className="text-[11px] text-stone-400 leading-snug">
                    Perbarui jabatan atau pekerjaan terpidana koruptor yang sudah ada di galeri.
                  </div>
                </div>
              </button>

              {/* Option 2: Tambah Profil Koruptor Baru */}
              <button
                onClick={() => {
                  setDropdownOpen(false);
                  onOpenAddCorruptorModal();
                }}
                className="w-full text-left px-3.5 py-2.5 hover:bg-stone-800/90 flex items-start gap-3 transition-colors border-t border-stone-800 group cursor-pointer"
              >
                <div className="w-8 h-8 rounded-lg bg-rose-500/15 border border-rose-500/30 text-rose-400 flex items-center justify-center shrink-0 mt-0.5 group-hover:bg-rose-500 group-hover:text-white transition-colors">
                  <UserPlus className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-bold text-stone-100 group-hover:text-rose-400 transition-colors">
                    Tambah Profil Koruptor Baru
                  </div>
                  <div className="text-[11px] text-stone-400 leading-snug">
                    Daftarkan figur koruptor baru lengkap dengan durasi vonis dan angka kerugian negara.
                  </div>
                </div>
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

