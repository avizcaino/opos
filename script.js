// Default theme
import "@splidejs/splide/css";
// or other themes
import "@splidejs/splide/css/skyblue";
// import "@splidejs/splide/css/sea-green";
// or only core styles
import Splide from "@splidejs/splide";
import "@splidejs/splide/css/core";
import { EventInterface } from "@splidejs/splide";

document.addEventListener("DOMContentLoaded", function () {
  const main = new Splide("#main-carousel", {
    type: "fade",
    rewind: true,
    pagination: false,
    arrows: false,
  });

  const thumbnails = new Splide("#thumbnail-carousel", {
    fixedWidth: 100,
    fixedHeight: 60,
    gap: 5,
    rewind: true,
    pagination: false,
    isNavigation: true,
    breakpoints: {
      300: {
        fixedWidth: 60,
        fixedHeight: 44,
      },
    },
  });

  const bar = main.root.querySelector(".my-carousel-progress-bar");

  // Updates the bar width whenever the carousel moves:
  main.on("mounted move", function () {
    var end = main.Components.Controller.getEnd() + 1;
    var rate = Math.min((main.index + 1) / end, 1);
    bar.style.width = String(100 * rate) + "%";
  });

  main.sync(thumbnails);
  main.mount();
  thumbnails.mount();
});

function enlargeImage(ev) {
  console.log(ev.currentTarget);
  const dialog = document.querySelector("dialog");
  const dialogImg = dialog.querySelector("img");
  dialogImg.src = ev.currentTarget.src;
  const dialogOverlay = document.createElement("div");
  dialogOverlay.classList.add("dialogOverlay");
  document.body.appendChild(dialogOverlay);
  dialogOverlay.style.display = "block";

  dialog.addEventListener("click", function (event) {
    if (event.target !== dialogImg) {
      dialog.close();
      dialogOverlay.style.display = "none"; // Hide the overlay
    }
  });

  dialog.showModal();
}

Array.from(
  document.querySelector("#main-carousel").querySelectorAll(".splide__slide")
)?.map((element) => element.addEventListener("click", enlargeImage));
