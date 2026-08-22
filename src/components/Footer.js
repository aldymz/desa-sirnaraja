'use client';

import { useState } from 'react';
import Link from 'next/link';
import { MapPin, Mail, Phone, Clock, X, User } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const FacebookIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
  </svg>
);

const InstagramIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
  </svg>
);

const YoutubeIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17"/>
    <path d="m10 15 5-3-5-3z"/>
  </svg>
);

const kknMembers = [
  { nama: 'Acep Naufal Fernanda', divisi: 'Ketua', prodi: 'Teknik Sipil' },
  { nama: 'Yusti Samrotussani', divisi: 'Wakil Ketua', prodi: 'PBI' },
  { nama: 'Salsabila', divisi: 'Bendahara', prodi: 'Manajemen' },
  { nama: 'Lena Marlina', divisi: 'Sekretaris', prodi: 'PGSD' },
  { nama: 'Denaila Naswa Sakira', divisi: 'Acara', prodi: 'Manajemen' },
  { nama: 'Nursabila Salamah', divisi: 'Acara', prodi: 'PGSD' },
  { nama: 'Aldi Mazmudin', divisi: 'PDD', prodi: 'Teknik Informatika' },
  { nama: 'Putri Widyanti', divisi: 'PDD', prodi: 'Manajemen' },
  { nama: 'Lisna Layinatul P', divisi: 'Humas', prodi: 'Farmasi' },
  { nama: 'Nandi Herdiana', divisi: 'Humas', prodi: 'Akuntansi' },
  { nama: 'Neng Alfi Syibila', divisi: 'Konsumsi', prodi: 'PGSD' },
  { nama: 'Faizal Muhammad Taofik', divisi: 'Konsumsi', prodi: 'Manajemen' },
  { nama: 'Farisy Audah Alfatah', divisi: 'Logistik', prodi: 'Peternakan' },
  { nama: 'Ridho Azmi Naufal', divisi: 'Logistik', prodi: 'Agroteknologi' },
];

import { usePathname } from 'next/navigation';

export default function Footer() {
  const [showKknModal, setShowKknModal] = useState(false);
  const pathname = usePathname();

  if (pathname?.startsWith('/admin')) return null;

  return (
    <>
      <footer className="footer">
        <div className="footer-container container">
          <div className="footer-col">
            <div className="footer-logo">
              <img src="/images/logo%20desa.png" alt="Logo Desa" className="logo-img-footer" />
              <h2>Desa Sirnaraja</h2>
            </div>
            <p className="footer-desc">Portal informasi desa, potensi lokal, dan pelayanan warga berbasis digital untuk kemajuan bersama.</p>
            <div className="social-icons">
              <a href="#" aria-label="Facebook"><FacebookIcon /></a>
              <a href="#" aria-label="Instagram"><InstagramIcon /></a>
              <a href="#" aria-label="Youtube"><YoutubeIcon /></a>
            </div>
          </div>

          <div className="footer-col">
            <h3>Hubungi Kami</h3>
            <ul className="footer-contact">
              <li><MapPin size={18} className="contact-icon" /><span>Sirnaraja, Kec. Cigalontang, Kabupaten Tasikmalaya, Jawa Barat 46463</span></li>
              <li><Mail size={18} className="contact-icon" /><span>pemdessirnaraja@gmail.com</span></li>
              <li><Clock size={18} className="contact-icon" /><span>Senin - Jumat: 08.00 - 16.00 WIB</span></li>
            </ul>
          </div>

          <div className="footer-col">
            <h3>Kolaborasi KKN</h3>
            <div className="kkn-box" onClick={() => setShowKknModal(true)}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                <div className="kkn-logo-placeholder"><img src="/images/logo%20kkn.PNG" alt="Logo KKN" /></div>
                <span style={{ fontWeight: '800', color: '#1b4332', fontSize: '1.2rem' }}>X</span>
                <div className="kkn-logo-placeholder"><img src="/images/logo%20desa.png" alt="Logo Desa" /></div>
              </div>
              <span className="kkn-text">KKN UNPER X Desa Sirnaraja</span>
            </div>
          </div>
        </div>

        <div className="footer-bottom container">
          <p>© {new Date().getFullYear()} Desa Sirnaraja. Hak Cipta Dilindungi.</p>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap', justifyContent: 'center' }}>
            <div className="footer-developer"><span>Dikembangkan oleh Tim KKN UNPER 2026</span></div>
            <Link href="/admin" style={{ fontSize: '0.7rem', color: '#475569', fontWeight: 500, padding: '3px 8px', borderRadius: '5px', border: '1px solid #334155', transition: 'all 0.2s', whiteSpace: 'nowrap' }}
              onMouseOver={e => { e.currentTarget.style.background = '#334155'; e.currentTarget.style.color = '#94a3b8'; }}
              onMouseOut={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#475569'; }}>
              ⚙ Admin
            </Link>
          </div>
        </div>
      </footer>

      <AnimatePresence>
        {showKknModal && (
          <div className="modal-overlay" onClick={() => setShowKknModal(false)} style={{ zIndex: 10000 }}>
            <motion.div
              className="modal-content kkn-modal"
              onClick={(e) => e.stopPropagation()}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.2 }}
            >
              <button className="modal-close-btn" onClick={() => setShowKknModal(false)}><X size={24} /></button>
              <div className="modal-body">
                <h2 style={{ fontSize: '2rem', marginBottom: '10px', color: 'var(--text-dark)', textAlign: 'center' }}>Tim KKN UNPER 2026</h2>
                <p style={{ color: '#64748b', marginBottom: '35px', textAlign: 'center' }}>Berkolaborasi membangun Desa Sirnaraja menuju masa depan yang lebih baik.</p>
                <div className="kkn-member-grid">
                  {kknMembers.map((member, idx) => (
                    <div key={idx} className="kkn-member-card">
                      <div className="kkn-avatar"><User size={20} /></div>
                      <div className="kkn-member-info">
                        <h4>{member.nama}</h4>
                        <span className="kkn-badge-divisi">{member.divisi}</span>
                        <div className="kkn-member-prodi">{member.prodi}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
