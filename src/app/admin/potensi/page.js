'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { uploadImage } from '@/lib/dataService';
import { Plus, Trash2, Edit2, Save, X, UploadCloud, Map } from 'lucide-react';

const KATEGORI = ['Pertanian', 'Peternakan', 'UMKM', 'Budaya', 'Pariwisata'];
const EMPTY = { judul: '', kategori: 'UMKM', deskripsi: '', image_url: '', urutan: 0 };

export default function AdminPotensi() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState(null);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [msg, setMsg] = useState({ type: '', text: '' });

  useEffect(() => { load(); }, []);
  const flash = (type, text) => { setMsg({ type, text }); setTimeout(() => setMsg({ type: '', text: '' }), 4000); };

  async function load() {
    setLoading(true);
    const { data } = await supabase.from('potensi').select('*').order('urutan').order('id');
    setItems(data || []);
    setLoading(false);
  }

  const del = async (id) => {
    if (!confirm('Hapus data ini?')) return;
    const { error } = await supabase.from('potensi').delete().eq('id', id);
    if (!error) { setItems(i => i.filter(x => x.id !== id)); flash('success', 'Data dihapus'); }
  };

  const upload = async (e) => {
    const file = e.target.files[0]; if (!file) return; setUploading(true);
    try { const url = await uploadImage(file, 'potensi-images'); setModal(m => ({ ...m, image_url: url })); }
    catch { alert('Gagal upload'); } finally { setUploading(false); }
  };

  const save = async (e) => {
    e.preventDefault(); setSaving(true);
    try {
      if (modal.id) {
        const { error } = await supabase.from('potensi').update({ judul: modal.judul, kategori: modal.kategori, deskripsi: modal.deskripsi, image_url: modal.image_url, urutan: modal.urutan }).eq('id', modal.id);
        if (error) throw error; flash('success', 'Data diperbarui!');
      } else {
        const { error } = await supabase.from('potensi').insert([{ judul: modal.judul, kategori: modal.kategori, deskripsi: modal.deskripsi, image_url: modal.image_url, urutan: modal.urutan }]);
        if (error) throw error; flash('success', 'Data ditambahkan!');
      }
      setModal(null); load();
    } catch (e) { alert('Gagal: ' + e.message); }
    finally { setSaving(false); }
  };

  if (loading) return <p style={{ padding: '20px', fontSize: '0.875rem', color: '#64748b' }}>Memuat data...</p>;

  return (
    <div className="admin-panel">
      <div className="admin-panel-header">
        <div>
          <p className="admin-panel-title">Potensi & UMKM</p>
          <p className="admin-panel-subtitle">Kelola daftar produk, UMKM, pertanian, dan aset budaya desa</p>
        </div>
        <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
          {msg.text && <span className={`admin-toast ${msg.type}`}>{msg.text}</span>}
          <button onClick={() => setModal({ ...EMPTY })} className="admin-btn admin-btn-primary"><Plus size={15} /> Tambah Baru</button>
        </div>
      </div>

      <div className="admin-card-grid">
        {items.map(item => (
          <div key={item.id} className="admin-card">
            <div style={{ height: '170px', background: item.image_url ? `url("${item.image_url}") center/cover` : '#f8fafc', borderBottom: '1px solid #e2e8f0', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              {!item.image_url && <Map size={32} color="#cbd5e1" />}
            </div>
            <div className="admin-card-body">
              <span className="admin-card-badge">{item.kategori}</span>
              <p className="admin-card-title">{item.judul}</p>
              <p className="admin-card-desc">{item.deskripsi}</p>
              <div className="admin-card-actions">
                <button onClick={() => setModal({ ...item })} className="admin-btn admin-btn-secondary" style={{ flex: 1, justifyContent: 'center' }}><Edit2 size={14} /> Edit</button>
                <button onClick={() => del(item.id)} className="admin-btn admin-btn-danger"><Trash2 size={14} /></button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {modal && (
        <div className="admin-modal-backdrop">
          <div className="admin-modal">
            <div className="admin-modal-header">
              <p className="admin-modal-title">{modal.id ? 'Edit Potensi' : 'Tambah Potensi'}</p>
              <button onClick={() => setModal(null)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#64748b' }}><X size={20} /></button>
            </div>
            <form onSubmit={save}>
              <div className="admin-modal-body" style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 160px', gap: '10px' }}>
                  <div><label className="admin-label">Judul</label><input required className="admin-input" value={modal.judul} onChange={e => setModal(m => ({ ...m, judul: e.target.value }))} /></div>
                  <div>
                    <label className="admin-label">Kategori</label>
                    <select className="admin-select" value={modal.kategori} onChange={e => setModal(m => ({ ...m, kategori: e.target.value }))}>
                      {KATEGORI.map(k => <option key={k}>{k}</option>)}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="admin-label">Foto</label>
                  <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                    <div style={{ width: '90px', height: '60px', background: '#f1f5f9', borderRadius: '6px', border: '1px solid #e2e8f0', backgroundImage: modal.image_url ? `url("${modal.image_url}")` : 'none', backgroundSize: 'cover', backgroundPosition: 'center', flexShrink: 0 }} />
                    <label className="admin-upload-btn">
                      <UploadCloud size={15} />{uploading ? 'Uploading...' : 'Pilih File'}
                      <input type="file" accept="image/*" style={{ display: 'none' }} onChange={upload} disabled={uploading} />
                    </label>
                  </div>
                </div>

                <div><label className="admin-label">Deskripsi</label><textarea required className="admin-textarea" rows={5} value={modal.deskripsi} onChange={e => setModal(m => ({ ...m, deskripsi: e.target.value }))} /></div>
                
                <div style={{ width: '120px' }}><label className="admin-label">Urutan Tampil</label><input type="number" className="admin-input" value={modal.urutan} onChange={e => setModal(m => ({ ...m, urutan: parseInt(e.target.value) || 0 }))} /></div>
              </div>

              <div className="admin-modal-footer">
                <button type="button" onClick={() => setModal(null)} className="admin-btn admin-btn-secondary">Batal</button>
                <button type="submit" disabled={saving || uploading} className="admin-btn admin-btn-primary"><Save size={15} />{saving ? 'Menyimpan...' : 'Simpan'}</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
