'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { uploadImage } from '@/lib/dataService';
import { Plus, Trash2, Edit2, Save, X, UploadCloud, Users } from 'lucide-react';

const EMPTY = { nama: '', jabatan: '', nip: '', image_url: '', urutan: 0 };

export default function AdminAparatur() {
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
    const { data } = await supabase.from('aparatur').select('*').order('urutan').order('id');
    setItems(data || []); setLoading(false);
  }

  const del = async (id) => {
    if (!confirm('Hapus aparatur ini?')) return;
    const { error } = await supabase.from('aparatur').delete().eq('id', id);
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
      const payload = { nama: modal.nama, jabatan: modal.jabatan, nip: modal.nip, image_url: modal.image_url, urutan: modal.urutan };
      if (modal.id) {
        const { error } = await supabase.from('aparatur').update(payload).eq('id', modal.id);
        if (error) throw error; flash('success', 'Data diperbarui!');
      } else {
        const { error } = await supabase.from('aparatur').insert([payload]);
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
          <p className="admin-panel-title">Aparatur Pemerintah Desa</p>
          <p className="admin-panel-subtitle">Kelola struktur dan foto perangkat desa (SOTK)</p>
        </div>
        <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
          {msg.text && <span className={`admin-toast ${msg.type}`}>{msg.text}</span>}
          <button onClick={() => setModal({ ...EMPTY })} className="admin-btn admin-btn-primary"><Plus size={15} /> Tambah Aparatur</button>
        </div>
      </div>

      <div className="admin-card-grid">
        {items.map(item => (
          <div key={item.id} className="admin-card">
            <div style={{ height: '220px', background: item.image_url ? `url("${item.image_url}") center top/cover` : '#f8fafc', borderBottom: '1px solid #e2e8f0', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              {!item.image_url && <Users size={40} color="#cbd5e1" />}
            </div>
            <div className="admin-card-body" style={{ textAlign: 'center', alignItems: 'center' }}>
              <p className="admin-card-title">{item.nama}</p>
              <p style={{ fontSize: '0.8rem', color: '#2563eb', fontWeight: 600 }}>{item.jabatan}</p>
              {item.nip && <p style={{ fontSize: '0.75rem', color: '#94a3b8' }}>NIP: {item.nip}</p>}
              <div className="admin-card-actions" style={{ width: '100%' }}>
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
              <p className="admin-modal-title">{modal.id ? 'Edit Aparatur' : 'Tambah Aparatur'}</p>
              <button onClick={() => setModal(null)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#64748b' }}><X size={20} /></button>
            </div>
            <form onSubmit={save}>
              <div className="admin-modal-body" style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>

                {/* Foto */}
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px' }}>
                  <div style={{ width: '100px', height: '100px', borderRadius: '50%', background: modal.image_url ? `url("${modal.image_url}") center/cover` : '#f1f5f9', border: '2px solid #e2e8f0', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    {!modal.image_url && <Users size={30} color="#94a3b8" />}
                  </div>
                  <label className="admin-upload-btn">
                    <UploadCloud size={15} />{uploading ? 'Uploading...' : 'Pilih Foto'}
                    <input type="file" accept="image/*" style={{ display: 'none' }} onChange={upload} disabled={uploading} />
                  </label>
                </div>

                <div><label className="admin-label">Nama Lengkap</label><input required className="admin-input" value={modal.nama} onChange={e => setModal(m => ({ ...m, nama: e.target.value }))} /></div>
                <div><label className="admin-label">Jabatan</label><input required className="admin-input" value={modal.jabatan} onChange={e => setModal(m => ({ ...m, jabatan: e.target.value }))} placeholder="Kepala Desa, Sekretaris, dll." /></div>
                <div><label className="admin-label">NIP / NIK (Opsional)</label><input className="admin-input" value={modal.nip || ''} onChange={e => setModal(m => ({ ...m, nip: e.target.value }))} /></div>
                <div style={{ width: '140px' }}><label className="admin-label">Urutan Tampil</label><input type="number" className="admin-input" value={modal.urutan} onChange={e => setModal(m => ({ ...m, urutan: parseInt(e.target.value) || 0 }))} /></div>
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
