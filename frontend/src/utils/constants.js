export const config = {
  formSelector: '.form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit',
  inactiveButtonClass: 'popup__submit_inactive',
  inputErrorClass: 'popup__input-error_active',
  errorClass: 'popup__input_type_error',
};

export const placeAddHtml = document.querySelector('.places');

export const popupTypeImage = '.popup_type_image';

export const profileEditButton = document.querySelector(
  '.profile__edit-button'
);

export const popupAddImage = '.popup_type_edit-card';
export const cardEditButton = document.querySelector('.profile__add-button');

export const formEditProfile = document.querySelector('.form-edit-profile');
export const formEditCard = document.querySelector('.form-edit-card');
export const formChangeAvatar = document.querySelector('.form-change-avatar');

export const popupCardDelete = '.popup_type_card-delete';

export const avatarChangeButton = document.querySelector('.profile__overlay');

export const profileInfoSelectors = {
  nameSelector: '.profile__name',
  aboutSelector: '.profile__about-yourself',
  avatarSelector: '.profile__image',
};

export const popupInputName = document.querySelector('.popup__input_type_name');
export const popupInputAbout = document.querySelector('.popup__input_type_about-yourself');
export const profileName = document.querySelector('.profile__name');
export const profileAbout = document.querySelector('.profile__about-yourself');

export const BASE_URL = 'http://localhost:3000';