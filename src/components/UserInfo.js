export default class UserInfo {
  constructor(options) {
    const { nameSelector, descriptionSelector } = options;
    this._nameElement = document.querySelector(nameSelector);
    this._descriptionElement = document.querySelector(descriptionSelector);
  }

  getUserInfo() {
    return {
      nameElementContent: this._nameElement.textContent,
      descriptionElementContent: this._descriptionElement.textContent,
    };
  }

  setUserInfo({ newName, newDescription }) {
    this._nameElement.textContent = newName;
    this._descriptionElement.textContent = newDescription;
  }
}
