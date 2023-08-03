import React from 'react';
import closeButton from '../images/white-cross-close-button.png';

function InfoTooltip({ image, text, handleInfoTooltipClose }) {
  return (
    <div className="infoTooltip">
      <div className="popup__container">
        <div className="infoTooltip__container">
          <img
            className="infoTooltip__image"
            src={image}
            alt="Серый круг с галочкой внутри"
          />
          <h1 className="infoTooltip__title">{text}</h1>
        </div>
        <button
          type="button"
          className="popup__close-button popup__button-close"
          onClick={handleInfoTooltipClose}
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

export default InfoTooltip;
