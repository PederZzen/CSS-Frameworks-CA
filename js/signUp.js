const API_BASE_URL = "https://nf-api.onrender.com";
const registerUrl = `${API_BASE_URL}/api/v1/social/auth/register`;

const form = document.querySelector("#signUpForm");
const nameInput = document.querySelector("input#name");
const emailInput = document.querySelector("input#email");
const passwordInput = document.querySelector("input#password");
const passwordRepeatInput = document.querySelector("input#passwordRepeat");
const signUpBtn = document.querySelector("#signUpBtn");
const nameError = document.querySelector("#nameError");
const emailError = document.querySelector("#emailError");
const passwordError = document.querySelector("#passwordError");
const passwordErrorRepeat = document.querySelector("#passwordErrorRepeat");

/** Register */

let validForm = false;

let formValidator = (event) => {
    event.preventDefault();

    let validName = false;
    let validEmail = false;
    let validPassword = false;

    const name = nameInput.value.trim().toLowerCase();
    const email = emailInput.value.trim();
    const password = passwordInput.value.trim();
    const passwordRepeat = passwordRepeatInput.value.trim();

    const userToRegister = {
        name,
        email,
        password,
    }

    const nameRegex = /^[a-z0-9_]{3,16}$/; //https://www.technicalbikash.com/2021/08/regex-for-username-validation.html

    if (name !== "") {
        if (nameRegex.test(name)) {
            validName = true;
            nameError.innerHTML = "&nbsp;";
        } else {
            nameError.innerHTML = "* Username must be longer than 3 characters and can only contain letters of the alphabet, underscore and numbers"
        }  
    } else {
        nameError.innerHTML = "* Please fill in username";
    }


    if (email.includes("@stud.noroff.no") || email.includes("@noroff.no")) {
        validEmail = true;
        emailError.innerHTML = "&nbsp;"
    } else {
        emailError.innerHTML = "* Email not valid";
    }  

    if (passwordRepeat != password) {
        passwordErrorRepeat.innerHTML = "* Passwords do not match";
    } else if (password.length < 8) {
        passwordError.innerHTML = "* Password must be longer than 8 characters";
    } else {
        passwordError.innerHTML = "&nbsp;";
        validPassword = true;
    }

    if (validEmail && validPassword && passwordRepeat) {
        validForm = true;  

        register(registerUrl, userToRegister);
    }
}

signUpBtn.addEventListener("click", formValidator);


async function register(url, userData) {
    // console.log(url, userData);
    try {
        const postData = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(userData),
        }
        const response = await fetch(url, postData);
        console.log(response);
        const json = await response.json();
        console.log(json);
        if (json.statusCode == 400) {
            nameError.innerHTML = `${json.message}, <a href="./login.html">log in instead</a>`
        } 
        if (response.ok == true) { window.location.href = "../login.html"; }
    } catch (error) {
        console.log(error);
    }
}