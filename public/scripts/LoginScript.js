let errors = [];

let email = document.getElementById("email");
email.addEventListener("blur", function (event) {
  if (event.target.value == "") {
    document.getElementById("email_error").textContent =
      "El email debe estar completo";
  } else if (
    !/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(
      event.target.value
    )
  ) {
    document.getElementById("email_error").textContent =
      "El email no es válido";
  } else {
    document.getElementById("email_error").textContent = "";
    errors = errors.filter((id) => {
      id == event.target.id;
    });
  }
});

let password = document.getElementById("password");
password.addEventListener("blur", function (event) {
  if (event.target.value == "") {
    document.getElementById("password_error").textContent =
      "Debe introducir una contraseña";
  } else {
    document.getElementById("password_error").textContent = "";
    errors = errors.filter((id) => {
      id == event.target.id;
    });
  }
});

let user_form = document.getElementById("login_form");
user_form.addEventListener("submit", function (event) {
  event.preventDefault();
  if (email.value == "") {
    document.getElementById("email_error").textContent =
      "El email debe estar completo";
    errors.push(email.id);
  } else if (
    !/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(
      email.value
    )
  ) {
    document.getElementById("email_error").textContent =
      "El email no es válido";
    errors.push(email.id);
  }
  if (password.value == "") {
    document.getElementById("password_error").textContent =
      "La contraseña debe estar completa";
    errors.push(password.id);
  }
  console.log(errors);
  if (errors.length == 0) {
    user_form.submit();
  }
});

let submit_button = document.getElementById("submit_button");
submit_button.addEventListener("mouseup", function (event) {
  submit_button.blur();
});
