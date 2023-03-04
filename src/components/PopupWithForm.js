import Popup from "./Popup.js";
export default class PopupWithForm extends Popup {
  constructor({ popupSelector, submitCallback }) {
    super(popupSelector);
    this._submitCallback = submitCallback;
    this._popupForm = this._popup.querySelector(".popup__form");
    this._inputList = this._popup.querySelectorAll("input");
  }
  setEventListeners() {
    super.setEventListeners();
    this._popupForm.addEventListener("submit", (event) => {
      event.preventDefault();
      this._submitCallback(this._getInputValues());
      this.close();
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
