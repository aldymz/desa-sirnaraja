'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowRight, Users, Map, BookOpen, X } from 'lucide-react';
import { motion } from 'framer-motion';

const bgImages = [
  '/images/slider1.jpeg',
  '/images/slider2.jpeg',
  '/images/slider3.jpeg',
];

export default function HomeClient({ desaData, potensiData, banners, statData }) {
  const [currentBg, setCurrentBg] = useState(0);
  const [selectedPotensi, setSelectedPotensi] = useState(null);

  const dynamicBgImages = banners?.length > 0 ? banners.map(b => b.image_url) : bgImages;

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentBg((prev) => (prev + 1) % dynamicBgImages.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [dynamicBgImages.length]);

  return (
    <div className="home-container">
      {/* Hero Slider */}
      <section className="hero-section">
        <div className="hero-slider" style={{ transform: `translateX(-${currentBg * 100}%)` }}>
          {dynamicBgImages.map((img, i) => (
            <div key={i} className="hero-slide" style={{ backgroundImage: `url(${img})` }} />
          ))}
        </div>
        <div className="hero-overlay" />
        <motion.div
          className="hero-content container"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1>Selamat Datang di {desaData?.nama || 'Desa Sirnaraja'}</h1>
          <p>{desaData?.slogan || 'Portal informasi resmi pemerintah desa, mewujudkan desa digital yang transparan, inovatif, dan mandiri.'}</p>
          <div className="hero-buttons">
            <Link href="/profil" className="btn btn-primary">Jelajahi Profil</Link>
            <Link href="/potensi" className="btn btn-outline">Lihat Potensi</Link>
          </div>
        </motion.div>
      </section>

      {/* Statistik */}
      <section className="stats-section">
        <div className="container">
          <motion.div
            className="stats-grid"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="stat-card">
              <Users size={40} className="stat-icon" />
              <h3>{statData?.total_penduduk ? `${statData.total_penduduk} Jiwa` : (desaData?.populasi || '3.215 Jiwa')}</h3>
              <p>Total Penduduk</p>
            </div>
            <div className="stat-card">
              <Map size={40} className="stat-icon" />
              <h3>{statData?.luas_wilayah || desaData?.luas_wilayah || desaData?.luasWilayah || '602 Ha'}</h3>
              <p>Luas Wilayah</p>
            </div>
            <div className="stat-card">
              <BookOpen size={40} className="stat-icon" />
              <h3>{statData?.total_kk ? `${statData.total_kk} KK` : '1.259 KK'}</h3>
              <p>Kepala Keluarga</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Tentang */}
      <section className="about-section section-padding">
        <div className="container">
          <div className="about-grid">
            <motion.div className="about-text" initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
              <h2>Tentang Desa Kami</h2>
              <div className="title-underline" />
              <p>{desaData.deskripsi}</p>
              <Link href="/profil" className="read-more">Baca Selengkapnya <ArrowRight size={18} /></Link>
            </motion.div>
            <motion.div className="about-image" initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
              <div className="kades-card">
                <div className="kades-card-header">
                  <span>Pemerintah Desa Sirnaraja</span>
                </div>
                <img src="/images/kepaladesa.jpeg" alt="Kepala Desa Sirnaraja" />
                <div className="kades-card-footer">
                  <h4>Asep Yuyun Yuliana</h4>
                  <p>Kepala Desa Sirnaraja</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Potensi Highlight */}
      <section className="potensi-section section-padding bg-light">
        <div className="container">
          <div className="section-header">
            <h2>Potensi Unggulan</h2>
            <div className="title-underline center" />
            <p>Mengenal lebih dekat potensi sumber daya alam dan UMKM penggerak ekonomi desa.</p>
          </div>
          <div className="potensi-grid">
            {(potensiData || []).slice(0, 3).map((item, index) => (
              <motion.div
                key={item.id}
                className="potensi-card"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.15 }}
              >
                <div className="potensi-img-wrapper">
                  <img src={item.image_url || item.image} alt={item.judul} />
                </div>
                <div className="potensi-info">
                  <h3>{item.judul}</h3>
                  <p>{item.deskripsi}</p>
                  <button type="button" onClick={() => setSelectedPotensi(item)} className="card-link" style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '5px' }}>
                    Selengkapnya <ArrowRight size={16} />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Modal */}
      {selectedPotensi && (
        <div className="modal-overlay" onClick={() => setSelectedPotensi(null)}>
          <motion.div
            className="modal-content"
            onClick={(e) => e.stopPropagation()}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.2 }}
          >
            <button className="modal-close-btn" onClick={() => setSelectedPotensi(null)}><X size={24} /></button>
            <img src={selectedPotensi.image_url || selectedPotensi.image} alt={selectedPotensi.judul} className="modal-img" />
            <div className="modal-body">
              <span className="kategori-badge" style={{ marginBottom: '15px' }}>{selectedPotensi.kategori}</span>
              <h2 style={{ fontSize: '1.5rem', marginBottom: '20px', color: 'var(--text-dark)', lineHeight: '1.2' }}>{selectedPotensi.judul}</h2>
              <p style={{ fontSize: '0.85rem', color: '#475569', lineHeight: '1.8' }}>{selectedPotensi.deskripsi}</p>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}
