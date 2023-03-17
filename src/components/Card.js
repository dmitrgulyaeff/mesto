export default class Card {
  constructor(
    { name, link, owner: cardOwner, _id: cardId, likes },
    templateCardSelector,
    handleCardClick,
    myId,
    handlerDeleteCard,
    toggleLike
  ) {
    this._cardId = cardId;
    this._handlerDeleteCard = handlerDeleteCard;
    this._toggleLike = toggleLike;
    this._cardName = name;
    this._cardPhotoURL = link;
    this._templateCardSelector = templateCardSelector;
    this._handleCardClick = handleCardClick;
    this._cardElement = this._getCardTemplate();
    this._cardImageElement = this._cardElement.querySelector(".place__photo");
    this._cardNameElement = this._cardElement.querySelector(".place__name");
    this._cardButtonLikeElement = this._cardElement.querySelector(
      ".place__button-like"
    );
    this._cardButtonDeleteElement = this._cardElement.querySelector(
      ".place__button-delete-place"
    );
    this._cardNumberLikesElement = this._cardElement.querySelector(
      ".place__number-likes"
    );
    this._isMyCard = cardOwner["_id"] === myId;
    this._numberLikes = likes.length;
    this._iLikeIt = likes.some((like) => {
      return like["_id"] === myId;
    });
  }

  _getCardTemplate() {
    return document
      .querySelector(this._templateCardSelector)
      .content.querySelector(".places__list-item")
      .cloneNode(true);
  }

  _addLikeEventToButtonLike = () => {
    this._iLikeIt = !this._iLikeIt;
    this._toggleLike(this._cardId, this._iLikeIt).then((res) => {
      this._numberLikes = res["likes"].length;
      this._cardNumberLikesElement.textContent = this._numberLikes;
      if (this._iLikeIt) {
        this._cardButtonLikeElement.classList.add("place__button-like_liked");
      } else {
        this._cardButtonLikeElement.classList.remove(
          "place__button-like_liked"
        );
      }
    });
  };

  _addDeleteCardEventToButtonDelete = () => {
    this._handlerDeleteCard(this._cardId, this._cardElement);
  };

  // private method to set listeners
  _setEventListeners() {
    // add a zoom event to the card image
    this._cardImageElement.addEventListener("click", this._handleCardClick);

    // add a like event to the like button
    this._cardButtonLikeElement.addEventListener(
      "click",
      this._addLikeEventToButtonLike
    );

    if (this._isMyCard) {
      // add a card deletion event to the delete button
      this._cardButtonDeleteElement.addEventListener(
        "click",
        this._addDeleteCardEventToButtonDelete
      );
    } else {
      this._cardButtonDeleteElement.remove();
    }
  }

  generateCard() {
    this._setEventListeners();
    // set the name on the card
    this._cardNameElement.textContent = this._cardName;
    this._cardNumberLikesElement.textContent = this._numberLikes;
    // set the image on the card
    this._cardImageElement.src = this._cardPhotoURL;
    this._cardImageElement.alt = this._cardName;

    if (this._iLikeIt) {
      this._cardButtonLikeElement.classList.add("place__button-like_liked");
    }

    return this._cardElement;
  }
}
