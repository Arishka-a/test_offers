// src/components/TableActions.jsx
import React from 'react';

export default function TableActions({ onAdd, onEdit, onDelete, canEdit = true, canDelete = true }) {
  return (
    <div style={{ marginBottom: '1rem', display: 'flex', gap: '0.5rem' }}>
      <button
        onClick={onAdd}
        style={{
          padding: '8px 16px',
          background: '#1976d2',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer',
          fontSize: '0.875rem',
        }}
      >
        Добавить
      </button>

      {canEdit && (
        <button
          onClick={onEdit}
          style={{
            padding: '8px 16px',
            background: '#43a047',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            fontSize: '0.875rem',
          }}
        >
          Редактировать
        </button>
      )}

      {canDelete && (
        <button
          onClick={onDelete}
          style={{
            padding: '8px 16px',
            background: '#d32f2f',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            fontSize: '0.875rem',
          }}
        >
          Удалить
        </button>
      )}
    </div>
  );
}