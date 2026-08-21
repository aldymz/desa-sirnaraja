'use client';

import { useState, useEffect } from 'react';
import { Users, Map, Image as ImageIcon, Briefcase } from 'lucide-react';

export default function AdminDashboard() {
  const [stats, setStats] = useState({ totalPenduduk: 0, totalPotensi: 0, totalAparatur: 0, totalBanners: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const [s, p, a, b] = await Promise.all([
          fetch('/api/statistik').then(r => r.json()),
          fetch('/api/potensi').then(r => r.json()),
          fetch('/api/aparatur').then(r => r.json()),
          fetch('/api/banners').then(r => r.json()),
        ]);
        setStats({
          totalPenduduk: s?.data?.total_penduduk || 0,
          totalPotensi: p?.data?.length || 0,
          totalAparatur: a?.data?.length || 0,
          totalBanners: b?.data?.length || 0,
        });
      } catch (e) { console.error(e); }
      finally { setLoading(false); }
    }
    load();
  }, []);

  const cards = [
    { label: 'Total Penduduk', value: loading ? '—' : stats.totalPenduduk.toLocaleString('id-ID'), icon: Users, grad: 'linear-gradient(135deg,#10b981,#059669)' },
    { label: 'Data Potensi & UMKM', value: loading ? '—' : stats.totalPotensi, icon: Map, grad: 'linear-gradient(135deg,#3b82f6,#2563eb)' },
    { label: 'Aparatur Desa', value: loading ? '—' : stats.totalAparatur, icon: Briefcase, grad: 'linear-gradient(135deg,#8b5cf6,#7c3aed)' },
    { label: 'Hero Banners Aktif', value: loading ? '—' : stats.totalBanners, icon: ImageIcon, grad: 'linear-gradient(135deg,#f59e0b,#d97706)' },
  ];

  return (
    <div>
      <div className="dashboard-grid">
        {cards.map(({ label, value, icon: Icon, grad }) => (
          <div key={label} className="stat-card-admin">
            <div className="stat-icon-admin" style={{ background: grad }}><Icon size={22} /></div>
            <div className="stat-info-admin">
              <p>{label}</p>
              <h3>{value}</h3>
            </div>
          </div>
        ))}
      </div>

      <div className="admin-panel">
        <div className="admin-panel-header">
          <div>
            <p className="admin-panel-title">Selamat Datang di Panel Admin</p>
            <p className="admin-panel-subtitle">Website Resmi Desa Sirnaraja</p>
          </div>
        </div>
        <p style={{ fontSize: '0.875rem', color: '#475569', lineHeight: '1.7' }}>
          Melalui dashboard ini, Anda dapat mengelola seluruh konten dinamis pada Website Resmi Desa Sirnaraja. Pilih menu di sebelah kiri untuk mulai memperbarui Identitas Desa, Struktur Organisasi, Potensi UMKM, hingga Statistik Penduduk.
        </p>
        <div className="admin-info-box" style={{ marginTop: '14px' }}>
          <strong>💡 Tips:</strong> Pastikan Anda memeriksa kembali data yang dimasukkan sebelum menyimpannya, karena data akan langsung tampil secara real-time di website publik.
        </div>
      </div>
    </div>
  );
}
