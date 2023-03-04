export const initialCards = [
  {
    name: "Архыз",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
  },
  {
    name: "Челябинская область",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
  },
  {
    name: "Иваново",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
  },
  {
    name: "Камчатка",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
  },
  {
    name: "Холмогорский район",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
  },
  {
    name: "Байкал",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
  },
];

export const profileButtonEditProfile = document.querySelector(
  ".profile__button-edit-profile"
);

export const profileButtonAddPlace = document.querySelector(
  ".profile__button-add-place"
);

export const popupEditProfileSelector = ".popup_el_edit-profile";
export const popupAddCardSelector = ".popup_el_add-place";

export const formSettings = {
  formSelector: ".popup__form",
  inputSelector: ".popup__form-input",
  submitButtonSelector: ".popup__form-button-submit",
  inactiveButtonClass: "popup__form-button-submit_inactive",
  inputErrorClass: "popup__form-input_type__error",
  errorClass: "popup__form-input-error_visible",
};
