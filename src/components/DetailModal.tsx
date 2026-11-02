import React, { useState } from 'react';
import { 
  X, 
  Briefcase, 
  Calendar, 
  MapPin, 
  Building2, 
  Coins, 
  FileText, 
  Trophy, 
  Scale, 
  ThumbsUp, 
  Flag, 
  ExternalLink,
  School,
  Hospital,
  Compass,
  Home,
  AlertCircle
} from 'lucide-react';
import { KoruptorProfile, CommunityUpdate } from '../types/corruption';
import { formatRupiah, formatExactRupiah, calculateEquivalences } from '../utils/formatters';

interface DetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  profile: KoruptorProfile | null;
  communityUpdates: CommunityUpdate[];
  onOpenReportModal: (profileId: string) => void;
  onVoteReport: (reportId: string, type: 'up' | 'flag') => void;
}

export const DetailModal: React.FC<DetailModalProps> = ({
  isOpen,
  onClose,
  profile,
  communityUpdates,
  onOpenReportModal,
  onVoteReport,
}) => {
  const [activeTab, setActiveTab] = useState<'cv' | 'losses' | 'legal' | 'community'>('cv');

  if (!isOpen || !profile) return null;

  const profileCommunityReports = communityUpdates.filter((u) => u.corruptorId === profile.id);
  const equivalences = calculateEquivalences(profile.stateLoss.totalAmount);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-stone-950/75 backdrop-blur-xs overflow-y-auto">
      <div className="bg-white rounded-xl shadow-2xl border border-stone-200 max-w-3xl w-full max-h-[92vh] flex flex-col overflow-hidden my-auto">
        {/* Modal Top Header */}
        <div className="px-6 py-4 bg-stone-900 text-stone-100 flex items-center justify-between border-b border-stone-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full border-2 border-stone-600 overflow-hidden bg-stone-800 shrink-0">
              {profile.avatarUrl ? (
                <img
                  src={profile.avatarUrl}
                  alt={profile.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-sm font-bold text-stone-300">
                  {profile.name.substring(0, 2)}
                </div>
              )}
            </div>
            <div>
              <h2 className="text-lg font-serif font-bold text-white tracking-tight flex items-center gap-2">
                <span>{profile.name}</span>
                <span className="text-xs font-mono font-bold text-amber-400 bg-amber-400/10 px-2 py-0.5 rounded">
                  {profile.sentenceDuration || profile.legalStatusLabel}
                </span>
              </h2>
              <p className="text-xs text-stone-400">
                {profile.pastPosition}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-stone-400 hover:text-white rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Tabs Bar */}
        <div className="flex items-center border-b border-stone-200 px-6 bg-stone-50 text-xs font-medium text-stone-600 gap-6 overflow-x-auto">
          <button
            onClick={() => setActiveTab('cv')}
            className={`py-3 border-b-2 whitespace-nowrap transition-colors ${
              activeTab === 'cv'
                ? 'border-amber-500 text-stone-900 font-bold'
                : 'border-transparent hover:text-stone-900'
            }`}
          >
            Curriculum Vitae & Rekam Jejak
          </button>
          <button
            onClick={() => setActiveTab('losses')}
            className={`py-3 border-b-2 whitespace-nowrap transition-colors ${
              activeTab === 'losses'
                ? 'border-amber-500 text-stone-900 font-bold'
                : 'border-transparent hover:text-stone-900'
            }`}
          >
            Kerugian & Dampak Sosial
          </button>
          <button
            onClick={() => setActiveTab('legal')}
            className={`py-3 border-b-2 whitespace-nowrap transition-colors ${
              activeTab === 'legal'
                ? 'border-amber-500 text-stone-900 font-bold'
                : 'border-transparent hover:text-stone-900'
            }`}
          >
            Berkas Putusan Hukum ({profile.corruptionCases.length})
          </button>
          <button
            onClick={() => setActiveTab('community')}
            className={`py-3 border-b-2 whitespace-nowrap transition-colors flex items-center gap-1.5 ${
              activeTab === 'community'
                ? 'border-amber-500 text-stone-900 font-bold'
                : 'border-transparent hover:text-stone-900'
            }`}
          >
            <span>Pantau Posisi ({profileCommunityReports.length})</span>
          </button>
        </div>

        {/* Modal Scrollable Content */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1 text-stone-800">
          {/* TAB 1: CV & REKAM JEJAK */}
          {activeTab === 'cv' && (
            <div className="space-y-6">
              {/* Posisi Saat Ini Highlight */}
              <div className="p-4 bg-amber-50 border border-amber-200 rounded-xl space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-amber-800">
                    Posisi & Pekerjaan Terkini (Pantauan Komunitas)
                  </span>
                  <button
                    onClick={() => onOpenReportModal(profile.id)}
                    className="text-xs font-semibold text-amber-900 underline hover:text-amber-700"
                  >
                    + Laporkan Update Baru
                  </button>
                </div>
                <div className="text-base font-semibold text-stone-950">
                  {profile.currentPosition}
                </div>
                <div className="text-xs text-stone-600 flex flex-wrap gap-x-4 gap-y-1">
                  <span>Lokasi: {profile.location}</span>
                  <span>Organisasi: {profile.currentOrganization}</span>
                  <span>Sektor: {profile.sectorLabel}</span>
                </div>
              </div>

              {/* 2 Poin Penting Rekap */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-stone-500 mb-2">
                  2 Sorotan Inti Perkara
                </h4>
                <div className="space-y-2">
                  {profile.twoKeyPoints.map((pt, i) => (
                    <div key={i} className="p-3 bg-stone-50 border border-stone-200 rounded-lg text-xs sm:text-sm text-stone-800 flex items-start gap-2.5">
                      <span className="w-5 h-5 rounded-full bg-stone-200 text-stone-700 font-mono font-bold flex items-center justify-center shrink-0 text-xs">
                        {i + 1}
                      </span>
                      <span>{pt}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Career Timeline */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-stone-500 mb-3">
                  Kronologi Karier & Posisi (Format LinkedIn)
                </h4>
                <div className="relative border-l-2 border-stone-200 ml-3 space-y-6 py-1">
                  {profile.careerHistory.map((item, idx) => (
                    <div key={idx} className="relative pl-6">
                      <div
                        className={`absolute -left-1.5 top-1 w-3 h-3 rounded-full border-2 border-white ${
                          item.isCorruptionPeriod ? 'bg-rose-500 ring-2 ring-rose-200' : 'bg-stone-400'
                        }`}
                      />
                      <div className="flex items-start justify-between gap-2">
                        <span className="font-semibold text-sm text-stone-900">
                          {item.role}
                        </span>
                        <span className="text-xs font-mono text-stone-500 shrink-0">
                          {item.period}
                        </span>
                      </div>
                      <div className="text-xs font-medium text-stone-600">
                        {item.organization}
                      </div>
                      {item.isCorruptionPeriod && (
                        <span className="inline-block mt-1 text-[11px] font-bold text-rose-700 bg-rose-50 px-2 py-0.5 rounded border border-rose-200">
                          Periode Perkara Tindak Pidana Korupsi
                        </span>
                      )}
                      {item.description && (
                        <p className="mt-1 text-xs text-stone-500 leading-relaxed">
                          {item.description}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Achievements Highlight */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-stone-500 mb-3">
                  Penghargaan & Capaian Skandal (Honors & Awards)
                </h4>
                <div className="grid grid-cols-1 gap-3">
                  {profile.achievements.map((ach, idx) => (
                    <div key={idx} className="p-3.5 bg-stone-50 border border-stone-200 rounded-lg text-xs space-y-1">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-stone-900 text-sm">{ach.title}</span>
                        <span className="font-mono text-xs font-bold tabular-nums text-rose-700 shrink-0 bg-rose-50 px-2.5 py-1 rounded-md border border-rose-200 tracking-tight shadow-2xs">
                          {ach.metricHighlight}
                        </span>
                      </div>
                      <span className="text-[11px] text-stone-500 block">{ach.issuerOrYear}</span>
                      <p className="text-stone-600 pt-1 leading-relaxed">{ach.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: LOSSES & SOCIAL EQUIVALENCE */}
          {activeTab === 'losses' && (
            <div className="space-y-6">
              <div className="p-5 bg-rose-50 border border-rose-200 rounded-xl space-y-2">
                <span className="text-xs font-bold uppercase tracking-wider text-rose-800">
                  Total Kerugian Negara yang Terbukti
                </span>
                <div className="text-3xl font-mono font-bold text-rose-700">
                  {profile.stateLoss.totalFormatted}
                </div>
                <p className="text-xs text-rose-800">
                  Perhitungan resmi tim audit investigatif BPKP dan Kejaksaan Republik Indonesia.
                </p>
              </div>

              {/* Breakdown */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-stone-500 mb-2">
                  Rincian Komponen Kerugian Negara
                </h4>
                <div className="bg-stone-50 border border-stone-200 rounded-lg divide-y divide-stone-200 text-xs">
                  {profile.stateLoss.breakdown.map((item, idx) => (
                    <div key={idx} className="p-3 flex items-center justify-between">
                      <div>
                        <span className="font-semibold text-stone-900 block">{item.label}</span>
                        {item.notes && <span className="text-[11px] text-stone-500">{item.notes}</span>}
                      </div>
                      <span className="font-mono font-bold text-stone-900 text-sm ml-2">
                        {formatRupiah(item.amount)}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Equivalency Calculator (What could have been built) */}
              <div className="border border-stone-200 rounded-xl p-5 bg-white space-y-4 shadow-2xs">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-bold text-stone-900 flex items-center gap-2">
                    <Hospital className="w-4 h-4 text-emerald-600" />
                    <span>Setara Dengan Fasilitas Publik Apa Uang Ini?</span>
                  </h4>
                  <span className="text-xs text-stone-500">Estimasi APBN Riil</span>
                </div>
                
                <p className="text-xs text-stone-600 leading-relaxed">
                  Bila nilai kerugian negara sebesar <strong>{profile.stateLoss.totalFormatted}</strong> tidak dikorupsi dan dialokasikan untuk kepentingan rakyat, dapat mendanai:
                </p>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
                  <div className="p-3 bg-stone-50 border border-stone-200 rounded-lg">
                    <Hospital className="w-5 h-5 text-emerald-600 mx-auto mb-1" />
                    <div className="text-lg font-bold font-mono text-stone-900">
                      {equivalences.puskesmas.toLocaleString('id-ID')}
                    </div>
                    <span className="text-[11px] text-stone-500 block">Puskesmas Rawat Inap Lengkap</span>
                  </div>

                  <div className="p-3 bg-stone-50 border border-stone-200 rounded-lg">
                    <School className="w-5 h-5 text-amber-600 mx-auto mb-1" />
                    <div className="text-lg font-bold font-mono text-stone-900">
                      {equivalences.beasiswaKuliah.toLocaleString('id-ID')}
                    </div>
                    <span className="text-[11px] text-stone-500 block">Beasiswa Kuliah S1 Penuh</span>
                  </div>

                  <div className="p-3 bg-stone-50 border border-stone-200 rounded-lg">
                    <Compass className="w-5 h-5 text-blue-600 mx-auto mb-1" />
                    <div className="text-lg font-bold font-mono text-stone-900">
                      {equivalences.jalanKm.toLocaleString('id-ID')} Km
                    </div>
                    <span className="text-[11px] text-stone-500 block">Jalan Aspal Penghubung Desa</span>
                  </div>

                  <div className="p-3 bg-stone-50 border border-stone-200 rounded-lg">
                    <Home className="w-5 h-5 text-purple-600 mx-auto mb-1" />
                    <div className="text-lg font-bold font-mono text-stone-900">
                      {equivalences.rumahSubsidi.toLocaleString('id-ID')}
                    </div>
                    <span className="text-[11px] text-stone-500 block">Unit Rumah Layak Huni</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: LEGAL DOCKET & CASES */}
          {activeTab === 'legal' && (
            <div className="space-y-4">
              {profile.corruptionCases.map((cCase, idx) => (
                <div key={idx} className="p-4 bg-stone-50 border border-stone-200 rounded-xl space-y-3">
                  <div className="flex items-start justify-between gap-2">
                    <h4 className="font-bold text-sm text-stone-900">
                      {cCase.name}
                    </h4>
                    <span className="text-xs font-mono font-semibold text-stone-500">
                      Tahun {cCase.year}
                    </span>
                  </div>

                  <p className="text-xs text-stone-700 leading-relaxed">
                    {cCase.summary}
                  </p>

                  <div className="p-3 bg-white border border-stone-200 rounded-lg text-xs space-y-1">
                    <div className="font-mono text-stone-600">
                      <strong>Nomor Registrasi Perkara:</strong> {cCase.courtDocketNumber}
                    </div>
                    <div className="text-stone-600">
                      <strong>Pasal yang Dijatuhkan:</strong> {cCase.lawsBreached.join('; ')}
                    </div>
                    {cCase.sentenceYears > 0 && (
                      <div className="text-rose-700 font-semibold pt-1">
                        Pidana Penjara: <span className="font-mono font-bold">{cCase.sentenceYears} th</span> · Denda: {formatExactRupiah(cCase.fineAmount)} · Uang Pengganti: {formatExactRupiah(cCase.restitutionAmount)}
                      </div>
                    )}
                  </div>
                </div>
              ))}

              <div className="p-3 bg-stone-100 rounded-lg flex items-center justify-between text-xs text-stone-600">
                <span>Rujukan Salinan Putusan Resmi Mahkamah Agung RI</span>
                <a
                  href={profile.verifiedSourceUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="font-medium text-amber-700 hover:text-amber-800 flex items-center gap-1"
                >
                  <span>Buka Direktori Putusan MA</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          )}

          {/* TAB 4: COMMUNITY POSITION UPDATES */}
          {activeTab === 'community' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between pb-2 border-b border-stone-200">
                <span className="text-xs font-bold uppercase tracking-wider text-stone-600">
                  Laporan Posisi Komunitas ({profileCommunityReports.length})
                </span>
                <button
                  onClick={() => onOpenReportModal(profile.id)}
                  className="px-3 py-1.5 text-xs font-semibold text-stone-950 bg-amber-400 hover:bg-amber-300 rounded-md transition-colors"
                >
                  + Tambah Laporan Baru
                </button>
              </div>

              {profileCommunityReports.length === 0 ? (
                <div className="p-8 text-center bg-stone-50 rounded-xl border border-dashed border-stone-300 space-y-2">
                  <AlertCircle className="w-8 h-8 text-stone-400 mx-auto" />
                  <p className="text-sm font-semibold text-stone-700">
                    Belum Ada Laporan Komunitas Tambahan
                  </p>
                  <p className="text-xs text-stone-500 max-w-sm mx-auto">
                    Ketahui informasi terkini mengenai perusahaan, bisnis, atau posisi figur ini? Bantu komunitas dengan mengirimkan laporan pertama.
                  </p>
                  <button
                    onClick={() => onOpenReportModal(profile.id)}
                    className="mt-2 px-3 py-1.5 text-xs font-medium text-amber-900 bg-amber-100 rounded-md"
                  >
                    Kirim Laporan Pertama
                  </button>
                </div>
              ) : (
                profileCommunityReports.map((report) => (
                  <div
                    key={report.id}
                    className="p-4 bg-stone-50 border border-stone-200 rounded-xl text-xs space-y-2"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <div className="font-bold text-stone-900 text-sm">
                          {report.newPosition}
                        </div>
                        <div className="text-stone-600">
                          {report.companyOrOrg} · {report.location}
                        </div>
                      </div>
                      <span
                        className={`text-[10px] font-semibold px-2 py-0.5 rounded border uppercase tracking-wider ${
                          report.status === 'verified'
                            ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                            : 'bg-amber-50 text-amber-700 border-amber-200'
                        }`}
                      >
                        {report.status === 'verified' ? 'Terverifikasi Komunitas' : 'Sedang Ditinjau'}
                      </span>
                    </div>

                    <p className="text-stone-700 leading-relaxed">
                      {report.notes}
                    </p>

                    <div className="pt-2 border-t border-stone-200 flex flex-wrap items-center justify-between gap-2 text-[11px] text-stone-500">
                      <div className="flex items-center gap-2">
                        <span>Dilaporkan oleh: <strong>{report.reportedBy}</strong></span>
                        <span aria-hidden="true">·</span>
                        <span>{report.reportedAt}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <a
                          href={report.evidenceUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="text-amber-800 hover:underline flex items-center gap-1 font-medium"
                        >
                          <span>Rujukan: {report.evidenceSource}</span>
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      </div>
                    </div>

                    {/* Community Voting / Corroboration */}
                    <div className="pt-1 flex items-center gap-2">
                      <button
                        onClick={() => onVoteReport(report.id, 'up')}
                        className={`flex items-center gap-1 px-2.5 py-1 rounded text-xs transition-colors ${
                          report.userVoted === 'up'
                            ? 'bg-emerald-600 text-white font-semibold'
                            : 'bg-white border border-stone-200 text-stone-700 hover:bg-stone-100'
                        }`}
                      >
                        <ThumbsUp className="w-3 h-3" />
                        <span>Valid / Konfirmasi ({report.upvotes})</span>
                      </button>
                      <button
                        onClick={() => onVoteReport(report.id, 'flag')}
                        className={`flex items-center gap-1 px-2.5 py-1 rounded text-xs transition-colors ${
                          report.userVoted === 'flag'
                            ? 'bg-rose-600 text-white font-semibold'
                            : 'bg-white border border-stone-200 text-stone-700 hover:bg-stone-100'
                        }`}
                      >
                        <Flag className="w-3 h-3" />
                        <span>Ragu / Butuh Bukti ({report.flags})</span>
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-3 bg-stone-100 border-t border-stone-200 flex items-center justify-between">
          <span className="text-[11px] text-stone-500 font-sans">
            Data berbasis dokumen persidangan inkracht & kontribusi pemantau publik.
          </span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 text-xs font-semibold text-stone-800 bg-white border border-stone-300 rounded-md hover:bg-stone-50 transition-colors"
          >
            Tutup
          </button>
        </div>
      </div>
    </div>
  );
};
