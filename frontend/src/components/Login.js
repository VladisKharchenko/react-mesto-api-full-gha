import React, { useState } from 'react';

function Login({ handleLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleLogin(email, password);
  };

  return (
    <div className="login">
      <div className="login__container">
        <h1 className="login__title">Вход</h1>
        <form onSubmit={handleSubmit}>
          <fieldset className="login__fieldset">
            <input
              id="email-input"
              type="email"
              name="email"
              placeholder="Email"
              className="login__input"
              minLength="2"
              maxLength="40"
              required
              value={email}
              onChange={handleEmailChange}
              autoComplete="username"
            />
          </fieldset>
          <fieldset className="login__fieldset">
            <input
              id="password-input"
              type="password"
              name="password"
              placeholder="Пароль"
              className="login__input"
              minLength="2"
              maxLength="200"
              required
              value={password}
              onChange={handlePasswordChange}
              autoComplete="current-password"
            />
          </fieldset>
          <button type="submit" className="login__submit">
            Войти
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
