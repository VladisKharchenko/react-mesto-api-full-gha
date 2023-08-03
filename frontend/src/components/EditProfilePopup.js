import React, { useState, useContext, useEffect } from 'react';
import PopupWithForm from './PopupWithForm.js';
import CurrentUserContext from '../contexts/CurrentUserContext.js';

function EditProfilePopup({ isOpen, onClose, onUpdateUser }) {
  const currentUser = useContext(CurrentUserContext);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    if (currentUser.name !== undefined) {
      setName(currentUser.name);
    }
    if (currentUser.about !== undefined) {
      setDescription(currentUser.about);
    }
  }, [currentUser]);

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateUser({
      name,
      about: description,
    });
  }

  function handleChangeName(e) {
    setName(e.target.value);
  }

  function handleChangeDescription(e) {
    setDescription(e.target.value);
  }

  return (
    <PopupWithForm
      name="edit-profile"
      title="Редактировать профиль"
      isOpen={isOpen}
      onClose={onClose}
      submitButtonText="Сохранить"
      onSubmit={handleSubmit}
    >
      <fieldset className="popup__fieldset">
        <input
          id="name-input"
          type="text"
          name="name"
          placeholder="Имя"
          className="popup__input popup__input_type_name"
          minLength="2"
          maxLength="40"
          required
          value={name}
          onChange={handleChangeName}
        />
        <span className="name-input-error popup__input-error"></span>
      </fieldset>
      <fieldset className="popup__fieldset">
        <input
          id="about-yourself-input"
          type="text"
          name="about"
          placeholder="О себе"
          className="popup__input popup__input_type_about-yourself"
          minLength="2"
          maxLength="200"
          required
          value={description}
          onChange={handleChangeDescription}
        />
        <span className="about-yourself-input-error popup__input-error"></span>
      </fieldset>
    </PopupWithForm>
  );
}

export default EditProfilePopup;
