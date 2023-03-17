import Popup from "./Popup.js";

export default class PopupDeleteCard extends Popup {
  constructor({ popupSelector }) {
    super(popupSelector);
    this._buttonDeleteCard = this._popup.querySelector(
      ".popup__form-button-submit_el_delete-card"
    );
    this.defaultButtonTextContent = String(this._buttonDeleteCard.textContent);
  }

  open = ({ apiDeleteCard, cardElement }) => {
    this._buttonDeleteCard.textContent = this.defaultButtonTextContent;

    const deleteCard = () => {
      this._buttonDeleteCard.textContent = "Удаляю...";
      apiDeleteCard().then(() => {
        super.close();
        cardElement.remove();
        cardElement = null;
        this._buttonDeleteCard.removeEventListener("click", deleteCard);
      });
    };

    this._buttonDeleteCard.addEventListener("click", deleteCard);
    super.open();
  };
}
