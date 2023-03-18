import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor({ popupSelector, submitCallback }) {
    super(popupSelector);
    this._submitCallback = submitCallback;
    this._popupForm = this._popup.querySelector(".popup__form");
    this._inputList = this._popup.querySelectorAll("input");
    this._buttonForm = this._popup.querySelector(".popup__form-button-submit");
    this._defaultButtonValue = this._buttonForm.textContent;
  }

  setEventListeners() {
    super.setEventListeners();
    this._popupForm.addEventListener("submit", (event) => {
      this._buttonForm.disabled = true;
      event.preventDefault();
      this._buttonForm.textContent = "Сохранение...";
      this._submitCallback(this._getInputValues()).then(() => {
        this.close();
        this._buttonForm.textContent = this._defaultButtonValue;
        this._buttonForm.disabled = false;
      });
    });
  }

  _getInputValues() {
    const inputValues = {};
    this._inputList.forEach((input) => {
      inputValues[input.id] = input.value;
    });
    return inputValues;
  }

  setInputValues(data) {
    // data = {id : value}
    this._inputList.forEach((input) => {
      input.value = data[input.id];
    });
  }

  close() {
    super.close();
    this._popupForm.reset();
  }
}
