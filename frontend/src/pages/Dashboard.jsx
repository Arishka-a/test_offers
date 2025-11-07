import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Tabs from '../components/Tabs';
import BurgerMenu from '../components/BurgerMenu';
import TableActions from '../components/operations/TableActions';
import UserForm from '../components/operations/UserForm';
import OfferForm from '../components/operations/OfferForm';
import ConfirmModal from '../components/operations/ConfirmModal';

const ENDPOINTS = { users: '/api/users', offers: '/api/offers', logs: '/api/logs' };
const TITLES = { users: 'Пользователи', offers: 'Предложения', logs: 'Логи' };

const formatValue = (value) => (value == null ? '-' : String(value));
const formatColumn = (col) => col.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());

export default function Dashboard() {
  const { tab = 'users' } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selected, setSelected] = useState(null);
  const [selectedIds, setSelectedIds] = useState(new Set());
  const [showForm, setShowForm] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const tableRef = useRef(null);
  const isEditable = ['users', 'offers'].includes(tab);

  // 🧭 Обработка клика вне таблицы (не сбрасываем при клике на кнопки/модалку)
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        tableRef.current &&
        !tableRef.current.contains(e.target) &&
        !e.target.closest('.confirm-modal') &&
        !e.target.closest('.table-actions')
      ) {
        setIsDeleting(false);
        setSelectedIds(new Set());
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // 📡 Загрузка данных
  const fetchData = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
      return;
    }

    try {
      setLoading(true);
      const res = await fetch(`/api/${tab}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (res.status === 401) {
        localStorage.removeItem('token');
        navigate('/login');
        return;
      }

      if (!res.ok) throw new Error('Ошибка загрузки');

      const result = await res.json();
      setData(Array.isArray(result) ? result : []);
      setSelectedIds(new Set());
    } catch (err) {
      console.error(err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [tab, navigate]);

  // 🗑 Универсальный обработчик кнопки удаления
  const handleDeleteClick = () => {
    console.log('handleDeleteClick: isDeleting=', isDeleting, 'selectedIds=', Array.from(selectedIds));

    if (!isDeleting) {
      // Первый клик — включаем режим выбора
      setIsDeleting(true);
      setSelectedIds(new Set());
      return;
    }

    // Второй клик — проверяем, выбрано ли что-то
    if (selectedIds.size === 0) {
      alert('Выберите хотя бы одну запись');
      return;
    }

    // Показываем модалку подтверждения
    setShowConfirm(true);
  };

  // ✅ Подтверждение удаления
  const handleConfirmDelete = async () => {
  const token = localStorage.getItem('token');
  try {
    await Promise.all(
      Array.from(selectedIds).map(async (id) => { 
        const res = await fetch(`/api/${tab}/${id}`, {
          method: 'DELETE',
          headers: { 'Authorization': `Bearer ${token}` },
        });
        if (!res.ok) {
          const err = await res.json();
          throw new Error(err.error || `Ошибка удаления ID ${id}`);
        }
      })
    );
    setShowConfirm(false);
    setIsDeleting(false);
    setSelectedIds(new Set());
    fetchData();
  } catch (err) {
    alert(err.message);
  }
};

  // 📄 Обработчики выбора строк
  const toggleSelect = (id) => {
    const newSelected = new Set(selectedIds);
    if (newSelected.has(id)) newSelected.delete(id);
    else newSelected.add(id);
    setSelectedIds(newSelected);
  };

  const handleRowClick = (item) => {
    if (isDeleting) return;
    setSelected(item);
  };

  // ✏️ Редактирование и добавление
  const handleEdit = () => {
    if (!selected) {
      alert('Выберите запись для редактирования');
      return;
    }
    setShowForm(true);
  };

  const handleCreate = () => {
    setSelected(null);
    setShowForm(true);
  };

  const handleSubmit = async (formData) => {
  const token = localStorage.getItem('token');
  const method = selected ? 'PUT' : 'POST';
  const url = selected ? `/api/${tab}/${selected.id}` : `/api/${tab}`;

  try {
    const res = await fetch(url, {
      method,
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json', // ← КЛЮЧЕВОЙ ХЕДЕР
      },
      body: JSON.stringify(formData),
    });

    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.error || 'Ошибка сохранения');
    }

    setShowForm(false);
    setSelected(null);
    fetchData();
  } catch (err) {
    alert(err.message);
  }
};

  const columns = data.length > 0 ? Object.keys(data[0]).filter(col => col !== 'password_hash') : [];

  // 🧱 Рендер
  return (
    <div style={{ minHeight: '100vh', background: '#f9f9fb' }}>
      {/* HEADER */}
      <header style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        background: '#fff',
        padding: '0 1.5rem',
        borderBottom: '1px solid #e0e0e0',
        position: 'sticky',
        top: 0,
        zIndex: 1000,
        width: '100%',
        boxSizing: 'border-box'
      }}>
        <div style={{ flexShrink: 0 }}><Tabs /></div>
        <div style={{ flexShrink: 0 }}><BurgerMenu /></div>
      </header>

      {/* MAIN */}
      <main style={{ width: '100%', margin: '2rem 0', padding: '0 1.5rem', boxSizing: 'border-box' }}>
        <h2 style={{
          margin: '0 0 1rem 0',
          padding: '1rem 0',
          fontSize: '1.25rem',
          fontWeight: 600,
          color: '#1a1a1a',
          borderBottom: '1px solid #e0e0e0'
        }}>
          {TITLES[tab]}
        </h2>

        {isEditable && (
          <div className="table-actions">
            <TableActions
              onAdd={handleCreate}
              onEdit={handleEdit}
              onDelete={handleDeleteClick}
              canEdit={!!selected}
              canDelete={selectedIds.size > 0}
              deleteLabel={isDeleting ? `Удалить (${selectedIds.size})` : 'Удалить'}
            />
          </div>
        )}

        {/* Контент */}
        {loading && <div style={{ textAlign: 'center', padding: '3rem' }}>Загрузка...</div>}
        {error && <div style={{ color: 'red', textAlign: 'center' }}>Ошибка: {error}</div>}

        {!loading && !error && (
          <div ref={tableRef} style={{
            width: '100%',
            overflowX: 'auto',
            background: 'white',
            borderRadius: '8px',
            boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
          }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', tableLayout: 'fixed' }}>
              <thead>
                <tr>
                  {isDeleting && (
                    <th style={{ width: '40px', padding: '12px 8px', textAlign: 'center' }}>
                      <input
                        type="checkbox"
                        checked={selectedIds.size === data.length && data.length > 0}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setSelectedIds(new Set(data.map(d => d.id)));
                          } else {
                            setSelectedIds(new Set());
                          }
                        }}
                      />
                    </th>
                  )}
                  {columns.map(col => (
                    <th key={col} style={{
                      padding: '12px 8px',
                      borderBottom: '2px solid #dee2e6',
                      textAlign: 'left',
                      fontWeight: 600,
                      fontSize: '0.875rem',
                      color: '#495057',
                      background: '#f8f9fa'
                    }}>
                      {formatColumn(col)}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {data.length > 0 ? data.map((row, i) => (
                  <tr
                    key={row.id}
                    onClick={() => handleRowClick(row)}
                    style={{
                      cursor: isDeleting ? 'default' : 'pointer',
                      background: selected?.id === row.id
                        ? '#e3f2fd'
                        : (selectedIds.has(row.id)
                          ? '#fff3e0'
                          : (i % 2 === 0 ? '#fff' : '#fdfdfd')),
                      borderBottom: '1px solid #dee2e6'
                    }}
                  >
                    {isDeleting && (
                      <td style={{ textAlign: 'center' }} onClick={(e) => e.stopPropagation()}>
                        <input
                          type="checkbox"
                          checked={selectedIds.has(row.id)}
                          onChange={() => toggleSelect(row.id)}
                        />
                      </td>
                    )}
                    {columns.map(col => (
                      <td key={col} style={{ padding: '12px 8px', fontSize: '0.875rem', color: '#212529' }}>
                        {formatValue(row[col])}
                      </td>
                    ))}
                  </tr>
                )) : (
                  <tr>
                    <td colSpan={columns.length + (isDeleting ? 1 : 0)} style={{ padding: '2rem', textAlign: 'center', color: '#666', fontStyle: 'italic' }}>
                      Нет данных
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}

        {/* Модалки */}
        {showForm && tab === 'users' && (
          <div className="confirm-modal" style={{
            position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
            background: 'rgba(0,0,0,0.5)', display: 'flex',
            alignItems: 'center', justifyContent: 'center', zIndex: 2000
          }}>
            <div style={{
              background: 'white', padding: '1.5rem',
              borderRadius: '8px', width: '400px', maxWidth: '90%'
            }}>
              <UserForm
                user={selected}
                onSubmit={handleSubmit}
                onCancel={() => { setShowForm(false); setSelected(null); }}
              />
            </div>
          </div>
        )}

        {showForm && tab === 'offers' && (
          <div className="confirm-modal" style={{
            position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
            background: 'rgba(0,0,0,0.5)', display: 'flex',
            alignItems: 'center', justifyContent: 'center', zIndex: 2000
          }}>
            <div style={{
              background: 'white', padding: '1.5rem',
              borderRadius: '8px', width: '500px', maxWidth: '90%'
            }}>
              <OfferForm
                offer={selected}
                onSubmit={handleSubmit}
                onCancel={() => { setShowForm(false); setSelected(null); }}
              />
            </div>
          </div>
        )}

        {showConfirm && (
          <ConfirmModal
            message={`Удалить ${selectedIds.size} запись(и)?`}
            onConfirm={handleConfirmDelete}
            onCancel={() => setShowConfirm(false)}
          />
        )}
      </main>
    </div>
  );
}
