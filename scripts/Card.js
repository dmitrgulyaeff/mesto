import { openPopup } from "./index.js";

const popupElZoomImage = document.querySelector(".popup_el_zoom-image");
const popupImage = popupElZoomImage.querySelector(".popup__image");
const popupImageDescription = popupElZoomImage.querySelector(
  ".popup__image-description"
);

export default class Card {
  _getCardTemplate() {
    const cardElement = document
      .querySelector(this._templateCardSelector)
      .content.querySelector(".places__list-item")
      .cloneNode(true);

    return cardElement;
  }

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

  _setNameToCard(textContent) {
    this._cardNameElement.textContent = textContent;
  }

  _setImageToCard(imageSrc, imageAlt) {
    this._cardImageElement.src = imageSrc;
    this._cardImageElement.alt = imageAlt;
  }

  _addZoomEventToCardImage(
    popupImageSrc,
    popupImageCaption,
    popupImageAlt = popupImageCaption
  ) {
    this._cardImageElement.addEventListener("click", () => {
      popupImage.src = popupImageSrc;
      popupImage.alt = popupImageAlt;
      popupImageDescription.textContent = popupImageCaption;
      openPopup(popupElZoomImage);
    });
  }

  _addLikeEventToButtonLike() {
    this._cardButtonLikeElement.addEventListener("click", () => {
      this._cardButtonLikeElement.classList.toggle("place__button-like_liked");
    });
  }

  _addDeleteCardEventToButtonDelete() {
    this._cardButtonDeleteElement.addEventListener("click", () => {
      this._cardElement.remove();
    });
  }

  generateCard() {
    this._setNameToCard(this._cardName);
    this._setImageToCard(this._cardPhotoURL, this._cardName);
    this._addZoomEventToCardImage(this._cardPhotoURL, this._cardName);
    this._addLikeEventToButtonLike();
    this._addDeleteCardEventToButtonDelete();

    return this._cardElement;
  }
}
