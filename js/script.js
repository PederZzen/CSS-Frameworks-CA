const API_BASE_URL = "https://nf-api.onrender.com";
const registerUrl = `${API_BASE_URL}/api/v1/social/auth/register`;

/**
 * Register User
 */

const form = document.querySelector("#signUpForm");
const emailInput = document.querySelector("input#email");
const passwordInput = document.querySelector("input#password");
const submitBtn = document.querySelector("#signUpBtn");
const emailError = document.querySelector("div#emailError");
const passwordError = document.querySelector("div#passwordError");

/** Validates form data */

let validForm = false;

let formValidator = (event) => {
    event.preventDefault();

    let validEmail = true;
    let validPassword = true;

    const email = emailInput.value.trim();
    const password = passwordInput.value.trim();

    let emailPattern = /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/; // https://code.tutsplus.com/tutorials/8-regular-expressions-you-should-know--net-6149    
    
    if (!emailPattern.test(email)) {
        console.log("Not a valid email");
        emailError.innerHTML = "* Email not valid";
        validEmail = false;
    } else {
        validEmail = true;
        // console.log("Email: " + validEmail);
        emailError.innerHTML = ""
    }  
    
    if (password.length < 5) {
        console.log("Password must be longer than 5 characters");
        passwordError.innerHTML = "* Password must be longer than 5 characters";
        validPassword = false;
    } else {
        validPassword = true;
        // console.log("Pass: " + validPassword);
        passwordError.innerHTML = "";
    }

    if (validEmail == true && validPassword == true) {
        validForm = true;  
        
        registerNewUser();  
    }

    // console.log("Form is: " + validForm);
}

async function registerNewUser (url, userData) {
    const email = emailInput.value.trim();
    const password = passwordInput.value.trim();


    if (validForm) {

        console.log(url, userData);
    
        console.log(userData);
    }
}

submitBtn.addEventListener("click", formValidator);




