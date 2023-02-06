// profile
const profileName = document.querySelector(".profile__name");
const profileDescription = document.querySelector(".profile__description");
const profileBtnProfileEditing = document.querySelector(".profile__button-profile-editing");

// popup
const popup = document.querySelector(".popup");
const popupInputName = document.querySelector(".popup__input_name"); 
const poputInputDescription = document.querySelector(".popup__input_description");
const popupButtonSubmit = document.querySelector(".popup__button-submit");
const popupButtonCross = document.querySelector(".popup__button-cross");
// place
const placeButtonsLike = document.querySelectorAll(".place__button-like");


// Вызываем popup по нажатии на profileBtnProfileEditing 
profileBtnProfileEditing.addEventListener("click", () => {
  popup.classList.add("popup_opened");
  // popupInputName задаем текущее значение profileName
  popupInputName.value = profileName.textContent;
  poputInputDescription.value = profileDescription.textContent;
});

// Сохранить в попапе
popupButtonSubmit.addEventListener("click", (event) => {
  event.preventDefault();
  profileName.textContent = popupInputName.value;
  profileDescription.textContent = poputInputDescription.value;
  popup.classList.remove("popup_opened");
});

// Закрыть попап по нажатии на крестик
popupButtonCross.addEventListener("click", (event) => {
  event.preventDefault();
  popup.classList.remove("popup_opened");
});

// Закрыть попап по свободному полю за формой
popup.addEventListener("click", (event) => {
  event.preventDefault();
  if (event.currentTarget === event.target) {
    popup.classList.remove("popup_opened");
  }
});

// Лайки
placeButtonsLike.forEach((placeBtnLike) => {
  placeBtnLike.addEventListener("click", () => {
    placeBtnLike.classList.toggle("place__button-like_liked");
  });
});
