export default class UserInfo {
  constructor(options) {
    const { nameSelector, descriptionSelector, avatarSelector } = options;
    this._nameElement = document.querySelector(nameSelector);
    this._descriptionElement = document.querySelector(descriptionSelector);
    this._avatarElement = document.querySelector(avatarSelector);
  }

  getUserInfo() {
    return {
      nameElementContent: this._nameElement.textContent,
      descriptionElementContent: this._descriptionElement.textContent,
    };
  }

  setNewAvatar(req) {
    this._avatarElement.src = req["avatar"];
  }

  setNewNameAndAbout(req) {
    this._nameElement.textContent = req["name"];
    this._descriptionElement.textContent = req["about"];
  }

  setUserId(req) {
    this._userId = req["_id"];
  }

  setUserInfo(req) {
    this.setNewAvatar(req);
    this.setNewNameAndAbout(req);
    this.setUserId(req);
  }

  getUserId() {
    return this._userId;
  }
}
