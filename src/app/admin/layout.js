'use client';

import { usePathname, useRouter } from 'next/navigation';
import Link from 'next/link';
import { LayoutDashboard, FileText, Image as ImageIcon, Users, PieChart, Map, LogOut, ChevronLeft } from 'lucide-react';
import './admin.css';

const navItems = [
  { name: 'Dashboard',      path: '/admin',            icon: LayoutDashboard },
  { name: 'Identitas Desa', path: '/admin/desa',       icon: FileText },
  { name: 'Hero Banners',   path: '/admin/banners',    icon: ImageIcon },
  { name: 'Aparatur Desa',  path: '/admin/aparatur',   icon: Users },
  { name: 'Potensi & UMKM', path: '/admin/potensi',    icon: Map },
  { name: 'Statistik Desa', path: '/admin/statistik',  icon: PieChart },
];

function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' });
    router.push('/admin/login');
    router.refresh();
  };

  return (
    <aside className="admin-sidebar">
      <div className="admin-sidebar-header">
        <img src="/images/logo%20desa.png" alt="Logo Desa" style={{ width: '34px', height: '34px', objectFit: 'contain', flexShrink: 0 }} />
        <div>
          <p style={{ margin: 0, fontWeight: 700, fontSize: '0.875rem', color: '#f1f5f9', lineHeight: 1.3 }}>Admin Panel</p>
          <p style={{ margin: 0, fontSize: '0.75rem', color: '#64748b', lineHeight: 1.3 }}>Desa Sirnaraja</p>
        </div>
      </div>

      <nav className="admin-sidebar-nav">
        <p className="admin-sidebar-nav-label">Menu</p>
        {navItems.map(({ name, path, icon: Icon }) => (
          <Link key={path} href={path} className={`admin-nav-item ${pathname === path ? 'active' : ''}`}>
            <Icon size={17} />
            <span>{name}</span>
          </Link>
        ))}
      </nav>

      <div className="admin-sidebar-footer">
        <p className="admin-sidebar-nav-label">Akun</p>
        <Link href="/" className="admin-nav-item" style={{ color: '#94a3b8' }}>
          <ChevronLeft size={17} />
          <span>Kembali ke Website</span>
        </Link>
        <button onClick={handleLogout} className="admin-nav-item danger" style={{ width: '100%', marginTop: '2px' }}>
          <LogOut size={17} />
          <span>Keluar / Logout</span>
        </button>
      </div>
    </aside>
  );
}

export default function AdminLayout({ children }) {
  const pathname = usePathname();

  // Halaman login tidak pakai layout sidebar
  if (pathname === '/admin/login') {
    return <div className="admin-body">{children}</div>;
  }

  const currentPage = navItems.find(i => i.path === pathname)?.name || 'Admin Panel';

  return (
    <div className="admin-body">
      <div className="admin-layout">
        <AdminSidebar />

        <main className="admin-main">
          <header className="admin-header">
            <div>
              <p className="admin-header-title-sub">
                {navItems.find(i => i.path === pathname) ? 'Halaman Pengelolaan' : 'Panel Admin'}
              </p>
              <p className="admin-header-title-main">{currentPage}</p>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div style={{ textAlign: 'right' }}>
                <p style={{ margin: 0, fontWeight: 600, fontSize: '0.875rem', color: '#0f172a' }}>Admin Desa</p>
                <p style={{ margin: 0, fontSize: '0.75rem', color: '#64748b' }}>Pemerintah Desa Sirnaraja</p>
              </div>
              <img src="/images/logo%20desa.png" alt="Logo Desa" style={{ width: '36px', height: '36px', objectFit: 'contain', borderRadius: '50%', border: '2px solid #e2e8f0', background: '#f8fafc', padding: '2px' }} />
            </div>
          </header>

          <div className="admin-content">{children}</div>
        </main>
      </div>
    </div>
  );
}
