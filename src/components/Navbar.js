'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, ChevronDown } from 'lucide-react';

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

  const handleDropdown = (name) => {
    if (window.innerWidth <= 768) {
      setActiveDropdown(activeDropdown === name ? null : name);
    }
  };

  if (pathname?.startsWith('/admin')) return null;

  return (
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
          <li className="nav-item">
            <Link href="/" className={`nav-links ${pathname === '/' ? 'active-link' : ''}`}>Beranda</Link>
          </li>

          <li
            className="nav-item dropdown"
            onMouseEnter={() => window.innerWidth > 768 && setActiveDropdown('profil')}
            onMouseLeave={() => window.innerWidth > 768 && setActiveDropdown(null)}
          >
            <div className={`nav-links dropdown-toggle ${pathname.includes('/profil') ? 'active-link' : ''}`} onClick={() => handleDropdown('profil')}>
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
            <div className={`nav-links dropdown-toggle ${pathname.includes('/data') ? 'active-link' : ''}`} onClick={() => handleDropdown('data')}>
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
            <div className={`nav-links dropdown-toggle ${pathname.includes('/potensi') ? 'active-link' : ''}`} onClick={() => handleDropdown('potensi')}>
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
            <Link href="/contact" className={`nav-links ${pathname === '/contact' ? 'active-link' : ''}`}>Hubungi Kami</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}
