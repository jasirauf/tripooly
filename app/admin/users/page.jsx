'use client';
import React, { useState, useEffect } from 'react';
import { Plus, Trash2 } from 'lucide-react';

export default function AdminUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newUsername, setNewUsername] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [newPhone, setNewPhone] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [error, setError] = useState('');

  const fetchUsers = async () => {
    try {
      const res = await fetch('/api/users');
      const data = await res.json();
      setUsers(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleAddUser = async (e) => {
    e.preventDefault();
    setError('');

    // Frontend duplication check (crucial for Mock Mode)
    const isDuplicate = users.some(u => 
      u.username === newUsername || 
      u.email === newEmail || 
      u.phone === newPhone
    );
    
    if (isDuplicate) {
      setError('A user with this Username, Email, or Phone already exists!');
      return;
    }

    try {
      const res = await fetch('/api/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          username: newUsername, 
          email: newEmail,
          phone: newPhone,
          password: newPassword, 
          role: 'user' 
        })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      
      setNewUsername('');
      setNewEmail('');
      setNewPhone('');
      setNewPassword('');
      setUsers(prev => [data.user, ...prev]);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this user?')) return;
    try {
      const res = await fetch(`/api/users/${id}`, { method: 'DELETE' });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      setUsers(prev => prev.filter(u => u._id !== id));
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className="admin-page">
      <div className="admin-header">
        <h1>Manage Users</h1>
        <p>Add normal users or remove access.</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 300px', gap: '30px' }}>
        <div className="admin-table-container">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Username</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Role</th>
                <th>Created At</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr><td colSpan="6">Loading...</td></tr>
              ) : users.map(user => (
                <tr key={user._id}>
                  <td style={{ fontWeight: '600' }}>{user.username}</td>
                  <td>{user.email || '-'}</td>
                  <td>{user.phone || '-'}</td>
                  <td>
                    <span style={{ 
                      padding: '4px 8px', 
                      background: user.role === 'admin' ? '#fef08a' : '#f4f4f5',
                      borderRadius: '12px',
                      fontSize: '0.8rem',
                      fontWeight: '700'
                    }}>
                      {user.role}
                    </span>
                  </td>
                  <td>{new Date(user.createdAt).toLocaleDateString()}</td>
                  <td>
                    {user.role !== 'admin' && (
                      <button onClick={() => handleDelete(user._id)} className="btn-delete" style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                        <Trash2 size={14} /> Delete
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="admin-stat-card" style={{ height: 'max-content' }}>
          <h3 style={{ marginBottom: '20px', color: '#000' }}>Add New User</h3>
          {error && <p style={{ color: 'red', fontSize: '0.85rem', marginBottom: '15px' }}>{error}</p>}
          <form onSubmit={handleAddUser} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
            <input 
              type="text" 
              placeholder="Username" 
              value={newUsername}
              onChange={e => setNewUsername(e.target.value)}
              required
              style={{ padding: '12px', borderRadius: '8px', border: '1px solid #e5e5e5', outline: 'none' }}
            />
            <input 
              type="email" 
              placeholder="Email Address" 
              value={newEmail}
              onChange={e => setNewEmail(e.target.value)}
              required
              style={{ padding: '12px', borderRadius: '8px', border: '1px solid #e5e5e5', outline: 'none' }}
            />
            <input 
              type="tel" 
              placeholder="Phone Number (10-15 digits)" 
              pattern="^\+?[0-9]{10,15}$"
              title="Must be 10-15 digits, optionally starting with +"
              value={newPhone}
              onChange={e => setNewPhone(e.target.value)}
              required
              style={{ padding: '12px', borderRadius: '8px', border: '1px solid #e5e5e5', outline: 'none' }}
            />
            <input 
              type="password" 
              placeholder="Password" 
              value={newPassword}
              onChange={e => setNewPassword(e.target.value)}
              required
              style={{ padding: '12px', borderRadius: '8px', border: '1px solid #e5e5e5', outline: 'none' }}
            />
            <button type="submit" style={{ padding: '12px', background: '#000', color: '#fff', borderRadius: '8px', fontWeight: 'bold', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '5px' }}>
              <Plus size={18} /> Add User
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
