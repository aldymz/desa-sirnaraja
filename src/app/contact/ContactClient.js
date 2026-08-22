'use client';

import { useEffect } from 'react';
import { MapPin, Mail, Clock } from 'lucide-react';
import { motion } from 'framer-motion';

const cards = [
  { icon: MapPin, title: 'Alamat Balai Desa', key: 'alamat', bg: '#f0fdf4', color: 'var(--primary-color)' },
  { icon: Mail, title: 'Surat Elektronik', key: 'email', bg: '#f0fdf4', color: 'var(--primary-color)' },
  { icon: Clock, title: 'Jam Pelayanan', value: 'Senin - Jumat: 08.00 - 16.00 WIB\nSabtu & Minggu: Tutup', bg: '#f8fafc', color: '#64748b' },
];

export default function ContactClient({ desaData }) {
  useEffect(() => { window.scrollTo(0, 0); }, []);

  const kontak = desaData?.kontak || {};

  return (
    <div className="page-container">
      <div className="hero-bespoke" style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1596524430615-b46475ddff6e?q=80&w=2070&auto=format&fit=crop")' }}>
        <motion.div className="container" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
          <h1>Layanan Informasi</h1>
          <p>Saluran komunikasi langsung yang responsif dan terintegrasi dengan aparatur Pemerintahan Desa Sirnaraja.</p>
        </motion.div>
      </div>

      <div className="container scroll-section" style={{ paddingTop: '80px', paddingBottom: '150px' }}>
        <div style={{ textAlign: 'center', marginBottom: '60px', maxWidth: '700px', margin: '0 auto 60px' }}>
          <motion.h2 className="section-title-bespoke" style={{ marginBottom: '20px' }} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            Informasi <span>Kontak</span>
          </motion.h2>
          <motion.p style={{ color: '#64748b', lineHeight: '1.8', fontSize: '0.9rem' }} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}>
            Pintu Balai Desa selalu terbuka untuk Anda. Kunjungi kami secara langsung atau hubungi melalui saluran digital resmi.
          </motion.p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '30px', maxWidth: '1100px', margin: '0 auto' }}>
          {cards.map(({ icon: Icon, title, key, value, bg, color }, i) => (
            <motion.div
              key={title}
              style={{ backgroundColor: '#ffffff', padding: '40px 30px', borderRadius: '24px', boxShadow: '0 10px 30px rgba(0,0,0,0.04)', border: '1px solid #f1f5f9', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', transition: 'transform 0.3s ease, box-shadow 0.3s ease' }}
              initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.1 }}
              onMouseOver={e => { e.currentTarget.style.transform = 'translateY(-5px)'; e.currentTarget.style.boxShadow = '0 20px 40px rgba(0,0,0,0.08)'; }}
              onMouseOut={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 10px 30px rgba(0,0,0,0.04)'; }}
            >
              <div style={{ padding: '20px', backgroundColor: bg, borderRadius: '50%', color, marginBottom: '20px' }}>
                <Icon size={36} />
              </div>
              <h4 style={{ margin: '0 0 15px', fontSize: '0.95rem', color: 'var(--text-dark)' }}>{title}</h4>
              <p style={{ margin: 0, color: '#64748b', lineHeight: '1.6', whiteSpace: 'pre-line' }}>
                {value || (key ? kontak[key] : '')}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
