const placesListItemTemplate =
  document.querySelector("#places__list-item").content;

const placesList = document.querySelector(".places__list");

const popupElZoomImage = document.querySelector(".popup_el_zoom-image");
const popupImage = popupElZoomImage.querySelector(".popup__image");
const popupImageDescription = popupElZoomImage.querySelector(
  ".popup__image-description"
);

function addPlace(placeName, placePhotoURL) {
  let placesListItem = placesListItemTemplate
    .querySelector(".places__list-item")
    .cloneNode(true);
  placesListItem.querySelector(".place__name").textContent = placeName;
  let placePhoto = placesListItem.querySelector(".place__photo");
  placePhoto.src = placePhotoURL;
  placePhoto.alt = placeName;
  placePhoto.addEventListener("click", () => {
    popupImage.src = placePhotoURL;
    popupImage.alt = placeName;
    popupImageDescription.textContent = placeName;
    openPopup(popupElZoomImage);
  });
  let placeButtonLike = placesListItem.querySelector(".place__button-like");
  placeButtonLike.addEventListener("click", () => {
    placeButtonLike.classList.toggle("place__button-like_liked");
  });
  let placeButtonDeletePlace = placesListItem.querySelector(
    ".place__button-delete-place"
  );
  placeButtonDeletePlace.addEventListener("click", () => {
    placesListItem.remove();
  });
  placesList.prepend(placesListItem);
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
  addPlace(card.name, card.link);
});

function openPopup(popupToOpen) {
  popupToOpen.classList.add("popup_opened");
}

function closePopup(event) {
  let popupOpened = event.target.closest(".popup_opened");
  popupOpened.classList.remove("popup_opened");
}

const popupButtonsClose = document.querySelectorAll(".popup__button-close");
popupButtonsClose.forEach((popupButtonClose) => {
  popupButtonClose.addEventListener("click", (event) => {
    closePopup(event);
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
const popupFormButtonSubmitElEditProfile = popupElEditProfile.querySelector(
  ".popup__form-button-submit_el_edit-profile"
);

profileButtonEditProfile.addEventListener("click", () => {
  openPopup(popupElEditProfile);
  popupInputElName.value = profileName.textContent;
  popupInputElDescription.value = profileDescription.textContent;
});

popupFormButtonSubmitElEditProfile.addEventListener("click", (event) => {
  event.preventDefault();
  profileName.textContent = popupInputElName.value;
  profileDescription.textContent = popupInputElDescription.value;
  closePopup(event);
});

// popup_el_add-place

const profileButtonAddPlace = document.querySelector(
  ".profile__button-add-place"
);

const popupElAddPlace = document.querySelector(".popup_el_add-place");
profileButtonAddPlace.addEventListener("click", () => {
  popupElAddPlace.querySelector(".popup__form").reset();
  openPopup(popupElAddPlace);
});

const popupFormButtonSubmitElAddingPlace = popupElAddPlace.querySelector(
  ".popup__form-button-submit_el_adding-place"
);

const popupFormInputElPlaceName = popupElAddPlace.querySelector(
  ".popup__form-input_el_place-name"
);
const popupFormInputElPlacePictureUrl = popupElAddPlace.querySelector(
  ".popup__form-input_el_place-picture-url"
);
popupFormButtonSubmitElAddingPlace.addEventListener("click", (event) => {
  event.preventDefault();
  let placeName = popupFormInputElPlaceName.value;
  let placePictureURL = popupFormInputElPlacePictureUrl.value;
  addPlace(placeName, placePictureURL);
  closePopup(event);
});
