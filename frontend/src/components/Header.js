import React from 'react';
import logo from '../images/header-logo.svg';
import { Link, useLocation } from 'react-router-dom';

function Header({ isLoggedIn, handleLogout, userEmail }) {
  const location = useLocation();

  return (
    <header className="header">
      <div className="header__container">
        <img
          src={logo}
          className="header__logo"
          alt="Логотип состоящий из слова Местро в степени Россия на английском"
        />
        {location.pathname === '/sign-in' && (
          <Link to="/sign-up" className="header__login">
            Регистрация
          </Link>
        )}
        {location.pathname === '/sign-up' && (
          <Link to="/sign-in" className="header__login">
            Войти
          </Link>
        )}
        {isLoggedIn && location.pathname !== '/sign-in' && (
          <div>
            <span className="header__email">{userEmail}</span>
            <a className="header__login" onClick={handleLogout}>
              Выйти
            </a>
          </div>
        )}
      </div>
    </header>
  );
}

export default Header;
