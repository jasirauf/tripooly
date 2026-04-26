'use client';
import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Package, Home, LayoutDashboard, Settings, LogOut, Users } from 'lucide-react';
import './admin.css';

export default function AdminLayout({ children }) {
  const router = useRouter();

  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' });
    router.push('/login');
    router.refresh();
  };
  return (
    <div className="admin-container">
      {/* Sidebar */}
      <aside className="admin-sidebar">
        <div className="admin-logo">TRIPOOLY Admin</div>
        <nav className="admin-nav">
          <Link href="/admin" className="admin-nav-item">
            <LayoutDashboard size={20} />
            <span>Dashboard</span>
          </Link>
          <Link href="/admin/packages" className="admin-nav-item">
            <Package size={20} />
            <span>Packages</span>
          </Link>
          <Link href="/admin/stays" className="admin-nav-item">
            <Home size={20} />
            <span>Stays</span>
          </Link>
          <Link href="/admin/users" className="admin-nav-item">
            <Users size={20} />
            <span>Users</span>
          </Link>
          <Link href="/admin/settings" className="admin-nav-item">
            <Settings size={20} />
            <span>Settings</span>
          </Link>
        </nav>
        <div className="admin-logout">
          <button className="logout-btn" onClick={handleLogout}>
            <LogOut size={20} />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="admin-main">
        {children}
      </main>
    </div>
  );
}
