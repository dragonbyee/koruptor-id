import React, { useState, useEffect } from 'react';
import { 
  X, 
  Send, 
  AlertCircle, 
  Link as LinkIcon, 
  Building2, 
  MapPin, 
  Briefcase, 
  UserCheck, 
  ArrowRight, 
  ArrowLeft,
  Check,
  FileText,
  ShieldCheck
} from 'lucide-react';
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
  const [step, setStep] = useState<1 | 2 | 3>(1);
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

  // Step 1 Validation
  const validateStep1 = () => {
    const errs: Record<string, string> = {};
    if (!selectedCorruptorId) errs.corruptorId = 'Pilih figur koruptor';
    if (!newPosition.trim()) errs.newPosition = 'Isi pekerjaan atau posisi saat ini';
    if (!companyOrOrg.trim()) errs.companyOrOrg = 'Isi nama lembaga/perusahaan';
    if (!location.trim()) errs.location = 'Isi lokasi atau kota saat ini';

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  // Step 2 Validation
  const validateStep2 = () => {
    const errs: Record<string, string> = {};
    if (!evidenceUrl.trim()) {
      errs.evidenceUrl = 'Cantumkan tautan bukti berita atau dokumen publik';
    } else if (!evidenceUrl.startsWith('http')) {
      errs.evidenceUrl = 'Tautan harus diawali http:// atau https://';
    }
    if (!evidenceSource.trim()) errs.evidenceSource = 'Sebutkan sumber referensi berita/dokumen';
    if (!notes.trim() || notes.length < 15) errs.notes = 'Berikan keterangan minimal 15 karakter';

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleNextStep = () => {
    if (step === 1) {
      if (validateStep1()) {
        setErrors({});
        setStep(2);
      }
    } else if (step === 2) {
      if (validateStep2()) {
        setErrors({});
        setStep(3);
      }
    }
  };

  const handlePrevStep = () => {
    setErrors({});
    if (step > 1) {
      setStep((prev) => (prev - 1) as 1 | 2 | 3);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateStep1() || !validateStep2()) return;

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
      setStep(1);
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

  const stepsConfig = [
    { number: 1, title: 'Figur & Posisi' },
    { number: 2, title: 'Tautan & Bukti' },
    { number: 3, title: 'Konfirmasi' },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-stone-950/70 backdrop-blur-xs overflow-y-auto">
      <div className="bg-white rounded-xl shadow-2xl border border-stone-200 max-w-lg w-full overflow-hidden my-auto animate-in fade-in-50 zoom-in-95 duration-150">
        {/* Header */}
        <div className="px-5 py-3.5 bg-stone-900 text-stone-100 flex items-center justify-between">
          <div>
            <h2 className="text-base sm:text-lg font-serif font-bold text-white tracking-tight">
              Kirim Update Posisi Koruptor
            </h2>
            <p className="text-[11px] text-stone-400">
              Pelaporan posisi pekerjaan terkini berbasis komunitas
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1 text-stone-400 hover:text-white rounded-md transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Horizontal Steps Bar */}
        {!isSuccess && (
          <div className="bg-stone-50 border-b border-stone-200 px-5 py-3">
            <div className="flex items-center justify-between relative">
              {/* Connecting Line */}
              <div className="absolute left-6 right-6 top-3.5 h-0.5 bg-stone-200 -z-0" />
              <div 
                className="absolute left-6 top-3.5 h-0.5 bg-amber-500 transition-all duration-300 -z-0" 
                style={{ width: step === 1 ? '0%' : step === 2 ? '50%' : '100%' }}
              />

              {stepsConfig.map((s) => {
                const isCompleted = step > s.number;
                const isActive = step === s.number;

                return (
                  <div key={s.number} className="flex flex-col items-center relative z-10">
                    <div
                      className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                        isCompleted
                          ? 'bg-amber-500 text-stone-950 shadow-xs'
                          : isActive
                          ? 'bg-stone-900 text-white ring-3 ring-amber-200 shadow-xs'
                          : 'bg-white border-2 border-stone-300 text-stone-500'
                      }`}
                    >
                      {isCompleted ? <Check className="w-4 h-4 stroke-[3]" /> : s.number}
                    </div>
                    <span
                      className={`text-[11px] mt-1 whitespace-nowrap font-medium ${
                        isActive ? 'text-stone-900 font-bold' : isCompleted ? 'text-amber-800' : 'text-stone-400'
                      }`}
                    >
                      {s.title}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Success Screen */}
        {isSuccess ? (
          <div className="p-8 text-center space-y-3">
            <div className="w-12 h-12 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center mx-auto">
              <UserCheck className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-stone-900">
              Laporan Berhasil Terkirim ke Server!
            </h3>
            <p className="text-xs text-stone-600 max-w-sm mx-auto">
              Terima kasih. Laporan posisi terkini telah diterima dan segera diverifikasi silang bersama komunitas.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <div className="p-5 space-y-3.5 min-h-[260px]">
              {/* STAGE 1: Figur & Posisi Baru */}
              {step === 1 && (
                <div className="space-y-3 animate-in fade-in-50 duration-150">
                  {/* Corruptor Selector */}
                  <div>
                    <label className="block text-xs font-semibold text-stone-800 uppercase tracking-wider mb-1">
                      Pilih Figur Terpidana
                    </label>
                    <select
                      value={selectedCorruptorId}
                      onChange={(e) => setSelectedCorruptorId(e.target.value)}
                      className="w-full px-3 py-2 text-xs sm:text-sm bg-stone-50 border border-stone-300 rounded-lg text-stone-900 focus:outline-none focus:ring-1 focus:ring-amber-500 font-medium"
                    >
                      {corruptors.map((c) => (
                        <option key={c.id} value={c.id}>
                          {c.name} — {c.pastPosition}
                        </option>
                      ))}
                    </select>
                    {selectedCorruptor && (
                      <div className="mt-1 text-[11px] text-stone-500">
                        Status hukum: <strong>{selectedCorruptor.sentenceDuration || selectedCorruptor.legalStatusLabel}</strong> · Sektor: {selectedCorruptor.sectorLabel}
                      </div>
                    )}
                  </div>

                  {/* Pekerjaan / Posisi Terkini */}
                  <div>
                    <label className="block text-xs font-semibold text-stone-800 uppercase tracking-wider mb-1 flex items-center gap-1">
                      <Briefcase className="w-3.5 h-3.5 text-stone-500" />
                      <span>Pekerjaan / Jabatan Terkini</span>
                    </label>
                    <input
                      type="text"
                      placeholder="Contoh: Komisaris Independen / Penasihat Bisnis / Pengusaha"
                      value={newPosition}
                      onChange={(e) => setNewPosition(e.target.value)}
                      className={`w-full px-3 py-2 text-xs sm:text-sm bg-stone-50 border rounded-lg focus:outline-none focus:ring-1 focus:ring-amber-500 ${
                        errors.newPosition ? 'border-rose-500' : 'border-stone-300 text-stone-900'
                      }`}
                    />
                    {errors.newPosition && (
                      <p className="mt-0.5 text-[11px] text-rose-600">{errors.newPosition}</p>
                    )}
                  </div>

                  {/* Company & City in 2 Cols */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-stone-800 uppercase tracking-wider mb-1 flex items-center gap-1">
                        <Building2 className="w-3.5 h-3.5 text-stone-500" />
                        <span>Nama Perusahaan / Entitas</span>
                      </label>
                      <input
                        type="text"
                        placeholder="Contoh: PT Holding Sawit Riau"
                        value={companyOrOrg}
                        onChange={(e) => setCompanyOrOrg(e.target.value)}
                        className={`w-full px-3 py-2 text-xs sm:text-sm bg-stone-50 border rounded-lg focus:outline-none focus:ring-1 focus:ring-amber-500 ${
                          errors.companyOrOrg ? 'border-rose-500' : 'border-stone-300 text-stone-900'
                        }`}
                      />
                      {errors.companyOrOrg && (
                        <p className="mt-0.5 text-[11px] text-rose-600">{errors.companyOrOrg}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-stone-800 uppercase tracking-wider mb-1 flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5 text-stone-500" />
                        <span>Kota / Lokasi</span>
                      </label>
                      <input
                        type="text"
                        placeholder="Contoh: Jakarta / Bandung / NTT"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        className={`w-full px-3 py-2 text-xs sm:text-sm bg-stone-50 border rounded-lg focus:outline-none focus:ring-1 focus:ring-amber-500 ${
                          errors.location ? 'border-rose-500' : 'border-stone-300 text-stone-900'
                        }`}
                      />
                      {errors.location && (
                        <p className="mt-0.5 text-[11px] text-rose-600">{errors.location}</p>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* STAGE 2: Tautan Bukti & Catatan */}
              {step === 2 && (
                <div className="space-y-3 animate-in fade-in-50 duration-150">
                  {/* Evidence URL */}
                  <div>
                    <label className="block text-xs font-semibold text-stone-800 uppercase tracking-wider mb-1 flex items-center gap-1">
                      <LinkIcon className="w-3.5 h-3.5 text-stone-500" />
                      <span>Tautan Bukti Berita / Dokumen Publik</span>
                    </label>
                    <input
                      type="url"
                      placeholder="https://media.com/berita-atau-putusan"
                      value={evidenceUrl}
                      onChange={(e) => setEvidenceUrl(e.target.value)}
                      className={`w-full px-3 py-2 text-xs sm:text-sm bg-stone-50 border rounded-lg focus:outline-none focus:ring-1 focus:ring-amber-500 ${
                        errors.evidenceUrl ? 'border-rose-500' : 'border-stone-300 text-stone-900'
                      }`}
                    />
                    {errors.evidenceUrl && (
                      <p className="mt-0.5 text-[11px] text-rose-600">{errors.evidenceUrl}</p>
                    )}
                  </div>

                  {/* Sumber Nama */}
                  <div>
                    <label className="block text-xs font-semibold text-stone-800 uppercase tracking-wider mb-1">
                      Nama Sumber Referensi
                    </label>
                    <input
                      type="text"
                      placeholder="Contoh: Liputan Investigasi Tempo / SIPP Pengadilan / Laporan Warga"
                      value={evidenceSource}
                      onChange={(e) => setEvidenceSource(e.target.value)}
                      className={`w-full px-3 py-2 text-xs sm:text-sm bg-stone-50 border rounded-lg focus:outline-none focus:ring-1 focus:ring-amber-500 ${
                        errors.evidenceSource ? 'border-rose-500' : 'border-stone-300 text-stone-900'
                      }`}
                    />
                    {errors.evidenceSource && (
                      <p className="mt-0.5 text-[11px] text-rose-600">{errors.evidenceSource}</p>
                    )}
                  </div>

                  {/* Catatan / Keterangan Temuan */}
                  <div>
                    <label className="block text-xs font-semibold text-stone-800 uppercase tracking-wider mb-1">
                      Keterangan Temuan Lapangan
                    </label>
                    <textarea
                      rows={3}
                      placeholder="Uraikan bagaimana informasi ini diperoleh dan fakta yang mendukung..."
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      className={`w-full px-3 py-2 text-xs sm:text-sm bg-stone-50 border rounded-lg focus:outline-none focus:ring-1 focus:ring-amber-500 ${
                        errors.notes ? 'border-rose-500' : 'border-stone-300 text-stone-900'
                      }`}
                    />
                    {errors.notes && <p className="mt-0.5 text-[11px] text-rose-600">{errors.notes}</p>}
                  </div>
                </div>
              )}

              {/* STAGE 3: Konfirmasi Ringkasan & Kirim */}
              {step === 3 && (
                <div className="space-y-3 animate-in fade-in-50 duration-150">
                  {/* Summary Card */}
                  <div className="p-3 bg-stone-50 border border-stone-200 rounded-lg text-xs space-y-1.5">
                    <div className="text-[11px] font-bold uppercase tracking-wider text-amber-800">
                      Ringkasan Laporan:
                    </div>
                    <div>
                      <span className="text-stone-500">Figur: </span>
                      <strong className="text-stone-900">{selectedCorruptor?.name}</strong>
                    </div>
                    <div>
                      <span className="text-stone-500">Posisi Baru: </span>
                      <strong className="text-stone-900">{newPosition}</strong> ({companyOrOrg} · {location})
                    </div>
                    <div className="truncate">
                      <span className="text-stone-500">Rujukan: </span>
                      <span className="text-stone-800 font-mono">{evidenceSource} ({evidenceUrl})</span>
                    </div>
                  </div>

                  {/* Reporter Alias */}
                  <div>
                    <label className="block text-xs font-semibold text-stone-800 uppercase tracking-wider mb-1">
                      Inisial / Nama Pelapor (Opsional)
                    </label>
                    <input
                      type="text"
                      placeholder="Inisial pelapor (default: WargaPeduliIntegritas)"
                      value={reportedBy}
                      onChange={(e) => setReportedBy(e.target.value)}
                      className="w-full px-3 py-2 text-xs bg-stone-50 border border-stone-300 rounded-lg text-stone-900 focus:outline-none focus:ring-1 focus:ring-amber-500"
                    />
                  </div>

                  {/* Disclaimer Note */}
                  <div className="p-2.5 bg-amber-50 border border-amber-200 rounded-lg flex items-start gap-2 text-xs text-amber-900">
                    <ShieldCheck className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
                    <span className="text-[11px] leading-relaxed">
                      Laporan akan dipublikasikan ke linimasa komunitas untuk ditinjau dan divalidasi silang oleh warga.
                    </span>
                  </div>
                </div>
              )}
            </div>

            {/* Horizontal Navigation Buttons Footer */}
            <div className="px-5 py-3 bg-stone-50 border-t border-stone-200 flex items-center justify-between">
              {step === 1 ? (
                <button
                  type="button"
                  onClick={onClose}
                  className="px-3.5 py-1.5 text-xs font-medium text-stone-600 hover:text-stone-900 transition-colors"
                >
                  Batal
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handlePrevStep}
                  className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-stone-700 hover:text-stone-950 transition-colors"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Kembali</span>
                </button>
              )}

              {step < 3 ? (
                <button
                  type="button"
                  onClick={handleNextStep}
                  className="flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-stone-950 bg-amber-400 hover:bg-amber-300 rounded-lg transition-colors shadow-xs"
                >
                  <span>Lanjut</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              ) : (
                <button
                  type="submit"
                  className="flex items-center gap-1.5 px-4 py-2 text-xs font-bold text-stone-950 bg-amber-400 hover:bg-amber-300 rounded-lg transition-colors shadow-xs"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Kirim Laporan Komunitas</span>
                </button>
              )}
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
