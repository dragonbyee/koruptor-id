import { KoruptorProfile, CommunityUpdate } from '../types/corruption';

export const BANNER_IMAGE = '/src/assets/images/banner_justice_hall_1793617500881.jpg';

export const INITIAL_CORRUPTORS: KoruptorProfile[] = [
  {
    id: 'surya-darmadi',
    name: 'Surya Darmadi',
    alias: 'Apeng',
    avatarUrl: '/src/assets/images/portrait_politician_surya_1793617499636.jpg',
    bannerUrl: BANNER_IMAGE,
    pastPosition: 'Owner & Pemilik Manfaat PT Duta Palma Group / Darmex Agro',
    currentPosition: 'Terpidana di Lapas Kelas I Sukamiskin · Peninjauan Kembali (PK) diajukan',
    currentPositionStatus: 'resmi',
    currentOrganization: 'Lapas Kelas I Sukamiskin / Konsorsium Sawit Riau',
    legalStatus: 'menjalani_hukuman',
    legalStatusLabel: 'Menjalani Vonis Penjara Inkrah',
    sentenceDuration: '16 th',
    location: 'Bandung, Jawa Barat',
    sector: 'kehutanan_perkebunan',
    sectorLabel: 'Perkebunan & Kehutanan',
    twoKeyPoints: [
      'Menyerobot lahan kawasan hutan lindung seluas 37.095 hektare di Kabupaten Indragiri Hulu, Riau tanpa izin pelepasan kawasan hutan selama lebih dari 15 tahun.',
      'Vonis Kasasi Mahkamah Agung Nomor 4950 K/Pid.Sus/2023 menghukum pidana penjara 16 tahun serta kewajiban uang pengganti Rp 2,23 Triliun dan kerugian perekonomian negara.'
    ],
    achievements: [
      {
        title: 'Rekor Skandal Lahan Perkebunan Terluas',
        issuerOrYear: 'Audit BPKP & Kejaksaan Agung (2022-2023)',
        metricHighlight: 'Rp 41,9 T',
        description: 'Menguasai dan mengonversi 37.095 hektare kawasan hutan lindung menjadi perkebunan kelapa sawit produktif tanpa izin pelepasan dari Kementerian LHK.',
        iconType: 'trophy'
      },
      {
        title: 'Tuntutan Kerugian Terbesar dalam Sejarah Peradilan Indonesia',
        issuerOrYear: 'Pengadilan Tipikor Jakarta Pusat',
        metricHighlight: 'Rp 78,8 T',
        description: 'Tuntutan awal JPU mencapai Rp 78 triliun mencakup kerugian keuangan negara Rp 4,79 T dan kerugian perekonomian negara Rp 73,9 T.',
        iconType: 'dollar'
      },
      {
        title: 'Penyitaan Aset Korporasi Terbanyak Lintas Provinsi',
        issuerOrYear: 'Satgassus Jampidsus Kejaksaan Agung',
        metricHighlight: 'Rp 5,12 T',
        description: 'Aset sitaan mencakup 32 unit kapal, helikopter, pabrik CPO, dan gedung perkantoran Menara Palma di kawasan Kuningan Jakarta.',
        iconType: 'alert'
      }
    ],
    corruptionCases: [
      {
        name: 'Korupsi Izin Usaha Perkebunan Kelapa Sawit PT Duta Palma Group',
        year: 2022,
        courtDocketNumber: 'Putusan MA No. 4950 K/Pid.Sus/2023 Jo. No. 62/Pid.Sus-TPK/2022/PN.Jkt.Pst',
        summary: 'Penerbitan izin lokasi dan izin usaha perkebunan (IUP) di kawasan hutan lindung Indragiri Hulu bekerja sama dengan mantan Bupati Raja Thamsir Rachman.',
        lawsBreached: [
          'Pasal 2 ayat (1) jo Pasal 18 UU No. 31/1999 tentang Pemberantasan Tipikor',
          'Pasal 3 UU No. 8/2010 tentang Pencegahan dan Pemberantasan TPPU'
        ],
        sentenceYears: 16,
        fineAmount: 1000000000,
        restitutionAmount: 2238274248233
      },
      {
        name: 'Tindak Pidana Pencucian Uang (TPPU) Aliran Dana Perkebunan Sawit',
        year: 2023,
        courtDocketNumber: 'Putusan Pengadilan Tinggi DKI No. 18/PID.SUS-TPK/2023/PT DKI',
        summary: 'Menempatkan, mentransfer, dan menyamarkan keuntungan hasil tindak pidana korupsi sawit ke puluhan rekening anak perusahaan luar negeri dan domestik.',
        lawsBreached: ['Pasal 3 & Pasal 4 UU No. 8 Tahun 2010 TPPU'],
        sentenceYears: 0,
        fineAmount: 0,
        restitutionAmount: 0
      }
    ],
    stateLoss: {
      totalAmount: 41900000000000,
      totalFormatted: 'Rp 41,9 Triliun',
      breakdown: [
        { label: 'Kerugian Keuangan Negara Riil', amount: 4798706951640, notes: 'Berdasarkan audit investigatif BPKP' },
        { label: 'Kerugian Perekonomian Negara (Ekologis & Ekosistem)', amount: 37101293048360, notes: 'Penghitungan ahli lingkungan IPB atas kerusakan fungsi hutan' }
      ],
      assetRecovered: 5120000000000,
      recoveryRatePercent: 12.2
    },
    careerHistory: [
      {
        role: 'Chairman & Ultimate Beneficiary Owner',
        organization: 'Darmex Agro Group / PT Duta Palma Nusantara',
        period: '1987 — 2022',
        isCorruptionPeriod: true,
        description: 'Membangun konglomerasi sawit terintegrasi dengan ratusan ribu hektare kebun di Riau dan Kalimantan Barat.'
      },
      {
        role: 'Terpidana Korupsi & Warga Binaan Pemasyarakatan',
        organization: 'Lembaga Pemasyarakatan Kelas I Sukamiskin',
        period: '2023 — Sekarang',
        description: 'Menjalani masa pidana 16 tahun kurungan badan setelah dieksekusi oleh Kejaksaan Negeri Jakarta Pusat.'
      }
    ],
    communityUpdatesCount: 4,
    lastUpdatedDate: '24 Oktober 2024',
    verifiedSourceUrl: 'https://putusan3.mahkamahagung.go.id'
  },
  {
    id: 'johnny-g-plate',
    name: 'Johnny Gerard Plate',
    alias: 'JGP',
    avatarUrl: '/src/assets/images/portrait_minister_hafiz_1793617501396.jpg',
    bannerUrl: BANNER_IMAGE,
    pastPosition: 'Menteri Komunikasi dan Informatika RI (2019–2023) & Sekjen Partai NasDem',
    currentPosition: 'Terpidana di Lapas Kelas I Salemba · Laporan Komunitas: Penasihat Bisnis Keluarga',
    currentPositionStatus: 'laporan_komunitas_terverifikasi',
    currentOrganization: 'Lapas Salemba / Bisnis Keluarga di Sektor Perkebunan Flores',
    legalStatus: 'menjalani_hukuman',
    legalStatusLabel: 'Menjalani Vonis 15 Tahun Penjara',
    sentenceDuration: '15 th',
    location: 'Jakarta Pusat, DKI Jakarta',
    sector: 'telekomunikasi_it',
    sectorLabel: 'Telekomunikasi & IT',
    twoKeyPoints: [
      'Menyetujui perubahan kontrak adendum BTS 4G paket 1 sampai 5 dan mencairkan pembayaran 100% meski progres fisik menara di lapangan jauh dari target selesai (mangkrak).',
      'Vonis Kasasi Mahkamah Agung Nomor 4128 K/Pid.Sus/2024 memutus pidana 15 tahun penjara, denda Rp 1 Miliar, dan uang pengganti Rp 15,5 Miliar subsider 2 tahun kurungan.'
    ],
    achievements: [
      {
        title: 'Mega Proyek BTS 4G Mangkrak Daerah 3T Terbesar',
        issuerOrYear: 'Proyek Strategis Nasional Kominfo (2020-2022)',
        metricHighlight: '4.200',
        description: 'Proyek pemerataan sinyal internet untuk 7.904 desa terdepan, terluar, dan tertinggal (3T) mengalami deviasi parah dan mangkrak di 4.200 titik menara.',
        iconType: 'trophy'
      },
      {
        title: 'Menteri Pertama dengan Fasilitas Lapangan Golf & Bansos Pribadi',
        issuerOrYear: 'Fakta Persidangan Tipikor Jakarta Pusat',
        metricHighlight: 'Rp 17,85 M',
        description: 'Terbukti menerima setoran operasional rutin bulanan Rp 500 juta, fasilitas bermain golf puluhan kali, dan bantuan gereja di NTT dari rekanan vendor.',
        iconType: 'dollar'
      },
      {
        title: 'Audit Kerugian Negara Tertinggi di Sektor Teknologi Informasi',
        issuerOrYear: 'Laporan Hasil Audit BPKP RI Nomor PE.03.03/SR/SP-977/D5/02/2023',
        metricHighlight: 'Rp 8,03 T',
        description: 'Perhitungan kerugian meliputi pembayaran proyek yang tidak terpasang, markup pengadaan peralatan, dan jasa konsultasi fiktif.',
        iconType: 'alert'
      }
    ],
    corruptionCases: [
      {
        name: 'Korupsi Pengadaan BTS 4G dan Infrastruktur Pendukung 1-5 BAKTI Kominfo',
        year: 2023,
        courtDocketNumber: 'Putusan Kasasi MA No. 4128 K/Pid.Sus/2024 Jo. No. 10/Pid.Sus-TPK/2023/PN Jkt.Pst',
        summary: 'Penyalahgunaan wewenang penetapan pemenang lelang konsorsium, manipulasi syarat kajian teknis, dan persetujuan pencairan dana 100% dengan jaminan bank garansi bodong.',
        lawsBreached: [
          'Pasal 2 ayat (1) jo Pasal 18 UU No. 31/1999 tentang Tipikor',
          'Pasal 55 ayat (1) ke-1 KUHP'
        ],
        sentenceYears: 15,
        fineAmount: 1000000000,
        restitutionAmount: 15500000000
      }
    ],
    stateLoss: {
      totalAmount: 8032084133795,
      totalFormatted: 'Rp 8,03 Triliun',
      breakdown: [
        { label: 'Kerugian Keuangan Negara Proyek BTS BAKTI', amount: 8032084133795, notes: 'Audit resmi BPKP diserahkan ke Jampidsus Kejaksaan Agung' },
        { label: 'Uang Nikmat Pribadi Terdakwa (Uang Pengganti)', amount: 15500000000, notes: 'Wajib disetor ke kas negara atau penyitaan aset tanah/rekening' }
      ],
      assetRecovered: 1850000000000,
      recoveryRatePercent: 23.0
    },
    careerHistory: [
      {
        role: 'Menteri Komunikasi dan Informatika RI',
        organization: 'Kabinet Indonesia Maju',
        period: 'Oktober 2019 — Mei 2023',
        isCorruptionPeriod: true,
        description: 'Memimpin kementerian strategis regulasi pos dan telekomunikasi nasional serta transformasi digital.'
      },
      {
        role: 'Sekretaris Jenderal DPP Partai NasDem',
        organization: 'Dewan Pimpinan Pusat Partai NasDem',
        period: '2017 — 2023',
        description: 'Mengelola roda organisasi politik dan pemenangan pemilu nasional.'
      },
      {
        role: 'Terpidana & Penghuni Lapas',
        organization: 'Lembaga Pemasyarakatan Salemba Jakarta',
        period: '2023 — Sekarang',
        description: 'Menjalani masa kurungan badan berdasarkan putusan inkracht Mahkamah Agung.'
      }
    ],
    communityUpdatesCount: 8,
    lastUpdatedDate: '12 Januari 2025',
    verifiedSourceUrl: 'https://sipp.pn-jakartapusat.go.id'
  },
  {
    id: 'harvey-moeis',
    name: 'Harvey Moeis',
    alias: 'HM / Perwakilan PT RBT',
    avatarUrl: '/src/assets/images/portrait_tycoon_darmono_1793617499556.jpg',
    bannerUrl: BANNER_IMAGE,
    pastPosition: 'Pengusaha Tambang & Perwakilan Saham PT Refined Bangka Tin (PT RBT)',
    currentPosition: 'Terdakwa & Terpidana Rutan Salemba Cabang Kejaksaan Agung',
    currentPositionStatus: 'resmi',
    currentOrganization: 'Rutan Salemba / Bisnis Investasi Batubara & Tambang',
    legalStatus: 'menjalani_hukuman',
    legalStatusLabel: 'Menjalani Vonis Penjara Tipikor',
    sentenceDuration: '12 th',
    location: 'Jakarta Selatan, DKI Jakarta',
    sector: 'energi_tambang',
    sectorLabel: 'Pertambangan & Energi',
    twoKeyPoints: [
      'Mengkoordinasikan smelter swasta untuk menampung bijih timah ilegal dari wilayah IUP PT Timah Tbk dengan kedok kegiatan sewa-menyewa peralatan peleburan timah.',
      'Mengumpulkan dana CSR dari smelter swasta sebesar US$ 500 sampai US$ 750 per metrik ton melalui money changer PT Quantum Skyline Exchange (Helena Lim) sebagai fee pengamanan.'
    ],
    achievements: [
      {
        title: 'Skandal Kerusakan Lingkungan & Ekologis Termahal RI',
        issuerOrYear: 'Ahli Forensik Lingkungan IPB Prof. Bambang Hero (2024)',
        metricHighlight: 'Rp 271 T',
        description: 'Kerusakan bentang alam akibat tambang timah ilegal di Bangka Belitung seluas 170.363 hektare yang memicu lubang tambang beracun dan hilangnya hutan bakau.',
        iconType: 'trophy'
      },
      {
        title: 'Koleksi Mobil Mewah & Jet Pribadi Paling Ikonik',
        issuerOrYear: 'Berita Acara Penyitaan Jampidsus Kejaksaan Agung',
        metricHighlight: 'Rp 6,8 T',
        description: 'Penyitaan belasan supercar Rolls Royce, Ferrari, jet pribadi, jam tangan mewah, serta apartemen mewah Pakubuwono.',
        iconType: 'dollar'
      },
      {
        title: 'Skema Sewa Smelter Swasta Paling Terorganisir',
        issuerOrYear: 'Dakwaan JPU Tindak Pidana Korupsi',
        metricHighlight: 'Rp 29 T',
        description: 'Berhasil mengondisikan 5 smelter swasta untuk menyetor fee terselubung dengan dalih sewa alat dan tanggung jawab sosial perusahaan.',
        iconType: 'alert'
      }
    ],
    corruptionCases: [
      {
        name: 'Korupsi Tata Niaga Komoditas Timah Wilayah IUP PT Timah Tbk 2015-2022',
        year: 2024,
        courtDocketNumber: 'Perkara Tipikor No. 70/Pid.Sus-TPK/2024/PN Jkt.Pst',
        summary: 'Penyelenggaraan kerja sama peleburan timah ilegal, manipulasi penerbitan Rencana Kerja dan Anggaran Biaya (RKAB), serta pencucian uang lewat transaksi valas fiktif.',
        lawsBreached: [
          'Pasal 2 ayat (1) jo Pasal 18 UU Tipikor',
          'Pasal 3 UU No. 8/2010 TPPU',
          'Pasal 55 ayat (1) ke-1 KUHP'
        ],
        sentenceYears: 12,
        fineAmount: 1000000000,
        restitutionAmount: 420000000000
      }
    ],
    stateLoss: {
      totalAmount: 300003000000000,
      totalFormatted: 'Rp 300,0 Triliun',
      breakdown: [
        { label: 'Kerugian Keuangan Negara Riil BPKP', amount: 29000000000000, notes: 'Biaya sewa smelter fiktif dan pembelian bijih timah ilegal' },
        { label: 'Kerugian Kerusakan Ekologis & Rehabilitasi Lingkungan', amount: 271003000000000, notes: 'Perhitungan dampak ekologis jangka panjang oleh BPKP dan IPB' }
      ],
      assetRecovered: 6800000000000,
      recoveryRatePercent: 2.27
    },
    careerHistory: [
      {
        role: 'Pengusaha Tambang & Perwakilan Pemilik Modal',
        organization: 'PT Refined Bangka Tin & Multi Corp Holding',
        period: '2015 — 2024',
        isCorruptionPeriod: true,
        description: 'Mengelola portofolio pertambangan timah dan batubara di wilayah Sumatera dan Kalimantan.'
      },
      {
        role: 'Terdakwa & Warga Binaan',
        organization: 'Rumah Tahanan Negara Salemba Kejaksaan Agung',
        period: 'Maret 2024 — Sekarang',
        description: 'Menjalani proses hukum dan persidangan di Pengadilan Tindak Pidana Korupsi Jakarta Pusat.'
      }
    ],
    communityUpdatesCount: 15,
    lastUpdatedDate: '18 Februari 2025',
    verifiedSourceUrl: 'https://kejaksaan.go.id'
  },
  {
    id: 'juliari-batubara',
    name: 'Juliari Peter Batubara',
    alias: 'JPB',
    avatarUrl: '/src/assets/images/portrait_bureaucrat_dewi_1793617501261.jpg',
    bannerUrl: BANNER_IMAGE,
    pastPosition: 'Menteri Sosial RI (2019–2020) & Wakil Bendahara Umum DPP PDI Perjuangan',
    currentPosition: 'Menjalani Vonis 12 Tahun di Lapas Kelas I Sukamiskin · Aktif di Kegiatan Keagamaan Lapas',
    currentPositionStatus: 'resmi',
    currentOrganization: 'Lapas Sukamiskin Bandung / Yayasan Keluarga',
    legalStatus: 'menjalani_hukuman',
    legalStatusLabel: 'Menjalani Vonis 12 Tahun Penjara',
    sentenceDuration: '12 th',
    location: 'Bandung, Jawa Barat',
    sector: 'sosial_kesehatan',
    sectorLabel: 'Bansos & Kesehatan',
    twoKeyPoints: [
      'Menetapkan pungutan fee komitmen sebesar Rp 10.000 per paket sembako bantuan sosial Covid-19 bagi warga miskin di wilayah Jabodetabek saat puncak pandemi.',
      'Vonis Pengadilan Tipikor Jakarta Pusat No. 29/Pid.Sus-TPK/2021/PN.Jkt.Pst menjatuhkan hukuman 12 tahun penjara, denda Rp 500 juta, uang pengganti Rp 14,5 Miliar, dan pencabutan hak politik 4 tahun.'
    ],
    achievements: [
      {
        title: 'Pemotongan Anggaran Bansos Kemanusiaan Paling Disorot',
        issuerOrYear: 'Operasi Tangkap Tangan KPK (Desember 2020)',
        metricHighlight: 'Rp 10.000',
        description: 'Memanfaatkan celah darurat bencana non-alam Covid-19 untuk menarik upeti dari setiap kardus sembako beras, sarden, dan minyak goreng.',
        iconType: 'trophy'
      },
      {
        title: 'Total Akumulasi Fee Bansos Terkumpul',
        issuerOrYear: 'Dakwaan Jaksa Penuntut Umum KPK',
        metricHighlight: 'Rp 32,48 M',
        description: 'Uang diserahkan dalam koper dan tas ransel valuta asing melalui perantara pejabat pembuat komitmen (PPK) Matheus Joko Santoso.',
        iconType: 'dollar'
      },
      {
        title: 'Pencabutan Hak Dipilih dalam Jabatan Publik',
        issuerOrYear: 'Vonis Majelis Hakim Tipikor',
        metricHighlight: 'Rp 14,59 M',
        description: 'Kewajiban bayar uang pengganti tindak pidana korupsi serta sanksi pencabutan hak politik.',
        iconType: 'scale'
      }
    ],
    corruptionCases: [
      {
        name: 'Suap Pengadaan Paket Bantuan Sosial Penanganan Covid-19 Jabodetabek',
        year: 2020,
        courtDocketNumber: 'Putusan PN Jakarta Pusat No. 29/Pid.Sus-TPK/2021/PN.Jkt.Pst',
        summary: 'Penerimaan suap berkala dari Harry Van Sidabukke dan Ardian Iskandar Maddanatja untuk penunjukan vendor penyedia bansos sembako.',
        lawsBreached: [
          'Pasal 12 huruf (a) UU No. 31/1999 tentang Tipikor',
          'Pasal 55 ayat (1) ke-1 KUHP jo Pasal 64 ayat (1) KUHP'
        ],
        sentenceYears: 12,
        fineAmount: 500000000,
        restitutionAmount: 14597450000
      }
    ],
    stateLoss: {
      totalAmount: 32482000000,
      totalFormatted: 'Rp 32,48 Miliar',
      breakdown: [
        { label: 'Suap Tunai yang Diterima Melalui PPK', amount: 32482000000, notes: 'Uang pelicin penunjukan PT Tiga Pilar Agro Utama dan rekanan vendor' },
        { label: 'Uang Pengganti Kerugian Pribadi Wajib Setor', amount: 14597450000, notes: 'Telah disetor sebagian melalui lelang aset KPK' }
      ],
      assetRecovered: 14597450000,
      recoveryRatePercent: 44.9
    },
    careerHistory: [
      {
        role: 'Menteri Sosial Republik Indonesia',
        organization: 'Kementerian Sosial Kabinet Indonesia Maju',
        period: 'Oktober 2019 — Desember 2020',
        isCorruptionPeriod: true,
        description: 'Bertanggung jawab atas penyaluran jaring pengaman sosial nasional selama pandemi.'
      },
      {
        role: 'Anggota DPR RI Komisi VI',
        organization: 'Fraksi PDI Perjuangan DPR RI',
        period: '2014 — 2019',
        description: 'Mewakili daerah pemilihan Jawa Tengah I.'
      },
      {
        role: 'Warga Binaan Pemasyarakatan',
        organization: 'Lapas Sukamiskin Bandung',
        period: '2021 — Sekarang',
        description: 'Menjalani masa kurungan badan 12 tahun.'
      }
    ],
    communityUpdatesCount: 6,
    lastUpdatedDate: '05 September 2024',
    verifiedSourceUrl: 'https://kpk.go.id'
  },
  {
    id: 'setya-novanto',
    name: 'Setya Novanto',
    alias: 'Setnov / Papa Minta Saham',
    avatarUrl: '/src/assets/images/portrait_speaker_setnov_1793618021182.jpg',
    bannerUrl: BANNER_IMAGE,
    pastPosition: 'Ketua DPR RI (2014–2017) & Ketua Umum DPP Partai Golkar',
    currentPosition: 'Menjalani Pidana di Lapas Sukamiskin · Mengajukan Remisi & Pembebasan Bersyarat 2024',
    currentPositionStatus: 'laporan_komunitas_terverifikasi',
    currentOrganization: 'Lapas Kelas I Sukamiskin Bandung / Holding Bisnis Keluarga',
    legalStatus: 'menjalani_hukuman',
    legalStatusLabel: 'Menjalani Vonis 15 Tahun Penjara',
    sentenceDuration: '15 th',
    location: 'Bandung, Jawa Barat',
    sector: 'bumn_infrastruktur',
    sectorLabel: 'Pengadaan & Infrastruktur Publik',
    twoKeyPoints: [
      'Mengatur pengalokasian anggaran Rp 5,9 Triliun untuk proyek e-KTP nasional di DPR RI dengan skema kongkalikong konsorsium PNRI dan pembagian fee 51% untuk birokrasi/DPR.',
      'Vonis Mahkamah Agung Nomor 2055 K/Pid.Sus/2018 menghukum 15 tahun penjara, denda Rp 500 juta, uang pengganti US$ 7,3 Juta, serta pencabutan hak politik 5 tahun.'
    ],
    achievements: [
      {
        title: 'Kerugian Negara Proyek e-KTP Nasional',
        issuerOrYear: 'Penyidikan KPK RI (November 2017)',
        metricHighlight: 'Rp 2,31 T',
        description: 'Mengatur alokasi anggaran Rp 5,9 Triliun proyek e-KTP nasional di DPR RI dengan pembagian fee kongkalikong konsorsium.',
        iconType: 'trophy'
      },
      {
        title: 'Penerima Jam Tangan Richard Mille RM 011 Termahal',
        issuerOrYear: 'Fakta Sidang Tipikor Jakarta Pusat',
        metricHighlight: 'US$ 135.000',
        description: 'Hadiah jam tangan mewah dari Andi Agustinus alias Andi Narogong dan Johannes Marliem sebagai uang terima kasih kelancaran anggaran DPR.',
        iconType: 'dollar'
      },
      {
        title: 'Kewajiban Uang Pengganti Pribadi Ke Kas Negara',
        issuerOrYear: 'Putusan Kasasi Mahkamah Agung',
        metricHighlight: 'Rp 104 M',
        description: 'Kewajiban setor uang pengganti US$ 7,3 juta yang sebagian dicicil melalui penjualan aset tanah dan rumah.',
        iconType: 'alert'
      }
    ],
    corruptionCases: [
      {
        name: 'Korupsi Proyek Penerapan Kartu Tanda Penduduk Berbasis NIK (e-KTP)',
        year: 2017,
        courtDocketNumber: 'Putusan MA No. 2055 K/Pid.Sus/2018 Jo. No. 130/Pid.Sus-TPK/2017/PN Jkt.Pst',
        summary: 'Penyalahgunaan wewenang pimpinan fraksi dan ketua DPR dalam pembahasan dan pengesahan anggaran e-KTP di Komisi II DPR RI.',
        lawsBreached: [
          'Pasal 3 jo Pasal 18 UU No. 31/1999 tentang Tipikor',
          'Pasal 55 ayat (1) ke-1 KUHP'
        ],
        sentenceYears: 15,
        fineAmount: 500000000,
        restitutionAmount: 104000000000
      }
    ],
    stateLoss: {
      totalAmount: 2314904234275,
      totalFormatted: 'Rp 2,31 Triliun',
      breakdown: [
        { label: 'Kerugian Keuangan Negara Proyek e-KTP', amount: 2314904234275, notes: 'Audit BPKP diserahkan dalam dakwaan KPK' },
        { label: 'Bagian Uang Pengganti Pribadi US$ 7,3 Juta', amount: 104000000000, notes: 'Sebagian dicicil melalui penjualan rumah di Kupang' }
      ],
      assetRecovered: 64000000000,
      recoveryRatePercent: 2.76
    },
    careerHistory: [
      {
        role: 'Ketua Dewan Perwakilan Rakyat Republik Indonesia (DPR RI)',
        organization: 'Parlemen Republik Indonesia',
        period: '2014 — 2017',
        isCorruptionPeriod: true,
        description: 'Memimpin lembaga legislatif tertinggi negara.'
      },
      {
        role: 'Ketua Umum Dewan Pimpinan Pusat Partai Golkar',
        organization: 'DPP Partai Golkar',
        period: '2016 — 2017',
        description: 'Pucuk kepemimpinan partai politik berlambang beringin.'
      },
      {
        role: 'Warga Binaan Pemasyarakatan',
        organization: 'Lapas Kelas I Sukamiskin',
        period: '2018 — Sekarang',
        description: 'Menjalani masa kurungan badan dan mengajukan peninjauan kembali (PK).'
      }
    ],
    communityUpdatesCount: 11,
    lastUpdatedDate: '19 November 2024',
    verifiedSourceUrl: 'https://kpk.go.id'
  },
  {
    id: 'rafael-alun',
    name: 'Rafael Alun Trisambodo',
    alias: 'RAT',
    avatarUrl: '/src/assets/images/portrait_official_alun_1793618021292.jpg',
    bannerUrl: BANNER_IMAGE,
    pastPosition: 'Kepala Bagian Umum Kantor Wilayah DJP Jakarta Selatan II',
    currentPosition: 'Terpidana Lapas Sukamiskin · Laporan Komunitas: Aset Resto Bilik Kayu Masih Beroperasi',
    currentPositionStatus: 'laporan_komunitas_terverifikasi',
    currentOrganization: 'Lapas Sukamiskin / Usaha Restoran & Penginapan Keluarga',
    legalStatus: 'menjalani_hukuman',
    legalStatusLabel: 'Menjalani Vonis 14 Tahun Penjara',
    sentenceDuration: '14 th',
    location: 'Bandung, Jawa Barat',
    sector: 'keuangan_pajak',
    sectorLabel: 'Pajak & Keuangan Negara',
    twoKeyPoints: [
      'Menerima gratifikasi sebesar Rp 10 Miliar melalui perusahaan konsultan pajak PT Artha Mega Ekadhana (PT AME) dari para wajib pajak bermasalah.',
      'Melakukan pencucian uang (TPPU) hingga Rp 100 Miliar dengan membeli 20 bidang tanah mewah, safe deposit box berisi emas batangan, dan puluhan tas Hermes.'
    ],
    achievements: [
      {
        title: 'Pemicu Gerakan Bongkar LHKPN Pejabat Pajak',
        issuerOrYear: 'Skandal Viral Nasional (Maret 2023)',
        metricHighlight: 'Rp 100 M',
        description: 'Buntut pamer mobil mewah anaknya memicu penyitaan aset pencucian uang senilai Rp 100 miliar dan audit massal 13.000 pegawai.',
        iconType: 'trophy'
      },
      {
        title: 'Penyitaan Brankas Emas & Valas Tersembunyi',
        issuerOrYear: 'Penggeledahan KPK RI',
        metricHighlight: 'Rp 37 M',
        description: 'Ditemukan safe deposit box di bank BUMN berisi uang tunai mata uang dolar AS dan Singapura serta puluhan tas mewah Hermes dan Chanel.',
        iconType: 'dollar'
      }
    ],
    corruptionCases: [
      {
        name: 'Gratifikasi dan Tindak Pidana Pencucian Uang Pejabat Pajak',
        year: 2023,
        courtDocketNumber: 'Putusan MA No. 3432 K/Pid.Sus/2024 Jo. No. 75/Pid.Sus-TPK/2023/PN Jkt.Pst',
        summary: 'Penerimaan suap terselubung penanganan sengketa pajak wajib pajak korporasi melalui konsultan pajak milik keluarga.',
        lawsBreached: [
          'Pasal 12 B UU No. 31/1999 tentang Tipikor',
          'Pasal 3 ayat (1) huruf a dan c UU No. 15/2002 TPPU',
          'Pasal 3 UU No. 8/2010 TPPU'
        ],
        sentenceYears: 14,
        fineAmount: 500000000,
        restitutionAmount: 10079055504
      }
    ],
    stateLoss: {
      totalAmount: 10079055504,
      totalFormatted: 'Rp 10,07 Miliar (Gratifikasi) + Rp 100 Miliar TPPU',
      breakdown: [
        { label: 'Gratifikasi Pajak Terbukti Inkrah', amount: 10079055504, notes: 'Uang pengganti yang wajib dibayar' },
        { label: 'Total Aset TPPU Disita KPK', amount: 100000000000, notes: 'Rumah Simprug, resto, ruko Manado, dan valas' }
      ],
      assetRecovered: 67000000000,
      recoveryRatePercent: 66.5
    },
    careerHistory: [
      {
        role: 'Kabag Umum Kanwil DJP Jakarta Selatan II',
        organization: 'Direktorat Jenderal Pajak Kementerian Keuangan',
        period: '2020 — 2023',
        isCorruptionPeriod: true,
        description: 'Pejabat eselon III pembina administrasi perpajakan wilayah Jakarta Selatan.'
      },
      {
        role: 'Warga Binaan Pemasyarakatan',
        organization: 'Lembaga Pemasyarakatan Kelas I Sukamiskin',
        period: '2024 — Sekarang',
        description: 'Menjalani masa pidana 14 tahun penjara.'
      }
    ],
    communityUpdatesCount: 7,
    lastUpdatedDate: '08 Januari 2025',
    verifiedSourceUrl: 'https://kpk.go.id'
  },
  {
    id: 'harun-masiku',
    name: 'Harun Masiku',
    alias: 'HM / Buronan Abadi',
    avatarUrl: '',
    bannerUrl: BANNER_IMAGE,
    pastPosition: 'Calon Anggota Legislatif PDI Perjuangan DPR RI Dapil Sumsel I (2019)',
    currentPosition: 'Buronan / Masuk Daftar Pencarian Orang (DPO) KPK & Red Notice Interpol',
    currentPositionStatus: 'resmi',
    currentOrganization: 'Daftar Pencarian Orang Internasional (Interpol Red Notice)',
    legalStatus: 'buron_dpo',
    legalStatusLabel: 'Buronan DPO KPK (Sejak Jan 2020)',
    sentenceDuration: 'Buron 5 th',
    location: 'Lokasi Belum Diketahui (Diduga Berpindah Luar/Dalam Negeri)',
    sector: 'peradilan_hukum',
    sectorLabel: 'Sistem Pemilu & Peradilan',
    twoKeyPoints: [
      'Menyuap Komisioner KPU Wahyu Setiawan sebesar Rp 850 Juta melalui perantara Saeful Bahri agar ditetapkan sebagai anggota DPR RI Pergantian Antar Waktu (PAW) menggantikan Nazarudin Kiemas yang wafat.',
      'Melarikan diri sejak Operasi Tangkap Tangan (OTT) KPK pada 8 Januari 2020 dan hingga kini berstatus buronan DPO selama lebih dari 5 tahun.'
    ],
    achievements: [
      {
        title: 'Buronan Korupsi Terlama Era Modern KPK',
        issuerOrYear: 'Daftar Pencarian Orang KPK & Red Notice Interpol',
        metricHighlight: '1.800',
        description: 'Kasus pelarian 1.800 hari paling misterius dengan simpang siur rekaman CCTV bandara dan spekulasi keberadaan di luar negeri.',
        iconType: 'clock'
      },
      {
        title: 'Skandal PAW DPR Paling Dramatis',
        issuerOrYear: 'Sidang Tipikor Wahyu Setiawan (2020)',
        metricHighlight: 'Rp 850 Jt',
        description: 'Upaya mengubah penetapan perolehan suara sah KPU demi menduduki kursi parlemen pusat secara ilegal.',
        iconType: 'alert'
      }
    ],
    corruptionCases: [
      {
        name: 'Suap Penetapan Anggota DPR RI Terpilih PAW Periode 2019-2024',
        year: 2020,
        courtDocketNumber: 'DPO No. 3/Pdt/KPK/2020',
        summary: 'Pemberian suap kepada penyelenggara negara di KPU untuk membatalkan keputusan Rapat Pleno KPU soal kursi almarhum Nazarudin Kiemas.',
        lawsBreached: [
          'Pasal 5 ayat 1 huruf a UU No. 31/1999 tentang Tipikor',
          'Pasal 55 ayat 1 ke-1 KUHP'
        ],
        sentenceYears: 0,
        fineAmount: 0,
        restitutionAmount: 0
      }
    ],
    stateLoss: {
      totalAmount: 850000000,
      totalFormatted: 'Rp 850 Juta (Suap Operasional)',
      breakdown: [
        { label: 'Uang Suap untuk Komisioner KPU Wahyu Setiawan', amount: 850000000, notes: 'Disita saat OTT KPK Januari 2020' }
      ],
      assetRecovered: 850000000,
      recoveryRatePercent: 100
    },
    careerHistory: [
      {
        role: 'Caleg DPR RI Dapil Sumatera Selatan I',
        organization: 'DPP PDI Perjuangan',
        period: '2019',
        isCorruptionPeriod: true,
        description: 'Peserta pemilu legislatif 2019.'
      },
      {
        role: 'Advokat / Konsultan Hukum',
        organization: 'Kantor Advokat Swasta Jakarta',
        period: '2014 — 2019',
        description: 'Praktek hukum ketenagakerjaan dan korporasi.'
      },
      {
        role: 'Buronan Interpol & KPK',
        organization: 'Interpol Red Notice',
        period: '2020 — Sekarang',
        description: 'DPO internasional.'
      }
    ],
    communityUpdatesCount: 23,
    lastUpdatedDate: '01 Februari 2025',
    verifiedSourceUrl: 'https://kpk.go.id/id/dpo'
  }
];

export const INITIAL_COMMUNITY_UPDATES: CommunityUpdate[] = [
  {
    id: 'update-1',
    corruptorId: 'johnny-g-plate',
    corruptorName: 'Johnny Gerard Plate',
    reportedBy: 'KawalBansosNetizen',
    reportedAt: '12 Januari 2025',
    newPosition: 'Penasihat Eksternal & Komisaris Konsorsium Perkebunan',
    companyOrOrg: 'Holding Agrobisnis Keluarga di Labuan Bajo / Ende',
    location: 'Manggarai Barat, NTT',
    evidenceUrl: 'https://investigasi-publik.id/laporan/bisnis-keluarga-jgp',
    evidenceSource: 'Investigasi Media Independen Flores Post & Berkas Akta Kemenkumham',
    notes: 'Keluarga dan afiliasi bisnisnya tercatat mendirikan entitas PT baru di bidang logistik dan wisata perhotelan. Diduga memberi arahan bisnis strategis dari dalam lapas melalui keluarga inti.',
    upvotes: 42,
    flags: 2,
    status: 'verified'
  },
  {
    id: 'update-2',
    corruptorId: 'harvey-moeis',
    corruptorName: 'Harvey Moeis',
    reportedBy: 'BangkaWatch',
    reportedAt: '18 Februari 2025',
    newPosition: 'Pemilik Manfaat (UBO) Lewat Nominee Saham',
    companyOrOrg: 'Konsorsium Eksplorasi Batubara Berau & Kalsel',
    location: 'Jakarta Selatan & Kalimantan Timur',
    evidenceUrl: 'https://tempo.co/laporan-khusus-gurita-tambang',
    evidenceSource: 'Laporan Liputan Investigasi Majalah Tempo',
    notes: 'Meskipun rekening atas namanya dibekukan Kejagung, aset saham tambang batubara non-timah yang dialihkan atas nama adik kandung dan kerabat dekat masih aktif menghasilkan dividen tahunan.',
    upvotes: 89,
    flags: 3,
    status: 'verified'
  },
  {
    id: 'update-3',
    corruptorId: 'setya-novanto',
    corruptorName: 'Setya Novanto',
    reportedBy: 'CivilSocietyJabar',
    reportedAt: '19 November 2024',
    newPosition: 'Warga Binaan / Koordinator Perpustakaan Lapas Sukamiskin',
    companyOrOrg: 'Lapas Kelas I Sukamiskin Bandung',
    location: 'Bandung, Jawa Barat',
    evidenceUrl: 'https://antaranews.com/berita/kondisi-terkini-sukamiskin',
    evidenceSource: 'Siaran Pers Ditjen Pemasyarakatan Kemenimipas',
    notes: 'Mendapat remisi hari kemerdekaan dan hari raya keagamaan total 12 bulan. Sedang melengkapi syarat administratif pembebasan bersyarat (PB) dengan pelunasan denda tipikor.',
    upvotes: 35,
    flags: 1,
    status: 'verified'
  },
  {
    id: 'update-4',
    corruptorId: 'rafael-alun',
    corruptorName: 'Rafael Alun Trisambodo',
    reportedBy: 'WargaJogjaPeduli',
    reportedAt: '08 Januari 2025',
    newPosition: 'Pengelola Restoran Bilik Kayu Heritage',
    companyOrOrg: 'PT Bilik Kayu Bersaudara (Dikelola Istri & Anak)',
    location: 'Yogyakarta',
    evidenceUrl: 'https://kumparan.com/pantau-aset-sitaan-kpk',
    evidenceSource: 'Pantauan Lapangan Warga & Akun Google Maps Bisnis',
    notes: 'Restoran Bilik Kayu di Yogyakarta yang sempat disebut dalam dakwaan pencucian uang masih tetap beroperasi melayani reservasi publik dan catering.',
    upvotes: 61,
    flags: 0,
    status: 'verified'
  },
  {
    id: 'update-5',
    corruptorId: 'harun-masiku',
    corruptorName: 'Harun Masiku',
    reportedBy: 'TrackerLintasBatas',
    reportedAt: '01 Februari 2025',
    newPosition: 'Dugaan Menjadi Konsultan Bisnis Perkebunan Sawit',
    companyOrOrg: 'Perusahaan Sawit Perbatasan Malaysia - Kalimantan Barat',
    location: 'Kuching / Entikong',
    evidenceUrl: 'https://detik.com/dpo-harun-masiku-kpk',
    evidenceSource: 'Informasi Intelijen Komunitas Perbatasan & Laporan Whistleblower',
    notes: 'Informasi ini sedang diverifikasi silang dengan pihak Divisi Hubinter Polri dan KPK. Pelapor mengaku melihat figur yang menyerupai Harun di pusat perbelanjaan Sarawak.',
    upvotes: 19,
    flags: 7,
    status: 'review'
  }
];
