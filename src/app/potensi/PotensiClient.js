'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowRight, X, Plus, Upload, Trash2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const CATEGORIES = ['Semua', 'Pertanian', 'Peternakan', 'UMKM', 'Budaya'];
const EMPTY_FORM = { judul: '', kategori: 'Pertanian', deskripsi: '', imageFile: null, imagePreview: '' };

export default function PotensiClient({ initialData }) {
  const router = useRouter();

  const [filter, setFilter] = useState('Semua');
  const [data, setData] = useState(initialData || []);
  const [selectedItem, setSelectedItem] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [form, setForm] = useState(EMPTY_FORM);
  const [formError, setFormError] = useState('');
  const [confirmDeleteId, setConfirmDeleteId] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => { window.scrollTo(0, 0); }, []);

  const filteredData = filter === 'Semua' ? data : data.filter(i => i.kategori === filter);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    if (file.size > 5 * 1024 * 1024) { setFormError('Ukuran gambar maksimal 5 MB.'); return; }
    const reader = new FileReader();
    reader.onloadend = () => setForm(prev => ({ ...prev, imageFile: file, imagePreview: reader.result }));
    reader.readAsDataURL(file);
    setFormError('');
  };

  const handleSubmit = async () => {
    if (!form.judul.trim()) { setFormError('Judul wajib diisi.'); return; }
    if (!form.deskripsi.trim()) { setFormError('Deskripsi wajib diisi.'); return; }
    setIsSubmitting(true);
    try {
      const fd = new FormData();
      fd.append('judul', form.judul.trim());
      fd.append('kategori', form.kategori);
      fd.append('deskripsi', form.deskripsi.trim());
      if (form.imageFile) fd.append('image', form.imageFile);

      const res = await fetch('/api/potensi', { method: 'POST', body: fd });
      const result = await res.json();
      if (!result.success) throw new Error(result.error);

      setData(prev => [...prev, result.data]);
      setForm(EMPTY_FORM);
      setShowAddModal(false);
    } catch (err) {
      setFormError(err.message || 'Gagal menyimpan data.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      const res = await fetch(`/api/potensi/${id}`, { method: 'DELETE' });
      const result = await res.json();
      if (!result.success) throw new Error(result.error);
      setData(prev => prev.filter(i => i.id !== id));
      setConfirmDeleteId(null);
      if (selectedItem?.id === id) setSelectedItem(null);
    } catch (err) {
      alert('Gagal menghapus: ' + err.message);
    }
  };

  return (
    <div className="page-container">
      <div className="hero-bespoke" style={{ backgroundImage: 'url("/images/bg_potensi desa.jpg")' }}>
        <motion.div className="container" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
          <h1>Potensi Desa</h1>
          <p>Mengeksplorasi kekayaan alam, kerajinan tangan, dan kebudayaan penggerak ekonomi Sirnaraja.</p>
        </motion.div>
      </div>

      <div className="container scroll-section" style={{ paddingTop: '80px', paddingBottom: '150px' }}>
        <motion.div className="filter-tabs" style={{ alignItems: 'center' }} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          {CATEGORIES.map((cat, idx) => (
            <button key={idx} className={`filter-btn ${filter === cat ? 'active' : ''}`} onClick={() => setFilter(cat)}>{cat}</button>
          ))}
        </motion.div>

        <div id="pertanian" style={{ visibility: 'hidden', position: 'absolute', marginTop: '-100px' }} />
        <div id="peternakan" style={{ visibility: 'hidden', position: 'absolute', marginTop: '-100px' }} />
        <div id="umkm" style={{ visibility: 'hidden', position: 'absolute', marginTop: '-100px' }} />
        <div id="budaya" style={{ visibility: 'hidden', position: 'absolute', marginTop: '-100px' }} />

        <div style={{ marginTop: '40px' }}>
          {filteredData.map((item, index) => (
            <motion.div
              key={item.id}
              className={`zig-zag-section ${index % 2 !== 0 ? 'reverse' : ''}`}
              initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <div className="zig-zag-img">
                <img src={item.image_url || item.image} alt={item.judul} />
                {item.is_tambahan && <span className="badge-tambahan">Ditambahkan</span>}
              </div>
              <div className="zig-zag-content">
                <span className="kategori-badge">{item.kategori}</span>
                <h2 style={{ fontSize: '1.4rem', color: 'var(--text-dark)', marginBottom: '20px', lineHeight: '1.2' }}>{item.judul}</h2>
                <p style={{ fontSize: '0.85rem', color: '#64748b', lineHeight: '1.8', marginBottom: '30px' }}>{item.deskripsi}</p>
                <div style={{ display: 'flex', gap: '16px', alignItems: 'center', flexWrap: 'wrap' }}>
                  <button type="button" onClick={() => setSelectedItem(item)}
                    style={{ display: 'flex', alignItems: 'center', gap: '10px', background: 'transparent', border: 'none', color: 'var(--primary-color)', fontSize: '1.1rem', fontWeight: '700', cursor: 'pointer', padding: 0 }}>
                    Selengkapnya <ArrowRight size={20} />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {filteredData.length === 0 && (
          <div style={{ textAlign: 'center', padding: '100px 0', color: '#94a3b8' }}>
            <h3 style={{ fontSize: '1.2rem' }}>Tidak ada data untuk kategori ini.</h3>
          </div>
        )}
      </div>

      {/* Modal Detail */}
      <AnimatePresence>
        {selectedItem && (
          <div className="modal-overlay" onClick={() => setSelectedItem(null)}>
            <motion.div className="modal-content" onClick={e => e.stopPropagation()}
              initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }} transition={{ duration: 0.2 }}>
              <button className="modal-close-btn" onClick={() => setSelectedItem(null)}><X size={24} /></button>
              <img src={selectedItem.image_url || selectedItem.image} alt={selectedItem.judul} className="modal-img" />
              <div className="modal-body">
                <span className="kategori-badge" style={{ marginBottom: '15px' }}>{selectedItem.kategori}</span>
                <h2 style={{ fontSize: '1.4rem', marginBottom: '20px', color: 'var(--text-dark)', lineHeight: '1.2' }}>{selectedItem.judul}</h2>
                <p style={{ fontSize: '0.85rem', color: '#475569', lineHeight: '1.8' }}>{selectedItem.deskripsi}</p>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
