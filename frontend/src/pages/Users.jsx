// // src/pages/Users.jsx
// import React, { useState, useEffect } from 'react';

// function Users() {
//   const [users, setUsers] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [columns, setColumns] = useState([]); // ← новые: названия колонок

//   const fetchUsers = async () => {
//     const token = localStorage.getItem('token');

//     if (!token) {
//       setError('Требуется авторизация');
//       setLoading(false);
//       return;
//     }

//     try {
//       const res = await fetch('http://localhost:3000/api/users', {
//         method: 'GET',
//         headers: {
//           'Authorization': `Bearer ${token}`,
//           'Content-Type': 'application/json'
//         },
//       });

//       const data = await res.json();

//       if (!res.ok) {
//         throw new Error(data.error || 'Ошибка загрузки');
//       }

//       setUsers(data);

//       // Автоматически берём названия колонок из первого объекта
//       if (data.length > 0) {
//         setColumns(Object.keys(data[0]));
//       }
//     } catch (err) {
//       setError(err.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchUsers();
//   }, []);

//   if (loading) return <div>Загрузка...</div>;
//   if (error) return <div style={{ color: 'red' }}>Ошибка: {error}</div>;
//   if (users.length === 0) return <div>Нет пользователей</div>;

//   return (
//     <div style={{ padding: '2rem' }}>
//       <h1>Пользователи</h1>

//       <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '1rem' }}>
//         <thead>
//           <tr style={{ background: '#f0f0f0' }}>
//             {columns.map((col) => (
//               <th
//                 key={col}
//                 style={{
//                   padding: '0.75rem',
//                   border: '1px solid #ddd',
//                   textAlign: 'left',
//                   textTransform: 'capitalize'
//                 }}
//               >
//                 {col.replace(/_/g, ' ')} {/* id_user → id user */}
//               </th>
//             ))}
//           </tr>
//         </thead>
//         <tbody>
//           {users.map((user, index) => (
//             <tr key={index}>
//               {columns.map((col) => (
//                 <td
//                   key={col}
//                   style={{
//                     padding: '0.75rem',
//                     border: '1px solid #ddd'
//                   }}
//                 >
//                   {user[col] !== null && user[col] !== undefined
//                     ? String(user[col])
//                     : '-'}
//                 </td>
//               ))}
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// }

// export default Users;