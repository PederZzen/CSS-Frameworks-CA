const API_BASE_URL = "https://nf-api.onrender.com";
const loginUrl = `${API_BASE_URL}/api/v1/social/auth/login`;

const form = document.querySelector("#signUpForm");
const emailInput = document.querySelector("input#email");
const passwordInput = document.querySelector("input#password");
const loginBtn = document.querySelector("#loginBtn");
const emailError = document.querySelector("div#emailError");
const passwordError = document.querySelector("div#passwordError");

/** Login */

let validForm = false;

let formValidator = (event) => {
    event.preventDefault();

    let validEmail = false;
    let validPassword = false;

    const email = emailInput.value.trim();
    const password = passwordInput.value.trim();

    const userToLogin = {
        email,
        password,
    }

    if (email.includes("@stud.noroff.no") || email.includes("@noroff.no")) {
        validEmail = true;
        emailError.innerHTML = ""
    } else {
        console.log("Not a valid email");
        emailError.innerHTML = "* Email not valid";
    }  
    
    if (password.length >= 8) {
        validPassword = true;
        passwordError.innerHTML = "";
    } else {
        console.log("Password must be longer than 8 characters");
        passwordError.innerHTML = "* Password must be longer than 8 characters";
    }

    if (validEmail && validPassword) {
        validForm = true;  

        login(loginUrl, userToLogin);
    }
}

loginBtn.addEventListener("click", formValidator);

async function login(url, userData) {
    try {
        // console.log(url, userData);
        const postData = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(userData),
        }
        const response = await fetch(url, postData);
        // console.log(response);
        const json = await response.json();
        // console.log(json);
        const accessToken = json.accessToken;
        localStorage.setItem("accessToken", accessToken);
        localStorage.setItem("username", json.name)
        if (response.ok == true) { 
            window.location.href = "../home.html"; 
        } else { 
            emailError.innerHTML = json.message;
        }
    } catch (error) {
        console.log(error);
    }
}