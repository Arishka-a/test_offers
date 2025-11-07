// // src/pages/Offers.jsx
// import React, { useState, useEffect } from 'react';

// function Offers() {
//   const [offers, setOffers] = useState([]); // ← состояние для предложений
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   const fetchOffers = async () => {
//     const token = localStorage.getItem('token');

//     if (!token) {
//       setError('Требуется авторизация');
//       setLoading(false);
//       return;
//     }

//     try {
//       const res = await fetch('http://localhost:3000/api/offers', {
//         method: 'GET',
//         headers: {
//           'Authorization': `Bearer ${token}`,
//           'Content-Type': 'application/json'
//         },
//       });

//       const data = await res.json();

//       if (!res.ok) {
//         throw new Error(data.error || 'Не удалось загрузить предложения');
//       }

//       setOffers(data); // ← сохраняем offers
//     } catch (err) {
//       setError(err.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Загружаем при открытии страницы
//   useEffect(() => {
//     fetchOffers();
//   }, []);

//   if (loading) return <div>Загрузка предложений...</div>;
//   if (error) return <div style={{ color: 'red' }}>Ошибка: {error}</div>;

//   return (
//     <div style={{ padding: '2rem' }}>
//       <h1>Предложения</h1>

//       {offers.length === 0 ? (
//         <p>Нет предложений</p>
//       ) : (
//         <div>
//           {offers.map((offer) => (
//             <div
//               key={offer.id}
//               style={{
//                 border: '1px solid #ccc',
//                 margin: '1rem 0',
//                 padding: '1rem',
//                 borderRadius: '8px'
//               }}
//             >
//               <h3>{offer.title}</h3>
//               <p>{offer.description}</p>
//               <p><strong>Цена:</strong> {offer.price} ₽</p>
//               <small>Создано: {new Date(offer.created_at).toLocaleString()}</small>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }

// export default Offers; // ← ОБЯЗАТЕЛЬНО!