import Popup from "./Popup.js";
export default class PopupWithForm extends Popup {
  constructor({ popupSelector, submitCallback }) {
    super(popupSelector);
    this._submitCallback = submitCallback;
    this._popupForm = this._popup.querySelector(".popup__form");
  }
  setEventListeners() {
    super.setEventListeners();
    this._popup.addEventListener("submit", (event) => {
      event.preventDefault();
      this._submitCallback(this._getInputValues());
      this.close();
    });
  }
  _getInputValues() {
    const inputValues = {};
    this._popup.querySelectorAll("input").forEach((input) => {
      inputValues[input.id] = input.value;
    });
    return inputValues;
  }
  close() {
    super.close();
    this._popupForm.reset();
  }
}
