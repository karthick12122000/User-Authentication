import API_URI from "./config/global.js";
import signup from "./controllers/signup.js";
function validateForm() {
  const name = document.getElementById("floatingName");
  const nameerr = document.getElementById("nameerr");
  let flag;
  if (name.value === "") {
    flag = true;
    nameerr.innerText = "Name should not be empty!";
  } else {
    nameerr.innerText = "";
  }
  const email = document.getElementById("floatingInput");
  const emailerr = document.getElementById("emailerr");
  var emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,4}$/;
  if (email.value === "") {
    flag = true;
    emailerr.innerText = "Email should not be empty!";
  } else if (emailPattern.test(email.value) === false) {
    emailerr.innerText = "Please enter a valid email address";
  } else {
    emailerr.innerText = "";
  }
  const password = document.getElementById("floatingPassword");
  const Passworderr = document.getElementById("Passworderr");

  if (password.value === "") {
    flag = true;
    Passworderr.innerText = "Password  should not be empty!";
  } else if (password.value.length < 8) {
    flag = true;
    Passworderr.innerText = "Password cannot be less than 8 characters";
  } else {
    Passworderr.innerText = "";
  }

  const confrimPassword = document.getElementById("floatingConfrimPassword");
  const ConfrimPassworderr = document.getElementById("ConfrimPassworderr");

  if (confrimPassword.value === "") {
    ConfrimPassworderr.innerText = "Confrim Password should not be empty!";
  } else if (confrimPassword.value != password.value) {
    ConfrimPassworderr.innerText =
      "The password and confirmed password do not match!";
    flag = true;
  } else {
    ConfrimPassworderr.innerText = "";
  }
  if (flag) {
    return false;
  }
  return true;
}
document.getElementById("signup").addEventListener("click", async () => {
  let form = await validateForm();
  if (form) {
    const name = document.getElementById("floatingName");
    const email = document.getElementById("floatingInput");

    const confrimPassword = document.getElementById("floatingConfrimPassword");

    let response = await signup(name.value, email.value, confrimPassword.value);
    if (response) {
      let signupF = document.getElementById("signupF");
      signupF.style.display = "none";
    } else {
      const emailerr = document.getElementById("emailerr");
      emailerr.innerText = "An account already exists for this email address.";
    }
  }
});
