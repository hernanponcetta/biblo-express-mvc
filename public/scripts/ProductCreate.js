let errors = [];

let title = document.getElementById("title");
title.addEventListener("blur", function (event) {
  if (event.target.value == "") {
    document.getElementById("title_error").textContent =
      "El título del libro debe estar completo";
  } else {
    document.getElementById("title_error").textContent = "";
    errors = errors.filter((id) => {
      id == event.target.id;
    });
  }
});

let isbn = document.getElementById("isbn");
isbn.addEventListener("blur", function (event) {
  if (event.target.value == "") {
    document.getElementById("isbn_error").textContent =
      "El ISBN debe estar completo";
  } else if (event.target.value.length != 13) {
    document.getElementById("isbn_error").textContent =
      "El ISBN debe contener 13 digitos";
  } else {
    document.getElementById("isbn_error").textContent = "";
    errors = errors.filter((id) => {
      id == event.target.id;
    });
  }
});

let price = document.getElementById("price");
price.addEventListener("blur", function (event) {
  if (event.target.value == "") {
    document.getElementById("price_error").textContent =
      "El precio debe estar completo";
  } else {
    document.getElementById("price_error").textContent = "";
    errors = errors.filter((id) => {
      id == event.target.id;
    });
  }
});

let amount = document.getElementById("amount");
amount.addEventListener("blur", function (event) {
  if (event.target.value == "") {
    document.getElementById("amount_error").textContent =
      "La cantidad debe estar completa";
  } else {
    document.getElementById("amount_error").textContent = "";
    errors = errors.filter((id) => {
      id == event.target.id;
    });
  }
});

let sinopsis = document.getElementById("sinopsis");
sinopsis.addEventListener("blur", function (event) {
  if (event.target.value == "") {
    document.getElementById("sinopsis_error").textContent =
      "La sinopsis debe estar completa";
  } else {
    document.getElementById("sinopsis_error").textContent = "";
    errors = errors.filter((id) => {
      id == event.target.id;
    });
  }
});

let user_form = document.getElementById("product_form");

user_form.addEventListener("submit", function (event) {
  event.preventDefault();
  if (title.value == "") {
    document.getElementById("title_error").textContent =
      "El nombre del libro debe estar completo";
    errors.push(title.id);
  }
  if (isbn.value == "") {
    document.getElementById("isbn_error").textContent =
      "El isbn debe estar completo";
    errors.push(isbn.id);
  }
  if (price.value == "") {
    document.getElementById("price_error").textContent =
      "El precio debe estar completo";
    errors.push(price.id);
  }
  if (amount.value == "") {
    console.log(amount.value);
    document.getElementById("amount_error").textContent =
      "La cantidad debe estar completa";
    errors.push(amount.id);
  }
  if (sinopsis.value == "") {
    document.getElementById("sinopsis_error").textContent =
      "La sinopsis debe estar completa";
    errors.push(sinopsis.id);
  }

  if (errors.length == 0) {
    user_form.submit();
  }
});

let submit_button = document.getElementById("submit_button");
submit_button.addEventListener("mouseup", function (event) {
  submit_button.blur();
});
