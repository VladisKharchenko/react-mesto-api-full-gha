import React, { useContext } from 'react';
import CurrentUserContext from '../contexts/CurrentUserContext.js';

function Card({ card, onCardClick, onCardLike, onCardDelete }) {
  const currentUser = useContext(CurrentUserContext);

  const isOwn = card.owner === currentUser._id;

  const isLiked = card.likes.some((i) => i === currentUser._id);

  const cardLikeButtonClassName = `place__like-button ${
    isLiked && 'place__like-button_active'
  }`;

  function handleClick() {
    onCardClick(card);
  }

  function handleLikeClick() {
    onCardLike(card);
  }

  function handleDeleteClick() {
    onCardDelete(card);
  }

  return (
    <article className="place">
      {isOwn && (
        <button
          className="place__delete-button"
          onClick={handleDeleteClick}
        ></button>
      )}
      <img
        src={card.link}
        className="place__image"
        alt={card.name}
        style={{ backgroundImage: `url(${card.link})` }}
        onClick={handleClick}
      />
      <div className="place__block">
        <h2 className="place__title">{card.name}</h2>
        <div>
          <button
            type="button"
            className={cardLikeButtonClassName}
            onClick={handleLikeClick}
          ></button>
          <div className="place__like-count">{card.likes.length}</div>
        </div>
      </div>
    </article>
  );
}

export default Card;
