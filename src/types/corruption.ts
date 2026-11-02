export type LegalStatus = 
  | 'menjalani_hukuman'    // Masih di Lapas
  | 'bebas_bersyarat'     // PB (Pembebasan Bersyarat)
  | 'bebas_murni'         // Selesai Masa Pidana
  | 'buron_dpo'           // Masuk DPO (Daftar Pencarian Orang)
  | 'meninggal_dunia';    // Meninggal Dunia

export type Sector = 
  | 'telekomunikasi_it'
  | 'energi_tambang'
  | 'keuangan_pajak'
  | 'sosial_kesehatan'
  | 'peradilan_hukum'
  | 'bumn_infrastruktur'
  | 'kehutanan_perkebunan';

export interface StateLossBreakdown {
  label: string;
  amount: number; // in IDR
  notes?: string;
}

export interface StateLoss {
  totalAmount: number; // in IDR
  totalFormatted: string; // e.g. "Rp 78,8 Triliun"
  breakdown: StateLossBreakdown[];
  assetRecovered: number; // in IDR
  recoveryRatePercent: number;
}

export interface CorruptionCaseItem {
  name: string;
  year: number;
  courtDocketNumber: string; // e.g. "Putusan MA No. 123 K/Pid.Sus/2023"
  summary: string;
  lawsBreached: string[]; // e.g. ["Pasal 2 ayat (1) UU Tipikor", "Pasal 3 UU TPPU"]
  sentenceYears: number;
  fineAmount: number; // Denda (IDR)
  restitutionAmount: number; // Uang Pengganti (IDR)
}

export interface AchievementItem {
  title: string;
  issuerOrYear: string;
  metricHighlight: string;
  description: string;
  iconType?: 'trophy' | 'alert' | 'dollar' | 'clock' | 'scale';
}

export interface CommunityUpdate {
  id: string;
  corruptorId: string;
  corruptorName: string;
  reportedBy: string;
  reportedAt: string;
  newPosition: string; // Pekerjaan / Jabatan saat ini
  companyOrOrg: string; // Lembaga / Perusahaan
  location: string;
  evidenceUrl: string;
  evidenceSource: string;
  notes: string;
  upvotes: number;
  flags: number;
  status: 'verified' | 'review' | 'rejected';
  userVoted?: 'up' | 'flag';
}

export interface KoruptorProfile {
  id: string;
  name: string;
  alias?: string;
  avatarUrl: string;
  bannerUrl?: string;
  pastPosition: string; // Posisi saat kasus korupsi
  currentPosition: string; // Posisi/Pekerjaan saat ini (sesuai data hukum & laporan komunitas)
  currentPositionStatus: 'resmi' | 'laporan_komunitas_terverifikasi' | 'dalam_konfirmasi';
  currentOrganization: string;
  legalStatus: LegalStatus;
  legalStatusLabel: string;
  sentenceDuration: string; // e.g. "16 th", "15 th", "1 th 2 bln", "Buron 5 th"
  location: string; // Lapas Sukamiskin / Jakarta Selatan / DPO dll.
  sector: Sector;
  sectorLabel: string;
  
  // 2 Poin Penting (Wajib sesuai brief pengguna)
  twoKeyPoints: [string, string];
  
  // Achievement ala LinkedIn
  achievements: AchievementItem[];
  
  // List Korupsi
  corruptionCases: CorruptionCaseItem[];
  
  // List Kerugian Negara
  stateLoss: StateLoss;
  
  // Rekam Jejak Karier (Timeline ala LinkedIn)
  careerHistory: {
    role: string;
    organization: string;
    period: string;
    isCorruptionPeriod?: boolean;
    description?: string;
  }[];

  communityUpdatesCount: number;
  lastUpdatedDate: string;
  verifiedSourceUrl: string;
}
