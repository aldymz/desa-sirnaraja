'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { getStatistikData } from '@/lib/dataService';
import { Save, Plus, Trash2, PieChart } from 'lucide-react';

export default function AdminStatistik() {
  const [form, setForm] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState({ type: '', text: '' });

  useEffect(() => { getStatistikData().then(d => { if (d) setForm(d); setLoading(false); }); }, []);
  const flash = (type, text) => { setMsg({ type, text }); setTimeout(() => setMsg({ type: '', text: '' }), 4000); };

  const set = (key, val) => setForm(p => ({ ...p, [key]: val }));
  const setArr = (arr, i, field, val) => { const a = [...(form[arr] || [])]; a[i] = { ...a[i], [field]: val }; set(arr, a); };
  const addRow = (arr, tmpl) => set(arr, [...(form[arr] || []), tmpl]);
  const delRow = (arr, i) => set(arr, (form[arr] || []).filter((_, j) => j !== i));

  const submit = async (e) => {
    e.preventDefault(); setSaving(true);
    try {
      const { error } = await supabase.from('statistik_desa').update({
        total_penduduk: form.total_penduduk, total_kk: form.total_kk,
        laki_laki: form.laki_laki, perempuan: form.perempuan,
        luas_wilayah: form.luas_wilayah,
        distribusi_usia: form.distribusi_usia,
        tingkat_pendidikan: form.tingkat_pendidikan,
      }).eq('id', form.id || 1);
      if (error) throw error;
      flash('success', 'Data berhasil disimpan!');
    } catch (e) { flash('error', 'Gagal: ' + e.message); }
    finally { setSaving(false); }
  };

  if (loading) return <p style={{ padding: '20px', fontSize: '0.875rem', color: '#64748b' }}>Memuat data...</p>;
  if (!form) return <p style={{ padding: '20px', fontSize: '0.875rem', color: '#ef4444' }}>Data tidak ditemukan.</p>;

  const numInput = (key, label) => (
    <div key={key}>
      <label className="admin-label">{label}</label>
      <input type="number" className="admin-input" style={{ fontWeight: 700 }} value={form[key] || 0} onChange={e => set(key, parseInt(e.target.value) || 0)} required />
    </div>
  );

  return (
    <div className="admin-panel">
      <div className="admin-panel-header">
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{ background: '#e0e7ff', color: '#4f46e5', padding: '8px', borderRadius: '8px' }}><PieChart size={18} /></div>
          <div>
            <p className="admin-panel-title">Statistik Desa</p>
            <p className="admin-panel-subtitle">Data demografi yang tampil di Halaman Data Desa</p>
          </div>
        </div>
        <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
          {msg.text && <span className={`admin-toast ${msg.type}`}>{msg.text}</span>}
          <button type="submit" form="form-statistik" disabled={saving} className="admin-btn admin-btn-primary">
            <Save size={15} />{saving ? 'Menyimpan...' : 'Simpan Semua'}
          </button>
        </div>
      </div>

      <form id="form-statistik" onSubmit={submit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>

        {/* Ringkasan */}
        <div className="admin-section">
          <p className="admin-section-title">1. Ringkasan Kependudukan</p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '12px' }}>
            {numInput('total_penduduk', 'Total Penduduk (Jiwa)')}
            {numInput('total_kk', 'Kepala Keluarga (KK)')}
            {numInput('laki_laki', 'Laki-laki (Jiwa)')}
            {numInput('perempuan', 'Perempuan (Jiwa)')}
            <div>
              <label className="admin-label">Luas Wilayah</label>
              <input className="admin-input" style={{ fontWeight: 700 }} value={form.luas_wilayah || ''} onChange={e => set('luas_wilayah', e.target.value)} required />
            </div>
          </div>
        </div>

        {/* Distribusi Usia */}
        <div className="admin-section">
          <p className="admin-section-title">
            2. Distribusi Kelompok Usia
            <button type="button" onClick={() => addRow('distribusi_usia', { label: 'Grup Baru', jumlah: '0', persen: 0, color: '#94a3b8' })} className="admin-btn admin-btn-outline admin-btn-sm">
              <Plus size={13} /> Tambah
            </button>
          </p>
          <div className="admin-table-head" style={{ gridTemplateColumns: '2fr 100px 80px 110px 36px' }}>
            <span>Kategori Usia</span><span>Jumlah</span><span>%</span><span>Warna</span><span></span>
          </div>
          {(form.distribusi_usia || []).map((item, i) => (
            <div key={i} className="admin-table-row" style={{ gridTemplateColumns: '2fr 100px 80px 110px 36px' }}>
              <input className="admin-input" value={item.label || ''} onChange={e => setArr('distribusi_usia', i, 'label', e.target.value)} />
              <input className="admin-input" value={item.jumlah || ''} onChange={e => setArr('distribusi_usia', i, 'jumlah', e.target.value)} />
              <input type="number" className="admin-input" value={item.persen || 0} onChange={e => setArr('distribusi_usia', i, 'persen', parseInt(e.target.value) || 0)} />
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <input type="color" value={item.color || '#000'} onChange={e => setArr('distribusi_usia', i, 'color', e.target.value)} style={{ width: '32px', height: '32px', padding: '2px', border: '1px solid #cbd5e1', borderRadius: '5px', cursor: 'pointer' }} />
                <input className="admin-input" value={item.color || ''} onChange={e => setArr('distribusi_usia', i, 'color', e.target.value)} style={{ flex: 1 }} />
              </div>
              <button type="button" onClick={() => delRow('distribusi_usia', i)} className="admin-btn admin-btn-danger" style={{ padding: '7px 9px', height: '36px' }}><Trash2 size={14} /></button>
            </div>
          ))}
        </div>

        {/* Pendidikan */}
        <div className="admin-section">
          <p className="admin-section-title">
            3. Tingkat Pendidikan
            <button type="button" onClick={() => addRow('tingkat_pendidikan', { label: 'Tingkat Baru', jumlah: '0', persen: '0%' })} className="admin-btn admin-btn-outline admin-btn-sm">
              <Plus size={13} /> Tambah
            </button>
          </p>
          <div className="admin-table-head" style={{ gridTemplateColumns: '2fr 100px 100px 36px' }}>
            <span>Tingkat Pendidikan</span><span>Jumlah</span><span>Persentase</span><span></span>
          </div>
          {(form.tingkat_pendidikan || []).map((item, i) => (
            <div key={i} className="admin-table-row" style={{ gridTemplateColumns: '2fr 100px 100px 36px' }}>
              <input className="admin-input" value={item.label || ''} onChange={e => setArr('tingkat_pendidikan', i, 'label', e.target.value)} />
              <input className="admin-input" value={item.jumlah || ''} onChange={e => setArr('tingkat_pendidikan', i, 'jumlah', e.target.value)} />
              <input className="admin-input" value={item.persen || ''} onChange={e => setArr('tingkat_pendidikan', i, 'persen', e.target.value)} placeholder="cth: 30%" />
              <button type="button" onClick={() => delRow('tingkat_pendidikan', i)} className="admin-btn admin-btn-danger" style={{ padding: '7px 9px', height: '36px' }}><Trash2 size={14} /></button>
            </div>
          ))}
        </div>
      </form>
    </div>
  );
}
