const registrations = [];

const body = document.querySelector("body");
const themeBtn = document.querySelector("#themeBtn");
const cards = document.querySelectorAll(".event-card");
const chosenEvent = document.querySelector("#chosenEvent");
const eventError = document.querySelector("#eventError");
const selectedEventInput = document.querySelector("#selectedEvent");

const form = document.querySelector("#registerForm");
const nameInput = document.querySelector("#fullName");
const nameCounter = document.querySelector("#nameCounter");
const nameError = document.querySelector("#nameError");
const emailInput = document.querySelector("#email");
const emailError = document.querySelector("#emailError");
const groupInput = document.querySelector("#group");
const groupError = document.querySelector("#groupError");
const agreeInput = document.querySelector("#agree");
const agreeError = document.querySelector("#agreeError");

const confirmation = document.querySelector("#confirmation");
const registrationList = document.querySelector("#registrationList");

function validateName(value) {
    return value.trim().length >= 3;
}

function validateEmail(value) {
    const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return pattern.test(value.trim());
}

function validateGroup(value) {
    return value.trim() !== "";
}

function validateEvent(value) {
    return value !== "";
}

function validateAgree(checked) {
    return checked === true;
}

function showError(input, errorElement, text) {
    errorElement.textContent = text;
    if (input) {
        input.classList.add("error");
    }
}

function clearError(input, errorElement) {
    errorElement.textContent = "";
    if (input) {
        input.classList.remove("error");
    }
}

function selectEvent(card) {
    for (let i = 0; i < cards.length; i++) {
        cards[i].classList.remove("selected-event");
    }

    card.classList.add("selected-event");

    const title = card.dataset.title;
    selectedEventInput.value = title;
    chosenEvent.textContent = "Selected event: " + title;
    clearError(null, eventError);
}

function resetSelection() {
    for (let i = 0; i < cards.length; i++) {
        cards[i].classList.remove("selected-event");
    }
    selectedEventInput.value = "";
    chosenEvent.textContent = "No event selected";
}

function validateForm() {
    let isValid = true;

    if (!validateName(nameInput.value)) {
        showError(nameInput, nameError, "Name must contain at least 3 characters");
        isValid = false;
    } else {
        clearError(nameInput, nameError);
    }

    if (emailInput.value.trim() === "") {
        showError(emailInput, emailError, "Email is required");
        isValid = false;
    } else if (!validateEmail(emailInput.value)) {
        showError(emailInput, emailError, "Enter a valid email, for example name@example.com");
        isValid = false;
    } else {
        clearError(emailInput, emailError);
    }

    if (!validateGroup(groupInput.value)) {
        showError(groupInput, groupError, "Enter your student group");
        isValid = false;
    } else {
        clearError(groupInput, groupError);
    }

    if (!validateEvent(selectedEventInput.value)) {
        showError(null, eventError, "Please select an event");
        isValid = false;
    } else {
        clearError(null, eventError);
    }

    if (!validateAgree(agreeInput.checked)) {
        showError(null, agreeError, "You must agree to the rules");
        isValid = false;
    } else {
        clearError(null, agreeError);
    }

    return isValid;
}

function addRegistration(registration) {
    registrations.push(registration);

    const item = document.createElement("li");
    item.textContent =
        registration.name + " (" + registration.group + ") - " +
        registration.event + " - " + registration.email;
    registrationList.appendChild(item);
}

for (let i = 0; i < cards.length; i++) {
    const button = cards[i].querySelector(".select-btn");
    button.addEventListener("click", function () {
        selectEvent(cards[i]);
    });
}

themeBtn.addEventListener("click", function () {
    body.classList.toggle("dark");

    if (body.classList.contains("dark")) {
        themeBtn.textContent = "Light Theme";
    } else {
        themeBtn.textContent = "Dark Theme";
    }
});

nameInput.addEventListener("input", function () {
    nameCounter.textContent = "Characters: " + nameInput.value.length;

    if (validateName(nameInput.value)) {
        clearError(nameInput, nameError);
    }
});

emailInput.addEventListener("input", function () {
    if (validateEmail(emailInput.value)) {
        clearError(emailInput, emailError);
    }
});

groupInput.addEventListener("input", function () {
    if (validateGroup(groupInput.value)) {
        clearError(groupInput, groupError);
    }
});

agreeInput.addEventListener("change", function () {
    if (agreeInput.checked) {
        clearError(null, agreeError);
    }
});

form.addEventListener("submit", function (event) {
    event.preventDefault();

    if (!validateForm()) {
        confirmation.textContent = "";
        return;
    }

    const registration = {
        name: nameInput.value.trim(),
        email: emailInput.value.trim(),
        group: groupInput.value.trim(),
        event: selectedEventInput.value
    };

    addRegistration(registration);

    confirmation.textContent =
        "Thank you, " + registration.name + "! You are registered for " + registration.event + ".";

    form.reset();
    nameCounter.textContent = "Characters: 0";
    resetSelection();
});
