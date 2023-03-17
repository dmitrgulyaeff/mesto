export default class Avatar {
  constructor(avatarSelector) {
    this._avatarElement = document.querySelector(avatarSelector);
  }

  setNewAvatar(newAvatarLink) {
    this._avatarElement.src = newAvatarLink;
  }
}
