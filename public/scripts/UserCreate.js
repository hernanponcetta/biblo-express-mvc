let errors = [];

let first_name = document.getElementById("first_name");
first_name.addEventListener("blur", function (event) {
  if (event.target.value == "") {
    document.getElementById("first_name_error").textContent =
      "El nombre debe estar completo";
  } else {
    document.getElementById("first_name_error").textContent = "";
    errors = errors.filter((id) => {
      id == event.target.id;
    });
  }
});

let second_name = document.getElementById("last_name");
second_name.addEventListener("blur", function (event) {
  if (event.target.value == "") {
    document.getElementById("last_name_error").textContent =
      "El apellido debe estar completo";
  } else {
    document.getElementById("last_name_error").textContent = "";
    errors = errors.filter((id) => {
      id == event.target.id;
    });
  }
});

let dni = document.getElementById("dni");
dni.addEventListener("blur", function (event) {
  if (event.target.value == "") {
    document.getElementById("dni_error").textContent =
      "El DNI debe estar completo";
  } else if (event.target.value.length != 8) {
    document.getElementById("dni_error").textContent =
      "El DNI debe contener ocho digitos";
  } else {
    document.getElementById("dni_error").textContent = "";
    errors = errors.filter((id) => {
      id == event.target.id;
    });
  }
});

let birth = document.getElementById("birth");
birth.addEventListener("blur", function (event) {
  if (event.target.value == "") {
    document.getElementById("birth_error").textContent =
      "La fecha de nacimento debe estar completa";
  } else {
    document.getElementById("birth_error").textContent = "";
    errors = errors.filter((id) => {
      id == event.target.id;
    });
  }
});

let address = document.getElementById("address");
address.addEventListener("blur", function (event) {
  if (event.target.value == "") {
    document.getElementById("address_error").textContent =
      "La dirección debe estar completa";
  } else {
    document.getElementById("address_error").textContent = "";
    errors = errors.filter((id) => {
      id == event.target.id;
    });
  }
});

let cp = document.getElementById("cp");
cp.addEventListener("blur", function (event) {
  if (event.target.value == "") {
    document.getElementById("cp_error").textContent =
      "El código postal debe estar completo";
  } else {
    document.getElementById("address_error").textContent = "";
    errors = errors.filter((id) => {
      id == event.target.id;
    });
  }
});

let email = document.getElementById("email");
email.addEventListener("blur", function (event) {
  if (event.target.value == "") {
    document.getElementById("email_error").textContent =
      "El email postal debe estar completo";
  }
  if (
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
      "La contraseña debe estar completa";
  } else {
    document.getElementById("password_error").textContent = "";
    errors = errors.filter((id) => {
      id == event.target.id;
    });
  }
});

let password_check = document.getElementById("password_check");
password_check.addEventListener("blur", function (event) {
  if (!(event.target.value === password.value)) {
    document.getElementById("password_check_error").textContent =
      "Las contraseñas deben ser iguales";
  } else {
    document.getElementById("password_check_error").textContent = "";
    errors = errors.filter((id) => {
      id == event.target.id;
    });
  }
});

let user_form = document.getElementById("user_form");
user_form.addEventListener("submit", function (event) {
  event.preventDefault();
  if (first_name.value == "") {
    document.getElementById("first_name_error").textContent =
      "El nombre debe estar completo";
    errors.push(first_name.id);
  }
  if (last_name.value == "") {
    document.getElementById("last_name_error").textContent =
      "El apellido debe estar completo";
    errors.push(last_name.id);
  }
  if (dni.value == "") {
    document.getElementById("dni_error").textContent =
      "El DNI debe estar completo";
    errors.push(dni.id);
  }
  if (birth.value == "") {
    document.getElementById("birth_error").textContent =
      "La fecha de nacimento debe estar completa";
    errors.push(birth.id);
  }
  if (address.value == "") {
    document.getElementById("address_error").textContent =
      "La dirección debe estar completa";
    errors.push(address.id);
  }
  if (cp.value == "") {
    document.getElementById("cp_error").textContent =
      "El código postal debe estar completo";
    errors.push(cp.id);
  }
  if (email.value == "") {
    document.getElementById("email_error").textContent =
      "El email postal debe estar completo";
    errors.push(email.id);
  }
  if (
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
  if (!(password_check.value === password.value)) {
    document.getElementById("password_check_error").textContent =
      "Las contraseñas deben ser iguales";
    errors.push(password_check.id);
  }

  if (errors.length == 0) {
    user_form.submit();
  }
});

let submit_button = document.getElementById("submit_button");
submit_button.addEventListener("mouseup", function (event) {
  submit_button.blur();
});
