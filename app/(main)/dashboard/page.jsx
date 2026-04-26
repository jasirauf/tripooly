'use client';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { User, Settings, LogOut } from 'lucide-react';
import '../page.css';

export default function Dashboard() {
  const router = useRouter();

  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' });
    router.push('/login');
    router.refresh();
  };

  return (
    <div className="home-page categories-page">
      <div className="package-grid-container">
        <div className="page-header animate-fade-in" style={{ marginBottom: '40px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <h1 style={{ fontSize: '3rem', fontWeight: '800', marginBottom: '10px', letterSpacing: '-1px' }}>My Dashboard</h1>
            <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem' }}>Manage your personal details and bookings.</p>
          </div>
          <button onClick={handleLogout} className="secondary-btn-bw" style={{ color: '#000', borderColor: '#e5e5e5', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <LogOut size={18} /> Logout
          </button>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '30px' }}>
          <div className="premium-shadow" style={{ background: '#fff', borderRadius: '24px', padding: '40px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '30px' }}>
              <div style={{ width: '80px', height: '80px', borderRadius: '50%', background: '#f4f4f5', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <User size={40} color="#a1a1aa" />
              </div>
              <div>
                <h2 style={{ fontSize: '1.8rem' }}>Welcome, User!</h2>
                <p style={{ color: '#71717a' }}>Traveler Member</p>
              </div>
            </div>

            <h3 style={{ fontSize: '1.2rem', marginBottom: '15px', borderBottom: '1px solid #f4f4f5', paddingBottom: '10px' }}>Account Details</h3>
            <div style={{ display: 'grid', gridTemplateColumns: '100px 1fr', gap: '15px', color: '#52525b' }}>
              <strong>Status:</strong> <span>Active</span>
              <strong>Member Since:</strong> <span>April 2024</span>
              <strong>Permissions:</strong> <span>Standard (Cannot add users)</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
