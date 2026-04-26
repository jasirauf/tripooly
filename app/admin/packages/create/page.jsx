'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Save, Plus, Trash2, ArrowLeft, Eye, X } from 'lucide-react';
import Link from 'next/link';
import PackageDetailsUI from '../../../components/PackageDetailsUI';

export default function CreatePackage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showPreview, setShowPreview] = useState(false);
  
  // Basic Fields
  const [title, setTitle] = useState('');
  const [location, setLocation] = useState('');
  const [price, setPrice] = useState('');
  const [rating, setRating] = useState('5.0');
  const [image, setImage] = useState('');
  const [category, setCategory] = useState('featured');
  
  // Dynamic Arrays
  const [inclusions, setInclusions] = useState(['']);
  const [months, setMonths] = useState([{ name: '', dates: [''] }]);

  // Handlers for Inclusions
  const addInclusion = () => setInclusions([...inclusions, '']);
  const updateInclusion = (index, value) => {
    const newInc = [...inclusions];
    newInc[index] = value;
    setInclusions(newInc);
  };
  const removeInclusion = (index) => {
    setInclusions(inclusions.filter((_, i) => i !== index));
  };

  // Handlers for Months & Dates
  const addMonth = () => setMonths([...months, { name: '', dates: [''] }]);
  const updateMonthName = (index, value) => {
    const newMonths = [...months];
    newMonths[index].name = value;
    setMonths(newMonths);
  };
  const removeMonth = (index) => {
    setMonths(months.filter((_, i) => i !== index));
  };
  
  const addDate = (monthIndex) => {
    const newMonths = [...months];
    newMonths[monthIndex].dates.push('');
    setMonths(newMonths);
  };
  const updateDate = (monthIndex, dateIndex, value) => {
    const newMonths = [...months];
    newMonths[monthIndex].dates[dateIndex] = value;
    setMonths(newMonths);
  };
  const removeDate = (monthIndex, dateIndex) => {
    const newMonths = [...months];
    newMonths[monthIndex].dates = newMonths[monthIndex].dates.filter((_, i) => i !== dateIndex);
    setMonths(newMonths);
  };

  const generatePreviewPayload = () => {
    const cleanedInclusions = inclusions.filter(inc => inc.trim() !== '');
    const cleanedMonths = months.map(m => ({
      name: m.name,
      dates: m.dates.filter(d => d.trim() !== '')
    })).filter(m => m.name.trim() !== '' && m.dates.length > 0);

    return {
      title: title || 'Untitled Package',
      location: location || 'Location',
      price: Number(price) || 0,
      rating: Number(rating) || 5.0,
      image: image || '',
      category,
      details: {
        inclusions: cleanedInclusions.length ? cleanedInclusions : ['Sample Inclusion'],
        months: cleanedMonths.length ? cleanedMonths : [{ name: 'Sample Month', dates: ['10th - 12th'] }]
      }
    };
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const payload = generatePreviewPayload();

    try {
      const res = await fetch('/api/packages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);

      if (data.message && data.message.includes('Mock DB')) {
        alert('Success (Mock Mode): Package created virtually!');
      } else {
        alert('Package successfully created!');
      }
      
      router.push('/admin/packages');
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  return (
    <div className="admin-page">
      <div className="admin-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h1>Create Package</h1>
          <p>Add a new travel package with full itinerary details.</p>
        </div>
        <Link href="/admin/packages" className="btn-secondary" style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 20px', background: '#333', color: '#fff', borderRadius: '8px', textDecoration: 'none' }}>
          <ArrowLeft size={18} /> Back to Packages
        </Link>
      </div>

      {showPreview && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, zIndex: 9999, background: 'rgba(0,0,0,0.9)', display: 'flex', flexDirection: 'column' }}>
          <div style={{ padding: '15px 30px', background: '#000', borderBottom: '1px solid #333', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h2 style={{ margin: 0, color: '#fff' }}>Live Preview</h2>
            <button onClick={() => setShowPreview(false)} style={{ background: 'transparent', border: 'none', color: '#fff', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '5px' }}>
              <X size={24} /> Close
            </button>
          </div>
          <div style={{ flex: 1, overflow: 'hidden' }}>
            <PackageDetailsUI trip={generatePreviewPayload()} isPreview={true} />
          </div>
        </div>
      )}

      <div className="admin-form-container" style={{ background: '#1a1a1a', padding: '30px', borderRadius: '12px', border: '1px solid #333' }}>
        {error && <div style={{ background: '#ef4444', color: 'white', padding: '10px', borderRadius: '8px', marginBottom: '20px' }}>{error}</div>}
        
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
          
          {/* Basic Info Section */}
          <section>
            <h3 style={{ borderBottom: '1px solid #333', paddingBottom: '10px', marginBottom: '20px' }}>Basic Details</h3>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
              <div>
                <label style={{ display: 'block', marginBottom: '8px', fontSize: '0.9rem' }}>Title</label>
                <input type="text" value={title} onChange={e => setTitle(e.target.value)} required style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #333', background: '#000', color: '#fff', outline: 'none' }} placeholder="e.g. Majestic Mountains" />
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: '8px', fontSize: '0.9rem' }}>Location</label>
                <input type="text" value={location} onChange={e => setLocation(e.target.value)} required style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #333', background: '#000', color: '#fff', outline: 'none' }} placeholder="e.g. Manali, Himachal" />
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: '8px', fontSize: '0.9rem' }}>Price (₹)</label>
                <input type="number" value={price} onChange={e => setPrice(e.target.value)} required style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #333', background: '#000', color: '#fff', outline: 'none' }} placeholder="e.g. 5999" />
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: '8px', fontSize: '0.9rem' }}>Category</label>
                <select value={category} onChange={e => setCategory(e.target.value)} required style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #333', background: '#000', color: '#fff', outline: 'none' }}>
                  <option value="featured">Featured Packages</option>
                  <option value="stays">Local Stays</option>
                  <option value="connections">Connections</option>
                </select>
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: '8px', fontSize: '0.9rem' }}>Image URL</label>
                <input type="url" value={image} onChange={e => setImage(e.target.value)} required style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #333', background: '#000', color: '#fff', outline: 'none' }} placeholder="https://..." />
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: '8px', fontSize: '0.9rem' }}>Rating</label>
                <input type="number" step="0.1" max="5" value={rating} onChange={e => setRating(e.target.value)} required style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #333', background: '#000', color: '#fff', outline: 'none' }} placeholder="5.0" />
              </div>
            </div>
          </section>

          {/* Inclusions Section */}
          <section>
            <h3 style={{ borderBottom: '1px solid #333', paddingBottom: '10px', marginBottom: '20px' }}>Inclusions (What's included)</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {inclusions.map((inc, idx) => (
                <div key={idx} style={{ display: 'flex', gap: '10px' }}>
                  <input type="text" value={inc} onChange={e => updateInclusion(idx, e.target.value)} placeholder="e.g. 3 Nights Accommodation" style={{ flex: 1, padding: '12px', borderRadius: '8px', border: '1px solid #333', background: '#000', color: '#fff', outline: 'none' }} />
                  {inclusions.length > 1 && (
                    <button type="button" onClick={() => removeInclusion(idx)} style={{ background: '#ef4444', color: 'white', border: 'none', padding: '0 15px', borderRadius: '8px', cursor: 'pointer' }}>
                      <Trash2 size={16} />
                    </button>
                  )}
                </div>
              ))}
              <button type="button" onClick={addInclusion} style={{ alignSelf: 'flex-start', display: 'flex', alignItems: 'center', gap: '5px', padding: '8px 15px', background: '#333', color: '#fff', border: 'none', borderRadius: '8px', cursor: 'pointer', fontSize: '0.9rem' }}>
                <Plus size={16} /> Add Inclusion
              </button>
            </div>
          </section>

          {/* Availability Dates Section */}
          <section>
            <h3 style={{ borderBottom: '1px solid #333', paddingBottom: '10px', marginBottom: '20px' }}>Availability (Months & Dates)</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '25px' }}>
              {months.map((month, mIdx) => (
                <div key={mIdx} style={{ padding: '20px', background: '#000', border: '1px solid #333', borderRadius: '12px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '15px' }}>
                    <input type="text" value={month.name} onChange={e => updateMonthName(mIdx, e.target.value)} placeholder="Month Name (e.g. October)" style={{ width: '50%', padding: '10px', borderRadius: '8px', border: '1px solid #444', background: '#111', color: '#fff', outline: 'none' }} />
                    {months.length > 1 && (
                      <button type="button" onClick={() => removeMonth(mIdx)} style={{ color: '#ef4444', background: 'transparent', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '5px' }}>
                        <Trash2 size={16} /> Remove Month
                      </button>
                    )}
                  </div>
                  
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', paddingLeft: '20px', borderLeft: '2px solid #333' }}>
                    {month.dates.map((date, dIdx) => (
                      <div key={dIdx} style={{ display: 'flex', gap: '10px' }}>
                        <input type="text" value={date} onChange={e => updateDate(mIdx, dIdx, e.target.value)} placeholder="Date (e.g. 12th-14th Oct)" style={{ flex: 1, padding: '10px', borderRadius: '8px', border: '1px solid #444', background: '#111', color: '#fff', outline: 'none' }} />
                        {month.dates.length > 1 && (
                          <button type="button" onClick={() => removeDate(mIdx, dIdx)} style={{ background: '#333', color: 'white', border: 'none', padding: '0 15px', borderRadius: '8px', cursor: 'pointer' }}>
                            <Trash2 size={16} />
                          </button>
                        )}
                      </div>
                    ))}
                    <button type="button" onClick={() => addDate(mIdx)} style={{ alignSelf: 'flex-start', display: 'flex', alignItems: 'center', gap: '5px', padding: '6px 12px', background: '#222', color: '#aaa', border: '1px solid #333', borderRadius: '8px', cursor: 'pointer', fontSize: '0.8rem' }}>
                      <Plus size={14} /> Add Date
                    </button>
                  </div>
                </div>
              ))}
              
              <button type="button" onClick={addMonth} style={{ alignSelf: 'flex-start', display: 'flex', alignItems: 'center', gap: '5px', padding: '10px 20px', background: '#2563eb', color: '#fff', border: 'none', borderRadius: '8px', cursor: 'pointer', fontSize: '0.9rem', fontWeight: '500' }}>
                <Plus size={16} /> Add New Month Block
              </button>
            </div>
          </section>

          <div style={{ display: 'flex', gap: '15px', marginTop: '20px' }}>
            <button type="button" onClick={() => setShowPreview(true)} style={{ flex: 1, padding: '15px', background: '#333', color: '#fff', border: '1px solid #444', borderRadius: '8px', fontSize: '1.1rem', fontWeight: '600', cursor: 'pointer', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '10px' }}>
              <Eye size={20} /> Live Preview
            </button>
            <button type="submit" disabled={loading} style={{ flex: 2, padding: '15px', background: '#FACC15', color: '#000', border: 'none', borderRadius: '8px', fontSize: '1.1rem', fontWeight: '600', cursor: 'pointer', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '10px', opacity: loading ? 0.7 : 1 }}>
              <Save size={20} /> {loading ? 'Saving...' : 'Save Package'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
