const placesListItemTemplate =
  document.querySelector("#places__list-item").content;

const placesList = document.querySelector(".places__list");

const popupElZoomImage = document.querySelector(".popup_el_zoom-image");
const popupImage = popupElZoomImage.querySelector(".popup__image");
const popupImageDescription = popupElZoomImage.querySelector(
  ".popup__image-description"
);

function createCard(cardName, cardPhotoURL) {
  const placesListItem = placesListItemTemplate
    .querySelector(".places__list-item")
    .cloneNode(true);
  placesListItem.querySelector(".place__name").textContent = cardName;
  const placePhoto = placesListItem.querySelector(".place__photo");
  placePhoto.src = cardPhotoURL;
  placePhoto.alt = cardName;
  placePhoto.addEventListener("click", () => {
    popupImage.src = cardPhotoURL;
    popupImage.alt = cardName;
    popupImageDescription.textContent = cardName;
    openPopup(popupElZoomImage);
  });
  const placeButtonLike = placesListItem.querySelector(".place__button-like");
  placeButtonLike.addEventListener("click", () => {
    placeButtonLike.classList.toggle("place__button-like_liked");
  });
  const placeButtonDeletePlace = placesListItem.querySelector(
    ".place__button-delete-place"
  );
  placeButtonDeletePlace.addEventListener("click", () => {
    placesListItem.remove();
  });
  return placesListItem;
}

function prependPlaceToPlacesList(placeName, placePhotoURL) {
  const card = createCard(placeName, placePhotoURL);
  placesList.prepend(card);
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
  prependPlaceToPlacesList(card.name, card.link);
});

function closeByEscape(evt) {
  if (evt.key === "Escape") {
    const openedPopup = document.querySelector(".popup_opened");
    closePopup(openedPopup);
  }
}

function openPopup(popupToOpen) {
  popupToOpen.classList.add("popup_opened");
  document.addEventListener("keydown", closeByEscape);
}

function closePopup(popupOpened) {
  popupOpened.classList.remove("popup_opened");
  document.removeEventListener("keydown", closeByEscape);
  // const popupForm = popupOpened.querySelector(".popup__form");
  // if (popupForm) {
  //   popupForm.reset();
  // }
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
  prependPlaceToPlacesList(placeName, placePictureURL);
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
