'use client';

import { useState, useEffect } from 'react';
import { Shield, Compass, MapPin, Activity, Award, Briefcase, UserCheck, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const iconMap = { Award, Briefcase, Shield, UserCheck, MapPin };

function OrgNode({ person, onClick }) {
  return (
    <div className="org-node" onClick={() => onClick(person)}
      style={{ width: '200px', backgroundColor: '#ffffff', border: '2px solid #0f172a', borderRadius: '0px', cursor: 'pointer', position: 'relative', zIndex: 2, display: 'flex', flexDirection: 'column', textAlign: 'center', boxShadow: '4px 4px 0px rgba(15,23,42,0.15)', overflow: 'hidden' }}>
      <div style={{ backgroundColor: '#dbeafe', padding: '12px 10px', borderBottom: '2px solid #0f172a', display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '50px' }}>
        <h4 style={{ fontSize: '0.75rem', fontWeight: '800', color: '#0f172a', margin: 0, textTransform: 'uppercase', letterSpacing: '0.5px' }}>{person.jabatan}</h4>
      </div>
      <div style={{ padding: '14px 10px', backgroundColor: '#ffffff' }}>
        <h3 style={{ fontSize: '0.9rem', fontWeight: '800', color: '#0f172a', margin: 0, textTransform: 'uppercase' }}>{person.nama}</h3>
      </div>
    </div>
  );
}

export default function ProfilClient({ aparaturData, desaData, heroImage }) {
  const [selectedPerson, setSelectedPerson] = useState(null);
  useEffect(() => { window.scrollTo(0, 0); }, []);

  const kades = aparaturData?.find(p => p.id === 'kades');
  const sekdes = aparaturData?.find(p => p.id === 'sekdes');
  const kaurList = aparaturData?.filter(p => p.kategori === 'kaur') || [];
  const kasiList = aparaturData?.filter(p => p.kategori === 'kasi') || [];
  const kadusList = aparaturData?.filter(p => p.kategori === 'kadus') || [];

  return (
    <div className="page-container">
      <div className="hero-bespoke" style={{ backgroundImage: `url("${heroImage || '/images/gerbang desa.jpeg'}")` }}>
        <motion.div className="container" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
          <h1>Profil Desa</h1>
          <p>Mengenal lebih dekat gambaran umum, tata wilayah, visi-misi, serta jajaran Pemerintahan Desa Sirnaraja.</p>
        </motion.div>
      </div>

      {/* Profil Singkat */}
      <section id="gambaran-umum" className="scroll-section" style={{ padding: '100px 0', backgroundColor: '#ffffff' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '60px', alignItems: 'center' }}>
            <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
              <span style={{ color: 'var(--primary-color)', textTransform: 'uppercase', letterSpacing: '2px', fontWeight: '700', fontSize: '0.9rem' }}>Tentang Desa Sirnaraja</span>
              <h2 className="section-title-bespoke" style={{ marginTop: '10px', marginBottom: '20px' }}>Harmoni Alam & <span>Kemajuan Desa</span></h2>
              <p style={{ fontSize: '1.1rem', color: '#475569', lineHeight: '1.8', marginBottom: '20px' }}>
                {desaData?.sejarah || 'Desa Sirnaraja adalah salah satu desa di Kecamatan Cigalontang, Kabupaten Tasikmalaya, Jawa Barat. Dibentuk secara resmi pada tahun 1969, desa ini tumbuh menjadi kawasan yang mandiri berbasis pertanian, perkebunan, dan UMKM.'}
              </p>
              <p style={{ fontSize: '1.1rem', color: '#475569', lineHeight: '1.8' }}>
                Dengan luas wilayah {desaData?.luas_wilayah || '602 Ha'} dan populasi sebanyak {desaData?.populasi || '3.215'} jiwa, Desa Sirnaraja mengedepankan pelayanan publik yang terbuka, transparan, dan responsif.
              </p>
            </motion.div>
            <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
              <img src="/images/gotongroyong2.jpeg" alt="Pemandangan Sirnaraja" className="organic-shape-img" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Visi Misi */}
      <section id="visi-misi" className="dark-section scroll-section">
        <span className="quote-mark">&ldquo;</span>
        <div className="container" style={{ position: 'relative', zIndex: 2 }}>
          <motion.div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
            <h2 style={{ color: 'var(--primary-color)', fontSize: '1.1rem', textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '20px' }}>Visi Desa</h2>
            <p className="visi-misi-text">{desaData?.visi || 'Terwujudnya Desa Sirnaraja yang Agamis, Mandiri, Sejahtera, dan Berbudaya Berlandaskan Gotong Royong pada Tahun 2028.'}</p>
          </motion.div>
          <div style={{ marginTop: '80px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '40px' }}>
            {(desaData?.misi || [
              { nomor: '01', teks: 'Meningkatkan kualitas sumber daya manusia melalui pendidikan dan keagamaan yang inklusif.' },
              { nomor: '02', teks: 'Membangun kemandirian ekonomi desa berbasis pertanian terpadu dan digitalisasi UMKM.' },
              { nomor: '03', teks: 'Meningkatkan tata kelola pemerintahan desa yang bersih, transparan, cepat, dan melayani.' },
              { nomor: '04', teks: 'Menjaga kelestarian lingkungan hidup dan kearifan budaya lokal sebagai warisan anak cucu.' },
            ]).map((m, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.1 }}>
                <h3 style={{ fontSize: '1.1rem', marginBottom: '20px', color: '#cbd5e1' }}>Misi {m.nomor || m.num}</h3>
                <p style={{ color: '#94a3b8', lineHeight: '1.8' }}>{m.teks || m.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Geografi */}
      <section id="geografi" className="scroll-section" style={{ padding: '100px 0', backgroundColor: '#f8fafc' }}>
        <div className="container">
          <motion.div style={{ textAlign: 'center', maxWidth: '700px', margin: '0 auto 80px' }} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="section-title-bespoke">Administrasi & <span>Wilayah</span></h2>
            <p style={{ fontSize: '0.9rem', color: '#64748b', lineHeight: '1.8' }}>Secara geografis Desa Sirnaraja berbatasan langsung dengan area perhutanan dan desa-desa tetangga.</p>
          </motion.div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '30px' }}>
            {/* Card Admin */}
            <motion.div style={{ backgroundColor: '#fff', padding: '40px', borderRadius: '24px', boxShadow: '0 10px 30px rgba(0,0,0,0.04)', border: '1px solid #f1f5f9' }} whileHover={{ y: -8 }} transition={{ duration: 0.3 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '30px' }}>
                <div style={{ backgroundColor: '#e0f2fe', color: '#0284c7', padding: '14px', borderRadius: '16px' }}><Shield size={26} /></div>
                <h3 style={{ fontSize: '1rem', margin: 0, fontWeight: '700', color: '#0f172a' }}>Data Administrasi</h3>
              </div>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '15px' }}>
                {[['Kode Desa (PUM)', '3206272008'], ['Tahun Berdiri', '1969'], ['Klasifikasi Desa', 'Swakarya / Mula'], ['Tipologi Desa', 'Perladangan']].map(([k, v]) => (
                  <li key={k} style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px dashed #e2e8f0', paddingBottom: '12px' }}>
                    <span style={{ color: '#64748b', fontWeight: '500' }}>{k}</span>
                    <strong style={{ color: '#0f172a' }}>{v}</strong>
                  </li>
                ))}
              </ul>
            </motion.div>
            {/* Card Batas */}
            <motion.div style={{ backgroundColor: '#fff', padding: '40px', borderRadius: '24px', boxShadow: '0 10px 30px rgba(0,0,0,0.04)', border: '1px solid #f1f5f9' }} whileHover={{ y: -8 }} transition={{ duration: 0.3 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '30px' }}>
                <div style={{ backgroundColor: '#fef3c7', color: '#d97706', padding: '14px', borderRadius: '16px' }}><Compass size={26} /></div>
                <h3 style={{ fontSize: '1rem', margin: 0, fontWeight: '700', color: '#0f172a' }}>Batas Wilayah</h3>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                {[['Utara', 'Kehutanan', '#10b981'], ['Selatan', 'Desa Jayapura', '#3b82f6'], ['Timur', 'Desa Sirnaputra', '#ec4899'], ['Barat', 'Desa Cigalontang', '#f59e0b']].map(([dir, val, color]) => (
                  <div key={dir} style={{ backgroundColor: '#f8fafc', padding: '16px', borderRadius: '16px', borderLeft: `4px solid ${color}` }}>
                    <span style={{ fontSize: '0.8rem', color: '#64748b', textTransform: 'uppercase', fontWeight: '700' }}>{dir}</span>
                    <p style={{ margin: '6px 0 0', fontWeight: '700', color: '#0f172a' }}>{val}</p>
                  </div>
                ))}
              </div>
            </motion.div>
            {/* Card Orbitrasi */}
            <motion.div style={{ backgroundColor: '#fff', padding: '40px', borderRadius: '24px', boxShadow: '0 10px 30px rgba(0,0,0,0.04)', border: '1px solid #f1f5f9' }} whileHover={{ y: -8 }} transition={{ duration: 0.3 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '30px' }}>
                <div style={{ backgroundColor: '#dcfce7', color: '#16a34a', padding: '14px', borderRadius: '16px' }}><Activity size={26} /></div>
                <h3 style={{ fontSize: '1rem', margin: 0, fontWeight: '700', color: '#0f172a' }}>Orbitrasi & Jarak</h3>
              </div>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '15px' }}>
                {[['5', '#16a34a', 'Pusat Kecamatan', '10-15 menit'], ['12', '#3b82f6', 'Pusat Kabupaten', '20-30 menit'], ['75', '#8b5cf6', 'Ibukota Provinsi', 'Jalur utama provinsi']].map(([km, color, label, sub]) => (
                  <li key={label} style={{ display: 'flex', alignItems: 'center', gap: '18px' }}>
                    <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'flex-end', width: '75px', color }}>
                      <span style={{ fontSize: '1.2rem', fontWeight: '800', letterSpacing: '-1px' }}>{km}</span>
                      <span style={{ fontSize: '1rem', fontWeight: '600', marginLeft: '2px' }}>Km</span>
                    </div>
                    <div>
                      <strong style={{ color: '#0f172a', display: 'block', fontSize: '1.05rem', marginBottom: '2px' }}>{label}</strong>
                      <span style={{ fontSize: '0.85rem', color: '#64748b' }}>{sub}</span>
                    </div>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* SOTK */}
      <section id="struktur" className="scroll-section" style={{ padding: '100px 0 140px', background: 'linear-gradient(180deg, #f0fdf4 0%, #ffffff 50%, #f8fafc 100%)', borderTop: '1px solid #dcfce7' }}>
        <div className="container">
          <div style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto 50px' }}>
            <span style={{ color: '#1b4332', backgroundColor: '#ecfdf5', textTransform: 'uppercase', letterSpacing: '3px', fontWeight: '700', fontSize: '0.85rem', display: 'inline-flex', alignItems: 'center', padding: '6px 16px', borderRadius: '4px', borderLeft: '3px solid #10b981' }}>Pemerintahan Desa Sirnaraja</span>
            <h2 className="section-title-bespoke" style={{ color: '#1b4332', marginTop: '20px', marginBottom: '15px' }}>Struktur Organisasi & Tata Kerja <span style={{ color: '#d97706' }}>(SOTK)</span></h2>
            <p style={{ fontSize: '0.9rem', color: '#475569', lineHeight: '1.8' }}>Jajaran resmi aparatur Pemerintah Desa Sirnaraja yang berdedikasi melayani 3.215 jiwa warga secara profesional.</p>
          </div>
          <div className="swipe-indicator"><span>←</span> Geser untuk melihat seluruh bagan <span>→</span></div>
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="org-tree-container">
            {kades && (
              <div className="org-tree">
                <ul>
                  <li>
                    <OrgNode person={kades} onClick={setSelectedPerson} />
                    <ul>
                      {kasiList[0] && <li><OrgNode person={kasiList[0]} onClick={setSelectedPerson} />
                        <ul>{kasiList[1] && <li><OrgNode person={kasiList[1]} onClick={setSelectedPerson} /><ul>{kasiList[2] && <li><OrgNode person={kasiList[2]} onClick={setSelectedPerson} /></li>}</ul></li>}</ul>
                      </li>}
                      {sekdes && <li><OrgNode person={sekdes} onClick={setSelectedPerson} />
                        <ul>{kaurList.map(p => <li key={p.id}><OrgNode person={p} onClick={setSelectedPerson} /></li>)}</ul>
                      </li>}
                      <li>
                        <div style={{ backgroundColor: '#dbeafe', border: '2px solid #0f172a', borderRadius: '0px', padding: '10px 24px', margin: '0 auto 15px', color: '#0f172a', fontWeight: '800', fontSize: '0.85rem', letterSpacing: '1px', textTransform: 'uppercase', boxShadow: '4px 4px 0px rgba(15,23,42,0.15)', position: 'relative', zIndex: 2, width: 'max-content' }}>Pelaksana Kewilayahan</div>
                        <ul>
                          {kadusList[0] && <li><OrgNode person={kadusList[0]} onClick={setSelectedPerson} />
                            <ul>{kadusList[1] && <li><OrgNode person={kadusList[1]} onClick={setSelectedPerson} /><ul>{kadusList[2] && <li><OrgNode person={kadusList[2]} onClick={setSelectedPerson} /><ul>{kadusList[3] && <li><OrgNode person={kadusList[3]} onClick={setSelectedPerson} /></li>}</ul></li>}</ul></li>}</ul>
                          </li>}
                        </ul>
                      </li>
                    </ul>
                  </li>
                </ul>
              </div>
            )}
          </motion.div>
        </div>
      </section>

      {/* Modal Detail Aparatur */}
      <AnimatePresence>
        {selectedPerson && (
          <div className="modal-overlay" onClick={() => setSelectedPerson(null)}>
            <motion.div className="modal-content" onClick={e => e.stopPropagation()}
              initial={{ opacity: 0, y: 50, scale: 0.95 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 50, scale: 0.95 }} transition={{ duration: 0.25 }}
              style={{ maxWidth: '520px', padding: '0', borderRadius: '28px', overflow: 'auto', maxHeight: '90vh' }}>
              <div style={{ background: selectedPerson.avatar_color || selectedPerson.avatarColor, padding: '40px 30px 30px', textAlign: 'center', color: '#fff', position: 'relative' }}>
                <button className="modal-close-btn" onClick={() => setSelectedPerson(null)} style={{ top: '15px', right: '15px' }}>✕</button>
                <span style={{ fontSize: '0.8rem', color: '#ffffff', textTransform: 'uppercase', letterSpacing: '2px', fontWeight: '800', backgroundColor: 'rgba(0,0,0,0.2)', padding: '4px 14px', borderRadius: '20px' }}>{selectedPerson.kategori_label || selectedPerson.kategoriLabel}</span>
                <h2 style={{ fontSize: '1.2rem', margin: '14px 0 2px', fontWeight: '800', color: '#fff' }}>{selectedPerson.nama}</h2>
                <p style={{ margin: 0, fontSize: '0.85rem', color: 'rgba(255,255,255,0.9)', fontWeight: '600' }}>{selectedPerson.jabatan}</p>
              </div>
              <div style={{ padding: '30px', backgroundColor: '#ffffff' }}>
                <div style={{ display: 'flex', gap: '15px', marginBottom: '24px' }}>
                  <div style={{ flex: 1, backgroundColor: '#f8fafc', padding: '14px 18px', borderRadius: '16px', border: '1px solid #e2e8f0' }}>
                    <span style={{ fontSize: '0.75rem', color: '#64748b', fontWeight: '600', textTransform: 'uppercase' }}>Pendidikan</span>
                    <strong style={{ display: 'block', fontSize: '1rem', color: '#0f172a', marginTop: '2px' }}>{selectedPerson.pendidikan}</strong>
                  </div>
                  <div style={{ flex: 1, backgroundColor: '#f8fafc', padding: '14px 18px', borderRadius: '16px', border: '1px solid #e2e8f0' }}>
                    <span style={{ fontSize: '0.75rem', color: '#64748b', fontWeight: '600', textTransform: 'uppercase' }}>Jenis Kelamin</span>
                    <strong style={{ display: 'block', fontSize: '1rem', color: '#0f172a', marginTop: '2px' }}>{selectedPerson.jk}</strong>
                  </div>
                </div>
                <h4 style={{ color: '#0f172a', marginBottom: '10px', fontSize: '1rem', fontWeight: '700' }}>Fungsi Pokok & Peranan Utama:</h4>
                <p style={{ color: '#475569', fontSize: '1rem', lineHeight: '1.7', margin: 0, backgroundColor: '#f1f5f9', padding: '18px', borderRadius: '18px' }}>{selectedPerson.deskripsi || selectedPerson.desc}</p>
                <button onClick={() => setSelectedPerson(null)}
                  style={{ width: '100%', marginTop: '25px', padding: '15px', borderRadius: '16px', backgroundColor: selectedPerson.badge_color || selectedPerson.badgeColor, color: '#fff', border: 'none', fontWeight: '700', cursor: 'pointer', fontSize: '1rem' }}>
                  Tutup Informasi
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
