import "./index.css";
import PopupWithForm from "../components/PopupWithForm.js";
import FormValidator from "../components/FormValidator.js";
import UserInfo from "../components/UserInfo.js";
import PopupWithImage from "../components/PopupWithImage.js";
import Card from "../components/Card.js";
import Section from "../components/Section.js";
import {
  formSettings,
  popupAddCardSelector,
  popupEditAvatarSelector,
  popupEditProfileSelector,
  profileButtonAddPlace,
  profileButtonEditAvatar,
  profileButtonEditProfile,
} from "../utils/constants.js";
import Api from "../components/Api";
import PopupDeleteCard from "../components/PopupDeleteCard.js";

// initialization api
const api = new Api({
  baseUrl: "https://mesto.nomoreparties.co/v1/cohort-61",
  headers: {
    authorization: "b67e047d-e0f1-46ee-a2b0-fa487b6441a0",
    "Content-Type": "application/json",
  },
});

// popup for zoom card
const popupWithImage = new PopupWithImage({
  popupSelector: ".popup_el_zoom-image",
});
popupWithImage.setEventListeners();

// popup for delete card
const popupDeleteCard = new PopupDeleteCard({
  popupSelector: ".popup_el_delete-card",
});
popupDeleteCard.setEventListeners();

// user info
const userInfo = new UserInfo({
  nameSelector: ".profile__name",
  descriptionSelector: ".profile__description",
  avatarSelector: ".profile__avatar",
});

// initialise initial cards list and enable buttons to add/delete cards
api.getProfileInfo().then((profileInfo) => {
  userInfo.setUserInfo(profileInfo);

  const createCard = (item) => {
    const card = new Card(
      item,
      "#places__list-item",
      () => {
        popupWithImage.open({
          imageDescription: item.name,
          imageSrc: item.link,
        });
      },
      userInfo.getUserId(),
      (id, cardEl) =>
        popupDeleteCard.open({
          apiDeleteCard: () => {
            return api.deleteCard(id);
          },
          cardElement: cardEl,
        }),
      (id, isLiked) =>
        api
          .toggleLike(id, isLiked)
          .catch((err) => console.log("Ошибка добавления/снятия лайка", err))
    );
    return card.generateCard();
  };

  // initialise initial cards
  api.getInitialCards().then((initialCards) => {
    const cardList = new Section(
      {
        data: initialCards.reverse(),
        renderer: createCard,
      },
      ".places__list"
    );
    cardList.renderItems();
    cardList.rendererItems.forEach((element) => {
      cardList.addItem(element);
    });

    // popup to add card
    const popupAddCard = new PopupWithForm({
      popupSelector: popupAddCardSelector,
      submitCallback: (inputValues) => {
        const { "place-name-input": name, "place-url-input": link } =
          inputValues;
        return api
          .addNewCard({ name, link })
          .then(createCard)
          .then((el) => cardList.addItem(el))
          .catch((err) => console.log("Ошибка добавления карточки", err));
      },
    });
    popupAddCard.setEventListeners();
    profileButtonAddPlace.addEventListener("click", () => {
      popupAddCard.open();
    });
  });
});

// popup to edit profile
const popupEditProfile = new PopupWithForm({
  popupSelector: popupEditProfileSelector,
  submitCallback: (inputValues) => {
    const { "profile-description-input": about, "profile-name-input": name } =
      inputValues;
    return api
      .setProfileInfo({ name, about })
      .then((profileInfo) => {
        userInfo.setUserInfo(profileInfo);
      })
      .catch((err) => {
        console.log("Ошибка редактирования информации о пользователе", err);
      });
  },
});
popupEditProfile.setEventListeners();

// button to open popup to edit profile
profileButtonEditProfile.addEventListener("click", () => {
  const { nameElementContent, descriptionElementContent } =
    userInfo.getUserInfo();
  popupEditProfile.setInputValues({
    "profile-description-input": descriptionElementContent,
    "profile-name-input": nameElementContent,
  });
  popupEditProfile.open();
});

// popup to edit avatar
const popupEditAvatar = new PopupWithForm({
  popupSelector: popupEditAvatarSelector,
  submitCallback: (inputValues) => {
    const { "avatar-url-input": avatarUrl } = inputValues;
    return api
      .updateProfileAvatar(avatarUrl)
      .then((user) => {
        userInfo.setNewAvatar(user);
      })
      .catch((err) => {
        console.log("Ошибка редактирования аватара пользователя", err);
      });
  },
});
popupEditAvatar.setEventListeners();

profileButtonEditAvatar.addEventListener("click", () => {
  popupEditAvatar.open();
});

// valdation
const profileValidation = new FormValidator(
  formSettings,
  document.querySelector(popupEditProfileSelector)
);
const avatarValidation = new FormValidator(
  formSettings,
  document.querySelector(popupEditAvatarSelector)
);
const newCardValidation = new FormValidator(
  formSettings,
  document.querySelector(popupAddCardSelector)
);
profileValidation.enableValidation();
avatarValidation.enableValidation();
newCardValidation.enableValidation();
