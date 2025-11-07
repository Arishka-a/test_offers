// src/components/UserForm.jsx
import React, { useState } from 'react';

export default function UserForm({ user, onSubmit, onCancel }) {
  const [formData, setFormData] = useState({
    email: user?.email || '',
    password: '',
    role: user?.role || 'user',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem', padding: '1rem' }}>
      <input
        type="email"
        placeholder="Email"
        value={formData.email}
        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        required
        style={{ padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
      />
      <input
        type="password"
        placeholder={user ? 'Новый пароль (оставьте пустым)' : 'Пароль'}
        value={formData.password}
        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
        {...(!user && { required: true })}
        style={{ padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
      />
      <select
        value={formData.role}
        onChange={(e) => setFormData({ ...formData, role: e.target.value })}
        style={{ padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
      >
        <option value="user">Пользователь</option>
        <option value="admin">Админ</option>
      </select>

      <div style={{ display: 'flex', gap: '0.5rem' }}>
        <button type="submit" style={{ padding: '8px 16px', background: '#1976d2', color: 'white', border: 'none', borderRadius: '4px' }}>
          {user ? 'Сохранить' : 'Создать'}
        </button>
        <button type="button" onClick={onCancel} style={{ padding: '8px 16px', background: '#666', color: 'white', border: 'none', borderRadius: '4px' }}>
          Отмена
        </button>
      </div>
    </form>
  );
}