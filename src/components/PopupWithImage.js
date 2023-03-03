import Popup from "./Popup.js";
export default class PopupWithImage extends Popup {
  constructor({ popupSelector }) {
    super(popupSelector);
    this._imageElement = this._popup.querySelector(".popup__image");
    this._imageDescriptionElement = this._popup.querySelector(
      ".popup__image-description"
    );
  }
  open = ({ imageSrc, imageDescription }) => {
    this._imageElement.src = imageSrc;
    this._imageElement.alt = imageDescription;
    this._imageDescriptionElement.textContent = imageDescription;
    super.open();
  };
}
