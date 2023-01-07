const form = document.querySelector("#offer-form");
const firstName = document.querySelector("#first-name-input");
const lastName = document.querySelector("#last-name-input");
const email = document.querySelector("#email-input");
const planetSelector = document.querySelector("#planet-selector");
const payMethodError = document.querySelector("#pay-method-error");
form.addEventListener("submit", function (e) {
  e.preventDefault();
  validateInput();
});
const invalidInput = function (element, message) {
  const inputField = element.parentElement;
  const errorDisplay = inputField.querySelector(".errorMessage");
  errorDisplay.innerText = message;
  inputField.classList.add("error");
  inputField.classList.remove("success");
};
const validInput = function (element) {
  const inputField = element.parentElement;
  const errorDisplay = inputField.querySelector(".errorMessage");
  errorDisplay.innerText = "";
  inputField.classList.add("success");
  inputField.classList.remove("error");
};
const isValidEmail = function (email) {
  const emailInput = email.toLowerCase();
  const emailInputValue = emailInput.trim();
  if (
    !emailInputValue.includes(" ") &&
    emailInputValue.includes("@") &&
    emailInputValue.includes(".") &&
    emailInputValue.indexOf("@") + 2 <= emailInputValue.lastIndexOf(".")
  ) {
    return true;
  } else {
    return false;
  }
};
const validateInput = function () {
  const firstNameValue = firstName.value.trim();
  const lastNameValue = lastName.value.trim();
  const emailValue = email.value.trim();
  const planetSelectorValue = planetSelector.value.trim();
  const payMethodChecked = document.querySelector(
    "input[name='pay-method']:checked"
  );
  let payMethodValue = "";
  if (payMethodChecked !== null) {
    payMethodValue = payMethodChecked.value.trim();
  }
  if (firstNameValue === "") {
    invalidInput(firstName, "First Name is required");
  } else if (!isNaN(firstNameValue)) {
    invalidInput(firstName, "Provide a valid first name");
  } else {
    validInput(firstName);
  }
  if (lastNameValue === "") {
    invalidInput(lastName, "Last Name is required");
  } else if (!isNaN(lastNameValue)) {
    invalidInput(lastName, "Provide a valid last name");
  } else {
    validInput(lastName);
  }
  if (emailValue === "") {
    invalidInput(email, "Email is required");
  } else if (!isValidEmail(emailValue)) {
    invalidInput(email, "Provide a valid email address");
  } else {
    validInput(email);
  }
  if (planetSelectorValue === "noSelection") {
    invalidInput(planetSelector, "Select a planet is required");
  } else {
    validInput(planetSelector);
  }
  if (payMethodValue === "") {
    invalidInput(payMethodError, "Select a payment method is required");
  } else {
    validInput(payMethodError);
  }
};
