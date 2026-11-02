import React from 'react';
import { formatRupiah } from '../utils/formatters';
import { KoruptorProfile, CommunityUpdate } from '../types/corruption';

interface StatsBannerProps {
  corruptors: KoruptorProfile[];
  communityUpdates: CommunityUpdate[];
}

export const StatsBanner: React.FC<StatsBannerProps> = ({ corruptors, communityUpdates }) => {
  const totalLoss = corruptors.reduce((sum, c) => sum + c.stateLoss.totalAmount, 0);
  const totalRecovered = corruptors.reduce((sum, c) => sum + c.stateLoss.assetRecovered, 0);
  const avgRecoveryRate = (totalRecovered / totalLoss) * 100;
  const verifiedCommunityUpdates = communityUpdates.filter((u) => u.status === 'verified').length;

  return (
    <section className="bg-stone-900 border-b border-stone-800 text-stone-100 py-6 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 divide-y md:divide-y-0 md:divide-x divide-stone-800">
          <div className="pt-2 md:pt-0">
            <span className="block text-xs uppercase tracking-wider text-stone-400 font-medium">
              Total Kerugian Negara (Data Inkrah/Sidang)
            </span>
            <div className="mt-1 text-2xl lg:text-3xl font-bold font-mono tracking-tight text-amber-400 tabular-nums">
              {formatRupiah(totalLoss)}
            </div>
            <p className="mt-1 text-xs text-stone-500">
              Audit gabungan BPKP & Kejaksaan Agung
            </p>
          </div>

          <div className="pt-4 md:pt-0 md:pl-8">
            <span className="block text-xs uppercase tracking-wider text-stone-400 font-medium">
              Figur Terpidana & DPO Terdata
            </span>
            <div className="mt-1 text-2xl lg:text-3xl font-bold font-mono tracking-tight text-white tabular-nums">
              {corruptors.length} <span className="text-sm font-sans font-normal text-stone-400">Profil Kasus</span>
            </div>
            <p className="mt-1 text-xs text-stone-500">
              Menteri, Kepala Lembaga & Konglomerat
            </p>
          </div>

          <div className="pt-4 md:pt-0 md:pl-8">
            <span className="block text-xs uppercase tracking-wider text-stone-400 font-medium">
              Pembaruan Posisi Komunitas
            </span>
            <div className="mt-1 text-2xl lg:text-3xl font-bold font-mono tracking-tight text-emerald-400 tabular-nums">
              {verifiedCommunityUpdates} <span className="text-sm font-sans font-normal text-stone-400">/ {communityUpdates.length} Laporan</span>
            </div>
            <p className="mt-1 text-xs text-stone-500">
              Pekerjaan/jabatan terverifikasi publik
            </p>
          </div>

          <div className="pt-4 md:pt-0 md:pl-8">
            <span className="block text-xs uppercase tracking-wider text-stone-400 font-medium">
              Rasio Pemulihan Aset Riil
            </span>
            <div className="mt-1 text-2xl lg:text-3xl font-bold font-mono tracking-tight text-rose-400 tabular-nums">
              {avgRecoveryRate.toFixed(1)}%
            </div>
            <p className="mt-1 text-xs text-stone-500">
              {formatRupiah(totalRecovered)} terselamatkan
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
