import React from 'react';
import closeButton from '../images/white-cross-close-button.png';

function ImagePopup({ card, onClose }) {
  return (
    <div
      className={`popup popup_type_image ${card.link ? 'popup_opened' : ''}`}
    >
      <div className="popup__image-block">
        <img src={card.link} className="popup__image" alt={card.name} />
        <p className="popup__image-text">{card.name}</p>
        <button
          type="button"
          className="popup__image-close-button popup__button-close"
          onClick={onClose}
        >
          <img
            src={closeButton}
            className="popup__close-button-img"
            alt="Иконка белого креста"
          />
        </button>
      </div>
    </div>
  );
}

export default ImagePopup;
