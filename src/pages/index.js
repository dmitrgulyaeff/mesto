import "./index.css";
import PopupWithForm from "../components/PopupWithForm.js";
import FormValidator from "../components/FormValidator.js";
import UserInfo from "../components/UserInfo.js";
import PopupWithImage from "../components/PopupWithImage.js";
import Card from "../components/Card.js";
import Section from "../components/Section.js";
import {
  initialCards,
  profileButtonEditProfile,
  popupInputElName,
  popupInputElDescription,
  profileButtonAddPlace,
  popupEditProfileSelector,
  popupAddCardSelector,
  formSettings,
} from "../utils/constants.js";

const popupWithImage = new PopupWithImage({
  popupSelector: ".popup_el_zoom-image",
});
popupWithImage.setEventListeners();

function createCard(item) {
  const card = new Card(item, "#places__list-item", () => {
    popupWithImage.open({
      imageDescription: item.name,
      imageSrc: item.link,
    });
  });
  const cardElement = card.generateCard();
  return cardElement;
}

const cardList = new Section(
  {
    data: initialCards,
    renderer: createCard,
  },
  ".places__list"
);

cardList.renderItems();
cardList.rendererItems.forEach((element) => {
  cardList.addItem(element);
});

// user info
const userInfo = new UserInfo({
  nameSelector: ".profile__name",
  descriptionSelector: ".profile__description",
});

// popup to edit profile
const popupEditProfile = new PopupWithForm({
  popupSelector: popupEditProfileSelector,
  submitCallback: (inputValues) => {
    const {
      "pofile-description-input": description,
      "profile-name-input": name,
    } = inputValues;
    userInfo.setUserInfo({ newName: name, newDescription: description });
  },
});

popupEditProfile.setEventListeners();

// button to open popup to edit profile
profileButtonEditProfile.addEventListener("click", () => {
  const { nameElementContent, descriptionElementContent } =
    userInfo.getUserInfo();
  popupInputElName.value = nameElementContent;
  popupInputElDescription.value = descriptionElementContent;
  popupEditProfile.open();
});

// popup to add card
const popupAddCard = new PopupWithForm({
  popupSelector: popupAddCardSelector,
  submitCallback: (inputValues) => {
    const { "place-name-input": name, "place-url-input": link } = inputValues;
    cardList.addItem(createCard({ name, link }));
  },
});
popupAddCard.setEventListeners();

profileButtonAddPlace.addEventListener("click", () => {
  popupAddCard.open();
});

// valdation
const profileValidation = new FormValidator(
  formSettings,
  document.querySelector(popupEditProfileSelector)
);
const newCardValidation = new FormValidator(
  formSettings,
  document.querySelector(popupAddCardSelector)
);
profileValidation.enableValidation();
newCardValidation.enableValidation();
