'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { uploadImage } from '@/lib/dataService';
import { Plus, Trash2, Save, Image as ImageIcon, UploadCloud } from 'lucide-react';

const PAGES = ['beranda', 'profil', 'potensi', 'data'];

let cachedData = null;

export default function AdminBanners() {
  const [banners, setBanners] = useState(cachedData || []);
  const [loading, setLoading] = useState(!cachedData);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [msg, setMsg] = useState({ type: '', text: '' });

  useEffect(() => { load(); }, []);
  const flash = (type, text) => { setMsg({ type, text }); setTimeout(() => setMsg({ type: '', text: '' }), 4000); };

  async function load() {
    if (!cachedData) setLoading(true);
    const { data, error } = await supabase.from('hero_banners').select('*').order('halaman').order('urutan');
    if (!error) {
      cachedData = data || [];
      setBanners(cachedData);
    }
    setLoading(false);
  }

  const addBanner = (halaman) => setBanners(prev => [...prev, { id: `new-${Date.now()}`, halaman, image_url: '', judul: '', subjudul: '', aktif: true, isNew: true }]);
  const change = (id, field, val) => setBanners(prev => prev.map(b => b.id === id ? { ...b, [field]: val } : b));

  const remove = async (id, isNew) => {
    if (isNew) { setBanners(b => b.filter(x => x.id !== id)); return; }
    if (!confirm('Hapus banner ini?')) return;
    const { error } = await supabase.from('hero_banners').delete().eq('id', id);
    if (!error) { setBanners(b => b.filter(x => x.id !== id)); flash('success', 'Banner dihapus'); }
  };

  const handleUpload = async (id, file) => {
    if (!file) return; setUploading(true);
    try { const url = await uploadImage(file, 'potensi-images'); change(id, 'image_url', url); }
    catch { alert('Gagal upload gambar'); }
    finally { setUploading(false); }
  };

  const save = async () => {
    setSaving(true);
    try {
      const newItems = banners.filter(b => b.isNew).map(({ id, isNew, ...rest }) => rest);
      const existing = banners.filter(b => !b.isNew);
      if (newItems.length) { const { error } = await supabase.from('hero_banners').insert(newItems); if (error) throw error; }
      for (const b of existing) {
        const { error } = await supabase.from('hero_banners').update({ halaman: b.halaman, image_url: b.image_url, judul: b.judul, subjudul: b.subjudul, aktif: b.aktif }).eq('id', b.id);
        if (error) throw error;
      }
      flash('success', 'Semua perubahan tersimpan!');
      load();
    } catch (e) { flash('error', 'Gagal: ' + e.message); }
    finally { setSaving(false); }
  };

  const grouped = banners.reduce((acc, b) => { (acc[b.halaman] = acc[b.halaman] || []).push(b); return acc; }, {});
  if (loading) return <p style={{ padding: '20px', fontSize: '0.875rem', color: '#64748b' }}>Memuat data...</p>;

  return (
    <div className="admin-panel">
      <div className="admin-panel-header">
        <div>
          <p className="admin-panel-title">Hero Banners</p>
          <p className="admin-panel-subtitle">Kelola gambar latar belakang setiap halaman website</p>
        </div>
        <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
          {msg.text && <span className={`admin-toast ${msg.type}`}>{msg.text}</span>}
          {uploading && <span className="admin-toast" style={{ background: '#fef3c7', color: '#92400e' }}>⏳ Mengupload...</span>}
          <button onClick={save} disabled={saving || uploading} className="admin-btn admin-btn-primary">
            <Save size={15} />{saving ? 'Menyimpan...' : 'Simpan Semua'}
          </button>
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        {PAGES.map(page => (
          <div key={page} className="admin-section">
            <p className="admin-section-title">
              <span style={{ display: 'flex', alignItems: 'center', gap: '7px', textTransform: 'capitalize' }}>
                <ImageIcon size={15} color="#3b82f6" /> Halaman {page}
              </span>
              <button onClick={() => addBanner(page)} className="admin-btn admin-btn-outline admin-btn-sm">
                <Plus size={13} /> Tambah
              </button>
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '12px' }}>
              {(grouped[page] || []).map(b => (
                <div key={b.id} style={{ border: '1px solid #e2e8f0', borderRadius: '8px', overflow: 'hidden', background: '#fff' }}>
                  {/* Image */}
                  <div style={{ height: '140px', background: b.image_url ? `url("${b.image_url}") center/cover` : '#f1f5f9', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    {!b.image_url && <ImageIcon size={28} color="#cbd5e1" />}
                    <button onClick={() => remove(b.id, b.isNew)} className="admin-btn admin-btn-danger admin-btn-sm" style={{ position: 'absolute', top: '8px', right: '8px', padding: '5px 7px' }}>
                      <Trash2 size={13} />
                    </button>
                    <label style={{ position: 'absolute', bottom: '8px', right: '8px', background: 'rgba(0,0,0,0.6)', color: '#fff', padding: '4px 10px', borderRadius: '5px', fontSize: '0.75rem', fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '5px' }}>
                      <UploadCloud size={13} /> Ganti
                      <input type="file" accept="image/*" style={{ display: 'none' }} onChange={e => handleUpload(b.id, e.target.files[0])} disabled={uploading} />
                    </label>
                  </div>

                  {/* Fields */}
                  <div style={{ padding: '16px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span className="admin-label" style={{ marginBottom: 0 }}>Status</span>
                      <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.8rem', fontWeight: 600, cursor: 'pointer', color: b.aktif ? '#16a34a' : '#666' }}>
                        <input type="checkbox" checked={b.aktif} onChange={e => change(b.id, 'aktif', e.target.checked)} />
                        {b.aktif ? 'Aktif' : 'Nonaktif'}
                      </label>
                    </div>
                    {b.isNew && (
                      <div>
                        <label className="admin-label">Halaman</label>
                        <select className="admin-select" value={b.halaman} onChange={e => change(b.id, 'halaman', e.target.value)}>
                          {PAGES.map(p => <option key={p} value={p}>{p}</option>)}
                        </select>
                      </div>
                    )}
                    <div>
                      <label className="admin-label">Judul</label>
                      <input className="admin-input" value={b.judul || ''} onChange={e => change(b.id, 'judul', e.target.value)} />
                    </div>
                    <div>
                      <label className="admin-label">Subjudul</label>
                      <textarea className="admin-textarea" value={b.subjudul || ''} onChange={e => change(b.id, 'subjudul', e.target.value)} rows={2} style={{ minHeight: '60px' }} />
                    </div>
                  </div>
                </div>
              ))}

              {/* Add box */}
              <div onClick={() => addBanner(page)} style={{ border: '2px dashed #cbd5e1', borderRadius: '8px', minHeight: '280px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: '#94a3b8', gap: '8px', fontSize: '0.8rem', fontWeight: 600, transition: 'all 0.2s' }}
                onMouseOver={e => e.currentTarget.style.borderColor = '#3b82f6'} onMouseOut={e => e.currentTarget.style.borderColor = '#cbd5e1'}>
                <Plus size={24} /> Tambah Banner {page}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
