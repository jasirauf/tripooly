import Link from 'next/link';
import connectToDatabase from '../../../lib/mongodb';
import Package from '../../../models/Package';
import { Plus } from 'lucide-react';

import { packages as mockPackages } from '../../data/packages';

export const dynamic = 'force-dynamic'; // Ensure it's not statically generated

export default async function AdminPackages() {
  let packages = [];
  try {
    const db = await connectToDatabase();
    if (db) {
      packages = await Package.find({}).sort({ createdAt: -1 });
    }
  } catch (e) {
    console.error("Failed to load packages:", e);
  }

  // Fallback to mock packages if offline or empty
  if (packages.length === 0) {
    packages = mockPackages;
  }

  return (
    <div className="admin-page">
      <div className="admin-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h1>Manage Packages</h1>
          <p>View, edit, and remove travel packages.</p>
        </div>
        <Link href="/admin/packages/create" className="btn-edit" style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 20px', background: '#FACC15', color: '#000' }}>
          <Plus size={18} /> Add New Package
        </Link>
      </div>

      <div className="admin-table-container">
        <table className="admin-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Title</th>
              <th>Location</th>
              <th>Price</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {packages.map(pkg => (
              <tr key={pkg._id.toString()}>
                <td>{pkg.id}</td>
                <td>{pkg.title}</td>
                <td>{pkg.location}</td>
                <td>₹{pkg.price}</td>
                <td className="action-btns">
                  <Link href={`/admin/packages/edit/${pkg.id}`} className="btn-edit">Edit</Link>
                  <button className="btn-delete">Delete</button>
                </td>
              </tr>
            ))}
            {packages.length === 0 && (
              <tr>
                <td colSpan="5" style={{ textAlign: 'center', padding: '40px' }}>
                  No packages found. 
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
