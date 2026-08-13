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
    { threshold: 0.16, rootMargin: "0px 0px -6% 0px" }
  );
  revealItems.forEach((item) => observer.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add("is-visible"));
}

const tasteCopy = {
  atmospheric:
    "That’s The Atmospheric Collector — dusk tones and slow-burn side B deep cuts. Digli writes it from the records already on your shelf.",
  hopper:
    "That’s a crate hopper — jazz to soul to the 70s in one afternoon. Your Dig Profile keeps the jumps, not just the genres.",
  press:
    "That’s a first-press loyalist. Eras, labels, and the hunt show up in your DNA once the keepers land on Your Shelf.",
};

const reveal = document.querySelector(".taste__reveal");
document.querySelectorAll(".taste__pick").forEach((button) => {
  button.addEventListener("click", () => {
    document.querySelectorAll(".taste__pick").forEach((item) => {
      item.classList.remove("is-active");
      item.setAttribute("aria-pressed", "false");
    });
    button.classList.add("is-active");
    button.setAttribute("aria-pressed", "true");
    if (reveal) {
      reveal.hidden = false;
      reveal.classList.remove("is-in");
      reveal.textContent = tasteCopy[button.dataset.taste] || "";
      void reveal.offsetWidth;
      reveal.classList.add("is-in");
    }
  });
});
