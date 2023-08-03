import React, { useState, useEffect } from 'react';
import Header from './Header.js';
import Main from './Main.js';
import Footer from './Footer.js';
import ImagePopup from './ImagePopup.js';
import api from '../utils/Api.js';
import CurrentUserContext from '../contexts/CurrentUserContext.js';
import EditProfilePopup from './EditProfilePopup.js';
import EditAvatarPopup from './EditAvatarPopup.js';
import AddPlacePopup from './AddPlacePopup.js';
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from 'react-router-dom';

import Login from './Login.js';
import Register from './Register.js';
import ProtectedRoute from './ProtectedRoute.js';
import InfoTooltip from './InfoTooltip.js';
import { register, login, logout, checkToken } from './auth.js';
import successButton from '../images/Union1.png';
import failureButton from '../images/Union2.png';

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = useState(false);
  const [infoTooltipData, setInfoTooltipData] = useState({
    image: '',
    text: '',
  });
  const [token, setToken] = useState('');
  const [email, setEmail] = useState('');

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const userInfo = await api.getUserInfo();
        setCurrentUser(userInfo);
      } catch (error) {
        console.log('Ошибка при получении данных пользователя:', error);
      }
    };

    fetchUserInfo();
  }, []);

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function handleCardClick(card) {
    setSelectedCard(card);
  }

  function closeAllPopups() {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setSelectedCard({});
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some((i) => i === currentUser._id);

    if (isLiked) {
      api
        .removeLike(card._id)
        .then((updatedCard) => {
          setCards((state) =>
            state.map((c) => (c._id === card._id ? updatedCard : c))
          );
        })
        .catch((error) => {
          console.log('Ошибка при удалении лайка:', error);
        });
    } else {
      api
        .addLike(card._id)
        .then((updatedCard) => {
          setCards((state) =>
            state.map((c) => (c._id === card._id ? updatedCard : c))
          );
        })
        .catch((error) => {
          console.log('Ошибка при добавлении лайка:', error);
        });
    }
  }

  function handleCardDelete(card) {
    api
      .deleteCard(card._id)
      .then(() => {
        setCards((state) => state.filter((c) => c._id !== card._id));
      })
      .catch((error) => {
        console.log('Ошибка при удалении карточки:', error);
      });
  }

  const handleUpdateUser = (userData) => {
    api
      .updateUserInfo(userData)
      .then((updatedUser) => {
        setCurrentUser(updatedUser);
        closeAllPopups();
      })
      .catch((error) => {
        console.log('Ошибка при обновлении профиля пользователя:', error);
      });
  };

  const handleUpdateAvatar = (avatarData) => {
    api
      .changeAvatar(avatarData.avatar)
      .then((updatedUser) => {
        setCurrentUser(updatedUser);
        closeAllPopups();
      })
      .catch((error) => {
        console.log('Ошибка при обновлении аватара пользователя:', error);
      });
  };

  useEffect(() => {
    const fetchCards = async () => {
      try {
        const initialCards = await api.getInitialCards();
        setCards(initialCards);
      } catch (error) {
        console.log('Ошибка при получении данных:', error);
      }
    };

    fetchCards();
  }, []);

  const handleAddPlaceSubmit = (cardData) => {
    api
      .addNewCard(cardData)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((error) => {
        console.log('Ошибка при добавлении карточки:', error);
      });
  };

  const handleLogin = (email, password) => {
    login(email, password)
      .then((data) => {
        setLoggedIn(true);
        setCurrentUser(data.user);
        setEmail(email);
        localStorage.setItem('userEmail', data.user.email); 
      })
      .catch((error) => {
        console.log('Ошибка при входе:', error);
      });
  };

  const handleRegister = (email, password) => {
    register(email, password)
      .then((data) => {
        setIsInfoTooltipOpen(true);
        setInfoTooltipData({
          image: successButton,
          text: 'Вы успешно зарегистрировались!',
        });
        handleLogin(email, password);
      })
      .catch((error) => {
        console.log('Ошибка при регистрации:', error);
        setIsInfoTooltipOpen(true);
        setInfoTooltipData({
          image: failureButton,
          text: 'Ошибка при регистрации',
        });
      });
  };

  function handleInfoTooltipOpen(image, text) {
    setInfoTooltipData({
      image: image,
      text: text,
    });
    setIsInfoTooltipOpen(true);
  }

  function handleInfoTooltipClose() {
    setIsInfoTooltipOpen(false);
  }

  useEffect(() => {
    const storedEmail = localStorage.getItem('userEmail');
  if (storedEmail) {
    setEmail(storedEmail);
  }
    checkToken()
        .then((data) => {
          setCurrentUser(data);
          setLoggedIn(true);
        })
        .catch((error) => {
          console.log('Ошибка при проверке токена:', error);
        });
  }, []);

  const handleLogout = () => {
    logout();
    setLoggedIn(false);
    setEmail('');
    localStorage.removeItem('userEmail'); 
  };

  return (
    <Router>
      <div className="App">
        <Header
          isLoggedIn={isLoggedIn}
          handleLogout={handleLogout}
          userEmail={email}
        />
        <CurrentUserContext.Provider value={currentUser}>
          <Routes>
            <Route
              path="/"
              element={
                <ProtectedRoute
                  isLoggedIn={isLoggedIn}
                  element={(props) => (
                    <>
                      <Main
                        {...props}
                        onEditProfile={() => setIsEditProfilePopupOpen(true)}
                        onAddPlace={handleAddPlaceClick}
                        onEditAvatar={handleEditAvatarClick}
                        onCardClick={handleCardClick}
                        onCardLike={handleCardLike}
                        onCardDelete={handleCardDelete}
                        currentUser={currentUser}
                        setCards={setCards}
                        cards={cards}
                      />
                      <Footer />
                    </>
                  )}
                />
              }
            />
            <Route
              path="/sign-up"
              element={
                isLoggedIn ? (
                  <Navigate to="/" />
                ) : (
                  <Register
                    handleRegister={handleRegister}
                    onInfoTooltipOpen={handleInfoTooltipOpen}
                  />
                )
              }
            />
            <Route
              path="/sign-in"
              element={
                isLoggedIn ? (
                  <Navigate to="/" />
                ) : (
                  <Login handleLogin={handleLogin} />
                )
              }
            />
          </Routes>
          <EditProfilePopup
            isOpen={isEditProfilePopupOpen}
            onClose={() => setIsEditProfilePopupOpen(false)}
            onUpdateUser={handleUpdateUser}
          />
          <AddPlacePopup
            isOpen={isAddPlacePopupOpen}
            onClose={closeAllPopups}
            onAddPlace={handleAddPlaceSubmit}
          />
          <ImagePopup card={selectedCard} onClose={closeAllPopups} />
          <div className="popup popup_type_card-delete">
            <div className="popup__container">
              <h2 className="popup__title-card-delete">Вы уверены?</h2>
              <form className="form">
                <button
                  type="submit"
                  className="popup__submit popup__save-button popup__delete-button"
                >
                  Да
                </button>
              </form>
              <button
                type="button"
                className="popup__close-button popup__button-close"
              >
                <img
                  src=""
                  className="popup__close-button-img"
                  alt="Иконка белого креста"
                />
              </button>
            </div>
          </div>
          <EditAvatarPopup
            isOpen={isEditAvatarPopupOpen}
            onClose={closeAllPopups}
            onUpdateAvatar={handleUpdateAvatar}
          />
          {isInfoTooltipOpen && (
            <InfoTooltip
              image={infoTooltipData.image}
              text={infoTooltipData.text}
              handleInfoTooltipClose={handleInfoTooltipClose}
            />
          )}
        </CurrentUserContext.Provider>
      </div>
    </Router>
  );
}

export default App;

