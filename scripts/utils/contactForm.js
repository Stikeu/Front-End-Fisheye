const modal = document.getElementById("contact_modal");

function displayModal() {
	modal.style.display = "block";
}

 function closeModal() {
     modal.style.display = "none";
}

const submitBtn = document.querySelector(".contact_button")

const form = document.getElementById("form");
const prenom = document.getElementById("first");
const nom = document.getElementById("last");
const email = document.getElementById("email");


const errorName = document.querySelector('.errorName');
const errorSecName = document.querySelector(".errorSecName");
const errorEmail = document.querySelector(".errorEmail");

let prenomCheck;
let nomCheck;
let emailCheck;

prenom.addEventListener("input", (evt) => {
    validateName(evt.target)
  });
  
  
  nom.addEventListener("input", (evt) => {
    validateSecondName(evt.target);
  });
  
  email.addEventListener("input", (evt) => {
    validateEmail(evt.target);
  });

  function validateName(inputValue) {

    if (!inputValue.value.match(/^[a-zA-Z\s]{2,}$/) || inputValue.value === " " || inputValue.value.length < 2) {
      errorName.style.display = "block";
      errorName.innerHTML = "Veuillez entrer 2 caractères ou plus pour le champ du Prénom.";
      errorName.style.color = "red";
      errorName.style.fontSize = '0.8rem';
      prenom.style.border = 'solid red 2px';
      prenomCheck = false;
    } else {
      errorName.style.display = "none";
      prenom.style.border = 'none';
      prenomCheck = true;
    }
  }
  
  function validateSecondName(inputValue) {
    
    if (!inputValue.value.match(/^[a-zA-Z\s]{2,}$/) || inputValue.value === " " || inputValue.value.length < 2) {
      errorSecName.style.display = "block";
      errorSecName.innerHTML = "Veuillez entrer 2 caractères ou plus pour le champ du nom.";
      errorSecName.style.color = "red";
      errorSecName.style.fontSize = '0.8rem';
      nom.style.border = 'solid red 2px';
      nomCheck = false;
    } else {
      errorSecName.style.display = "none";
      nom.style.border = "none"
      nomCheck = true;
    }
  }
  
  function validateEmail(inputValue) {
  
    if (!/^[A-Za-z](([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email.value)) {
      errorEmail.style.display = "block";
      errorEmail.innerHTML = "Veuillez entrer une adresse mail correct.";
      errorEmail.style.color = "red";
      errorEmail.style.fontSize = '0.8rem';
      email.style.border = 'solid red 2px';
      emailCheck = false;
    } else {
      errorEmail.style.display = "none";
      email.style.border = 'none';
      emailCheck = true;
    }
  }

  function checkReset() {
    document.getElementById("test").style.opacity = "1";
  }

  submitBtn.addEventListener("click", (evt) => {
    evt.preventDefault();
    prenom.addEventListener("input", (evt) => {
      validateName(evt.target);
    });
  
    nom.addEventListener("input", (evt) => {
      validateSecondName(evt.target);
    });
  
    email.addEventListener("input", (evt) => {
      validateEmail(evt.target);
    });
})

submitBtn.addEventListener("click", (evt) => {
    evt.preventDefault();
    validateName(prenom);
  validateSecondName(nom);
  validateEmail(email);

  if ( prenomCheck === true && nomCheck === true && emailCheck === true){
    form.style.display = "none";
    form.reset();
  }

})