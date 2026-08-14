const year = document.getElementById("year");
if (year) {
  year.textContent = String(new Date().getFullYear());
}

const nav = document.querySelector(".nav");
const toggle = document.querySelector(".nav__toggle");
if (nav && toggle) {
  toggle.addEventListener("click", () => {
    const open = nav.classList.toggle("is-open");
    toggle.setAttribute("aria-expanded", String(open));
  });

  nav.querySelectorAll(".nav__links a").forEach((link) => {
    link.addEventListener("click", () => {
      nav.classList.remove("is-open");
      toggle.setAttribute("aria-expanded", "false");
    });
  });
}

const revealItems = document.querySelectorAll(".reveal");
if ("IntersectionObserver" in window && revealItems.length) {
  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      }
    },
    { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
  );
  revealItems.forEach((item) => observer.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add("is-visible"));
}

const lightbox = document.getElementById("shot-lightbox");
const lightboxImg = lightbox?.querySelector(".lightbox__img");
const lightboxTitle = lightbox?.querySelector("#lightbox-title");
const lightboxDetail = lightbox?.querySelector(".lightbox__detail");
const lightboxClose = lightbox?.querySelector(".lightbox__close");
const lightboxStage = lightbox?.querySelector(".lightbox__stage");
let lightboxLastFocus = null;

if (lightbox && lightboxImg && lightboxTitle && lightboxDetail && lightboxClose) {
  const closeLightbox = () => {
    lightbox.hidden = true;
    document.body.classList.remove("lightbox-open");
    if (lightboxLastFocus && typeof lightboxLastFocus.focus === "function") {
      lightboxLastFocus.focus();
    }
    lightboxLastFocus = null;
  };

  const openShot = (button) => {
    const img = button.querySelector(".phone__screen");
    const figure = button.closest(".shot");
    const caption = figure?.querySelector("figcaption");
    if (!img) return;

    lightboxImg.src = img.currentSrc || img.src;
    lightboxImg.alt = img.alt || "";
    lightboxTitle.textContent = caption?.querySelector("strong")?.textContent || "";
    lightboxDetail.textContent = caption?.querySelector("span")?.textContent || "";

    lightboxLastFocus = document.activeElement;
    lightbox.hidden = false;
    document.body.classList.add("lightbox-open");
    lightboxClose.focus();
  };

  document.querySelectorAll(".shot__zoom").forEach((button) => {
    button.addEventListener("click", () => openShot(button));
  });

  lightboxClose.addEventListener("click", closeLightbox);

  lightbox.addEventListener("click", (event) => {
    if (event.target === lightbox) {
      closeLightbox();
    }
  });

  lightboxStage?.addEventListener("click", (event) => {
    event.stopPropagation();
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && !lightbox.hidden) {
      closeLightbox();
    }
  });
}
