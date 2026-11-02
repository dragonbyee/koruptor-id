import React from 'react';
import { KoruptorProfile } from '../types/corruption';
import { formatRupiah, formatExactRupiah } from '../utils/formatters';
import { Coins, AlertOctagon, TrendingDown, ShieldCheck, PieChart, BarChart2 } from 'lucide-react';

interface StatsViewProps {
  corruptors: KoruptorProfile[];
  onSelectCorruptor: (profile: KoruptorProfile) => void;
}

export const StatsView: React.FC<StatsViewProps> = ({ corruptors, onSelectCorruptor }) => {
  const totalLoss = corruptors.reduce((sum, c) => sum + c.stateLoss.totalAmount, 0);
  const totalRecovered = corruptors.reduce((sum, c) => sum + c.stateLoss.assetRecovered, 0);
  const totalDeficit = totalLoss - totalRecovered;

  // Group by sector
  const sectorLosses: Record<string, { label: string; total: number; count: number }> = {};
  corruptors.forEach((c) => {
    if (!sectorLosses[c.sector]) {
      sectorLosses[c.sector] = { label: c.sectorLabel, total: 0, count: 0 };
    }
    sectorLosses[c.sector].total += c.stateLoss.totalAmount;
    sectorLosses[c.sector].count += 1;
  });

  const sortedSectors = Object.values(sectorLosses).sort((a, b) => b.total - a.total);

  // Sorted by loss
  const sortedCorruptors = [...corruptors].sort(
    (a, b) => b.stateLoss.totalAmount - a.stateLoss.totalAmount
  );

  return (
    <div className="space-y-8">
      {/* Overview Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-5 bg-white border border-stone-200 rounded-xl space-y-1">
          <div className="flex items-center justify-between text-xs font-semibold text-stone-500 uppercase tracking-wider">
            <span>Total Kerugian Negara</span>
            <AlertOctagon className="w-4 h-4 text-rose-600" />
          </div>
          <div className="text-2xl sm:text-3xl font-mono font-bold text-rose-600 tabular-nums">
            {formatRupiah(totalLoss)}
          </div>
          <p className="text-xs text-stone-500">
            Audit BPKP & Putusan Pengadilan Tipikor
          </p>
        </div>

        <div className="p-5 bg-white border border-stone-200 rounded-xl space-y-1">
          <div className="flex items-center justify-between text-xs font-semibold text-stone-500 uppercase tracking-wider">
            <span>Aset Pulih / Disita</span>
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="text-2xl sm:text-3xl font-mono font-bold text-emerald-600 tabular-nums">
            {formatRupiah(totalRecovered)}
          </div>
          <p className="text-xs text-stone-500">
            {((totalRecovered / totalLoss) * 100).toFixed(2)}% dari total tuntutan terbayar
          </p>
        </div>

        <div className="p-5 bg-white border border-stone-200 rounded-xl space-y-1">
          <div className="flex items-center justify-between text-xs font-semibold text-stone-500 uppercase tracking-wider">
            <span>Defisit Belum Tertutupi</span>
            <TrendingDown className="w-4 h-4 text-amber-600" />
          </div>
          <div className="text-2xl sm:text-3xl font-mono font-bold text-stone-900 tabular-nums">
            {formatRupiah(totalDeficit)}
          </div>
          <p className="text-xs text-stone-500">
            Beban kerugian finansial rakyat
          </p>
        </div>
      </div>

      {/* Sector Breakdown */}
      <div className="bg-white border border-stone-200 rounded-xl p-6 space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-bold text-stone-900 flex items-center gap-2">
            <BarChart2 className="w-4 h-4 text-stone-600" />
            <span>Sebaran Kerugian Berdasarkan Sektor Industri & Kebijakan</span>
          </h3>
          <span className="text-xs text-stone-500">Audit Gabungan</span>
        </div>

        <div className="space-y-3">
          {sortedSectors.map((sector, idx) => {
            const percent = (sector.total / totalLoss) * 100;
            return (
              <div key={idx} className="space-y-1.5 text-xs">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-stone-800">
                    {sector.label} ({sector.count} Kasus Terdata)
                  </span>
                  <div className="text-right">
                    <span className="font-mono font-bold text-stone-900">{formatRupiah(sector.total)}</span>
                    <span className="text-stone-400 ml-1.5 font-mono">({percent.toFixed(1)}%)</span>
                  </div>
                </div>
                <div className="w-full bg-stone-100 rounded-full h-2 overflow-hidden">
                  <div
                    className="bg-amber-500 h-2 rounded-full"
                    style={{ width: `${Math.max(percent, 2)}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Table of All Tracked Records */}
      <div className="bg-white border border-stone-200 rounded-xl overflow-hidden shadow-xs">
        <div className="px-6 py-4 bg-stone-50 border-b border-stone-200 flex items-center justify-between">
          <h3 className="text-sm font-bold text-stone-900">
            Peringkat Kerugian Berdasarkan Putusan Sidang & Audit
          </h3>
          <span className="text-xs text-stone-500">Klik baris untuk membuka CV</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead className="bg-stone-100 text-stone-700 uppercase tracking-wider font-semibold border-b border-stone-200">
              <tr>
                <th className="py-3 px-4">Nama Figur</th>
                <th className="py-3 px-4">Jabatan Kasus</th>
                <th className="py-3 px-4">Sektor</th>
                <th className="py-3 px-4 text-right">Kerugian Negara</th>
                <th className="py-3 px-4 text-right">Aset Pulih</th>
                <th className="py-3 px-4 text-center">Status Hukum</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-200 text-stone-700 font-normal">
              {sortedCorruptors.map((c) => (
                <tr
                  key={c.id}
                  onClick={() => onSelectCorruptor(c)}
                  className="hover:bg-amber-50/50 cursor-pointer transition-colors"
                >
                  <td className="py-3 px-4 font-semibold text-stone-900 flex items-center gap-2">
                    <span>{c.name}</span>
                    {c.alias && <span className="text-stone-400 font-normal">({c.alias})</span>}
                  </td>
                  <td className="py-3 px-4 text-stone-600 max-w-xs truncate">{c.pastPosition}</td>
                  <td className="py-3 px-4 text-stone-600">{c.sectorLabel}</td>
                  <td className="py-3 px-4 text-right font-mono font-bold text-rose-600 tabular-nums">
                    {c.stateLoss.totalFormatted}
                  </td>
                  <td className="py-3 px-4 text-right font-mono text-emerald-700 tabular-nums">
                    {formatRupiah(c.stateLoss.assetRecovered)}
                  </td>
                  <td className="py-3 px-4 text-center">
                    <span className="text-[11px] font-medium bg-stone-100 text-stone-700 px-2 py-0.5 rounded border border-stone-200">
                      {c.legalStatusLabel}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
