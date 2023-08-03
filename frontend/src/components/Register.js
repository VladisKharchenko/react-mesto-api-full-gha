import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

function Register({ handleRegister }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const location = useLocation();

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleRegister(email, password);
  };

  return (
    <div className="register">
      <div className="register__container">
        <h1 className="register__title">Регистрация</h1>
        <form onSubmit={handleSubmit}>
          <fieldset className="register__fieldset">
            <input
              id="email-input"
              type="email"
              name="email"
              placeholder="Email"
              className="register__input"
              minLength="2"
              maxLength="40"
              required
              value={email}
              onChange={handleEmailChange}
              autoComplete="username"
            />
          </fieldset>
          <fieldset className="register__fieldset">
            <input
              id="password-input"
              type="password"
              name="password"
              placeholder="Пароль"
              className="register__input"
              minLength="2"
              maxLength="200"
              required
              value={password}
              onChange={handlePasswordChange}
              autoComplete="current-password"
            />
          </fieldset>
          <button type="submit" className="register__submit">
            Зарегистрироваться
          </button>
        </form>
        <div className="register__question-container">
          <p className="register__question">
            Уже зарегистированы?
            {location.pathname === '/sign-up' && (
              <Link to="/sign-in" className="register__question-link">
                Войти
              </Link>
            )}
          </p>
        </div>
      </div>
    </div>
  );
}

export default Register;
