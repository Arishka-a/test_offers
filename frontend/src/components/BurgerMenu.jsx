// src/components/BurgerMenu.jsx
import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function BurgerMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { logout } = useAuth();

  const menuItems = [
    { name: 'Логи', path: '/dashboard/logs' },
    { name: 'Выйти', action: async () => { await logout(); navigate('/login'); } },
  ];

  return (
    <div style={{ position: 'relative' }}>
      {/* Бургер-кнопка */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        style={{
          padding: '12px',
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          display: 'flex',
          flexDirection: 'column',
          gap: '5px',
        }}
      >
        <span style={{ width: '24px', height: '3px', background: '#555', borderRadius: '2px' }}></span>
        <span style={{ width: '24px', height: '3px', background: '#555', borderRadius: '2px' }}></span>
        <span style={{ width: '24px', height: '3px', background: '#555', borderRadius: '2px' }}></span>
      </button>

      {/* Выпадающее меню */}
      {isOpen && (
        <div
          style={{
            position: 'absolute',
            top: '100%',
            right: 0,
            background: 'white',
            minWidth: '180px',
            boxShadow: '0 8px 16px rgba(0,0,0,0.15)',
            borderRadius: '8px',
            overflow: 'hidden',
            zIndex: 1000,
          }}
        >
          {menuItems.map((item, index) => (
            <button
              key={index}
              onClick={() => {
                setIsOpen(false);
                if (item.action) {
                  item.action();
                } else {
                  navigate(item.path);
                }
              }}
              style={{
                width: '100%',
                padding: '12px 16px',
                textAlign: 'left',
                background: location.pathname === item.path ? '#f0f7ff' : 'white',
                border: 'none',
                cursor: 'pointer',
                fontSize: '0.95rem',
                color: item.name === 'Выйти' ? '#d32f2f' : '#333',
                transition: 'background 0.2s',
              }}
              onMouseOver={(e) => e.target.style.background = '#f5f5f5'}
              onMouseOut={(e) => e.target.style.background = location.pathname === item.path ? '#f0f7ff' : 'white'}
            >
              {item.name}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}