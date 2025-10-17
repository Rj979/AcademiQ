import React from 'react';
import { Link, useLocation } from 'react-router-dom';

function Navbar() {
  const location = useLocation();
  const storedUserJson = localStorage.getItem('user');
  const user = storedUserJson ? JSON.parse(storedUserJson) : { username: 'student', firstName: 'Test', lastName: 'User', roles: ['STUDENT'] };

  const linkStyle = (path) => ({
    padding: '8px 12px',
    textDecoration: 'none',
    color: location.pathname === path ? '#2563eb' : '#111827',
    fontWeight: location.pathname === path ? '700' : '500',
  });

  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '12px 16px',
      borderBottom: '1px solid #e5e7eb',
      position: 'sticky',
      top: 0,
      background: '#ffffff',
      zIndex: 10,
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
        <div style={{ fontWeight: 800 }}>AcademiQ</div>
        <nav style={{ display: 'flex', gap: 8 }}>
          <Link to="/papers" style={linkStyle('/papers')}>Papers</Link>
          <Link to="/attendance" style={linkStyle('/attendance')}>Attendance</Link>
          <Link to="/internal-mark" style={linkStyle('/internal-mark')}>Internal Mark</Link>
          <Link to="/time-schedule" style={linkStyle('/time-schedule')}>Time Schedule</Link>
        </nav>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <div style={{ textAlign: 'right' }}>
          <div style={{ fontWeight: 600 }}>{user.firstName} {user.lastName}</div>
          <div style={{ fontSize: 12, color: '#6b7280' }}>@{user.username} · {user.roles?.[0] || 'USER'}</div>
        </div>
        <div style={{
          width: 36, height: 36, borderRadius: '50%', background: '#e5e7eb',
          display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700
        }}>
          {String(user.firstName || 'U').charAt(0)}
        </div>
      </div>
    </div>
  );
}

export default Navbar;
