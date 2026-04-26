export default function AdminDashboard() {
  return (
    <div className="admin-page">
      <div className="admin-header">
        <h1>Dashboard</h1>
        <p>Overview of your platform.</p>
      </div>

      <div className="admin-stats-grid">
        <div className="admin-stat-card">
          <h3>Total Packages</h3>
          <div className="stat-value">2</div>
        </div>
        <div className="admin-stat-card">
          <h3>Total Stays</h3>
          <div className="stat-value">2</div>
        </div>
        <div className="admin-stat-card">
          <h3>Total Connections</h3>
          <div className="stat-value">2</div>
        </div>
        <div className="admin-stat-card">
          <h3>Platform Views</h3>
          <div className="stat-value">1.2k</div>
        </div>
      </div>
    </div>
  );
}
