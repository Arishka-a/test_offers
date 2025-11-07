// src/components/ConfirmModal.jsx
import React from 'react';

export default function ConfirmModal({ message, onConfirm, onCancel }) {
  return (
    <div style={{
      position: 'fixed',
      top: 0, left: 0, right: 0, bottom: 0,
      background: 'rgba(0,0,0,0.5)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 2000,
    }}>
      <div style={{
        background: 'white',
        padding: '1.5rem',
        borderRadius: '8px',
        width: '400px',
        maxWidth: '90%',
        boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
      }}>
        <p style={{ margin: '0 0 1rem 0' }}>{message}</p>
        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.5rem' }}>
          <button onClick={onCancel} style={{ padding: '8px 16px', background: '#666', color: 'white', border: 'none', borderRadius: '4px' }}>
            Отмена
          </button>
          <button onClick={onConfirm} style={{ padding: '8px 16px', background: '#d32f2f', color: 'white', border: 'none', borderRadius: '4px' }}>
            Удалить
          </button>
        </div>
      </div>
    </div>
  );
}