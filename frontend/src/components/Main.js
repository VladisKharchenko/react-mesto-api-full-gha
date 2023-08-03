import React, { useContext } from 'react';
import editButton from '../images/white-pen-edit-button.svg';
import addButton from '../images/white-pluse-add-button.svg';
import Card from './Card.js';
import CurrentUserContext from '../contexts/CurrentUserContext.js';

function Main(props) {
  const {
    onEditProfile,
    onAddPlace,
    onEditAvatar,
    onCardClick,
    onCardLike,
    onCardDelete,
    cards,
  } = props;

  const currentUser = useContext(CurrentUserContext);

  return (
    <main className="content">
      <section className="profile">
        <div className="profile__block">
          <div
            className="profile__overlay"
            onClick={onEditAvatar}
            style={{ backgroundImage: `url(${currentUser.avatar})` }}
          >
            <img
              src={currentUser.avatar}
              className="profile__image"
              alt="Круглое фото профиля"
            />
          </div>
          <div className="profile__block-info">
            <div className="profile__block-info-name">
              <h1 className="profile__name">{currentUser.name}</h1>
              <button
                type="button"
                className="profile__edit-button"
                onClick={onEditProfile}
              >
                <img src={editButton} alt="Иконка белой ручки" />
              </button>
            </div>
            <p className="profile__about-yourself">{currentUser.about}</p>
          </div>
        </div>
        <button
          type="button"
          className="profile__add-button"
          onClick={onAddPlace}
        >
          <img
            src={addButton}
            className="profile__add-button-plus"
            alt="Иконка белого плюса"
          />
        </button>
      </section>
      <section className="places">
        <CurrentUserContext.Provider value={currentUser}>
          {cards.map((card) => (
            <Card
              key={card._id}
              card={card}
              onCardClick={onCardClick}
              onCardLike={onCardLike}
              onCardDelete={onCardDelete}
            />
          ))}
        </CurrentUserContext.Provider>
      </section>
    </main>
  );
}

export default Main;
