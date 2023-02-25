import Card from "./Card.js";
import FormValidator from "./FormValidator.js";

const placesList = document.querySelector(".places__list");

function prependPlaceToPlacesList(
  cardName,
  cardPhotoURL,
  templateCardSelector
) {
  const card = new Card(cardName, cardPhotoURL, templateCardSelector);
  placesList.prepend(card.generateCard());
}

const initialCards = [
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

initialCards.forEach((card) => {
  prependPlaceToPlacesList(card.name, card.link, "#places__list-item");
});

function closeByEscape(evt) {
  if (evt.key === "Escape") {
    const openedPopup = document.querySelector(".popup_opened");
    closePopup(openedPopup);
  }
}

export function openPopup(popupToOpen) {
  popupToOpen.classList.add("popup_opened");
  document.addEventListener("keydown", closeByEscape);
}

function closePopup(popupOpened) {
  popupOpened.classList.remove("popup_opened");
  document.removeEventListener("keydown", closeByEscape);
}

const popupButtonsClose = document.querySelectorAll(".popup__button-close");
popupButtonsClose.forEach((popupButtonClose) => {
  const popupOpened = popupButtonClose.closest(".popup");
  popupButtonClose.addEventListener("click", () => {
    closePopup(popupOpened);
  });
});

// popup_el_edit-profile
const profileName = document.querySelector(".profile__name");
const profileDescription = document.querySelector(".profile__description");
const profileButtonEditProfile = document.querySelector(
  ".profile__button-edit-profile"
);
const popupElEditProfile = document.querySelector(".popup_el_edit-profile");
const popupInputElName = popupElEditProfile.querySelector(
  ".popup__form-input_el_name"
);
const popupInputElDescription = popupElEditProfile.querySelector(
  ".popup__form-input_el_description"
);

profileButtonEditProfile.addEventListener("click", () => {
  openPopup(popupElEditProfile);
  popupInputElName.value = profileName.textContent;
  popupInputElDescription.value = profileDescription.textContent;
});

const popupElEditProfileForm = popupElEditProfile.querySelector(".popup__form");
popupElEditProfileForm.addEventListener("submit", (event) => {
  event.preventDefault();
  profileName.textContent = popupInputElName.value;
  profileDescription.textContent = popupInputElDescription.value;
  closePopup(popupElEditProfile);
});

// popup_el_add-place

const profileButtonAddPlace = document.querySelector(
  ".profile__button-add-place"
);

const popupElAddPlace = document.querySelector(".popup_el_add-place");
const popupElAddPlaceForm = popupElAddPlace.querySelector(".popup__form");

profileButtonAddPlace.addEventListener("click", () => {
  openPopup(popupElAddPlace);
});

const popupFormInputElPlaceName = popupElAddPlace.querySelector(
  ".popup__form-input_el_place-name"
);
const popupFormInputElPlacePictureUrl = popupElAddPlace.querySelector(
  ".popup__form-input_el_place-picture-url"
);

popupElAddPlaceForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const placeName = popupFormInputElPlaceName.value;
  const placePictureURL = popupFormInputElPlacePictureUrl.value;
  prependPlaceToPlacesList(placeName, placePictureURL, "#places__list-item");
  event.target.reset();
  closePopup(popupElAddPlace);
});

// close by esc
const popups = document.querySelectorAll(".popup");

// close by overlay click
popups.forEach((p) => {
  p.addEventListener("mousedown", (event) => {
    if (event.target === event.currentTarget) {
      closePopup(p);
    }
  });
});

// add validation to all forms
const allForms = document.querySelectorAll(".popup__form");
const formSettings = {
  formSelector: ".popup__form",
  inputSelector: ".popup__form-input",
  submitButtonSelector: ".popup__form-button-submit",
  inactiveButtonClass: "popup__form-button-submit_inactive",
  inputErrorClass: "popup__form-input_type__error",
  errorClass: "popup__form-input-error_visible",
};
allForms.forEach((form) => {
  const formValidator = new FormValidator(formSettings, form);
  formValidator.enableValidation();
});
