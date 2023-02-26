import { openPopup } from "./index.js";

const popupElZoomImage = document.querySelector(".popup_el_zoom-image");
const popupImage = popupElZoomImage.querySelector(".popup__image");
const popupImageDescription = popupElZoomImage.querySelector(
  ".popup__image-description"
);

export default class Card {
  constructor(cardName, cardPhotoURL, templateCardSelector) {
    this._cardName = cardName;
    this._cardPhotoURL = cardPhotoURL;
    this._templateCardSelector = templateCardSelector;
    this._cardElement = this._getCardTemplate();
    this._cardImageElement = this._cardElement.querySelector(".place__photo");
    this._cardNameElement = this._cardElement.querySelector(".place__name");
    this._cardButtonLikeElement = this._cardElement.querySelector(
      ".place__button-like"
    );
    this._cardButtonDeleteElement = this._cardElement.querySelector(
      ".place__button-delete-place"
    );
  }

  _getCardTemplate() {
    const cardElement = document
      .querySelector(this._templateCardSelector)
      .content.querySelector(".places__list-item")
      .cloneNode(true);

    return cardElement;
  }

  _setNameToCard() {
    this._cardNameElement.textContent = this._cardName;
  }

  _setImageToCard() {
    this._cardImageElement.src = this._cardPhotoURL;
    this._cardImageElement.alt = this._cardName;
  }

  _addZoomEventToCardImage = () => {
    popupImage.src = this._cardPhotoURL;
    popupImage.alt = this._cardName;
    popupImageDescription.textContent = this._cardName;
    openPopup(popupElZoomImage);
  };

  _addLikeEventToButtonLike = () => {
    this._cardButtonLikeElement.classList.toggle("place__button-like_liked");
  };

  _addDeleteCardEventToButtonDelete = () => {
    this._cardElement.remove();
    this._cardElement = null;
  };

  _setEventListeners() {
    // set the name on the card
    this._cardNameElement.textContent = this._cardName;

    // set the image on the card
    this._cardImageElement.src = this._cardPhotoURL;
    this._cardImageElement.alt = this._cardName;

    // add a zoom event to the card image
    this._cardImageElement.addEventListener(
      "click",
      this._addZoomEventToCardImage
    );

    // add a like event to the like button
    this._cardButtonLikeElement.addEventListener(
      "click",
      this._addLikeEventToButtonLike
    );

    // add a card deletion event to the delete button
    this._cardButtonDeleteElement.addEventListener(
      "click",
      this._addDeleteCardEventToButtonDelete
    );
  }

  generateCard() {
    this._setEventListeners();
    return this._cardElement;
  }
}
