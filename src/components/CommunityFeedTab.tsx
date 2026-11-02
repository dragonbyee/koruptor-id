import React, { useState } from 'react';
import { 
  Building2, 
  MapPin, 
  ExternalLink, 
  ThumbsUp, 
  Flag, 
  Filter, 
  MessageSquarePlus, 
  CheckCircle2, 
  Clock, 
  AlertTriangle,
  User,
  Search
} from 'lucide-react';
import { CommunityUpdate, KoruptorProfile } from '../types/corruption';

interface CommunityFeedTabProps {
  updates: CommunityUpdate[];
  corruptors: KoruptorProfile[];
  onVoteReport: (reportId: string, type: 'up' | 'flag') => void;
  onOpenReportModal: (corruptorId?: string) => void;
  onSelectCorruptor: (corruptor: KoruptorProfile) => void;
}

export const CommunityFeedTab: React.FC<CommunityFeedTabProps> = ({
  updates,
  corruptors,
  onVoteReport,
  onOpenReportModal,
  onSelectCorruptor,
}) => {
  const [filterStatus, setFilterStatus] = useState<'all' | 'verified' | 'review'>('all');
  const [selectedCorruptorId, setSelectedCorruptorId] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const filteredUpdates = updates.filter((u) => {
    if (filterStatus !== 'all' && u.status !== filterStatus) return false;
    if (selectedCorruptorId !== 'all' && u.corruptorId !== selectedCorruptorId) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return (
        u.corruptorName.toLowerCase().includes(q) ||
        u.newPosition.toLowerCase().includes(q) ||
        u.companyOrOrg.toLowerCase().includes(q) ||
        u.notes.toLowerCase().includes(q) ||
        u.location.toLowerCase().includes(q)
      );
    }
    return true;
  });

  return (
    <div className="space-y-6">
      {/* Community Header & Action */}
      <div className="bg-stone-900 text-stone-100 rounded-xl p-6 border border-stone-800">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-xs uppercase tracking-widest text-amber-400 font-bold">
                Transparansi Publik
              </span>
              <span className="text-xs text-stone-400">· Model Komunitas</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-serif font-bold text-white tracking-tight">
              Pantau Posisi & Pekerjaan Terkini Para Koruptor
            </h2>
            <p className="text-xs sm:text-sm text-stone-300 max-w-2xl leading-relaxed">
              Kawal bersama apa yang dilakukan oleh terpidana korupsi saat ini: apakah menjabat komisaris, mendirikan entitas bisnis baru, aktif berpolitik, atau bebas bersyarat. Setiap warga negara dapat melaporkan dan memverifikasi silang bukti.
            </p>
          </div>

          <button
            onClick={() => onOpenReportModal()}
            className="flex items-center gap-2 px-4 py-2.5 text-xs font-bold text-stone-950 bg-amber-400 hover:bg-amber-300 rounded-lg transition-colors whitespace-nowrap shrink-0 self-start md:self-auto shadow-sm"
          >
            <MessageSquarePlus className="w-4 h-4 text-stone-950" />
            <span>Kirim Laporan Posisi Baru</span>
          </button>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-white p-3 border border-stone-200 rounded-lg">
        {/* Search */}
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-stone-400 absolute left-3 top-2.5" />
          <input
            type="text"
            placeholder="Cari nama koruptor, jabatan baru, atau perusahaan..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-1.5 text-xs bg-stone-50 border border-stone-200 rounded-md focus:outline-none focus:ring-1 focus:ring-amber-500"
          />
        </div>

        {/* Filter Segmented Controls */}
        <div className="flex items-center gap-2 flex-wrap">
          <div className="flex items-center bg-stone-100 p-0.5 rounded-md text-xs font-medium text-stone-600">
            <button
              onClick={() => setFilterStatus('all')}
              className={`px-2.5 py-1 rounded transition-colors ${
                filterStatus === 'all' ? 'bg-white text-stone-950 shadow-2xs font-bold' : 'hover:text-stone-950'
              }`}
            >
              Semua Status ({updates.length})
            </button>
            <button
              onClick={() => setFilterStatus('verified')}
              className={`px-2.5 py-1 rounded transition-colors ${
                filterStatus === 'verified' ? 'bg-white text-emerald-800 shadow-2xs font-bold' : 'hover:text-stone-950'
              }`}
            >
              Terverifikasi Komunitas
            </button>
            <button
              onClick={() => setFilterStatus('review')}
              className={`px-2.5 py-1 rounded transition-colors ${
                filterStatus === 'review' ? 'bg-white text-amber-800 shadow-2xs font-bold' : 'hover:text-stone-950'
              }`}
            >
              Ditinjau
            </button>
          </div>

          {/* Corruptor Selector */}
          <select
            value={selectedCorruptorId}
            onChange={(e) => setSelectedCorruptorId(e.target.value)}
            className="px-2.5 py-1.5 text-xs bg-stone-50 border border-stone-200 rounded-md text-stone-700 focus:outline-none"
          >
            <option value="all">Semua Figur Terpidana</option>
            {corruptors.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Updates Stream */}
      <div className="space-y-4">
        {filteredUpdates.length === 0 ? (
          <div className="bg-white p-12 text-center rounded-xl border border-dashed border-stone-300 space-y-2">
            <AlertTriangle className="w-8 h-8 text-stone-400 mx-auto" />
            <h3 className="text-sm font-bold text-stone-800">
              Tidak Ada Laporan yang Cocok
            </h3>
            <p className="text-xs text-stone-500 max-w-sm mx-auto">
              Cobalah ubah filter pencarian Anda atau kirim laporan posisi baru jika Anda memiliki informasi valid.
            </p>
          </div>
        ) : (
          filteredUpdates.map((report) => {
            const corruptor = corruptors.find((c) => c.id === report.corruptorId);

            return (
              <div
                key={report.id}
                className="bg-white border border-stone-200 rounded-xl p-5 shadow-xs hover:border-stone-300 transition-colors space-y-3"
              >
                {/* Header row: Target corruptor & verification status */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-stone-100">
                  <div className="flex items-center gap-3">
                    {corruptor && corruptor.avatarUrl ? (
                      <img
                        src={corruptor.avatarUrl}
                        alt={report.corruptorName}
                        referrerPolicy="no-referrer"
                        className="w-10 h-10 rounded-full object-cover border border-stone-300"
                      />
                    ) : (
                      <div className="w-10 h-10 rounded-full bg-stone-800 text-stone-200 flex items-center justify-center font-bold text-xs">
                        {report.corruptorName.substring(0, 2)}
                      </div>
                    )}
                    <div>
                      <button
                        onClick={() => corruptor && onSelectCorruptor(corruptor)}
                        className="font-serif font-bold text-stone-900 text-base hover:text-amber-700 transition-colors text-left flex items-center gap-1.5"
                      >
                        <span>{report.corruptorName}</span>
                        <ExternalLink className="w-3.5 h-3.5 text-stone-400" />
                      </button>
                      <div className="text-xs text-stone-500">
                        Perkara: {corruptor ? corruptor.pastPosition : 'Tindak Pidana Korupsi'}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 self-start sm:self-auto">
                    {report.status === 'verified' ? (
                      <span className="flex items-center gap-1 text-xs font-semibold text-emerald-800 bg-emerald-50 border border-emerald-200 px-2.5 py-1 rounded">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                        <span>Terverifikasi Komunitas</span>
                      </span>
                    ) : (
                      <span className="flex items-center gap-1 text-xs font-semibold text-amber-800 bg-amber-50 border border-amber-200 px-2.5 py-1 rounded">
                        <Clock className="w-3.5 h-3.5 text-amber-600" />
                        <span>Sedang Ditinjau Publik</span>
                      </span>
                    )}
                  </div>
                </div>

                {/* Body: Reported Current Position & Company */}
                <div className="space-y-1">
                  <div className="text-xs font-semibold uppercase tracking-wider text-amber-800">
                    Posisi / Pekerjaan yang Dilaporkan:
                  </div>
                  <div className="text-base font-bold text-stone-900 flex items-center gap-2">
                    <Building2 className="w-4 h-4 text-stone-500 shrink-0" />
                    <span>{report.newPosition}</span>
                  </div>
                  <div className="flex items-center gap-3 text-xs text-stone-600 pt-0.5">
                    <span>Lembaga/Entitas: <strong>{report.companyOrOrg}</strong></span>
                    <span aria-hidden="true">·</span>
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-stone-400" />
                      {report.location}
                    </span>
                  </div>
                </div>

                {/* Evidence and Notes */}
                <div className="p-3 bg-stone-50 border border-stone-200 rounded-lg text-xs space-y-2">
                  <p className="text-stone-700 leading-relaxed">
                    {report.notes}
                  </p>
                  <div className="flex items-center justify-between pt-1 border-t border-stone-200 text-stone-500 text-[11px]">
                    <a
                      href={report.evidenceUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="font-medium text-amber-800 hover:text-amber-900 flex items-center gap-1 hover:underline"
                    >
                      <ExternalLink className="w-3 h-3" />
                      <span>Rujukan: {report.evidenceSource}</span>
                    </a>
                    <span>Pelapor: {report.reportedBy} ({report.reportedAt})</span>
                  </div>
                </div>

                {/* Voting & Actions */}
                <div className="flex items-center justify-between pt-2">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => onVoteReport(report.id, 'up')}
                      className={`flex items-center gap-1.5 px-3 py-1.5 rounded text-xs transition-colors ${
                        report.userVoted === 'up'
                          ? 'bg-emerald-600 text-white font-semibold'
                          : 'bg-stone-100 hover:bg-stone-200 text-stone-700'
                      }`}
                    >
                      <ThumbsUp className="w-3.5 h-3.5" />
                      <span>Valid / Konfirmasi ({report.upvotes})</span>
                    </button>
                    <button
                      onClick={() => onVoteReport(report.id, 'flag')}
                      className={`flex items-center gap-1.5 px-3 py-1.5 rounded text-xs transition-colors ${
                        report.userVoted === 'flag'
                          ? 'bg-rose-600 text-white font-semibold'
                          : 'bg-stone-100 hover:bg-stone-200 text-stone-700'
                      }`}
                    >
                      <Flag className="w-3.5 h-3.5" />
                      <span>Ragu / Laporkan ({report.flags})</span>
                    </button>
                  </div>

                  {corruptor && (
                    <button
                      onClick={() => onSelectCorruptor(corruptor)}
                      className="text-xs font-semibold text-amber-700 hover:text-amber-900"
                    >
                      Lihat Profil Lengkap &rarr;
                    </button>
                  )}
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
