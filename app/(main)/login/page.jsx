'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Lock, User } from 'lucide-react';
import '../page.css';

export default function Login() {
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ identifier, password })
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Login failed');
      }

      if (data.role === 'admin') {
        router.push('/admin');
      } else {
        router.push('/dashboard');
      }
      
      router.refresh();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="home-page categories-page" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '80vh' }}>
      <div className="login-card premium-shadow" style={{ background: '#fff', padding: '40px', borderRadius: '24px', width: '100%', maxWidth: '400px' }}>
        <h1 style={{ fontSize: '2rem', marginBottom: '10px', textAlign: 'center' }}>Welcome Back</h1>
        <p style={{ color: '#666', textAlign: 'center', marginBottom: '30px' }}>Log in to access your portal</p>
        
        {error && <div style={{ background: '#fee2e2', color: '#ef4444', padding: '12px', borderRadius: '8px', marginBottom: '20px', fontSize: '0.9rem', textAlign: 'center' }}>{error}</div>}

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div style={{ position: 'relative' }}>
            <User size={20} style={{ position: 'absolute', top: '50%', left: '15px', transform: 'translateY(-50%)', color: '#999' }} />
            <input 
              type="text" 
              placeholder="Username, Email, or Phone" 
              value={identifier}
              onChange={(e) => setIdentifier(e.target.value)}
              style={{ width: '100%', padding: '15px 15px 15px 45px', border: '1px solid #e5e5e5', borderRadius: '12px', outline: 'none', fontSize: '1rem' }}
              required
            />
          </div>
          <div style={{ position: 'relative' }}>
            <Lock size={20} style={{ position: 'absolute', top: '50%', left: '15px', transform: 'translateY(-50%)', color: '#999' }} />
            <input 
              type="password" 
              placeholder="Password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{ width: '100%', padding: '15px 15px 15px 45px', border: '1px solid #e5e5e5', borderRadius: '12px', outline: 'none', fontSize: '1rem' }}
              required
            />
          </div>
          <button type="submit" disabled={loading} className="primary-btn-bw" style={{ width: '100%', marginTop: '10px' }}>
            {loading ? 'Logging in...' : 'Log In'}
          </button>
        </form>
      </div>
    </div>
  );
}
