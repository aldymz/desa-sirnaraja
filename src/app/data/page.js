import { getStatistikData, getBannersData } from '@/lib/dataService';

export const metadata = {
  title: 'Data Desa',
  description: 'Statistik dan data demografis Desa Sirnaraja.',
};

export default async function DataDesaPage() {
  const statData = await getStatistikData();
  const banners = await getBannersData('data');
  const heroImage = banners?.length > 0 ? banners[0].image_url : '/images/slider1.jpeg';

  return <DataDesaContent statData={statData} heroImage={heroImage} />;
}

function DataDesaContent({ statData, heroImage }) {
  const dataKependudukan = statData?.data_kependudukan?.length > 0 ? statData.data_kependudukan : [
    { label: 'Total Penduduk', value: statData?.total_penduduk ? `${statData.total_penduduk} Jiwa` : '3.215 Jiwa', color: '#1b4332', bg: '#d1fae5' },
    { label: 'Kepala Keluarga', value: statData?.total_kk ? `${statData.total_kk} KK` : '1.259 KK', color: '#1d3557', bg: '#dbeafe' },
    { label: 'Laki-laki', value: statData?.laki_laki ? `${statData.laki_laki} Jiwa` : '1.620 Jiwa', color: '#0284c7', bg: '#e0f2fe' },
    { label: 'Perempuan', value: statData?.perempuan ? `${statData.perempuan} Jiwa` : '1.595 Jiwa', color: '#9333ea', bg: '#f3e8ff' },
    { label: 'Luas Wilayah', value: statData?.luas_wilayah || '602 Ha', color: '#d97706', bg: '#fef3c7' },
  ];

  const jenisKelamin = statData?.jenis_kelamin?.length > 0 ? statData.jenis_kelamin : [
    { label: 'Laki-laki', jumlah: statData?.laki_laki || '1.620', persen: '50.4%', color: '#3b82f6' },
    { label: 'Perempuan', jumlah: statData?.perempuan || '1.595', persen: '49.6%', color: '#ec4899' }
  ];

  const distribusiUsia = statData?.distribusi_usia || [
    { label: 'Anak-anak (0-14 thn)', jumlah: '642', persen: 20, color: '#10b981' },
    { label: 'Remaja (15-24 thn)', jumlah: '580', persen: 18, color: '#3b82f6' },
    { label: 'Dewasa Produktif (25-54 thn)', jumlah: '1.287', persen: 40, color: '#8b5cf6' },
    { label: 'Pra Lansia (55-64 thn)', jumlah: '386', persen: 12, color: '#f59e0b' },
    { label: 'Lansia (65+ thn)', jumlah: '320', persen: 10, color: '#ef4444' },
  ];

  const tingkatPendidikan = statData?.tingkat_pendidikan || [
    { label: 'Belum / Tidak Sekolah', jumlah: '385', persen: '12%' },
    { label: 'SD / Sederajat', jumlah: '963', persen: '30%' },
    { label: 'SMP / Sederajat', jumlah: '770', persen: '24%' },
    { label: 'SMA / Sederajat', jumlah: '706', persen: '22%' },
    { label: 'D1 / D2 / D3', jumlah: '128', persen: '4%' },
    { label: 'S1 / Sarjana', jumlah: '257', persen: '8%' },
  ];

  return (
    <div className="page-container">
      <div className="hero-bespoke" style={{ backgroundImage: `url("${heroImage}")` }}>
        <div className="container">
          <h1>Data Desa</h1>
          <p>Statistik kependudukan, demografi, dan informasi strategis Desa Sirnaraja yang akurat dan terbarukan.</p>
        </div>
      </div>

      <div className="container scroll-section" style={{ paddingTop: '80px', paddingBottom: '150px' }}>

        {/* Kependudukan */}
        <section id="kependudukan" style={{ marginBottom: '80px' }}>
          <h2 className="section-title-bespoke" style={{ marginBottom: '10px' }}>Data <span>Kependudukan</span></h2>
          <div className="title-underline" />
          <p style={{ color: '#64748b', marginBottom: '30px', fontSize: '0.85rem', lineHeight: '1.6' }}>Ringkasan data penduduk Desa Sirnaraja berdasarkan catatan administrasi kependudukan terbaru.</p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '15px' }}>
            {dataKependudukan.map(({ label, value, color, bg }) => (
              <div key={label} style={{ backgroundColor: '#fff', border: '1px solid #e2e8f0', borderRadius: '16px', padding: '20px 15px', textAlign: 'center', boxShadow: '0 4px 15px rgba(0,0,0,0.04)' }}>
                <div style={{ width: '40px', height: '40px', borderRadius: '50%', backgroundColor: bg, margin: '0 auto 10px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <span style={{ fontSize: '1rem' }}>👥</span>
                </div>
                <h3 style={{ fontSize: '1.1rem', color, margin: '0 0 5px', fontWeight: '800' }}>{value}</h3>
                <p style={{ color: '#64748b', margin: 0, fontSize: '0.75rem', fontWeight: '500' }}>{label}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Jenis Kelamin */}
        <section id="jenis-kelamin" style={{ marginBottom: '60px', padding: '40px', backgroundColor: '#f8fafc', borderRadius: '24px' }}>
          <h2 className="section-title-bespoke" style={{ marginBottom: '10px' }}>Distribusi <span>Jenis Kelamin</span></h2>
          <div className="title-underline" />
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginTop: '25px' }}>
            {jenisKelamin.map(({ label, jumlah, persen, color }) => (
              <div key={label} style={{ backgroundColor: '#fff', borderRadius: '16px', padding: '20px', textAlign: 'center', border: '1px solid #e2e8f0' }}>
                <h3 style={{ color, fontSize: '1.5rem', margin: '0 0 5px', fontWeight: '800' }}>{persen}</h3>
                <p style={{ color: '#0f172a', fontWeight: '700', fontSize: '0.85rem', margin: '0 0 2px' }}>{label}</p>
                <p style={{ color: '#64748b', margin: 0, fontSize: '0.75rem' }}>{jumlah} jiwa</p>
                <div style={{ marginTop: '12px', height: '6px', backgroundColor: '#f1f5f9', borderRadius: '10px', overflow: 'hidden' }}>
                  <div style={{ height: '100%', width: persen, backgroundColor: color, borderRadius: '10px' }} />
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Kelompok Usia */}
        <section id="kelompok-usia" style={{ marginBottom: '60px' }}>
          <h2 className="section-title-bespoke" style={{ marginBottom: '10px' }}>Kelompok <span>Usia</span></h2>
          <div className="title-underline" />
          <div style={{ marginTop: '25px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {distribusiUsia.map(({ label, jumlah, persen, color }) => (
              <div key={label} style={{ display: 'flex', alignItems: 'center', gap: '15px', backgroundColor: '#fff', padding: '15px 20px', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
                <span style={{ minWidth: '200px', fontWeight: '600', color: '#374151', fontSize: '0.8rem' }}>{label}</span>
                <div style={{ flex: 1, height: '8px', backgroundColor: '#f1f5f9', borderRadius: '10px', overflow: 'hidden' }}>
                  <div style={{ height: '100%', width: `${persen * 2.5}%`, backgroundColor: color, borderRadius: '10px', transition: 'width 1s ease' }} />
                </div>
                <span style={{ minWidth: '70px', textAlign: 'right', fontWeight: '700', color: '#0f172a', fontSize: '0.8rem' }}>{jumlah} jiwa</span>
                <span style={{ minWidth: '40px', textAlign: 'right', color, fontWeight: '700', fontSize: '0.8rem' }}>{persen}%</span>
              </div>
            ))}
          </div>
        </section>

        {/* Pendidikan */}
        <section id="pendidikan" style={{ padding: '40px', backgroundColor: '#f0fdf4', borderRadius: '24px' }}>
          <h2 className="section-title-bespoke" style={{ marginBottom: '10px' }}>Tingkat <span>Pendidikan</span></h2>
          <div className="title-underline" />
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', gap: '12px', marginTop: '25px' }}>
            {tingkatPendidikan.map(({ label, jumlah, persen }) => (
              <div key={label} style={{ backgroundColor: '#fff', padding: '15px 15px', borderRadius: '12px', textAlign: 'center', border: '1px solid #d1fae5', boxShadow: '0 4px 15px rgba(0,0,0,0.03)' }}>
                <h3 style={{ fontSize: '1.2rem', color: 'var(--primary-color)', margin: '0 0 3px', fontWeight: '800' }}>{persen}</h3>
                <p style={{ color: '#0f172a', fontWeight: '700', fontSize: '0.8rem', margin: '0 0 3px' }}>{jumlah} jiwa</p>
                <p style={{ color: '#64748b', margin: 0, fontSize: '0.7rem' }}>{label}</p>
              </div>
            ))}
          </div>
        </section>

      </div>
    </div>
  );
}
