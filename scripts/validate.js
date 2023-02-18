const showInputError = (
  formElement,
  inputElement,
  errorMessage,
  formSettings
) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(formSettings["inputErrorClass"]);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(formSettings["errorClass"]);
};

const hideInputError = (formElement, inputElement, formSettings) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(formSettings["inputErrorClass"]);
  errorElement.classList.remove(formSettings["errorClass"]);
  errorElement.textContent = "";
};

const checkInputValidity = (formElement, inputElement, formSettings) => {
  if (!inputElement.validity.valid) {
    showInputError(
      formElement,
      inputElement,
      inputElement.validationMessage,
      formSettings
    );
  } else {
    hideInputError(formElement, inputElement, formSettings);
  }
};

const setEventListeners = (formElement, formSettings) => {
  const inputList = Array.from(
    formElement.querySelectorAll(formSettings["inputSelector"])
  );
  const buttonElement = formElement.querySelector(
    formSettings["submitButtonSelector"]
  );
  toggleButtonState(inputList, buttonElement, formSettings);

  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", function () {
      checkInputValidity(formElement, inputElement, formSettings);
      toggleButtonState(inputList, buttonElement, formSettings);
    });
  });

  // deep reset form
  formElement.addEventListener("reset", () => {
    inputList.forEach((inputElement) => {
      hideInputError(formElement, inputElement, formSettings);
    });
  });
};

function hasInvalidInput(inputList) {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
}

function toggleButtonState(inputList, buttonElement, formSettings) {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add(formSettings["inactiveButtonClass"]);
  } else {
    buttonElement.classList.remove(formSettings["inactiveButtonClass"]);
  }
}

const enableValidation = (formSettings) => {
  // {
  //   formSelector: '.popup__form',
  //   inputSelector: '.popup__input',
  //   submitButtonSelector: '.popup__button',
  //   inactiveButtonClass: 'popup__button_disabled',
  //   inputErrorClass: 'popup__input_type_error',
  //   errorClass: 'popup__error_visible'
  // }
  const formElements = document.querySelectorAll(formSettings["formSelector"]);
  formElements.forEach((formElement) => {
    setEventListeners(formElement, formSettings);
  });
};

enableValidation({
  formSelector: ".popup__form",
  inputSelector: ".popup__form-input",
  submitButtonSelector: ".popup__form-button-submit",
  inactiveButtonClass: "popup__form-button-submit_inactive",
  inputErrorClass: "popup__form-input_type__error",
  errorClass: "popup__form-input-error_visible",
});
