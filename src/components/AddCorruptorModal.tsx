import React, { useState } from 'react';
import { 
  X, 
  UserPlus, 
  Building2, 
  Coins, 
  Scale, 
  MapPin, 
  Briefcase, 
  Image as ImageIcon, 
  ArrowRight, 
  ArrowLeft,
  Check,
  CheckCircle2,
  Trophy
} from 'lucide-react';
import { KoruptorProfile, Sector } from '../types/corruption';
import { formatRupiah } from '../utils/formatters';

interface AddCorruptorModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddCorruptor: (profile: KoruptorProfile) => void;
}

export const AddCorruptorModal: React.FC<AddCorruptorModalProps> = ({
  isOpen,
  onClose,
  onAddCorruptor,
}) => {
  const [step, setStep] = useState<1 | 2>(1);

  // Form State - Step 1
  const [name, setName] = useState('');
  const [alias, setAlias] = useState('');
  const [avatarUrl, setAvatarUrl] = useState('');
  const [sector, setSector] = useState<Sector>('bumn_infrastruktur');
  const [pastPosition, setPastPosition] = useState('');
  const [currentPosition, setCurrentPosition] = useState('');
  const [location, setLocation] = useState('');
  const [sentenceDuration, setSentenceDuration] = useState('10 th');

  // Form State - Step 2
  const [stateLossAmount, setStateLossAmount] = useState<number>(50000000000); // 50 Miliar default
  const [keyPoint1, setKeyPoint1] = useState('');
  const [keyPoint2, setKeyPoint2] = useState('');
  const [caseName, setCaseName] = useState('');
  const [courtDocket, setCourtDocket] = useState('');
  const [achievementTitle, setAchievementTitle] = useState('');
  const [achievementMetric, setAchievementMetric] = useState('');

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSuccess, setIsSuccess] = useState<boolean>(false);

  if (!isOpen) return null;

  const sectorLabels: Record<Sector, string> = {
    kehutanan_perkebunan: 'Sawit & Kehutanan',
    telekomunikasi_it: 'Telekomunikasi & IT',
    energi_tambang: 'Pertambangan & Energi',
    sosial_kesehatan: 'Bansos & Kesehatan',
    keuangan_pajak: 'Pajak & Keuangan',
    bumn_infrastruktur: 'Pengadaan & BUMN',
    peradilan_hukum: 'Sistem Pemilu/Hukum',
  };

  const validateStep1 = () => {
    const errs: Record<string, string> = {};
    if (!name.trim()) errs.name = 'Nama lengkap figur wajib diisi';
    if (!pastPosition.trim()) errs.pastPosition = 'Jabatan saat perkara wajib diisi';
    if (!currentPosition.trim()) errs.currentPosition = 'Posisi / status saat ini wajib diisi';
    if (!sentenceDuration.trim()) errs.sentenceDuration = 'Vonis waktu wajib diisi (contoh: 12 th)';

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const validateStep2 = () => {
    const errs: Record<string, string> = {};
    if (!keyPoint1.trim()) errs.keyPoint1 = 'Poin penting ke-1 (modus) wajib diisi';
    if (!keyPoint2.trim()) errs.keyPoint2 = 'Poin penting ke-2 (vonis/putusan) wajib diisi';
    if (stateLossAmount <= 0) errs.stateLossAmount = 'Nominal kerugian harus lebih dari 0';

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleNext = () => {
    if (step === 1) {
      if (validateStep1()) {
        setErrors({});
        setStep(2);
      }
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateStep1() || !validateStep2()) return;

    const formattedLoss = formatRupiah(stateLossAmount);

    const newProfile: KoruptorProfile = {
      id: `koruptor-${Date.now()}`,
      name: name.trim(),
      alias: alias.trim() || undefined,
      avatarUrl: avatarUrl.trim(),
      bannerUrl: '/src/assets/images/banner_justice_hall_1793617500881.jpg',
      pastPosition: pastPosition.trim(),
      currentPosition: currentPosition.trim(),
      currentPositionStatus: 'resmi',
      currentOrganization: location.trim() || 'Lapas Sukamiskin / Lembaga Terkait',
      legalStatus: 'menjalani_hukuman',
      legalStatusLabel: `Vonis ${sentenceDuration.trim()}`,
      sentenceDuration: sentenceDuration.trim(),
      location: location.trim() || 'Jakarta / Lapas',
      sector,
      sectorLabel: sectorLabels[sector],
      twoKeyPoints: [
        keyPoint1.trim(),
        keyPoint2.trim(),
      ],
      achievements: [
        {
          title: achievementTitle.trim() || 'Skandal Kerugian Keuangan Negara',
          issuerOrYear: 'Pengadilan Tipikor & Audit BPKP',
          metricHighlight: achievementMetric.trim() || formattedLoss,
          description: `Tuntutan dan vonis atas kerugian negara serta penyalahgunaan wewenang di sektor ${sectorLabels[sector]}.`,
          iconType: 'trophy',
        },
      ],
      corruptionCases: [
        {
          name: caseName.trim() || `Tindak Pidana Korupsi di Sektor ${sectorLabels[sector]}`,
          year: new Date().getFullYear(),
          courtDocketNumber: courtDocket.trim() || 'Putusan Pengadilan Tipikor',
          summary: keyPoint1.trim(),
          lawsBreached: ['Pasal 2 ayat (1) jo Pasal 18 UU Tipikor', 'Pasal 55 ayat (1) ke-1 KUHP'],
          sentenceYears: parseInt(sentenceDuration) || 10,
          fineAmount: 1000000000,
          restitutionAmount: stateLossAmount,
        },
      ],
      stateLoss: {
        totalAmount: stateLossAmount,
        totalFormatted: formattedLoss,
        breakdown: [
          { label: 'Kerugian Keuangan Negara Riil BPKP', amount: stateLossAmount },
        ],
        assetRecovered: 0,
        recoveryRatePercent: 0,
      },
      careerHistory: [
        {
          role: pastPosition.trim(),
          organization: sectorLabels[sector],
          period: 'Masa Perkara',
          isCorruptionPeriod: true,
        },
        {
          role: currentPosition.trim(),
          organization: location.trim() || 'Saat Ini',
          period: 'Sekarang',
        },
      ],
      communityUpdatesCount: 0,
      lastUpdatedDate: 'Hari ini',
      verifiedSourceUrl: 'https://putusan3.mahkamahagung.go.id',
    };

    onAddCorruptor(newProfile);
    setIsSuccess(true);
    setTimeout(() => {
      setIsSuccess(false);
      setStep(1);
      onClose();
      // Reset form
      setName('');
      setAlias('');
      setAvatarUrl('');
      setPastPosition('');
      setCurrentPosition('');
      setLocation('');
      setKeyPoint1('');
      setKeyPoint2('');
      setCaseName('');
      setCourtDocket('');
      setAchievementTitle('');
      setAchievementMetric('');
      setErrors({});
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-stone-950/70 backdrop-blur-xs overflow-y-auto">
      <div className="bg-white rounded-xl shadow-2xl border border-stone-200 max-w-lg w-full overflow-hidden my-auto animate-in fade-in-50 zoom-in-95 duration-150">
        {/* Header */}
        <div className="px-5 py-3.5 bg-stone-900 text-stone-100 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-md bg-amber-500 text-stone-950 flex items-center justify-center font-bold">
              <UserPlus className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-serif font-bold text-white tracking-tight">
                Tambah Profil Koruptor Baru
              </h2>
              <p className="text-[11px] text-stone-400">
                Pencatatan data figur, kerugian negara & rekam jejak vonis
              </p>
            </div>
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
          <div className="bg-stone-50 border-b border-stone-200 px-6 py-2.5">
            <div className="flex items-center justify-between relative">
              <div className="absolute left-8 right-8 top-3.5 h-0.5 bg-stone-200 -z-0" />
              <div 
                className="absolute left-8 top-3.5 h-0.5 bg-amber-500 transition-all duration-300 -z-0" 
                style={{ width: step === 1 ? '0%' : '100%' }}
              />

              <div className="flex flex-col items-center relative z-10">
                <div
                  className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                    step > 1
                      ? 'bg-amber-500 text-stone-950 shadow-xs'
                      : 'bg-stone-900 text-white ring-3 ring-amber-200 shadow-xs'
                  }`}
                >
                  {step > 1 ? <Check className="w-4 h-4 stroke-[3]" /> : '1'}
                </div>
                <span className={`text-[11px] mt-1 font-medium ${step === 1 ? 'text-stone-900 font-bold' : 'text-amber-800'}`}>
                  Identitas & Posisi
                </span>
              </div>

              <div className="flex flex-col items-center relative z-10">
                <div
                  className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                    step === 2
                      ? 'bg-stone-900 text-white ring-3 ring-amber-200 shadow-xs'
                      : 'bg-white border-2 border-stone-300 text-stone-500'
                  }`}
                >
                  2
                </div>
                <span className={`text-[11px] mt-1 font-medium ${step === 2 ? 'text-stone-900 font-bold' : 'text-stone-400'}`}>
                  Kerugian & Kasus
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Success Screen */}
        {isSuccess ? (
          <div className="p-8 text-center space-y-3">
            <div className="w-12 h-12 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-stone-900">
              Profil Koruptor Berhasil Ditambahkan!
            </h3>
            <p className="text-xs text-stone-600 max-w-sm mx-auto">
              Figur baru telah tersimpan di galeri dan siap dipantau bersama oleh publik.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <div className="p-5 space-y-3 min-h-[290px]">
              {/* STEP 1: Identitas & Posisi */}
              {step === 1 && (
                <div className="space-y-3 animate-in fade-in-50 duration-150">
                  {/* Nama & Alias */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                    <div className="sm:col-span-2">
                      <label className="block text-xs font-semibold text-stone-800 uppercase tracking-wider mb-1">
                        Nama Lengkap Figur *
                      </label>
                      <input
                        type="text"
                        placeholder="Contoh: Surya Darmadi"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className={`w-full px-3 py-1.5 text-xs sm:text-sm bg-stone-50 border rounded-lg focus:outline-none focus:ring-1 focus:ring-amber-500 ${
                          errors.name ? 'border-rose-500' : 'border-stone-300 text-stone-900'
                        }`}
                      />
                      {errors.name && <p className="mt-0.5 text-[11px] text-rose-600">{errors.name}</p>}
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-stone-800 uppercase tracking-wider mb-1">
                        Alias / Julukan
                      </label>
                      <input
                        type="text"
                        placeholder="Contoh: Apeng"
                        value={alias}
                        onChange={(e) => setAlias(e.target.value)}
                        className="w-full px-3 py-1.5 text-xs sm:text-sm bg-stone-50 border border-stone-300 rounded-lg text-stone-900 focus:outline-none focus:ring-1 focus:ring-amber-500"
                      />
                    </div>
                  </div>

                  {/* Sektor & Vonis Durasi */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    <div>
                      <label className="block text-xs font-semibold text-stone-800 uppercase tracking-wider mb-1">
                        Sektor Terkait *
                      </label>
                      <select
                        value={sector}
                        onChange={(e) => setSector(e.target.value as Sector)}
                        className="w-full px-3 py-1.5 text-xs sm:text-sm bg-stone-50 border border-stone-300 rounded-lg text-stone-900 focus:outline-none focus:ring-1 focus:ring-amber-500"
                      >
                        {Object.entries(sectorLabels).map(([secKey, secLabel]) => (
                          <option key={secKey} value={secKey}>
                            {secLabel}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-stone-800 uppercase tracking-wider mb-1">
                        Vonis Waktu * (misal: 15 th)
                      </label>
                      <input
                        type="text"
                        placeholder="Contoh: 15 th / 12 th / Buron 3 th"
                        value={sentenceDuration}
                        onChange={(e) => setSentenceDuration(e.target.value)}
                        className={`w-full px-3 py-1.5 text-xs sm:text-sm bg-stone-50 border rounded-lg font-mono focus:outline-none focus:ring-1 focus:ring-amber-500 ${
                          errors.sentenceDuration ? 'border-rose-500' : 'border-stone-300 text-stone-900'
                        }`}
                      />
                      {errors.sentenceDuration && <p className="mt-0.5 text-[11px] text-rose-600">{errors.sentenceDuration}</p>}
                    </div>
                  </div>

                  {/* Jabatan Kasus & Posisi Saat Ini */}
                  <div>
                    <label className="block text-xs font-semibold text-stone-800 uppercase tracking-wider mb-1 flex items-center gap-1">
                      <Briefcase className="w-3.5 h-3.5 text-stone-500" />
                      <span>Jabatan Saat Kasus Terjadi *</span>
                    </label>
                    <input
                      type="text"
                      placeholder="Contoh: Menteri Komunikasi dan Informatika RI (2019–2023)"
                      value={pastPosition}
                      onChange={(e) => setPastPosition(e.target.value)}
                      className={`w-full px-3 py-1.5 text-xs sm:text-sm bg-stone-50 border rounded-lg focus:outline-none focus:ring-1 focus:ring-amber-500 ${
                        errors.pastPosition ? 'border-rose-500' : 'border-stone-300 text-stone-900'
                      }`}
                    />
                    {errors.pastPosition && <p className="mt-0.5 text-[11px] text-rose-600">{errors.pastPosition}</p>}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    <div>
                      <label className="block text-xs font-semibold text-stone-800 uppercase tracking-wider mb-1 flex items-center gap-1">
                        <Building2 className="w-3.5 h-3.5 text-stone-500" />
                        <span>Posisi / Pekerjaan Saat Ini *</span>
                      </label>
                      <input
                        type="text"
                        placeholder="Contoh: Terpidana di Lapas Salemba / Komisaris"
                        value={currentPosition}
                        onChange={(e) => setCurrentPosition(e.target.value)}
                        className={`w-full px-3 py-1.5 text-xs sm:text-sm bg-stone-50 border rounded-lg focus:outline-none focus:ring-1 focus:ring-amber-500 ${
                          errors.currentPosition ? 'border-rose-500' : 'border-stone-300 text-stone-900'
                        }`}
                      />
                      {errors.currentPosition && <p className="mt-0.5 text-[11px] text-rose-600">{errors.currentPosition}</p>}
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-stone-800 uppercase tracking-wider mb-1 flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5 text-stone-500" />
                        <span>Lokasi / Kota Saat Ini</span>
                      </label>
                      <input
                        type="text"
                        placeholder="Contoh: Bandung, Jawa Barat"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        className="w-full px-3 py-1.5 text-xs sm:text-sm bg-stone-50 border border-stone-300 rounded-lg text-stone-900 focus:outline-none focus:ring-1 focus:ring-amber-500"
                      />
                    </div>
                  </div>

                  {/* Foto URL (opsional) */}
                  <div>
                    <label className="block text-xs font-semibold text-stone-800 uppercase tracking-wider mb-1 flex items-center gap-1">
                      <ImageIcon className="w-3.5 h-3.5 text-stone-500" />
                      <span>URL Foto Potret (Opsional)</span>
                    </label>
                    <input
                      type="url"
                      placeholder="https://... (jika kosong, sistem membuat avatar inisial)"
                      value={avatarUrl}
                      onChange={(e) => setAvatarUrl(e.target.value)}
                      className="w-full px-3 py-1.5 text-xs bg-stone-50 border border-stone-300 rounded-lg text-stone-900 focus:outline-none focus:ring-1 focus:ring-amber-500"
                    />
                  </div>
                </div>
              )}

              {/* STEP 2: Kerugian & 2 Poin Penting Perkara */}
              {step === 2 && (
                <div className="space-y-3 animate-in fade-in-50 duration-150">
                  {/* Kerugian Negara */}
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <label className="text-xs font-semibold text-stone-800 uppercase tracking-wider flex items-center gap-1">
                        <Coins className="w-3.5 h-3.5 text-rose-600" />
                        <span>Estimasi Kerugian Negara (Rupiah) *</span>
                      </label>
                      <span className="font-mono text-xs font-bold text-rose-700">
                        {formatRupiah(stateLossAmount)}
                      </span>
                    </div>
                    <input
                      type="number"
                      step={1000000000}
                      value={stateLossAmount || ''}
                      onChange={(e) => setStateLossAmount(Number(e.target.value))}
                      placeholder="Contoh: 1500000000000 (1,5 Triliun)"
                      className="w-full px-3 py-1.5 text-xs sm:text-sm bg-stone-50 border border-stone-300 rounded-lg font-mono focus:outline-none focus:ring-1 focus:ring-amber-500 text-stone-900"
                    />
                  </div>

                  {/* 2 Poin Penting (Wajib) */}
                  <div className="space-y-2">
                    <span className="text-xs font-bold text-stone-700 uppercase tracking-wider flex items-center gap-1">
                      <Scale className="w-3.5 h-3.5 text-amber-700" />
                      <span>2 Poin Penting Perkara Hukum *</span>
                    </span>

                    <div>
                      <input
                        type="text"
                        placeholder="Poin 1: Modus operandi korupsi (misal: Markup pengadaan menara internet 15%)..."
                        value={keyPoint1}
                        onChange={(e) => setKeyPoint1(e.target.value)}
                        className={`w-full px-3 py-1.5 text-xs bg-stone-50 border rounded-lg focus:outline-none focus:ring-1 focus:ring-amber-500 ${
                          errors.keyPoint1 ? 'border-rose-500' : 'border-stone-300 text-stone-900'
                        }`}
                      />
                      {errors.keyPoint1 && <p className="mt-0.5 text-[11px] text-rose-600">{errors.keyPoint1}</p>}
                    </div>

                    <div>
                      <input
                        type="text"
                        placeholder="Poin 2: Putusan pengadilan (misal: Vonis kasasi MA memutus 15 tahun kurungan)..."
                        value={keyPoint2}
                        onChange={(e) => setKeyPoint2(e.target.value)}
                        className={`w-full px-3 py-1.5 text-xs bg-stone-50 border rounded-lg focus:outline-none focus:ring-1 focus:ring-amber-500 ${
                          errors.keyPoint2 ? 'border-rose-500' : 'border-stone-300 text-stone-900'
                        }`}
                      />
                      {errors.keyPoint2 && <p className="mt-0.5 text-[11px] text-rose-600">{errors.keyPoint2}</p>}
                    </div>
                  </div>

                  {/* Kasus & No Perkara */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    <div>
                      <label className="block text-xs font-semibold text-stone-800 uppercase tracking-wider mb-1">
                        Nama Kasus / Proyek
                      </label>
                      <input
                        type="text"
                        placeholder="Contoh: Korupsi BTS 4G Kominfo"
                        value={caseName}
                        onChange={(e) => setCaseName(e.target.value)}
                        className="w-full px-3 py-1.5 text-xs bg-stone-50 border border-stone-300 rounded-lg text-stone-900 focus:outline-none focus:ring-1 focus:ring-amber-500"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-stone-800 uppercase tracking-wider mb-1">
                        Nomor Putusan Pengadilan
                      </label>
                      <input
                        type="text"
                        placeholder="Contoh: Putusan MA No. 4128 K/Pid.Sus/2024"
                        value={courtDocket}
                        onChange={(e) => setCourtDocket(e.target.value)}
                        className="w-full px-3 py-1.5 text-xs bg-stone-50 border border-stone-300 rounded-lg text-stone-900 focus:outline-none focus:ring-1 focus:ring-amber-500 font-mono"
                      />
                    </div>
                  </div>

                  {/* Achievement Highlight */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-1">
                    <div className="sm:col-span-2">
                      <label className="block text-xs font-semibold text-stone-800 uppercase tracking-wider mb-1 flex items-center gap-1">
                        <Trophy className="w-3.5 h-3.5 text-amber-600" />
                        <span>Judul Capaian Skandal</span>
                      </label>
                      <input
                        type="text"
                        placeholder="Contoh: Rekor Mega Proyek Mangkrak"
                        value={achievementTitle}
                        onChange={(e) => setAchievementTitle(e.target.value)}
                        className="w-full px-3 py-1.5 text-xs bg-stone-50 border border-stone-300 rounded-lg text-stone-900 focus:outline-none focus:ring-1 focus:ring-amber-500"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-stone-800 uppercase tracking-wider mb-1">
                        Badge Angka Finansial
                      </label>
                      <input
                        type="text"
                        placeholder="Contoh: Rp 8,03 T"
                        value={achievementMetric}
                        onChange={(e) => setAchievementMetric(e.target.value)}
                        className="w-full px-3 py-1.5 text-xs bg-stone-50 border border-stone-300 rounded-lg text-stone-900 focus:outline-none focus:ring-1 focus:ring-amber-500 font-mono font-bold"
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Footer Navigation */}
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
                  onClick={() => setStep(1)}
                  className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-stone-700 hover:text-stone-950 transition-colors"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Kembali</span>
                </button>
              )}

              {step === 1 ? (
                <button
                  type="button"
                  onClick={handleNext}
                  className="flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-stone-950 bg-amber-400 hover:bg-amber-300 rounded-lg transition-colors shadow-xs"
                >
                  <span>Lanjut: Kerugian & Kasus</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              ) : (
                <button
                  type="submit"
                  className="flex items-center gap-1.5 px-4 py-2 text-xs font-bold text-stone-950 bg-amber-400 hover:bg-amber-300 rounded-lg transition-colors shadow-xs"
                >
                  <Check className="w-4 h-4 stroke-[3]" />
                  <span>Simpan Profil Koruptor</span>
                </button>
              )}
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
