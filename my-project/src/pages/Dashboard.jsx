// // src/pages/Dashboard.jsx
// import React, { useState, useEffect } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import Tabs from '../components/Tabs';
// import BurgerMenu from '../components/BurgerMenu';

// const ENDPOINTS = {
//   users: '/api/users',
//   offers: '/api/offers',
//   logs: '/api/logs',
// };

// const TITLES = {
//   users: 'Пользователи',
//   offers: 'Предложения',
//   logs: 'Логи',
// };

// const formatValue = (value) => {
//   if (value === null || value === undefined) return '-';
//   if (value instanceof Date) return value.toLocaleString();
//   if (typeof value === 'boolean') return value ? 'Да' : 'Нет';
//   return String(value);
// };

// const formatColumn = (col) =>
//   col.replace(/_/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase());

// export default function Dashboard() {
//   const { tab = 'users' } = useParams();
//   const navigate = useNavigate();
//   const [data, setData] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   const fetchData = async () => {
//     const token = localStorage.getItem('token');
//     if (!token) {
//       navigate('/login');
//       return;
//     }

//     try {
//       const res = await fetch(`http://localhost:3000${ENDPOINTS[tab]}`, {
//         headers: {
//           'Authorization': `Bearer ${token}`,
//           'Content-Type': 'application/json',
//         },
//       });

//       if (res.status === 401) {
//         localStorage.removeItem('token');
//         navigate('/login');
//         return;
//       }

//       if (!res.ok) {
//         const errText = await res.text();
//         throw new Error(`Ошибка ${res.status}: ${errText}`);
//       }

//       const result = await res.json();
//       setData(Array.isArray(result) ? result : []);
//     } catch (err) {
//       setError(err.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchData();
//   }, [tab, navigate]);

//   const columns = data.length > 0 ? Object.keys(data[0]) : [];

//   return (
//     <div style={{ minHeight: '100vh', background: '#f9f9fb' }}>
//       {/* Шапка — всегда видна */}
//       <header
//         style={{
//           display: 'flex',
//           justifyContent: 'space-between',
//           alignItems: 'center',
//           background: '#fff',
//           padding: '0 1.5rem',
//           borderBottom: '1px solid #e0e0e0',
//           position: 'sticky',
//           top: 0,
//           left: 0,
//           right: 0,
//           zIndex: 1000,
//           width: '100%',
//           boxSizing: 'border-box',
//         }}
//       >
//         {/* Вкладки слева — всегда */}
//         <div style={{ flexShrink: 0 }}>
//           <Tabs />
//         </div>

//         {/* Бургер справа — всегда */}
//         <div style={{ flexShrink: 0 }}>
//           <BurgerMenu />
//         </div>
//       </header>

//       {/* Основной контент */}
//       <main
//         style={{
//           width: '100%',
//           maxWidth: 'none',
//           margin: '2rem 0',
//           padding: '0 1.5rem',
//           boxSizing: 'border-box',
//         }}
//       >
//         {/* Заголовок таблицы */}
//         <h2
//           style={{
//             margin: '0 0 1rem 0',
//             padding: '1rem 0',
//             fontSize: '1.25rem',
//             fontWeight: 600,
//             color: '#1a1a1a',
//             borderBottom: '1px solid #e0e0e0',
//           }}
//         >
//           {TITLES[tab]}
//         </h2>

//         {/* Состояния */}
//         {loading && (
//           <div style={{ textAlign: 'center', padding: '3rem', color: '#666' }}>
//             Загрузка...
//           </div>
//         )}

//         {error && (
//           <div style={{ textAlign: 'center', padding: '2rem', color: '#d32f2f' }}>
//             Ошибка: {error}
//           </div>
//         )}

//         {/* Таблица */}
//         {!loading && !error && (
//           <div
//             style={{
//               width: '100%',
//               overflowX: 'auto',
//               background: 'white',
//               borderRadius: '8px',
//               boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
//             }}
//           >
//             <div style={{ width: '100%', minWidth: '100%' }}>
//               <table
//                 style={{
//                   width: '100%',
//                   borderCollapse: 'collapse',
//                   tableLayout: 'fixed',
//                 }}
//               >
//                 <thead>
//                   <tr>
//                     {columns.map((col) => (
//                       <th
//                         key={col}
//                         style={{
//                           padding: '12px 8px',
//                           borderBottom: '2px solid #dee2e6',
//                           textAlign: 'left',
//                           fontWeight: 600,
//                           fontSize: '0.875rem',
//                           color: '#495057',
//                           background: '#f8f9fa',
//                           whiteSpace: 'nowrap',
//                           overflow: 'hidden',
//                           textOverflow: 'ellipsis',
//                         }}
//                       >
//                         {formatColumn(col)}
//                       </th>
//                     ))}
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {data.length > 0 ? (
//                     data.map((row, i) => (
//                       <tr
//                         key={i}
//                         style={{
//                           borderBottom: '1px solid #dee2e6',
//                           background: i % 2 === 0 ? '#fff' : '#fdfdfd',
//                         }}
//                       >
//                         {columns.map((col) => (
//                           <td
//                             key={col}
//                             style={{
//                               padding: '12px 8px',
//                               fontSize: '0.875rem',
//                               color: '#212529',
//                               whiteSpace: 'nowrap',
//                               overflow: 'hidden',
//                               textOverflow: 'ellipsis',
//                             }}
//                           >
//                             {formatValue(row[col])}
//                           </td>
//                         ))}
//                       </tr>
//                     ))
//                   ) : (
//                     <tr>
//                       <td
//                         colSpan={columns.length || 1}
//                         style={{
//                           padding: '2rem',
//                           textAlign: 'center',
//                           color: '#666',
//                           fontStyle: 'italic',
//                         }}
//                       >
//                         Нет данных
//                       </td>
//                     </tr>
//                   )}
//                 </tbody>
//               </table>
//             </div>
//           </div>
//         )}
//       </main>
//     </div>
//   );
// }


// src/pages/Dashboard.jsx
import React, { useState, useEffect } from 'react';
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
  const [showForm, setShowForm] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const isEditable = ['users', 'offers'].includes(tab);

  const fetchData = async () => {
  const token = localStorage.getItem('token');
  if (!token) {
    navigate('/login');
    return;
  }

  try {
    const res = await fetch(`http://localhost:3000${ENDPOINTS[tab]}`, {
      headers: {
        'Authorization': `Bearer ${token}`, // ← ОБЯЗАТЕЛЬНО!
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
  } catch (err) {
    setError(err.message);
  } finally {
    setLoading(false);
  }
};

  useEffect(() => { fetchData(); }, [tab, navigate]);

  const handleCreate = () => { setSelected(null); setShowForm(true); };
  const handleEdit = () => {
    if (data.length === 0) return alert('Выберите запись');
    setSelected(data[0]); // В реальном проекте — выбор строки
    setShowForm(true);
  };
  const handleDelete = () => {
    if (data.length === 0) return alert('Выберите запись');
    setShowConfirm(true);
  };

  const handleSubmit = async (formData) => {
    const token = localStorage.getItem('token');
    const method = selected ? 'PUT' : 'POST';
    const url = selected
      ? `http://localhost:3000${ENDPOINTS[tab]}/${selected.id}`
      : `http://localhost:3000${ENDPOINTS[tab]}`;

    try {
      const res = await fetch(url, {
        method,
        headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (!res.ok) throw new Error('Ошибка сохранения');
      setShowForm(false);
      fetchData();
    } catch (err) {
      alert(err.message);
    }
  };

  const handleConfirmDelete = async () => {
    const token = localStorage.getItem('token');
    const item = data[0]; // Замени на выбранный
    try {
      const res = await fetch(`http://localhost:3000${ENDPOINTS[tab]}/${item.id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` },
      });
      if (!res.ok) throw new Error('Ошибка удаления');
      setShowConfirm(false);
      fetchData();
    } catch (err) {
      alert(err.message);
    }
  };

  const columns = data.length > 0 ? Object.keys(data[0]) : [];

  return (
    <div style={{ minHeight: '100vh', background: '#f9f9fb' }}>
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#fff', padding: '0 1.5rem', borderBottom: '1px solid #e0e0e0', position: 'sticky', top: 0, zIndex: 1000, width: '100%', boxSizing: 'border-box' }}>
        <div style={{ flexShrink: 0 }}><Tabs /></div>
        <div style={{ flexShrink: 0 }}><BurgerMenu /></div>
      </header>

      <main style={{ width: '100%', maxWidth: 'none', margin: '2rem 0', padding: '0 1.5rem', boxSizing: 'border-box' }}>
        <h2 style={{ margin: '0 0 1rem 0', padding: '1rem 0', fontSize: '1.25rem', fontWeight: 600, color: '#1a1a1a', borderBottom: '1px solid #e0e0e0' }}>
          {TITLES[tab]}
        </h2>

        {isEditable && (
          <TableActions
            onAdd={handleCreate}
            onEdit={handleEdit}
            onDelete={handleDelete}
            canEdit={true}
            canDelete={true}
          />
        )}

        {loading && <div style={{ textAlign: 'center', padding: '3rem' }}>Загрузка...</div>}
        {error && <div style={{ color: 'red', textAlign: 'center' }}>Ошибка: {error}</div>}

        {!loading && !error && (
          <div style={{ width: '100%', overflowX: 'auto', background: 'white', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
            <div style={{ width: '100%', minWidth: '100%' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', tableLayout: 'fixed' }}>
                <thead>
                  <tr>
                    {columns.map(col => (
                      <th key={col} style={{ padding: '12px 8px', borderBottom: '2px solid #dee2e6', textAlign: 'left', fontWeight: 600, fontSize: '0.875rem', color: '#495057', background: '#f8f9fa', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                        {formatColumn(col)}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {data.length > 0 ? data.map((row, i) => (
                    <tr key={i} style={{ borderBottom: '1px solid #dee2e6', background: i % 2 === 0 ? '#fff' : '#fdfdfd' }}>
                      {columns.map(col => (
                        <td key={col} style={{ padding: '12px 8px', fontSize: '0.875rem', color: '#212529', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                          {formatValue(row[col])}
                        </td>
                      ))}
                    </tr>
                  )) : (
                    <tr>
                      <td colSpan={columns.length || 1} style={{ padding: '2rem', textAlign: 'center', color: '#666', fontStyle: 'italic' }}>
                        Нет данных
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {showForm && tab === 'users' && (
          <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 2000 }}>
            <div style={{ background: 'white', padding: '1.5rem', borderRadius: '8px', width: '400px', maxWidth: '90%' }}>
              <UserForm user={selected} onSubmit={handleSubmit} onCancel={() => setShowForm(false)} />
            </div>
          </div>
        )}

        {showForm && tab === 'offers' && (
          <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 2000 }}>
            <div style={{ background: 'white', padding: '1.5rem', borderRadius: '8px', width: '500px', maxWidth: '90%' }}>
              <OfferForm offer={selected} onSubmit={handleSubmit} onCancel={() => setShowForm(false)} />
            </div>
          </div>
        )}

        {showConfirm && (
          <ConfirmModal
            message="Вы уверены, что хотите удалить эту запись?"
            onConfirm={handleConfirmDelete}
            onCancel={() => setShowConfirm(false)}
          />
        )}
      </main>
    </div>
  );
}