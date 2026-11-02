export function formatRupiah(amount: number): string {
  if (amount >= 1_000_000_000_000) {
    const triliun = (amount / 1_000_000_000_000).toLocaleString('id-ID', {
      minimumFractionDigits: 1,
      maximumFractionDigits: 2,
    });
    return `Rp ${triliun} Triliun`;
  }
  if (amount >= 1_000_000_000) {
    const miliar = (amount / 1_000_000_000).toLocaleString('id-ID', {
      minimumFractionDigits: 1,
      maximumFractionDigits: 2,
    });
    return `Rp ${miliar} Miliar`;
  }
  if (amount >= 1_000_000) {
    const juta = (amount / 1_000_000).toLocaleString('id-ID', {
      minimumFractionDigits: 0,
      maximumFractionDigits: 1,
    });
    return `Rp ${juta} Juta`;
  }
  return `Rp ${amount.toLocaleString('id-ID')}`;
}

export function formatExactRupiah(amount: number): string {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    maximumFractionDigits: 0,
  }).format(amount);
}

export function calculateEquivalences(lossAmount: number) {
  // Conversions based on APBN & public benchmark averages in Indonesia:
  // 1 Puskesmas Rawat Inap standar = ~Rp 6 Miliar
  // 1 Beasiswa Kuliah S1 penuh 4 tahun = ~Rp 60 Juta
  // 1 Km Jalan Aspal Daerah = ~Rp 2,5 Miliar
  // 1 Unit Rumah Subsidi Layak Huni = ~Rp 180 Juta
  // 1 Ruang Kelas Sekolah Baru = ~Rp 250 Juta
  return {
    puskesmas: Math.floor(lossAmount / 6_000_000_000),
    beasiswaKuliah: Math.floor(lossAmount / 60_000_000),
    jalanKm: Math.floor(lossAmount / 2_500_000_000),
    rumahSubsidi: Math.floor(lossAmount / 180_000_000),
    ruangKelas: Math.floor(lossAmount / 250_000_000),
  };
}
