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
const lightboxCaption = lightbox?.querySelector(".lightbox__caption");

if (lightbox && lightboxImg && lightboxCaption) {
  const openShot = (button) => {
    const img = button.querySelector(".phone__screen");
    const figure = button.closest(".shot");
    const caption = figure?.querySelector("figcaption");
    if (!img) return;

    lightboxImg.src = img.currentSrc || img.src;
    lightboxImg.alt = img.alt || "";
    lightboxCaption.replaceChildren();
    if (caption) {
      const title = caption.querySelector("strong");
      const detail = caption.querySelector("span");
      if (title) {
        const strong = document.createElement("strong");
        strong.textContent = title.textContent || "";
        lightboxCaption.append(strong);
      }
      if (detail) {
        lightboxCaption.append(document.createTextNode(detail.textContent || ""));
      }
    }

    if (typeof lightbox.showModal === "function") {
      lightbox.showModal();
    } else {
      lightbox.setAttribute("open", "");
    }
  };

  document.querySelectorAll(".shot__zoom").forEach((button) => {
    button.addEventListener("click", () => openShot(button));
  });

  lightbox.addEventListener("click", (event) => {
    if (event.target === lightbox) {
      lightbox.close();
    }
  });
}
