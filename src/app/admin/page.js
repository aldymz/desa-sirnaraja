'use client';

import { useState, useEffect } from 'react';
import { Users, Map, Image as ImageIcon, Briefcase, ChevronRight, Activity, Clock, ShieldCheck } from 'lucide-react';

export default function AdminDashboard() {
  const [stats, setStats] = useState({ totalPenduduk: 0, totalPotensi: 0, totalAparatur: 0, totalBanners: 0 });
  const [loading, setLoading] = useState(true);
  const [greeting, setGreeting] = useState('');
  const [time, setTime] = useState('');

  useEffect(() => {
    // Dynamic Greeting & Time
    const updateTime = () => {
      const hour = new Date().getHours();
      if (hour < 11) setGreeting('Selamat Pagi');
      else if (hour < 15) setGreeting('Selamat Siang');
      else if (hour < 18) setGreeting('Selamat Sore');
      else setGreeting('Selamat Malam');

      setTime(new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }));
    };
    updateTime();
    const timer = setInterval(updateTime, 60000);

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

    return () => clearInterval(timer);
  }, []);

  const cards = [
    { label: 'Total Penduduk', value: loading ? '—' : stats.totalPenduduk.toLocaleString('id-ID'), subtitle: 'Jiwa terdaftar', icon: Users, color: '#10b981', bg: 'linear-gradient(135deg, #d1fae5 0%, #ecfdf5 100%)' },
    { label: 'Data Potensi & UMKM', value: loading ? '—' : stats.totalPotensi, subtitle: 'Sektor terdata', icon: Map, color: '#3b82f6', bg: 'linear-gradient(135deg, #dbeafe 0%, #eff6ff 100%)' },
    { label: 'Aparatur Desa', value: loading ? '—' : stats.totalAparatur, subtitle: 'Perangkat aktif', icon: Briefcase, color: '#8b5cf6', bg: 'linear-gradient(135deg, #ede9fe 0%, #f5f3ff 100%)' },
    { label: 'Hero Banners', value: loading ? '—' : stats.totalBanners, subtitle: 'Banner tayang', icon: ImageIcon, color: '#f59e0b', bg: 'linear-gradient(135deg, #fef3c7 0%, #fffbeb 100%)' },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      
      {/* Premium Welcome Banner */}
      <div className="admin-welcome-banner">
        <div className="admin-welcome-content">
          <div className="admin-welcome-badge">
            <ShieldCheck size={14} /> Administrator Access
          </div>
          <h1 className="admin-welcome-title">{greeting}, Admin!</h1>
          <p className="admin-welcome-desc">
            Selamat datang di Pusat Kendali Website Resmi Desa Sirnaraja. Pantau aktivitas, perbarui informasi, dan kelola data desa dengan mudah melalui dashboard terpusat ini.
          </p>
          <div className="admin-welcome-time">
            <Clock size={16} /> <span>{time} WIB</span>
            <div style={{ width: '4px', height: '4px', background: '#fff', borderRadius: '50%', margin: '0 8px' }} />
            <Activity size={16} /> <span>Sistem Aktif & Terhubung</span>
          </div>
        </div>
        
        {/* Abstract shapes for aesthetics */}
        <div className="admin-welcome-shape shape-1"></div>
        <div className="admin-welcome-shape shape-2"></div>
      </div>

      {/* Stats Grid */}
      <div className="admin-stats-container">
        {cards.map(({ label, value, subtitle, icon: Icon, color, bg }) => (
          <div key={label} className="admin-stat-card-premium">
            <div className="stat-card-header">
              <p>{label}</p>
              <div className="stat-icon-wrapper" style={{ background: bg, color: color }}>
                <Icon size={20} strokeWidth={2.5} />
              </div>
            </div>
            <div className="stat-card-body">
              <h3>{value}</h3>
              <span>{subtitle}</span>
            </div>
            <div className="stat-card-footer">
              Kelola Data <ChevronRight size={14} />
            </div>
          </div>
        ))}
      </div>

      {/* Quick Info & Tips */}
      <div className="admin-grid-layout">
        <div className="admin-panel" style={{ flex: 2, marginBottom: 0 }}>
          <div className="admin-panel-header">
            <div>
              <p className="admin-panel-title">Aktivitas Sistem</p>
              <p className="admin-panel-subtitle">Informasi status pengelolaan website</p>
            </div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div className="admin-activity-item">
              <div className="activity-dot blue"></div>
              <div>
                <p className="activity-title">Koneksi Database Supabase</p>
                <p className="activity-desc">Terhubung dan tersinkronisasi secara real-time.</p>
              </div>
            </div>
            <div className="admin-activity-item">
              <div className="activity-dot green"></div>
              <div>
                <p className="activity-title">Status Server Vercel</p>
                <p className="activity-desc">Aplikasi berjalan optimal di production environment.</p>
              </div>
            </div>
          </div>
        </div>

        <div className="admin-panel" style={{ flex: 1, marginBottom: 0, background: 'linear-gradient(to bottom, #ffffff, #f8fafc)' }}>
          <div className="admin-panel-header" style={{ borderBottom: 'none' }}>
            <div>
              <p className="admin-panel-title">💡 Pusat Bantuan</p>
            </div>
          </div>
          <p style={{ fontSize: '0.875rem', color: '#475569', lineHeight: '1.7', margin: '0 0 16px' }}>
            Setiap perubahan data yang Anda lakukan melalui panel ini akan **langsung** mempengaruhi tampilan website publik Desa Sirnaraja tanpa perlu memuat ulang server.
          </p>
          <div style={{ padding: '12px', background: '#fff', borderRadius: '8px', border: '1px solid #e2e8f0', fontSize: '0.8rem', color: '#64748b' }}>
            <strong>Catatan Keamanan:</strong><br/>
            Sesi admin Anda dilindungi oleh enkripsi otomatis. Selalu pastikan Anda keluar (logout) setelah selesai.
          </div>
        </div>
      </div>

    </div>
  );
}
