import React from 'react';
import { connections } from '../../data/packages';
import { Users, Calendar, MapPin } from 'lucide-react';
import './page.css';

const Connection = () => {
  return (
    <div className="connection-page animate-fade-in">
      <div className="page-header">
        <h1>Offline Connections</h1>
        <p>Reconnect with the world, one community at a time.</p>
      </div>

      <div className="connection-grid">
        {connections.map(conn => (
          <div key={conn.id} className="connection-card premium-shadow">
            <div className="conn-image">
              <img src={conn.image} alt={conn.title} />
            </div>
            <div className="conn-content">
              <h3>{conn.title}</h3>
              <div className="conn-meta">
                <span><MapPin size={14} /> {conn.location}</span>
                <span><Calendar size={14} /> {conn.date}</span>
                <span><Users size={14} /> {conn.participants} people</span>
              </div>
              <p>{conn.description}</p>
              <button className="connect-btn">Connect Offline</button>
            </div>
          </div>
        ))}
      </div>

      <div className="join-community-section dark-glass">
        <h2>Start your own connection</h2>
        <p>This is a non-profit initiative to help people showcase their travel plans and help others join.</p>
        <button className="primary-btn-bw">List your Plan</button>
      </div>
    </div>
  );
};

export default Connection;
