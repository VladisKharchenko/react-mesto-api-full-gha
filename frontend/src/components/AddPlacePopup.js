import React, { useState } from 'react';
import PopupWithForm from './PopupWithForm';

function AddPlacePopup({ isOpen, onClose, onAddPlace }) {
  const [name, setName] = useState('');
  const [link, setLink] = useState('');

  function handleNameChange(e) {
    setName(e.target.value);
  }

  function handleLinkChange(e) {
    setLink(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    onAddPlace({
      name,
      link
    });
  }

  return (
    <PopupWithForm
      name="add-card"
      title="Новое место"
      isOpen={isOpen}
      onClose={onClose}
      submitButtonText="Создать"
      onSubmit={handleSubmit}
    >
      <fieldset className="popup__fieldset">
        <input
          id="card-title-input"
          type="text"
          name="name"
          placeholder="Название"
          className="popup__input popup__input_type_card-title"
          minLength="2"
          maxLength="30"
          required
          value={name}
          onChange={handleNameChange}
        />
        <span className="card-title-input-error popup__input-error"></span>
      </fieldset>
      <fieldset className="popup__fieldset">
        <input
          id="picture-link-input"
          type="url"
          name="link"
          placeholder="Ссылка на картинку"
          className="popup__input popup__input_type_picture-link"
          required
          value={link}
          onChange={handleLinkChange}
        />
        <span className="picture-link-input-error popup__input-error"></span>
      </fieldset>
    </PopupWithForm>
  );
}

export default AddPlacePopup;
