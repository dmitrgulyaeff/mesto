import Popup from "./Popup.js";

export default class PopupDeleteCard extends Popup {
  constructor({ popupSelector }) {
    super(popupSelector);
    this._buttonDeleteCard = this._popup.querySelector(
      ".popup__form-button-submit_el_delete-card"
    );
    this.defaultButtonTextContent = String(this._buttonDeleteCard.textContent);
  }

  close() {
    super.close();
    this._buttonDeleteCard.removeEventListener("click", this.deleteCard);
  }

  deleteCard = () => {
    this._buttonDeleteCard.textContent = "Удаляю...";
    this._buttonDeleteCard.disabled = true;
    this._apiDeleteCard()
      .then(() => {
        this.close();
        this._cardElement.remove();
        this._cardElement = null;
      })
      .catch((err) => {
        console.log("Ошибка удаления карточки", err);
      })
      .finally(() => {
        this._buttonDeleteCard.textContent = this.defaultButtonTextContent;
        this._buttonDeleteCard.disabled = false;
      });
  };

  open = ({ apiDeleteCard, cardElement }) => {
    this._apiDeleteCard = apiDeleteCard;
    this._cardElement = cardElement;
    this._buttonDeleteCard.addEventListener("click", this.deleteCard);
    super.open();
  };
}
