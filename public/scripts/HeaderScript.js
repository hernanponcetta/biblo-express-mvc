document.addEventListener("load", function () {});

headerContainer = document.getElementById("header_container");
genresLink = document.getElementById("genres_link");
genresArrow = document.getElementById("genres_arrow");
genresBox = document.getElementById("genres_box");

genresLink.addEventListener("click", function (event) {
  event.preventDefault();
});

genresLink.addEventListener("mouseenter", (e) => {
  genresArrow.classList.add("-rotate-180");
  genresBox.classList.remove("hidden");
});

genresBox.addEventListener("mouseenter", (e) => {
  genresArrow.classList.add("-rotate-180");
  genresBox.classList.remove("hidden");
});

genresBox.addEventListener("mouseleave", (e) => {
  genresArrow.classList.remove("-rotate-180");
  genresBox.classList.add("hidden");
});

headerContainer.addEventListener("mouseleave", (e) => {
  genresArrow.classList.remove("-rotate-180");
  genresBox.classList.add("hidden");
});
