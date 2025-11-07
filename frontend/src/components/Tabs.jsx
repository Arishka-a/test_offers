// src/components/Tabs.jsx
import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const tabs = [
  { name: 'Пользователи', path: '/dashboard/users' },
  { name: 'Предложения', path: '/dashboard/offers' },
];

export default function Tabs() {
  const navigate = useNavigate();
  const location = useLocation();
  const currentPath = location.pathname;

  return (
    <div
      style={{
        display: 'flex',
        background: '#fff',
        borderBottom: '1px solid #e0e0e0',
        padding: '0 1rem',
        position: 'sticky',
        top: 0,
        zIndex: 1000,
        boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
      }}
    >
      {tabs.map((tab) => (
        <button
          key={tab.path}
          onClick={() => navigate(tab.path)}
          style={{
            padding: '16px 20px',
            border: 'none',
            background: 'none',
            cursor: 'pointer',
            fontWeight: currentPath === tab.path ? '600' : '400',
            color: currentPath === tab.path ? '#1976d2' : '#555',
            borderBottom: currentPath === tab.path ? '3px solid #1976d2' : '3px solid transparent',
            transition: 'all 0.2s',
            fontSize: '1rem',
          }}
        >
          {tab.name}
        </button>
      ))}
    </div>
  );
}