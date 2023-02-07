// profile
const profileName = document.querySelector(".profile__name");
const profileDescription = document.querySelector(".profile__description");
const profileBtnProfileEditing = document.querySelector(
  ".profile__button-profile-editing"
);

// popup
const popup = document.querySelector(".popup");
const popupInputElName = document.querySelector(".popup__form-input_el_name");
const popupInputElDescription = document.querySelector(
  ".popup__form-input_el_description"
);
const popupFormButtonSubmit = document.querySelector(
  ".popup__form-button-submit"
);
const popupButtonClose = document.querySelector(".popup__button-close");
function openPopun() {
  popup.classList.add("popup_opened");
}
function closePopun() {
  popup.classList.remove("popup_opened");
}

function initializePopup() {
  openPopun();
  popupInputElName.value = profileName.textContent;
  popupInputElDescription.value = profileDescription.textContent;
}
profileBtnProfileEditing.addEventListener("click", initializePopup);

function applyForm(event) {
  event.preventDefault();
  profileName.textContent = popupInputElName.value;
  profileDescription.textContent = popupInputElDescription.value;
  closePopun();
}
popupFormButtonSubmit.addEventListener("click", applyForm);

popupButtonClose.addEventListener("click", closePopun);
