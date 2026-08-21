'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, ChevronDown, Home, Users, BarChart2, Leaf, Phone } from 'lucide-react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
    setActiveDropdown(null);
  }, [pathname]);

  useEffect(() => {
    if (isOpen) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = '';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  const handleDropdown = (name) => {
    if (window.innerWidth <= 768) {
      setActiveDropdown(activeDropdown === name ? null : name);
    }
  };

  if (pathname?.startsWith('/admin')) return null;

  return (
    <>
      <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
        <div className="navbar-container container">
          <Link href="/" className="navbar-logo">
            <img src="/images/logo%20desa.png" alt="Logo Desa Sirnaraja" className="logo-img" />
            <span>Sirnaraja</span>
          </Link>

          <div className="menu-icon" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </div>

          <ul className={isOpen ? 'nav-menu active' : 'nav-menu'}>
            {/* Sidebar Header */}
            <li className="mobile-sidebar-header">
              <div className="mobile-sidebar-brand">
                <img src="/images/logo%20desa.png" alt="Logo" className="mobile-sidebar-logo" />
                <div>
                  <div className="mobile-sidebar-title">Desa Sirnaraja</div>
                  <div className="mobile-sidebar-sub">Kec. Cigalontang, Tasikmalaya</div>
                </div>
              </div>
              <div className="mobile-sidebar-divider" />
            </li>

            <li className="nav-item">
              <Link href="/" className={`nav-links mobile-nav-link ${pathname === '/' ? 'active-link' : ''}`}>
                <span className="mobile-nav-icon"><Home size={18} /></span>
                Beranda
              </Link>
            </li>

            <li
              className="nav-item dropdown"
              onMouseEnter={() => window.innerWidth > 768 && setActiveDropdown('profil')}
              onMouseLeave={() => window.innerWidth > 768 && setActiveDropdown(null)}
            >
              <div className={`nav-links dropdown-toggle mobile-nav-link ${pathname.includes('/profil') ? 'active-link' : ''}`} onClick={() => handleDropdown('profil')}>
                <span className="mobile-nav-icon"><Users size={18} /></span>
                Profil Desa <ChevronDown size={16} className={`chevron ${activeDropdown === 'profil' ? 'rotate' : ''}`} />
              </div>
              <ul className={`dropdown-menu ${activeDropdown === 'profil' ? 'show' : ''}`}>
                <li><Link href="/profil#gambaran-umum">Gambaran Umum</Link></li>
                <li><Link href="/profil#visi-misi">Visi dan Misi</Link></li>
                <li><Link href="/profil#geografi">Geografi</Link></li>
                <li><Link href="/profil#struktur">Struktur Organisasi</Link></li>
              </ul>
            </li>

            <li
              className="nav-item dropdown"
              onMouseEnter={() => window.innerWidth > 768 && setActiveDropdown('data')}
              onMouseLeave={() => window.innerWidth > 768 && setActiveDropdown(null)}
            >
              <div className={`nav-links dropdown-toggle mobile-nav-link ${pathname.includes('/data') ? 'active-link' : ''}`} onClick={() => handleDropdown('data')}>
                <span className="mobile-nav-icon"><BarChart2 size={18} /></span>
                Data Desa <ChevronDown size={16} className={`chevron ${activeDropdown === 'data' ? 'rotate' : ''}`} />
              </div>
              <ul className={`dropdown-menu ${activeDropdown === 'data' ? 'show' : ''}`}>
                <li><Link href="/data#kependudukan">Kependudukan</Link></li>
                <li><Link href="/data#jenis-kelamin">Jenis Kelamin</Link></li>
                <li><Link href="/data#kelompok-usia">Kelompok Usia</Link></li>
                <li><Link href="/data#pendidikan">Pendidikan</Link></li>
              </ul>
            </li>

            <li
              className="nav-item dropdown"
              onMouseEnter={() => window.innerWidth > 768 && setActiveDropdown('potensi')}
              onMouseLeave={() => window.innerWidth > 768 && setActiveDropdown(null)}
            >
              <div className={`nav-links dropdown-toggle mobile-nav-link ${pathname.includes('/potensi') ? 'active-link' : ''}`} onClick={() => handleDropdown('potensi')}>
                <span className="mobile-nav-icon"><Leaf size={18} /></span>
                Potensi Desa <ChevronDown size={16} className={`chevron ${activeDropdown === 'potensi' ? 'rotate' : ''}`} />
              </div>
              <ul className={`dropdown-menu ${activeDropdown === 'potensi' ? 'show' : ''}`}>
                <li><Link href="/potensi#pertanian">Pertanian</Link></li>
                <li><Link href="/potensi#peternakan">Peternakan</Link></li>
                <li><Link href="/potensi#umkm">UMKM</Link></li>
                <li><Link href="/potensi#budaya">Budaya</Link></li>
              </ul>
            </li>

            <li className="nav-item">
              <Link href="/contact" className={`nav-links mobile-nav-link ${pathname === '/contact' ? 'active-link' : ''}`}>
                <span className="mobile-nav-icon"><Phone size={18} /></span>
                Hubungi Kami
              </Link>
            </li>

            {/* Sidebar Footer */}
            <li className="mobile-sidebar-footer">
              <div className="mobile-sidebar-divider" style={{ marginBottom: '16px' }} />
              <p>© 2024 Pemerintah Desa Sirnaraja</p>
            </li>
          </ul>

          {/* Dark overlay saat sidebar terbuka */}
          {isOpen && <div className="mobile-overlay" onClick={() => setIsOpen(false)} />}
        </div>
      </nav>
    </>
  );
}
