window.addEventListener("load", function () {
  const queryParamsString = window.location.search.substr(1);
  if (queryParamsString.includes("updated")) {
    window.location.replace("/products");
  }
});
