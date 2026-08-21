'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { getDesaData } from '@/lib/dataService';
import { Save, Plus, Trash2 } from 'lucide-react';

export default function AdminDesa() {
  const [formData, setFormData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState({ type: '', text: '' });

  useEffect(() => {
    getDesaData().then(d => { if (d) setFormData(d); setLoading(false); });
  }, []);

  const flash = (type, text) => { setMsg({ type, text }); setTimeout(() => setMsg({ type: '', text: '' }), 4000); };

  const set = (key, val) => setFormData(p => ({ ...p, [key]: val }));
  const setNested = (parent, key, val) => setFormData(p => ({ ...p, [parent]: { ...(p[parent] || {}), [key]: val } }));
  const setMisi = (i, key, val) => { const m = [...(formData.misi || [])]; m[i] = { ...m[i], [key]: val }; set('misi', m); };

  const handleSubmit = async (e) => {
    e.preventDefault(); setSaving(true);
    try {
      const { error } = await supabase.from('desa_info').update({
        nama: formData.nama, slogan: formData.slogan, deskripsi: formData.deskripsi,
        sejarah: formData.sejarah, visi: formData.visi, misi: formData.misi,
        kontak: formData.kontak, sosial_media: formData.sosial_media,
      }).eq('id', formData.id || 1);
      if (error) throw error;
      flash('success', 'Data berhasil disimpan!');
    } catch (e) { flash('error', 'Gagal menyimpan: ' + e.message); }
    finally { setSaving(false); }
  };

  if (loading) return <p style={{ padding: '20px', fontSize: '0.875rem', color: '#64748b' }}>Memuat data...</p>;
  if (!formData) return <p style={{ padding: '20px', fontSize: '0.875rem', color: '#ef4444' }}>Data tidak ditemukan.</p>;

  const inputStyle = { width: '100%', padding: '8px 10px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '0.875rem', background: '#fff' };
  const labelStyle = { display: 'block', marginBottom: '5px', fontSize: '0.8rem', fontWeight: '600', color: '#475569' };

  return (
    <div className="admin-panel">
      <div className="admin-panel-header">
        <div>
          <p className="admin-panel-title">Identitas Desa</p>
          <p className="admin-panel-subtitle">Informasi umum, visi misi, kontak, dan sosial media desa</p>
        </div>
        <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
          {msg.text && <span className={`admin-toast ${msg.type}`}>{msg.text}</span>}
          <button type="submit" form="form-desa" disabled={saving} className="admin-btn admin-btn-primary">
            <Save size={15} />{saving ? 'Menyimpan...' : 'Simpan'}
          </button>
        </div>
      </div>

      <form id="form-desa" onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>

        {/* Informasi Umum */}
        <div className="admin-section">
          <p className="admin-section-title">1. Informasi Umum</p>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '12px' }}>
            <div><label style={labelStyle}>Nama Desa</label><input style={inputStyle} value={formData.nama || ''} onChange={e => set('nama', e.target.value)} required /></div>
            <div><label style={labelStyle}>Slogan</label><input style={inputStyle} value={formData.slogan || ''} onChange={e => set('slogan', e.target.value)} /></div>
          </div>
          <div style={{ marginBottom: '12px' }}><label style={labelStyle}>Deskripsi Singkat (tampil di Beranda)</label><textarea style={{ ...inputStyle, resize: 'vertical' }} rows={3} value={formData.deskripsi || ''} onChange={e => set('deskripsi', e.target.value)} /></div>
          <div><label style={labelStyle}>Sejarah / Gambaran Umum (tampil di Profil)</label><textarea style={{ ...inputStyle, resize: 'vertical' }} rows={5} value={formData.sejarah || ''} onChange={e => set('sejarah', e.target.value)} /></div>
        </div>

        {/* Visi & Misi */}
        <div className="admin-section">
          <p className="admin-section-title">2. Visi & Misi</p>
          <div style={{ marginBottom: '12px' }}><label style={labelStyle}>Visi Desa</label><textarea style={{ ...inputStyle, resize: 'vertical' }} rows={3} value={formData.visi || ''} onChange={e => set('visi', e.target.value)} /></div>
          <div>
            <label style={{ ...labelStyle, display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
              <span>Daftar Misi</span>
              <button type="button" onClick={() => set('misi', [...(formData.misi || []), { nomor: `0${(formData.misi||[]).length + 1}`, teks: '' }])} className="admin-btn admin-btn-outline admin-btn-sm">
                <Plus size={13} /> Tambah
              </button>
            </label>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {(formData.misi || []).map((m, i) => (
                <div key={i} style={{ display: 'flex', gap: '8px', alignItems: 'flex-start' }}>
                  <input value={m.nomor || ''} onChange={e => setMisi(i, 'nomor', e.target.value)} style={{ ...inputStyle, width: '55px', textAlign: 'center' }} placeholder="01" />
                  <textarea value={m.teks || ''} onChange={e => setMisi(i, 'teks', e.target.value)} rows={2} style={{ ...inputStyle, flex: 1, resize: 'vertical' }} />
                  <button type="button" onClick={() => set('misi', (formData.misi || []).filter((_, j) => j !== i))} className="admin-btn admin-btn-danger" style={{ padding: '8px 10px', flexShrink: 0 }}>
                    <Trash2 size={15} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Kontak & Sosmed */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
          <div className="admin-section">
            <p className="admin-section-title">3. Kontak Resmi</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <div><label style={labelStyle}>Alamat Lengkap</label><textarea style={{ ...inputStyle, resize: 'vertical' }} rows={3} value={formData.kontak?.alamat || ''} onChange={e => setNested('kontak', 'alamat', e.target.value)} /></div>
              <div><label style={labelStyle}>Telepon / WhatsApp</label><input style={inputStyle} value={formData.kontak?.telepon || ''} onChange={e => setNested('kontak', 'telepon', e.target.value)} /></div>
              <div><label style={labelStyle}>Email</label><input type="email" style={inputStyle} value={formData.kontak?.email || ''} onChange={e => setNested('kontak', 'email', e.target.value)} /></div>
            </div>
          </div>
          <div className="admin-section">
            <p className="admin-section-title">4. Sosial Media</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <div><label style={labelStyle}>Instagram</label><input type="url" style={inputStyle} value={formData.sosial_media?.instagram || ''} onChange={e => setNested('sosial_media', 'instagram', e.target.value)} placeholder="https://instagram.com/..." /></div>
              <div><label style={labelStyle}>Facebook</label><input type="url" style={inputStyle} value={formData.sosial_media?.facebook || ''} onChange={e => setNested('sosial_media', 'facebook', e.target.value)} placeholder="https://facebook.com/..." /></div>
              <div><label style={labelStyle}>YouTube</label><input type="url" style={inputStyle} value={formData.sosial_media?.youtube || ''} onChange={e => setNested('sosial_media', 'youtube', e.target.value)} placeholder="https://youtube.com/..." /></div>
            </div>
          </div>
        </div>

      </form>
    </div>
  );
}
