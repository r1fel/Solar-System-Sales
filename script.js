const form = document.querySelector("#offer-form");
const firstName = document.querySelector("#first-name-input");
const lastName = document.querySelector("#last-name-input");
const email = document.querySelector("#email-input");
const planetSelector = document.querySelector("#planet-selector");
const payMethodError = document.querySelector("#pay-method-error");
form.addEventListener("submit", function (e) {
  e.preventDefault();

  if (validateInput()) {
    openConfirmBox();
  }
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

  let result = true;
  if (firstNameValue === "") {
    invalidInput(firstName, "First Name is required");
    result = false;
  } else if (!isNaN(firstNameValue)) {
    invalidInput(firstName, "Provide a valid first name");
    result = false;
  } else {
    validInput(firstName);
  }
  if (lastNameValue === "") {
    invalidInput(lastName, "Last Name is required");
    result = false;
  } else if (!isNaN(lastNameValue)) {
    invalidInput(lastName, "Provide a valid last name");
    result = false;
  } else {
    validInput(lastName);
  }
  if (emailValue === "") {
    invalidInput(email, "Email is required");
    result = false;
  } else if (!isValidEmail(emailValue)) {
    invalidInput(email, "Provide a valid email address");
    result = false;
  } else {
    validInput(email);
  }
  if (planetSelectorValue === "noSelection") {
    invalidInput(planetSelector, "Select a planet is required");
    result = false;
  } else {
    validInput(planetSelector);
  }
  if (payMethodValue === "") {
    invalidInput(payMethodError, "Select a payment method is required");
    result = false;
  } else {
    validInput(payMethodError);
  }
  return result;
};

let confirmBox = document.querySelector("#confirmBox");
const openConfirmBox = function () {
  confirmBox.classList.add("submit");
  const confirmMessage = document.querySelector(".confirmBox p");
  const confirmMessageGreeting = document.createElement("p");
  confirmMessageGreeting.innerText = `Dear ${lastName.value
    .trim()
    .charAt(0)
    .toUpperCase()}${lastName.value.trim().slice(1)},`;
  const confirmMessageBody = document.createElement("p");
  confirmMessageBody.innerText = `Thank you for being interested in ${planetSelector.value
    .trim()
    .charAt(0)
    .toUpperCase()}${planetSelector.value
    .trim()
    .slice(1)}. Please confirm your information as below:`;
  const confirmMessageFullName = document.createElement("li");
  confirmMessageFullName.innerText = `Your full name: ${firstName.value
    .trim()
    .charAt(0)
    .toUpperCase()}${firstName.value.trim().slice(1)} ${lastName.value
    .trim()
    .charAt(0)
    .toUpperCase()}${lastName.value.trim().slice(1)}`;
  const confirmMessageEmail = document.createElement("li");
  confirmMessageEmail.innerText = `Your email: ${email.value.trim()}`;
  confirmMessage.replaceChildren(
    confirmMessageGreeting,
    confirmMessageBody,
    confirmMessageFullName,
    confirmMessageEmail
  );
};
let confirmButton = document.querySelector("#confirmButton");
confirmBox.addEventListener("click", function () {
  confirmBox.classList.remove("submit");
  firstName.value = "";
  lastName.value = "";
  email.value = "";
});
