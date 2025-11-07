// src/components/OfferForm.jsx
import React, { useState } from 'react';

export default function OfferForm({ offer, onSubmit, onCancel }) {
  const [formData, setFormData] = useState({
    title: offer?.title || '',
    description: offer?.description || '',
    price: offer?.price || '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem', padding: '1rem' }}>
      <input
        type="text"
        placeholder="Название"
        value={formData.title}
        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
        required
        style={{ padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
      />
      <textarea
        placeholder="Описание"
        value={formData.description}
        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
        style={{ padding: '8px', borderRadius: '4px', border: '1px solid #ccc', minHeight: '80px' }}
      />
      <input
        type="number"
        step="0.01"
        placeholder="Цена"
        value={formData.price}
        onChange={(e) => setFormData({ ...formData, price: e.target.value })}
        required
        style={{ padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
      />

      <div style={{ display: 'flex', gap: '0.5rem' }}>
        <button type="submit" style={{ padding: '8px 16px', background: '#1976d2', color: 'white', border: 'none', borderRadius: '4px' }}>
          {offer ? 'Сохранить' : 'Создать'}
        </button>
        <button type="button" onClick={onCancel} style={{ padding: '8px 16px', background: '#666', color: 'white', border: 'none', borderRadius: '4px' }}>
          Отмена
        </button>
      </div>
    </form>
  );
}