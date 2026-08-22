'use client';

import { useState, useEffect } from 'react';
import { Users, Map, ImageIcon, Briefcase, ArrowRight, BarChart2 } from 'lucide-react';
import Link from 'next/link';

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
    { label: 'Populasi', value: loading ? '—' : stats.totalPenduduk.toLocaleString('id-ID'), desc: 'Total jiwa terdaftar', icon: Users, href: '/admin/statistik' },
    { label: 'Potensi Desa', value: loading ? '—' : stats.totalPotensi, desc: 'Sektor dan UMKM', icon: Map, href: '/admin/potensi' },
    { label: 'Aparatur', value: loading ? '—' : stats.totalAparatur, desc: 'Perangkat aktif', icon: Briefcase, href: '/admin/aparatur' },
    { label: 'Publikasi', value: loading ? '—' : stats.totalBanners, desc: 'Banner utama tayang', icon: ImageIcon, href: '/admin/banners' },
  ];

  return (
    <div className="admin-dashboard-wrapper">
      
      {/* Clean, airy header */}
      <div className="dashboard-hero">
        <h1 className="dashboard-hero-title">Overview</h1>
        <p className="dashboard-hero-subtitle">
          Kelola data publikasi dan statistik operasional Desa Sirnaraja.
        </p>
      </div>

      {/* Ultra-clean stats grid */}
      <div className="dashboard-bento-grid">
        {cards.map(({ label, value, desc, icon: Icon, href }) => (
          <Link href={href} key={label} className="bento-card">
            <div className="bento-card-top">
              <span className="bento-label">{label}</span>
              <Icon size={16} className="bento-icon" />
            </div>
            <div className="bento-card-bottom">
              <h3 className="bento-value">{value}</h3>
              <p className="bento-desc">{desc}</p>
            </div>
            <div className="bento-hover-indicator">
              <ArrowRight size={14} />
            </div>
          </Link>
        ))}
      </div>

      {/* Secondary section */}
      <div className="dashboard-secondary-grid">
        <div className="bento-panel">
          <div className="bento-panel-header">
            <BarChart2 size={16} className="panel-header-icon" />
            <h2>Ringkasan Sistem</h2>
          </div>
          <div className="bento-panel-content">
            <div className="status-row">
              <div className="status-indicator online"></div>
              <span>Database terhubung secara real-time</span>
            </div>
            <div className="status-row">
              <div className="status-indicator online"></div>
              <span>Production server beroperasi normal</span>
            </div>
            <p className="status-note">
              Perubahan pada panel ini akan langsung disinkronisasi ke website utama pengguna tanpa waktu tunda.
            </p>
          </div>
        </div>
      </div>

    </div>
  );
}
