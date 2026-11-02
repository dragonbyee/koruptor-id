import React, { useState } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { KoruptorProfile } from '../types/corruption';

interface GalleryCardProps {
  profile: KoruptorProfile;
  onClick: () => void;
  onOpenReportModal?: (profileId: string) => void;
}

export const GalleryCard: React.FC<GalleryCardProps> = ({
  profile,
  onClick,
}) => {
  const [imageError, setImageError] = useState(false);

  const initials = profile.name
    .split(' ')
    .map((w) => w[0])
    .slice(0, 2)
    .join('');

  return (
    <div
      onClick={onClick}
      className="group relative aspect-[4/5] w-full bg-stone-900 rounded-xl overflow-hidden border border-stone-200 hover:border-amber-400 shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer"
    >
      {/* Portrait Photo */}
      {profile.avatarUrl && !imageError ? (
        <img
          src={profile.avatarUrl}
          alt={profile.name}
          referrerPolicy="no-referrer"
          onError={() => setImageError(true)}
          className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
        />
      ) : (
        <div className="w-full h-full flex flex-col items-center justify-center bg-stone-800 text-stone-300 font-serif text-3xl font-bold">
          <span>{initials}</span>
          <span className="text-xs font-mono font-normal text-stone-400 mt-1">
            {profile.sentenceDuration || profile.legalStatusLabel}
          </span>
        </div>
      )}

      {/* Scrim Gradient Overlay for Text Legibility */}
      <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/35 to-stone-950/20" />

      {/* Top Overlaid Details: Sector & Sentence Duration Badges */}
      <div className="absolute top-3 left-3 right-3 flex items-center justify-between text-[11px] font-medium text-stone-200 z-10 pointer-events-none">
        <span className="bg-stone-950/80 backdrop-blur-xs px-2.5 py-1 rounded text-amber-400 font-semibold border border-stone-800 shadow-xs">
          {profile.sectorLabel}
        </span>
        <span className="bg-stone-950/85 backdrop-blur-xs px-2.5 py-1 rounded text-stone-100 font-mono font-bold border border-stone-800 shadow-xs">
          {profile.sentenceDuration || profile.legalStatusLabel}
        </span>
      </div>

      {/* Bottom Overlaid Details: Name, Alias, Position, and Hover Affordance */}
      <div className="absolute bottom-3 left-3.5 right-3.5 z-10 space-y-1">
        <div className="flex items-end justify-between gap-2">
          <h3 className="text-lg sm:text-xl font-bold text-white font-serif tracking-tight drop-shadow-sm group-hover:text-amber-300 transition-colors">
            {profile.name}
            {profile.alias && (
              <span className="text-xs font-sans font-normal text-stone-300 ml-1.5 opacity-90">
                ({profile.alias})
              </span>
            )}
          </h3>
          <div className="w-7 h-7 rounded-full bg-stone-900/80 group-hover:bg-amber-400 group-hover:text-stone-950 text-white flex items-center justify-center shrink-0 transition-colors border border-stone-700/60 shadow-xs">
            <ArrowUpRight className="w-4 h-4" />
          </div>
        </div>
        <p className="text-xs text-stone-300 line-clamp-2 leading-snug">
          {profile.pastPosition}
        </p>
      </div>
    </div>
  );
};
