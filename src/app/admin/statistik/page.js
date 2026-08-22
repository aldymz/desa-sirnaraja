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

  useEffect(() => { 
    getStatistikData().then(d => { 
      if (d) {
        if (!d.data_kependudukan || d.data_kependudukan.length === 0) {
          d.data_kependudukan = [
            { label: 'Total Penduduk', value: d.total_penduduk ? `${d.total_penduduk} Jiwa` : '3.215 Jiwa', color: '#1b4332', bg: '#d1fae5' },
            { label: 'Kepala Keluarga', value: d.total_kk ? `${d.total_kk} KK` : '1.259 KK', color: '#1d3557', bg: '#dbeafe' },
            { label: 'Luas Wilayah', value: d.luas_wilayah ? d.luas_wilayah : '602 Ha', color: '#d97706', bg: '#fef3c7' }
          ];
        }
        if (!d.jenis_kelamin || d.jenis_kelamin.length === 0) {
          d.jenis_kelamin = [
            { label: 'Laki-laki', jumlah: d.laki_laki ? `${d.laki_laki}` : '1.620', persen: '50.4%', color: '#3b82f6' },
            { label: 'Perempuan', jumlah: d.perempuan ? `${d.perempuan}` : '1.595', persen: '49.6%', color: '#ec4899' }
          ];
        }
        setForm(d); 
      }
      setLoading(false); 
    }).catch(err => {
      console.error(err);
      setLoading(false);
      flash('error', 'Terjadi kesalahan saat memuat data. Periksa koneksi.');
    }); 
  }, []);
  const flash = (type, text) => { setMsg({ type, text }); setTimeout(() => setMsg({ type: '', text: '' }), 6000); };

  const setArr = (arr, i, field, val) => { const a = [...(form[arr] || [])]; a[i] = { ...a[i], [field]: val }; setForm(p => ({ ...p, [arr]: a })); };
  const addRow = (arr, tmpl) => setForm(p => ({ ...p, [arr]: [...(p[arr] || []), tmpl] }));
  const delRow = (arr, i) => setForm(p => ({ ...p, [arr]: (p[arr] || []).filter((_, j) => j !== i) }));

  const submit = async (e) => {
    e.preventDefault(); setSaving(true);
    try {
      const { error } = await supabase.from('statistik_desa').update({
        data_kependudukan: form.data_kependudukan,
        jenis_kelamin: form.jenis_kelamin,
        distribusi_usia: form.distribusi_usia,
        tingkat_pendidikan: form.tingkat_pendidikan,
      }).eq('id', form.id || 1);
      if (error) throw error;
      flash('success', 'Data berhasil disimpan!');
    } catch (e) { flash('error', 'Gagal: Pastikan Anda sudah menjalankan SQL di file update_statistik_schema.sql - ' + e.message); }
    finally { setSaving(false); }
  };

  if (loading) return <p style={{ padding: '20px', fontSize: '0.875rem', color: '#64748b' }}>Memuat data...</p>;
  if (!form) return <p style={{ padding: '20px', fontSize: '0.875rem', color: '#ef4444' }}>Data tidak ditemukan.</p>;

  return (
    <div className="admin-panel">
      <div className="admin-panel-header">
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{ background: '#e0e7ff', color: '#4f46e5', padding: '8px', borderRadius: '8px' }}><PieChart size={18} /></div>
          <div>
            <p className="admin-panel-title">Statistik Desa</p>
            <p className="admin-panel-subtitle">Kelola Data Kependudukan, Jenis Kelamin, Usia, dan Pendidikan</p>
          </div>
        </div>
        <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
          {msg.text && <span className={`admin-toast ${msg.type}`}>{msg.text}</span>}
          <button type="submit" form="form-statistik" disabled={saving} className="admin-btn admin-btn-primary">
            <Save size={15} />{saving ? 'Menyimpan...' : 'Simpan Semua'}
          </button>
        </div>
      </div>

      <form id="form-statistik" onSubmit={submit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>

        {/* Data Kependudukan */}
        <div className="admin-section">
          <p className="admin-section-title">
            1. Data Kependudukan
            <button type="button" onClick={() => addRow('data_kependudukan', { label: 'Data Baru', value: '0 Jiwa', color: '#1b4332', bg: '#d1fae5' })} className="admin-btn admin-btn-outline admin-btn-sm">
              <Plus size={13} /> Tambah
            </button>
          </p>
          <div className="admin-table-head" style={{ gridTemplateColumns: '2fr 100px 60px 60px 36px' }}>
            <span>Label</span><span>Nilai</span><span>Teks</span><span>BG</span><span></span>
          </div>
          {(form.data_kependudukan || []).map((item, i) => (
            <div key={i} className="admin-table-row" style={{ gridTemplateColumns: '2fr 100px 60px 60px 36px' }}>
              <input className="admin-input" value={item.label || ''} onChange={e => setArr('data_kependudukan', i, 'label', e.target.value)} placeholder="Contoh: Total Penduduk" />
              <input className="admin-input" value={item.value || ''} onChange={e => setArr('data_kependudukan', i, 'value', e.target.value)} placeholder="Contoh: 3.215 Jiwa" />
              <input type="color" value={item.color || '#000'} onChange={e => setArr('data_kependudukan', i, 'color', e.target.value)} style={{ width: '100%', height: '36px', padding: '2px', border: '1px solid #cbd5e1', borderRadius: '5px' }} />
              <input type="color" value={item.bg || '#fff'} onChange={e => setArr('data_kependudukan', i, 'bg', e.target.value)} style={{ width: '100%', height: '36px', padding: '2px', border: '1px solid #cbd5e1', borderRadius: '5px' }} />
              <button type="button" onClick={() => delRow('data_kependudukan', i)} className="admin-btn admin-btn-danger" style={{ padding: '7px 9px', height: '36px' }}><Trash2 size={14} /></button>
            </div>
          ))}
        </div>

        {/* Jenis Kelamin */}
        <div className="admin-section">
          <p className="admin-section-title">
            2. Distribusi Jenis Kelamin
            <button type="button" onClick={() => addRow('jenis_kelamin', { label: 'Kategori Baru', jumlah: '0', persen: '0%', color: '#3b82f6' })} className="admin-btn admin-btn-outline admin-btn-sm">
              <Plus size={13} /> Tambah
            </button>
          </p>
          <div className="admin-table-head" style={{ gridTemplateColumns: '2fr 100px 80px 60px 36px' }}>
            <span>Kategori</span><span>Jumlah</span><span>Persentase</span><span>Warna</span><span></span>
          </div>
          {(form.jenis_kelamin || []).map((item, i) => (
            <div key={i} className="admin-table-row" style={{ gridTemplateColumns: '2fr 100px 80px 60px 36px' }}>
              <input className="admin-input" value={item.label || ''} onChange={e => setArr('jenis_kelamin', i, 'label', e.target.value)} />
              <input className="admin-input" value={item.jumlah || ''} onChange={e => setArr('jenis_kelamin', i, 'jumlah', e.target.value)} />
              <input className="admin-input" value={item.persen || ''} onChange={e => setArr('jenis_kelamin', i, 'persen', e.target.value)} />
              <input type="color" value={item.color || '#000'} onChange={e => setArr('jenis_kelamin', i, 'color', e.target.value)} style={{ width: '100%', height: '36px', padding: '2px', border: '1px solid #cbd5e1', borderRadius: '5px' }} />
              <button type="button" onClick={() => delRow('jenis_kelamin', i)} className="admin-btn admin-btn-danger" style={{ padding: '7px 9px', height: '36px' }}><Trash2 size={14} /></button>
            </div>
          ))}
        </div>

        {/* Distribusi Usia */}
        <div className="admin-section">
          <p className="admin-section-title">
            3. Distribusi Kelompok Usia
            <button type="button" onClick={() => addRow('distribusi_usia', { label: 'Grup Baru', jumlah: '0', persen: 0, color: '#94a3b8' })} className="admin-btn admin-btn-outline admin-btn-sm">
              <Plus size={13} /> Tambah
            </button>
          </p>
          <div className="admin-table-head" style={{ gridTemplateColumns: '2fr 100px 80px 110px 36px' }}>
            <span>Kategori Usia</span><span>Jumlah</span><span>%</span><span>Warna Bar</span><span></span>
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
            4. Tingkat Pendidikan
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
