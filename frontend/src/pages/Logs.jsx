// // src/pages/Logs.jsx
// import React, { useState, useEffect } from 'react';

// function Logs() {
//   const [logs, setLogs] = useState([]); // ← состояние для логов
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   const fetchLogs = async () => {
//     const token = localStorage.getItem('token');
    
//     // Если нет токена — не делаем запрос
//     if (!token) {
//       setError('Не авторизован');
//       setLoading(false);
//       return;
//     }

//     try {
//       const res = await fetch('http://localhost:3000/api/logs', {
//         headers: {
//           'Authorization': `Bearer ${token}`,
//           'Content-Type': 'application/json'
//         },
//       });

//       const data = await res.json();

//       if (!res.ok) {
//         throw new Error(data.error || 'Ошибка сервера');
//       }

//       setLogs(data); // ← сохраняем логи
//     } catch (err) {
//       setError(err.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Загружаем логи при монтировании
//   useEffect(() => {
//     fetchLogs();
//   }, []);

//   if (loading) return <div>Загрузка логов...</div>;
//   if (error) return <div>Ошибка: {error}</div>;

//   return (
//     <div>
//       <h1>Логи</h1>
//       {logs.length === 0 ? (
//         <p>Логов нет</p>
//       ) : (
//         <ul>
//           {logs.map((log, index) => (
//             <li key={index}>
//               [{log.timestamp}] {log.message} ({log.userEmail})
//             </li>
//           ))}
//         </ul>
//       )}
//     </div>
//   );
// }

// export default Logs; // ← ОБЯЗАТЕЛЬНО!