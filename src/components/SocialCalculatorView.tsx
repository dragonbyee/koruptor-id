import React, { useState } from 'react';
import { KoruptorProfile } from '../types/corruption';
import { formatRupiah, calculateEquivalences } from '../utils/formatters';
import { Hospital, School, Compass, Home, BookOpen, Calculator, Sparkles } from 'lucide-react';

interface SocialCalculatorViewProps {
  corruptors: KoruptorProfile[];
}

export const SocialCalculatorView: React.FC<SocialCalculatorViewProps> = ({ corruptors }) => {
  const [selectedCorruptorId, setSelectedCorruptorId] = useState<string>(corruptors[0]?.id || '');
  const [customAmount, setCustomAmount] = useState<number>(0);
  const [useCustom, setUseCustom] = useState<boolean>(false);

  const selectedCorruptor = corruptors.find((c) => c.id === selectedCorruptorId);
  const activeAmount = useCustom ? customAmount : selectedCorruptor ? selectedCorruptor.stateLoss.totalAmount : 0;
  const equivalences = calculateEquivalences(activeAmount);

  return (
    <div className="space-y-6">
      <div className="bg-white border border-stone-200 rounded-xl p-6 shadow-xs">
        <div className="flex items-center gap-2 mb-2 text-xs font-bold uppercase tracking-wider text-amber-700">
          <Calculator className="w-4 h-4 text-amber-600" />
          <span>Simulasi Dampak Kerugian Terhadap Fasilitas Publik</span>
        </div>
        <h2 className="text-xl sm:text-2xl font-serif font-bold text-stone-900 tracking-tight">
          Kalkulator Konversi Hak Rakyat
        </h2>
        <p className="text-xs sm:text-sm text-stone-600 max-w-2xl mt-1 leading-relaxed">
          Berapa banyak puskesmas terpencil, beasiswa sarjana anak berprestasi, dan infrastruktur desa yang lenyap akibat tindak pidana korupsi ini? Pilih kasus atau masukkan nominal sendiri.
        </p>

        {/* Selector Controls */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4 p-4 bg-stone-50 border border-stone-200 rounded-lg">
          <div>
            <label className="block text-xs font-semibold text-stone-700 mb-1.5">
              Pilih Kasus Figur Koruptor:
            </label>
            <select
              value={useCustom ? 'custom' : selectedCorruptorId}
              onChange={(e) => {
                if (e.target.value === 'custom') {
                  setUseCustom(true);
                } else {
                  setUseCustom(false);
                  setSelectedCorruptorId(e.target.value);
                }
              }}
              className="w-full px-3 py-2 text-xs bg-white border border-stone-300 rounded-md focus:outline-none focus:ring-1 focus:ring-amber-500 font-medium"
            >
              {corruptors.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name} — {c.stateLoss.totalFormatted} ({c.sectorLabel})
                </option>
              ))}
              <option value="custom">-- Masukkan Nominal Rupiah Sendiri --</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-stone-700 mb-1.5">
              Nominal yang Dihitung:
            </label>
            {useCustom ? (
              <input
                type="number"
                placeholder="Masukkan nominal Rupiah (contoh: 1000000000000)"
                value={customAmount || ''}
                onChange={(e) => setCustomAmount(Number(e.target.value))}
                className="w-full px-3 py-2 text-xs bg-white border border-stone-300 rounded-md font-mono"
              />
            ) : (
              <div className="px-3 py-2 text-sm font-bold font-mono text-rose-700 bg-white border border-stone-200 rounded-md">
                {formatRupiah(activeAmount)}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Results Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white border border-stone-200 rounded-xl p-5 shadow-xs flex flex-col justify-between">
          <div>
            <div className="w-10 h-10 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center mb-3">
              <Hospital className="w-5 h-5" />
            </div>
            <div className="text-3xl font-mono font-bold text-stone-900 tabular-nums">
              {equivalences.puskesmas.toLocaleString('id-ID')}
            </div>
            <h3 className="text-sm font-semibold text-stone-800 mt-1">
              Puskesmas Rawat Inap Lengkap
            </h3>
            <p className="text-xs text-stone-500 mt-1 leading-relaxed">
              Dilengkapi IGD 24 jam, ambulans, dan laboratorium dasar untuk melayani puluhan ribu warga kecamatan terpencil.
            </p>
          </div>
          <div className="pt-3 mt-4 border-t border-stone-100 text-[11px] text-stone-400">
            Estimasi: Rp 6 Miliar / Puskesmas
          </div>
        </div>

        <div className="bg-white border border-stone-200 rounded-xl p-5 shadow-xs flex flex-col justify-between">
          <div>
            <div className="w-10 h-10 rounded-lg bg-amber-50 text-amber-700 flex items-center justify-center mb-3">
              <School className="w-5 h-5" />
            </div>
            <div className="text-3xl font-mono font-bold text-stone-900 tabular-nums">
              {equivalences.beasiswaKuliah.toLocaleString('id-ID')}
            </div>
            <h3 className="text-sm font-semibold text-stone-800 mt-1">
              Beasiswa Sarjana S1 Penuh (4 Tahun)
            </h3>
            <p className="text-xs text-stone-500 mt-1 leading-relaxed">
              Mencakup biaya UKT dan tunjangan hidup mahasiswa berprestasi dari keluarga prasejahtera hingga lulus sarjana.
            </p>
          </div>
          <div className="pt-3 mt-4 border-t border-stone-100 text-[11px] text-stone-400">
            Estimasi: Rp 60 Juta / Mahasiswa S1
          </div>
        </div>

        <div className="bg-white border border-stone-200 rounded-xl p-5 shadow-xs flex flex-col justify-between">
          <div>
            <div className="w-10 h-10 rounded-lg bg-blue-50 text-blue-700 flex items-center justify-center mb-3">
              <Compass className="w-5 h-5" />
            </div>
            <div className="text-3xl font-mono font-bold text-stone-900 tabular-nums">
              {equivalences.jalanKm.toLocaleString('id-ID')} <span className="text-base font-sans font-normal text-stone-500">Km</span>
            </div>
            <h3 className="text-sm font-semibold text-stone-800 mt-1">
              Jalan Aspal Penghubung Antar-Desa
            </h3>
            <p className="text-xs text-stone-500 mt-1 leading-relaxed">
              Akses jalan mulus untuk memperlancar distribusi hasil tani, hasil laut nelayan, dan mobilitas anak bersekolah.
            </p>
          </div>
          <div className="pt-3 mt-4 border-t border-stone-100 text-[11px] text-stone-400">
            Estimasi: Rp 2,5 Miliar / Km
          </div>
        </div>

        <div className="bg-white border border-stone-200 rounded-xl p-5 shadow-xs flex flex-col justify-between">
          <div>
            <div className="w-10 h-10 rounded-lg bg-purple-50 text-purple-700 flex items-center justify-center mb-3">
              <Home className="w-5 h-5" />
            </div>
            <div className="text-3xl font-mono font-bold text-stone-900 tabular-nums">
              {equivalences.rumahSubsidi.toLocaleString('id-ID')}
            </div>
            <h3 className="text-sm font-semibold text-stone-800 mt-1">
              Unit Rumah Layak Huni Gratis
            </h3>
            <p className="text-xs text-stone-500 mt-1 leading-relaxed">
              Hunian permanen bagi keluarga di kawasan kumuh perkotaan dan daerah rawan bencana alam.
            </p>
          </div>
          <div className="pt-3 mt-4 border-t border-stone-100 text-[11px] text-stone-400">
            Estimasi: Rp 180 Juta / Rumah
          </div>
        </div>
      </div>
    </div>
  );
};
