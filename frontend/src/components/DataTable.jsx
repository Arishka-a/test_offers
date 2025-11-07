// src/components/DataTable.jsx
import React from 'react';

const formatValue = (value) => {
  if (value === null || value === undefined) return '-';
  if (value instanceof Date) return value.toLocaleString();
  if (typeof value === 'boolean') return value ? 'Yes' : 'No';
  return String(value);
};

const formatColumn = (col) =>
  col
    .replace(/_/g, ' ')
    .replace(/\b\w/g, (l) => l.toUpperCase());

export default function DataTable({ data, title, emptyMessage = 'Нет данных' }) {
  if (!data || data.length === 0) {
    return (
      <div style={{ padding: '2rem', textAlign: 'center' }}>
        <p>{emptyMessage}</p>
      </div>
    );
  }

  const columns = Object.keys(data[0]);

  return (
    <div style={{ padding: '1rem' }}>
      <h2 style={{ marginBottom: '1rem' }}>{title}</h2>
      <div style={{ overflowX: 'auto' }}>
        <table
          style={{
            width: '100%',
            borderCollapse: 'collapse',
            background: 'white',
            boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
          }}
        >
          <thead>
            <tr style={{ background: '#f8f9fa' }}>
              {columns.map((col) => (
                <th
                  key={col}
                  style={{
                    padding: '12px 8px',
                    borderBottom: '2px solid #dee2e6',
                    textAlign: 'left',
                    fontWeight: '600',
                    fontSize: '0.9rem',
                    color: '#495057'
                  }}
                >
                  {formatColumn(col)}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((row, i) => (
              <tr
                key={i}
                style={{
                  borderBottom: '1px solid #dee2e6',
                  background: i % 2 === 0 ? '#fff' : '#f8f9fa'
                }}
              >
                {columns.map((col) => (
                  <td
                    key={col}
                    style={{
                      padding: '12px 8px',
                      fontSize: '0.9rem',
                      color: '#212529'
                    }}
                  >
                    {formatValue(row[col])}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}