import React, { useState, useEffect } from 'react';
import { X, Send, AlertCircle, Link as LinkIcon, Building2, MapPin, Briefcase, UserCheck } from 'lucide-react';
import { KoruptorProfile, CommunityUpdate } from '../types/corruption';

interface CommunityReportModalProps {
  isOpen: boolean;
  onClose: () => void;
  corruptors: KoruptorProfile[];
  initialSelectedId?: string;
  onSubmitReport: (newReport: Omit<CommunityUpdate, 'id' | 'reportedAt' | 'upvotes' | 'flags' | 'status'>) => void;
}

export const CommunityReportModal: React.FC<CommunityReportModalProps> = ({
  isOpen,
  onClose,
  corruptors,
  initialSelectedId,
  onSubmitReport,
}) => {
  const [selectedCorruptorId, setSelectedCorruptorId] = useState<string>('');
  const [newPosition, setNewPosition] = useState<string>('');
  const [companyOrOrg, setCompanyOrOrg] = useState<string>('');
  const [location, setLocation] = useState<string>('');
  const [evidenceUrl, setEvidenceUrl] = useState<string>('');
  const [evidenceSource, setEvidenceSource] = useState<string>('');
  const [notes, setNotes] = useState<string>('');
  const [reportedBy, setReportedBy] = useState<string>('');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSuccess, setIsSuccess] = useState<boolean>(false);

  useEffect(() => {
    if (initialSelectedId) {
      setSelectedCorruptorId(initialSelectedId);
    } else if (corruptors.length > 0 && !selectedCorruptorId) {
      setSelectedCorruptorId(corruptors[0].id);
    }
  }, [initialSelectedId, corruptors]);

  if (!isOpen) return null;

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!selectedCorruptorId) newErrors.corruptorId = 'Pilih figur koruptor';
    if (!newPosition.trim()) newErrors.newPosition = 'Isi pekerjaan atau posisi saat ini';
    if (!companyOrOrg.trim()) newErrors.companyOrOrg = 'Isi nama lembaga/perusahaan terkait';
    if (!location.trim()) newErrors.location = 'Isi lokasi atau kota saat ini';
    if (!evidenceUrl.trim()) {
      newErrors.evidenceUrl = 'Cantumkan tautan bukti berita atau rujukan publik';
    } else if (!evidenceUrl.startsWith('http')) {
      newErrors.evidenceUrl = 'Tautan harus diawali dengan http:// atau https://';
    }
    if (!evidenceSource.trim()) newErrors.evidenceSource = 'Sebutkan sumber referensi (contoh: Media Investigasi / Dokumen SIPP)';
    if (!notes.trim() || notes.length < 15) newErrors.notes = 'Berikan keterangan minimal 15 karakter';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    const chosen = corruptors.find((c) => c.id === selectedCorruptorId);
    onSubmitReport({
      corruptorId: selectedCorruptorId,
      corruptorName: chosen ? chosen.name : 'Figur Terkait',
      newPosition: newPosition.trim(),
      companyOrOrg: companyOrOrg.trim(),
      location: location.trim(),
      evidenceUrl: evidenceUrl.trim(),
      evidenceSource: evidenceSource.trim(),
      notes: notes.trim(),
      reportedBy: reportedBy.trim() || 'WargaPeduliIntegritas',
    });

    setIsSuccess(true);
    setTimeout(() => {
      setIsSuccess(false);
      onClose();
      // Reset form
      setNewPosition('');
      setCompanyOrOrg('');
      setLocation('');
      setEvidenceUrl('');
      setEvidenceSource('');
      setNotes('');
      setReportedBy('');
      setErrors({});
    }, 1200);
  };

  const selectedCorruptor = corruptors.find((c) => c.id === selectedCorruptorId);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/70 backdrop-blur-xs overflow-y-auto">
      <div className="bg-white rounded-xl shadow-2xl border border-stone-200 max-w-xl w-full overflow-hidden my-8">
        {/* Header */}
        <div className="px-6 py-4 bg-stone-900 text-stone-100 flex items-center justify-between">
          <div>
            <h2 className="text-lg font-serif font-bold text-white tracking-tight">
              Kirim Update Posisi Koruptor
            </h2>
            <p className="text-xs text-stone-400 mt-0.5">
              Partisipasi publik untuk transparansi posisi & rekam jejak pasca-vonis
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-stone-400 hover:text-white rounded-md transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {isSuccess ? (
          <div className="p-8 text-center space-y-3">
            <div className="w-12 h-12 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center mx-auto">
              <UserCheck className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-stone-900">
              Laporan Berhasil Dikirim ke Komunitas!
            </h3>
            <p className="text-xs text-stone-600 max-w-sm mx-auto">
              Terima kasih atas kontribusi Anda. Laporan akan ditinjau dan divalidasi oleh komunitas sebelum disematkan permanen di kartu profil utama.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            {/* Target Corruptor Selector */}
            <div>
              <label className="block text-xs font-semibold text-stone-800 uppercase tracking-wider mb-1.5">
                Pilih Figur Terpidana / Mantan Pejabat
              </label>
              <select
                value={selectedCorruptorId}
                onChange={(e) => setSelectedCorruptorId(e.target.value)}
                className="w-full px-3 py-2 text-sm bg-stone-50 border border-stone-300 rounded-lg text-stone-900 focus:outline-none focus:ring-2 focus:ring-amber-500"
              >
                {corruptors.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name} ({c.pastPosition})
                  </option>
                ))}
              </select>
              {selectedCorruptor && (
                <div className="mt-1.5 text-[11px] text-stone-500 flex items-center gap-2">
                  <span>Status hukum saat ini: <strong>{selectedCorruptor.legalStatusLabel}</strong></span>
                  <span aria-hidden="true">·</span>
                  <span>Lokasi tercatat: {selectedCorruptor.location}</span>
                </div>
              )}
            </div>

            {/* Current Position Title */}
            <div>
              <label className="block text-xs font-semibold text-stone-800 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                <Briefcase className="w-3.5 h-3.5 text-stone-500" />
                <span>Pekerjaan / Posisi Terkini yang Dilaporkan</span>
              </label>
              <input
                type="text"
                placeholder="Contoh: Komisaris Independen / Penasihat Bisnis / Pengusaha Tambang"
                value={newPosition}
                onChange={(e) => setNewPosition(e.target.value)}
                className={`w-full px-3 py-2 text-sm bg-stone-50 border rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 ${
                  errors.newPosition ? 'border-rose-500' : 'border-stone-300 text-stone-900'
                }`}
              />
              {errors.newPosition && (
                <p className="mt-1 text-xs text-rose-600">{errors.newPosition}</p>
              )}
            </div>

            {/* Company & Location in 2 cols */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-stone-800 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                  <Building2 className="w-3.5 h-3.5 text-stone-500" />
                  <span>Perusahaan / Lembaga</span>
                </label>
                <input
                  type="text"
                  placeholder="Contoh: PT Sumber Daya Alam Nusantara"
                  value={companyOrOrg}
                  onChange={(e) => setCompanyOrOrg(e.target.value)}
                  className={`w-full px-3 py-2 text-sm bg-stone-50 border rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 ${
                    errors.companyOrOrg ? 'border-rose-500' : 'border-stone-300 text-stone-900'
                  }`}
                />
                {errors.companyOrOrg && (
                  <p className="mt-1 text-xs text-rose-600">{errors.companyOrOrg}</p>
                )}
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-800 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-stone-500" />
                  <span>Lokasi / Kota Saat Ini</span>
                </label>
                <input
                  type="text"
                  placeholder="Contoh: Jakarta Selatan / Bandung / Luar Negeri"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className={`w-full px-3 py-2 text-sm bg-stone-50 border rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 ${
                    errors.location ? 'border-rose-500' : 'border-stone-300 text-stone-900'
                  }`}
                />
                {errors.location && (
                  <p className="mt-1 text-xs text-rose-600">{errors.location}</p>
                )}
              </div>
            </div>

            {/* Evidence Link & Source Name in 2 cols */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-stone-800 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                  <LinkIcon className="w-3.5 h-3.5 text-stone-500" />
                  <span>Tautan Bukti / Rujukan</span>
                </label>
                <input
                  type="url"
                  placeholder="https://media.com/berita-atau-putusan"
                  value={evidenceUrl}
                  onChange={(e) => setEvidenceUrl(e.target.value)}
                  className={`w-full px-3 py-2 text-sm bg-stone-50 border rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 ${
                    errors.evidenceUrl ? 'border-rose-500' : 'border-stone-300 text-stone-900'
                  }`}
                />
                {errors.evidenceUrl && (
                  <p className="mt-1 text-xs text-rose-600">{errors.evidenceUrl}</p>
                )}
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-800 uppercase tracking-wider mb-1.5">
                  Nama Sumber Bukti
                </label>
                <input
                  type="text"
                  placeholder="Contoh: Liputan Tempo / SIPP Pengadilan"
                  value={evidenceSource}
                  onChange={(e) => setEvidenceSource(e.target.value)}
                  className={`w-full px-3 py-2 text-sm bg-stone-50 border rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 ${
                    errors.evidenceSource ? 'border-rose-500' : 'border-stone-300 text-stone-900'
                  }`}
                />
                {errors.evidenceSource && (
                  <p className="mt-1 text-xs text-rose-600">{errors.evidenceSource}</p>
                )}
              </div>
            </div>

            {/* Notes / Description */}
            <div>
              <label className="block text-xs font-semibold text-stone-800 uppercase tracking-wider mb-1.5">
                Keterangan & Catatan Temuan Lapangan
              </label>
              <textarea
                rows={3}
                placeholder="Jelaskan bagaimana posisi ini diperoleh, apakah resmi terdaftar di Ditjen AHU Kemenkumham, atau pantauan publik di media..."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className={`w-full px-3 py-2 text-sm bg-stone-50 border rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 ${
                  errors.notes ? 'border-rose-500' : 'border-stone-300 text-stone-900'
                }`}
              />
              {errors.notes && <p className="mt-1 text-xs text-rose-600">{errors.notes}</p>}
            </div>

            {/* Reporter Alias */}
            <div>
              <label className="block text-xs font-semibold text-stone-800 uppercase tracking-wider mb-1.5">
                Nama / Inisial Pelapor (Opsional)
              </label>
              <input
                type="text"
                placeholder="Inisial atau nama samaran publik (default: WargaPeduliIntegritas)"
                value={reportedBy}
                onChange={(e) => setReportedBy(e.target.value)}
                className="w-full px-3 py-2 text-sm bg-stone-50 border border-stone-300 rounded-lg text-stone-900 focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
            </div>

            {/* Disclaimer box */}
            <div className="p-3 bg-amber-50 border border-amber-200 rounded-lg flex items-start gap-2 text-xs text-amber-900">
              <AlertCircle className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
              <span>
                Prinsip Komunitas: Seluruh pelaporan berbasis fakta dan keterbukaan informasi publik. Dilarang memuat ujaran kebencian tanpa disertai tautan rujukan resmi yang dapat diverifikasi.
              </span>
            </div>

            {/* Modal Actions */}
            <div className="flex items-center justify-end gap-3 pt-3 border-t border-stone-200">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-xs font-medium text-stone-700 hover:text-stone-900 transition-colors"
              >
                Batal
              </button>
              <button
                type="submit"
                className="flex items-center gap-2 px-4 py-2 text-xs font-semibold text-stone-950 bg-amber-400 hover:bg-amber-300 rounded-lg transition-colors shadow-xs"
              >
                <Send className="w-3.5 h-3.5 text-stone-950" />
                <span>Kirim Laporan Komunitas</span>
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
