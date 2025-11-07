import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [isRegister, setIsRegister] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    const endpoint = isRegister ? '/api/auth/register' : '/api/auth/login';

    // ← ИСПРАВЛЕНИЕ 1: Добавляем role при регистрации
    const payload = isRegister
      ? { email, password, role: 'user' }
      : { email, password };

    try {
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      // ← ДОБАВЬ ЛОГИ (для отладки)
      console.log('Ответ сервера:', data);

      if (res.ok) {
        if (isRegister) {
          alert('Регистрация успешна! Войдите.');
          setIsRegister(false);
          setEmail('');
          setPassword('');
        } else {
          localStorage.setItem('token', data.token);
          console.log('Токен сохранён:', data.token);

          // ← ИСПРАВЛЕНИЕ 2: Явно указываем таб
          navigate('/dashboard/users');
        }
      } else {
        setError(data.error || 'Ошибка сервера');
      }
    } catch (err) {
      console.error('Ошибка сети:', err);
      setError('Нет связи с сервером');
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: '100px auto', padding: '2rem', background: 'white', borderRadius: '8px', boxShadow: '0 2px 10px rgba(0,0,0,0.1)' }}>
      <h2>{isRegister ? 'Регистрация' : 'Вход'}</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={{ padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
        />
        <input
          type="password"
          placeholder="Пароль"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          style={{ padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
        />
        <button type="submit" style={{ padding: '10px', background: '#1976d2', color: 'white', border: 'none', borderRadius: '4px' }}>
          {isRegister ? 'Зарегистрироваться' : 'Войти'}
        </button>
      </form>
      <p style={{ marginTop: '1rem', textAlign: 'center' }}>
        {isRegister ? 'Уже есть аккаунт? ' : 'Нет аккаунта? '}
        <button onClick={() => setIsRegister(!isRegister)} style={{ color: '#1976d2', background: 'none', border: 'none', textDecoration: 'underline', cursor: 'pointer' }}>
          {isRegister ? 'Войти' : 'Зарегистрироваться'}
        </button>
      </p>
    </div>
  );
}