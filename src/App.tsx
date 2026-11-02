import React, { useState, useEffect } from 'react';
import { 
  Search, 
  ArrowUpDown, 
  PlusCircle, 
  AlertCircle, 
  ArrowLeft
} from 'lucide-react';
import { Navbar } from './components/Navbar';
import { ProfileCard } from './components/ProfileCard';
import { GalleryCard } from './components/GalleryCard';
import { DetailModal } from './components/DetailModal';
import { CommunityReportModal } from './components/CommunityReportModal';
import { AddCorruptorModal } from './components/AddCorruptorModal';
import { INITIAL_CORRUPTORS, INITIAL_COMMUNITY_UPDATES } from './data/corruptorsData';
import { KoruptorProfile, CommunityUpdate } from './types/corruption';

const LOCAL_STORAGE_REPORTS_KEY = 'koruptor_id_community_reports';
const LOCAL_STORAGE_CORRUPTORS_KEY = 'koruptor_id_corruptors_data';

export default function App() {
  // Selected profile for inline detail view (when clicked from gallery)
  const [selectedProfileForDetail, setSelectedProfileForDetail] = useState<KoruptorProfile | null>(null);
  const [isAddCorruptorModalOpen, setIsAddCorruptorModalOpen] = useState<boolean>(false);

  // Corruptors and Community state
  const [corruptors, setCorruptors] = useState<KoruptorProfile[]>(() => {
    const saved = localStorage.getItem(LOCAL_STORAGE_CORRUPTORS_KEY);
    if (saved) {
      try {
        const parsed: KoruptorProfile[] = JSON.parse(saved);
        return parsed.map((p) => {
          const init = INITIAL_CORRUPTORS.find((c) => c.id === p.id);
          return {
            ...p,
            sentenceDuration: init?.sentenceDuration || p.sentenceDuration || (p.corruptionCases[0]?.sentenceYears ? `${p.corruptionCases[0].sentenceYears} th` : '1 th'),
            achievements: init?.achievements || p.achievements,
            avatarUrl: init?.avatarUrl || p.avatarUrl,
          };
        });
      } catch (e) {
        console.error('Failed to parse corruptors cache', e);
      }
    }
    return INITIAL_CORRUPTORS;
  });

  const [communityUpdates, setCommunityUpdates] = useState<CommunityUpdate[]>(() => {
    const saved = localStorage.getItem(LOCAL_STORAGE_REPORTS_KEY);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Failed to parse community updates cache', e);
      }
    }
    return INITIAL_COMMUNITY_UPDATES;
  });

  // Filters & Search
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedSector, setSelectedSector] = useState<string>('all');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'loss_desc' | 'sentence_desc' | 'community_desc' | 'name_asc'>('loss_desc');

  // Modals state
  const [isReportModalOpen, setIsReportModalOpen] = useState<boolean>(false);
  const [reportTargetId, setReportTargetId] = useState<string | undefined>(undefined);
  const [modalDetailProfile, setModalDetailProfile] = useState<KoruptorProfile | null>(null);

  // Load from Express backend on mount
  useEffect(() => {
    fetch('/api/corruptors')
      .then((res) => res.json())
      .then((json) => {
        if (json.status === 'success' && Array.isArray(json.data) && json.data.length > 0) {
          setCorruptors(json.data);
        }
      })
      .catch((err) => console.log('Menggunakan data lokal', err));

    fetch('/api/community-updates')
      .then((res) => res.json())
      .then((json) => {
        if (json.status === 'success' && Array.isArray(json.data) && json.data.length > 0) {
          setCommunityUpdates(json.data);
        }
      })
      .catch((err) => console.log('Menggunakan data komunitas lokal', err));
  }, []);

  // Sync to local storage
  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_CORRUPTORS_KEY, JSON.stringify(corruptors));
  }, [corruptors]);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_REPORTS_KEY, JSON.stringify(communityUpdates));
  }, [communityUpdates]);

  // Keep selectedProfileForDetail in sync with latest corruptors data
  useEffect(() => {
    if (selectedProfileForDetail) {
      const updated = corruptors.find((c) => c.id === selectedProfileForDetail.id);
      if (updated) setSelectedProfileForDetail(updated);
    }
  }, [corruptors]);

  // Handlers for Community Reports
  const handleOpenReportModal = (corruptorId?: string) => {
    setReportTargetId(corruptorId);
    setIsReportModalOpen(true);
  };

  const handleSubmitReport = (newReportData: Omit<CommunityUpdate, 'id' | 'reportedAt' | 'upvotes' | 'flags' | 'status'>) => {
    const newReport: CommunityUpdate = {
      ...newReportData,
      id: `report-${Date.now()}`,
      reportedAt: 'Hari ini',
      upvotes: 1,
      flags: 0,
      status: 'review',
      userVoted: 'up',
    };

    setCommunityUpdates((prev) => [newReport, ...prev]);

    // Send to Express.js backend
    fetch('/api/community-updates', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newReportData),
    }).catch((err) => console.log('Express API sync error', err));

    // Update corruptor record with new report count
    setCorruptors((prev) =>
      prev.map((c) => {
        if (c.id === newReport.corruptorId) {
          return {
            ...c,
            communityUpdatesCount: c.communityUpdatesCount + 1,
            lastUpdatedDate: 'Hari ini',
          };
        }
        return c;
      })
    );
  };

  const handleAddCorruptor = (newProfile: KoruptorProfile) => {
    // Prepend to corruptors state so it shows immediately at the top of the gallery
    setCorruptors((prev) => [newProfile, ...prev]);

    // Send to Express.js backend
    fetch('/api/corruptors', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newProfile),
    }).catch((err) => console.log('Express corruptor add sync error', err));

    // Reset inline detail to show in gallery
    setSelectedProfileForDetail(null);
  };

  const handleVoteReport = (reportId: string, type: 'up' | 'flag') => {
    setCommunityUpdates((prev) =>
      prev.map((report) => {
        if (report.id === reportId) {
          const currentVoted = report.userVoted;
          if (currentVoted === type) {
            // Undo vote
            return {
              ...report,
              upvotes: type === 'up' ? Math.max(0, report.upvotes - 1) : report.upvotes,
              flags: type === 'flag' ? Math.max(0, report.flags - 1) : report.flags,
              userVoted: undefined,
            };
          } else {
            let newUp = report.upvotes;
            let newFlag = report.flags;
            if (currentVoted === 'up') newUp = Math.max(0, newUp - 1);
            if (currentVoted === 'flag') newFlag = Math.max(0, newFlag - 1);

            if (type === 'up') newUp += 1;
            if (type === 'flag') newFlag += 1;

            return {
              ...report,
              upvotes: newUp,
              flags: newFlag,
              userVoted: type,
            };
          }
        }
        return report;
      })
    );

    // Sync vote to Express.js backend
    fetch(`/api/community-updates/${reportId}/vote`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ type }),
    }).catch((err) => console.log('Express vote sync error', err));
  };

  // Filter & sort logic for Directory
  const filteredCorruptors = corruptors
    .filter((c) => {
      if (selectedSector !== 'all' && c.sector !== selectedSector) return false;
      if (selectedStatus !== 'all' && c.legalStatus !== selectedStatus) return false;
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        return (
          c.name.toLowerCase().includes(q) ||
          (c.alias && c.alias.toLowerCase().includes(q)) ||
          c.pastPosition.toLowerCase().includes(q) ||
          c.currentPosition.toLowerCase().includes(q) ||
          c.sectorLabel.toLowerCase().includes(q) ||
          c.twoKeyPoints.some((pt) => pt.toLowerCase().includes(q)) ||
          c.corruptionCases.some((cs) => cs.name.toLowerCase().includes(q) || cs.summary.toLowerCase().includes(q))
        );
      }
      return true;
    })
    .sort((a, b) => {
      if (sortBy === 'loss_desc') {
        return b.stateLoss.totalAmount - a.stateLoss.totalAmount;
      }
      if (sortBy === 'sentence_desc') {
        const maxA = Math.max(...a.corruptionCases.map((cs) => cs.sentenceYears), 0);
        const maxB = Math.max(...b.corruptionCases.map((cs) => cs.sentenceYears), 0);
        return maxB - maxA;
      }
      if (sortBy === 'community_desc') {
        return b.communityUpdatesCount - a.communityUpdatesCount;
      }
      if (sortBy === 'name_asc') {
        return a.name.localeCompare(b.name);
      }
      return 0;
    });

  // Handler when clicking a corruptor card in Gallery
  const handleSelectCorruptor = (profile: KoruptorProfile) => {
    setSelectedProfileForDetail(profile);
    window.scrollTo({ top: 320, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-stone-100 flex flex-col text-stone-900 selection:bg-amber-200">
      {/* Tidy Navbar */}
      <Navbar
        onResetGallery={() => setSelectedProfileForDetail(null)}
        onOpenReportModal={() => handleOpenReportModal()}
        onOpenAddCorruptorModal={() => setIsAddCorruptorModalOpen(true)}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
        <div className="space-y-5">

            {/* If a profile is selected from the Gallery: Display its Full Detail View */}
            {selectedProfileForDetail ? (
              <div className="space-y-6">
                {/* Back to Gallery Bar */}
                <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-xs">
                  <button
                    onClick={() => setSelectedProfileForDetail(null)}
                    className="flex items-center gap-2 px-3.5 py-1.5 text-xs font-bold text-stone-900 bg-white border border-stone-300 rounded-lg hover:bg-stone-100 transition-colors shadow-2xs group"
                  >
                    <ArrowLeft className="w-4 h-4 text-stone-700 group-hover:-translate-x-0.5 transition-transform" />
                    <span>&larr; Kembali ke Galeri Foto</span>
                  </button>

                  <div className="flex items-center gap-2 text-xs text-stone-600 flex-wrap">
                    <span>Sedang menampilkan profil lengkap: <strong className="text-stone-900">{selectedProfileForDetail.name}</strong></span>
                    <span aria-hidden="true">·</span>
                    <button
                      onClick={() => handleOpenReportModal(selectedProfileForDetail.id)}
                      className="font-semibold text-amber-800 hover:underline"
                    >
                      + Laporkan Posisi Baru
                    </button>
                  </div>
                </div>

                {/* The Full LinkedIn-Style Profile Detail */}
                <div className="max-w-4xl mx-auto">
                  <ProfileCard
                    profile={selectedProfileForDetail}
                    onOpenReportModal={handleOpenReportModal}
                    onOpenDetailModal={(prof) => setModalDetailProfile(prof)}
                    onViewCommunityReports={() => {
                      setModalDetailProfile(selectedProfileForDetail);
                    }}
                  />
                </div>

                {/* Other Profiles Carousel/Quick-Jump */}
                <div className="pt-6 border-t border-stone-200">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-sm font-bold text-stone-900 uppercase tracking-wider">
                      Lihat Figur Koruptor Lainnya di Galeri:
                    </h3>
                    <button
                      onClick={() => setSelectedProfileForDetail(null)}
                      className="text-xs font-semibold text-amber-700 hover:text-amber-900"
                    >
                      Buka Semua Galeri ({corruptors.length}) &rarr;
                    </button>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
                    {corruptors
                      .filter((c) => c.id !== selectedProfileForDetail.id)
                      .slice(0, 6)
                      .map((c) => (
                        <div
                          key={c.id}
                          onClick={() => handleSelectCorruptor(c)}
                          className="bg-white border border-stone-200 rounded-lg p-2.5 text-center cursor-pointer hover:border-amber-400 hover:shadow-xs transition-all space-y-1.5"
                        >
                          <div className="w-12 h-12 rounded-full mx-auto overflow-hidden bg-stone-800 border border-stone-300">
                            {c.avatarUrl ? (
                              <img
                                src={c.avatarUrl}
                                alt={c.name}
                                referrerPolicy="no-referrer"
                                className="w-full h-full object-cover"
                              />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center text-xs font-bold text-stone-300">
                                {c.name.substring(0, 2)}
                              </div>
                            )}
                          </div>
                          <div className="text-xs font-bold text-stone-900 truncate">
                            {c.name}
                          </div>
                          <div className="text-[10px] text-stone-500 truncate">
                            {c.pastPosition}
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              </div>
            ) : (
              /* DEFAULT VIEW: The Photo Gallery Grid */
              <div className="space-y-6">
                {/* Filter and Search Bar */}
                <div className="bg-white border border-stone-200 rounded-xl p-4 shadow-xs space-y-3">
                  <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
                    {/* Search input */}
                    <div className="relative flex-1">
                      <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-3" />
                      <input
                        type="text"
                        placeholder="Cari figur, jabatan, atau perkara (misal: BTS, Sawit, Timah, e-KTP, Bansos)..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 text-xs sm:text-sm bg-stone-50 border border-stone-200 rounded-lg text-stone-900 focus:outline-none focus:ring-2 focus:ring-amber-500"
                      />
                      {searchQuery && (
                        <button
                          onClick={() => setSearchQuery('')}
                          className="absolute right-3 top-2.5 text-xs text-stone-400 hover:text-stone-600"
                        >
                          Reset
                        </button>
                      )}
                    </div>

                    {/* Sort selector */}
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-stone-500 font-medium flex items-center gap-1">
                        <ArrowUpDown className="w-3.5 h-3.5" />
                        Urutkan:
                      </span>
                      <select
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value as any)}
                        className="px-3 py-2 text-xs bg-stone-50 border border-stone-200 rounded-lg text-stone-800 font-medium focus:outline-none focus:ring-1 focus:ring-amber-500"
                      >
                        <option value="loss_desc">Kerugian Negara Terbesar</option>
                        <option value="sentence_desc">Vonis Penjara Terlama</option>
                        <option value="community_desc">Laporan Komunitas Terbanyak</option>
                        <option value="name_asc">Nama Figur (A-Z)</option>
                      </select>
                    </div>
                  </div>

                  {/* Sektor Filter Tabs */}
                  <div className="flex items-center gap-1.5 overflow-x-auto py-1 text-xs border-t border-stone-100 pt-3">
                    <span className="text-stone-400 font-medium mr-1 shrink-0">Sektor:</span>
                    {[
                      { id: 'all', label: 'Semua Sektor' },
                      { id: 'kehutanan_perkebunan', label: 'Sawit & Kehutanan' },
                      { id: 'telekomunikasi_it', label: 'Telekomunikasi & IT' },
                      { id: 'energi_tambang', label: 'Pertambangan & Energi' },
                      { id: 'sosial_kesehatan', label: 'Bansos & Kesehatan' },
                      { id: 'keuangan_pajak', label: 'Pajak & Keuangan' },
                      { id: 'bumn_infrastruktur', label: 'Pengadaan & BUMN' },
                      { id: 'peradilan_hukum', label: 'Sistem Pemilu/Hukum' },
                    ].map((sec) => (
                      <button
                        key={sec.id}
                        onClick={() => setSelectedSector(sec.id)}
                        className={`px-3 py-1.5 rounded-md whitespace-nowrap transition-colors ${
                          selectedSector === sec.id
                            ? 'bg-stone-900 text-white font-semibold'
                            : 'bg-stone-100 hover:bg-stone-200 text-stone-700'
                        }`}
                      >
                        {sec.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Profiles Display based on viewMode */}
                {filteredCorruptors.length === 0 ? (
                  <div className="bg-white p-12 text-center rounded-xl border border-dashed border-stone-300 space-y-3">
                    <AlertCircle className="w-10 h-10 text-stone-400 mx-auto" />
                    <h3 className="text-base font-bold text-stone-800">
                      Tidak Ditemukan Kasus yang Cocok
                    </h3>
                    <p className="text-xs text-stone-500 max-w-md mx-auto">
                      Silakan sesuaikan kata kunci pencarian atau bersihkan filter sektor untuk melihat seluruh arsip perkara koruptor.
                    </p>
                    <button
                      onClick={() => {
                        setSearchQuery('');
                        setSelectedSector('all');
                        setSelectedStatus('all');
                      }}
                      className="px-4 py-2 text-xs font-semibold text-stone-900 bg-stone-100 hover:bg-stone-200 rounded-lg transition-colors"
                    >
                      Reset Semua Filter
                    </button>
                  </div>
                ) : (
                  /* THE REQUESTED PHOTO GALLERY GRID */
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div className="text-xs text-stone-500">
                        Menampilkan <strong>{filteredCorruptors.length}</strong> figur terpidana korupsi. <span className="text-amber-800 font-semibold">Klik salah satu foto untuk melihat detail lengkap.</span>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
                      {filteredCorruptors.map((profile) => (
                        <GalleryCard
                          key={profile.id}
                          profile={profile}
                          onClick={() => handleSelectCorruptor(profile)}
                        />
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
      </main>

      {/* Detail CV & Case Modal (also accessible from anywhere) */}
      <DetailModal
        isOpen={Boolean(modalDetailProfile)}
        onClose={() => setModalDetailProfile(null)}
        profile={modalDetailProfile}
        communityUpdates={communityUpdates}
        onOpenReportModal={handleOpenReportModal}
        onVoteReport={handleVoteReport}
      />

      {/* Community Report Submission Modal */}
      <CommunityReportModal
        isOpen={isReportModalOpen}
        onClose={() => setIsReportModalOpen(false)}
        corruptors={corruptors}
        initialSelectedId={reportTargetId}
        onSubmitReport={handleSubmitReport}
      />

      {/* Add New Corruptor Profile Modal */}
      <AddCorruptorModal
        isOpen={isAddCorruptorModalOpen}
        onClose={() => setIsAddCorruptorModalOpen(false)}
        onAddCorruptor={handleAddCorruptor}
      />

      {/* Anti-Slop Quiet Institutional Footer */}
      <footer className="mt-16 bg-stone-900 text-stone-400 border-t border-stone-800 text-xs py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="space-y-1 text-center sm:text-left">
            <div className="font-serif font-bold text-stone-200 text-sm">
              KoruptorID · Inisiatif Transparansi Publik Indonesia
            </div>
            <p className="text-stone-500 text-[11px]">
              Menghimpun salinan putusan Mahkamah Agung RI, audit investigatif BPKP/BPK, dakwaan KPK & Kejaksaan RI, serta pantauan komunitas masyarakat sipil.
            </p>
          </div>
          <div className="flex items-center gap-4 text-xs text-stone-400">
            <button
              onClick={() => setSelectedProfileForDetail(null)}
              className="hover:text-white transition-colors"
            >
              Galeri Foto
            </button>
            <span aria-hidden="true">·</span>
            <button
              onClick={() => handleOpenReportModal()}
              className="text-amber-400 hover:text-amber-300 font-semibold transition-colors"
            >
              + Kirim Laporan Posisi
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}
