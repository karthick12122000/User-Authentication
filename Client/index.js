import API_URI from "./config/global.js";
console.log(API_URI);
function validateForm() {
  const name = document.getElementById("floatingName");
  if (name.value === "") {
    alert("Name should not be empty!");
  }
  const emai = document.getElementById("floatingInput");
  if (emai.value === "") {
    alert("Emai should not be empty!");
  }
  const password = document.getElementById("floatingPassword");
  if (password.value === "") {
    alert("Password should not be empty!");
  }
  const confrimPassword = document.getElementById("floatingConfrimPassword");
  if (confrimPassword.value === "") {
    alert("Confrim Password should not be empty!");
  }
}
document.getElementById("signup").addEventListener("click", () => {
  validateForm();
});
