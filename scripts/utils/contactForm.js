const modal = document.getElementById("contact_modal");
const close_Modal = document.querySelector(".close_Modal");
const main = document.getElementById("main");
const header = document.getElementById("header");


function displayModal() {
  modal.style.display = "flex";
  main.ariaHidden = "true";
  modal.ariaHidden = "false";
  header.ariaHidden = "true";
  close_Modal.focus();
}

function closeModal() {
  modal.style.display = "none";
  main.ariaHidden = "false";
  modal.ariaHidden = "true";
  header.ariaHidden = "false";
}

close_Modal.addEventListener("click", (e) => {
  e.preventDefault();
  closeModal();
});

window.addEventListener("keydown", (e) => {
  if (
    document.getElementById("contact_modal").getAttribute("aria-hidden") == "false"
  ) {
    e.preventDefault();
    switch (e.key) {
      case "Escape":
          closeModal();
          break;

        default:
          return;
        }
      }
    });

const submitBtn = document.querySelector(".contact_button")

const prenom = document.getElementById("first");
const nom = document.getElementById("last");
const email = document.getElementById("email");
const message = document.getElementById("message")


const errorName = document.querySelector('.errorName');
const errorSecName = document.querySelector(".errorSecName");
const errorEmail = document.querySelector(".errorEmail");
const errorMessage = document.querySelector(".errorMessage");


prenom.addEventListener("input", (evt) => {
  validateName(evt.target)
});


nom.addEventListener("input", (evt) => {
  validateSecondName(evt.target);
});

email.addEventListener("input", (evt) => {
  validateEmail(evt.target);
});
message.addEventListener("input", (evt) => {
  validateMessage(evt.target)
});

function validateName(inputValue) {

  if (!inputValue.value.match(/^[a-zA-Z\s]{2,}$/) || inputValue.value === " " || inputValue.value.length < 2) {
    errorName.style.display = "block";
    errorName.innerHTML = "Veuillez entrer 2 caractères ou plus pour le champ du Prénom.";
    errorName.style.color = "red";
    errorName.style.fontSize = '0.8rem';
    prenom.style.border = 'solid red 2px';
  } else {
    errorName.style.display = "none";
    prenom.style.border = 'none';

  }
  console.log("name " + inputValue.value);
}

function validateSecondName(inputValue) {

  if (!inputValue.value.match(/^[a-zA-Z\s]{2,}$/) || inputValue.value === " " || inputValue.value.length < 2) {
    errorSecName.style.display = "block";
    errorSecName.innerHTML = "Veuillez entrer 2 caractères ou plus pour le champ du nom.";
    errorSecName.style.color = "red";
    errorSecName.style.fontSize = '0.8rem';
    nom.style.border = 'solid red 2px';
  } else {
    errorSecName.style.display = "none";
    nom.style.border = "none"
  }
  console.log("Second name " + inputValue.value)
}

function validateEmail(inputValue) {

  if (!/^[A-Za-z](([^<>()[\]\\.,;:\s@]+(\.[^<>()[\]\\.,;:\s@]+)*)|(.+))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email.value)) {
    errorEmail.style.display = "block";
    errorEmail.innerHTML = "Veuillez entrer une adresse mail correct.";
    errorEmail.style.color = "red";
    errorEmail.style.fontSize = '0.8rem';
    email.style.border = 'solid red 2px';
  } else {
    errorEmail.style.display = "none";
    email.style.border = 'none';
  }
  console.log("Email " + inputValue.value)
}

function validateMessage(inputValue) {
  if (!inputValue.value.match(/^[a-zA-Z\s]{2,}$/) || inputValue.value === " " || inputValue.value.length < 2) {
    errorMessage.style.display = "block";
    errorMessage.innerHTML = "Veuillez entrer votre message.";
    errorMessage.style.color = "red";
    errorMessage.style.fontSize = '0.8rem';
    message.style.border = 'solid red 2px';
  } else {
    errorMessage.style.display = "none";
    message.style.border = 'none';
  }
  console.log("Votre Message " + inputValue.value)
}


function sendMessage() {
  prenom.addEventListener("input", (evt) => {
    validateName(evt.target);
  });

  nom.addEventListener("input", (evt) => {
    validateSecondName(evt.target);
  });

  email.addEventListener("input", (evt) => {
    validateEmail(evt.target);
  });
  modal.style.display = "none";

}