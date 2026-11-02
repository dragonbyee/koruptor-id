import React, { useState } from 'react';
import { 
  Building2, 
  Briefcase, 
  Trophy, 
  FileText, 
  Coins, 
  MapPin, 
  ExternalLink, 
  ChevronDown, 
  ChevronUp, 
  MessageSquarePlus, 
  Scale, 
  AlertTriangle,
  Clock,
  ShieldCheck,
  CheckCircle2
} from 'lucide-react';
import { KoruptorProfile } from '../types/corruption';
import { formatRupiah, formatExactRupiah } from '../utils/formatters';

interface ProfileCardProps {
  profile: KoruptorProfile;
  onOpenReportModal: (profileId: string) => void;
  onOpenDetailModal: (profile: KoruptorProfile) => void;
  onViewCommunityReports: (profileId: string) => void;
}

export const ProfileCard: React.FC<ProfileCardProps> = ({
  profile,
  onOpenReportModal,
  onOpenDetailModal,
  onViewCommunityReports,
}) => {
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const [imageError, setImageError] = useState<boolean>(false);

  // Fallback initial
  const initials = profile.name
    .split(' ')
    .map((w) => w[0])
    .slice(0, 2)
    .join('');

  return (
    <article className="bg-white border border-stone-200 rounded-xl overflow-hidden shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between">
      <div>
        {/* LinkedIn-style Cover Banner */}
        <div className="h-28 sm:h-32 w-full relative bg-stone-800 overflow-hidden">
          <img
            src={profile.bannerUrl || '/src/assets/images/banner_justice_hall_1793617500881.jpg'}
            alt="Hall of Justice background"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover opacity-50 filter grayscale contrast-125"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-stone-900 via-stone-900/40 to-transparent" />
          
          {/* Sector and Legal Status Tags in Header (unboxed text style) */}
          <div className="absolute top-3 right-3 flex items-center gap-2 text-xs font-medium text-stone-200 bg-stone-950/70 backdrop-blur-xs px-2.5 py-1 rounded">
            <span className="text-amber-400 font-semibold">{profile.sectorLabel}</span>
            <span aria-hidden="true" className="text-stone-500">·</span>
            <span className="text-stone-200 font-mono font-bold">{profile.sentenceDuration || profile.legalStatusLabel}</span>
          </div>
        </div>

        {/* Profile Avatar & Header Info */}
        <div className="px-5 sm:px-6 relative pb-4">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between -mt-14 sm:-mt-16 gap-3 mb-4">
            {/* Avatar Frame */}
            <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-full border-4 border-white bg-stone-100 shadow-md overflow-hidden shrink-0">
              {profile.avatarUrl && !imageError ? (
                <img
                  src={profile.avatarUrl}
                  alt={profile.name}
                  referrerPolicy="no-referrer"
                  onError={() => setImageError(true)}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full bg-stone-800 text-stone-200 flex flex-col items-center justify-center font-serif text-2xl font-bold">
                  {initials}
                  <span className="text-[10px] font-sans font-normal tracking-wide text-stone-400">Arsip Kasus</span>
                </div>
              )}
            </div>

            {/* Quick Action Buttons on Top Right */}
            <div className="flex items-center gap-2 pt-1 sm:pt-0">
              <button
                onClick={() => onOpenReportModal(profile.id)}
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-stone-800 bg-amber-100 hover:bg-amber-200 border border-amber-300 rounded-md transition-colors"
                title="Kirim laporan mengenai pekerjaan atau posisi figur ini saat ini"
              >
                <MessageSquarePlus className="w-3.5 h-3.5 text-amber-800" />
                <span>Update Posisi Terkini</span>
              </button>
              <button
                onClick={() => onViewCommunityReports(profile.id)}
                className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium text-stone-600 bg-stone-100 hover:bg-stone-200 rounded-md transition-colors"
                title="Lihat pantauan komunitas"
              >
                <span>{profile.communityUpdatesCount} Laporan</span>
              </button>
            </div>
          </div>

          {/* Name & Headline */}
          <div className="space-y-1">
            <div className="flex items-center gap-2 flex-wrap">
              <h3 className="text-xl sm:text-2xl font-bold text-stone-900 font-serif tracking-tight">
                {profile.name}
              </h3>
              {profile.alias && (
                <span className="text-xs text-stone-500 font-sans">
                  ({profile.alias})
                </span>
              )}
            </div>

            {/* Jabatan Kasus (Past Position) */}
            <div className="text-sm font-medium text-stone-700 flex items-center gap-1.5">
              <Briefcase className="w-4 h-4 text-stone-500 shrink-0" />
              <span>Jabatan Saat Perkara: <strong className="text-stone-900">{profile.pastPosition}</strong></span>
            </div>

            {/* Posisi & Pekerjaan Saat Ini (Target Utama Pantauan Komunitas) */}
            <div className="mt-2 p-3 bg-amber-50/70 border border-amber-200/80 rounded-lg text-xs sm:text-sm text-stone-800">
              <div className="flex items-start gap-2">
                <Building2 className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold text-amber-900 block sm:inline mr-1">
                    Posisi / Status Saat Ini:
                  </span>
                  <span className="font-medium text-stone-900">{profile.currentPosition}</span>
                  <div className="flex items-center gap-2 text-xs text-stone-500 mt-1">
                    <span className="flex items-center gap-1 text-stone-600">
                      <MapPin className="w-3 h-3 text-stone-400" />
                      {profile.location}
                    </span>
                    <span aria-hidden="true">·</span>
                    <span className="text-stone-600">Lembaga/Entitas: {profile.currentOrganization}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 2 POIN PENTING (Mandatory as per brief) */}
          <div className="mt-4 pt-4 border-t border-stone-200">
            <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-stone-600 mb-2">
              <Scale className="w-3.5 h-3.5 text-amber-700" />
              <span>2 Poin Penting Perkara Hukum</span>
            </div>
            <ol className="space-y-2 text-xs sm:text-sm text-stone-700 list-decimal list-inside pl-1">
              <li className="leading-snug">
                <span className="font-medium text-stone-900">{profile.twoKeyPoints[0]}</span>
              </li>
              <li className="leading-snug">
                <span className="font-medium text-stone-900">{profile.twoKeyPoints[1]}</span>
              </li>
            </ol>
          </div>

          {/* ACHIEVEMENTS ALA LINKEDIN (Mandatory as per brief) */}
          <div className="mt-5 pt-4 border-t border-stone-200">
            <div className="flex items-center justify-between mb-2.5">
              <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-stone-600">
                <Trophy className="w-3.5 h-3.5 text-amber-600" />
                <span>Achievements & Honors (Rekor Skandal)</span>
              </div>
              <span className="text-[11px] text-stone-500">
                Berdasarkan audit & vonis sidang
              </span>
            </div>
            
            <div className="grid grid-cols-1 gap-2.5">
              {profile.achievements.map((ach, idx) => (
                <div
                  key={idx}
                  className="p-3 bg-stone-50 border border-stone-200 rounded-lg text-xs hover:border-stone-300 transition-colors"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="font-semibold text-stone-900 text-xs sm:text-sm">
                      {ach.title}
                    </div>
                    <span className="font-mono text-xs font-bold tabular-nums text-rose-700 shrink-0 bg-rose-50 px-2.5 py-1 rounded-md border border-rose-200 tracking-tight shadow-2xs">
                      {ach.metricHighlight}
                    </span>
                  </div>
                  <div className="text-[11px] text-stone-500 mt-0.5">
                    {ach.issuerOrYear}
                  </div>
                  <p className="text-stone-600 mt-1 leading-relaxed">
                    {ach.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* LIST KERUGIAN NEGARA (Mandatory as per brief) */}
          <div className="mt-5 pt-4 border-t border-stone-200">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-stone-600">
                <Coins className="w-3.5 h-3.5 text-rose-600" />
                <span>Rincian Kerugian Negara</span>
              </div>
              <span className="text-xs font-mono font-bold text-rose-600 tabular-nums">
                {profile.stateLoss.totalFormatted}
              </span>
            </div>

            <div className="bg-stone-50 border border-stone-200 rounded-lg p-3 space-y-2">
              <div className="text-xs divide-y divide-stone-200">
                {profile.stateLoss.breakdown.map((item, idx) => (
                  <div key={idx} className="py-1.5 flex items-center justify-between text-stone-700">
                    <div>
                      <span className="font-medium">{item.label}</span>
                      {item.notes && <span className="text-[11px] text-stone-500 block">{item.notes}</span>}
                    </div>
                    <span className="font-mono text-xs font-semibold text-stone-900 tabular-nums shrink-0 ml-2">
                      {formatRupiah(item.amount)}
                    </span>
                  </div>
                ))}
              </div>

              {/* Recovery Progress */}
              <div className="pt-2 border-t border-stone-200">
                <div className="flex items-center justify-between text-[11px] text-stone-600 mb-1">
                  <span>Aset Pulih / Dirampas: <strong className="text-emerald-700 font-mono">{formatRupiah(profile.stateLoss.assetRecovered)}</strong></span>
                  <span className="font-mono font-bold text-stone-800">{profile.stateLoss.recoveryRatePercent}%</span>
                </div>
                <div className="w-full bg-stone-200 rounded-full h-1.5 overflow-hidden">
                  <div
                    className="bg-emerald-600 h-1.5 rounded-full transition-all duration-500"
                    style={{ width: `${Math.min(profile.stateLoss.recoveryRatePercent, 100)}%` }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* LIST KORUPSI / KASUS (Mandatory as per brief) */}
          <div className="mt-5 pt-4 border-t border-stone-200">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-stone-600">
                <FileText className="w-3.5 h-3.5 text-stone-600" />
                <span>Daftar Kasus Korupsi ({profile.corruptionCases.length})</span>
              </div>
              <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="text-xs text-amber-700 hover:text-amber-800 font-medium flex items-center gap-0.5"
              >
                <span>{isExpanded ? 'Tutup Kasus' : 'Lihat Detail Kasus'}</span>
                {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
              </button>
            </div>

            {/* Primary Case Preview */}
            <div className="space-y-2">
              {profile.corruptionCases.slice(0, isExpanded ? undefined : 1).map((cCase, idx) => (
                <div
                  key={idx}
                  className="p-3 bg-stone-50 border border-stone-200 rounded-lg text-xs space-y-1.5"
                >
                  <div className="flex items-start justify-between gap-2">
                    <span className="font-semibold text-stone-900">{cCase.name}</span>
                    <span className="font-mono text-[11px] text-stone-500 shrink-0">{cCase.year}</span>
                  </div>
                  <p className="text-stone-600 text-xs leading-relaxed">
                    {cCase.summary}
                  </p>
                  <div className="text-[11px] text-stone-500 font-mono">
                    Nomor Putusan: {cCase.courtDocketNumber}
                  </div>
                  {cCase.sentenceYears > 0 && (
                    <div className="text-[11px] text-stone-700 font-medium pt-1">
                      Vonis: <span className="font-mono font-bold text-stone-900">{cCase.sentenceYears} th</span> · Denda: {formatRupiah(cCase.fineAmount)}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Card Footer Actions */}
      <div className="px-5 sm:px-6 py-3.5 bg-stone-50 border-t border-stone-200 flex items-center justify-between gap-3">
        <button
          onClick={() => onOpenDetailModal(profile)}
          className="text-xs font-medium text-stone-700 hover:text-stone-950 flex items-center gap-1 transition-colors"
        >
          <ExternalLink className="w-3.5 h-3.5" />
          <span>Lihat CV Tipikor Lengkap</span>
        </button>

        <button
          onClick={() => onOpenReportModal(profile.id)}
          className="px-3 py-1.5 text-xs font-semibold text-stone-900 bg-amber-400 hover:bg-amber-300 rounded-md transition-colors shadow-xs"
        >
          Lapor Posisi Sekarang
        </button>
      </div>
    </article>
  );
};
