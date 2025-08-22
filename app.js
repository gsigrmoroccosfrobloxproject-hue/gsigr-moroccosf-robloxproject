// Interactions de base pour la landing
const nav = document.querySelector(".site-nav");
const burger = document.querySelector(".hamburger");

burger?.addEventListener("click", () => {
  const expanded = burger.getAttribute("aria-expanded") === "true";
  burger.setAttribute("aria-expanded", String(!expanded));
  nav?.classList.toggle("show");
});

// Scrollspy simple
const links = document.querySelectorAll(".site-nav a");
const sections = [...links].map((a) =>
  document.querySelector(a.getAttribute("href"))
);

const onScroll = () => {
  const fromTop = window.scrollY + 90;
  sections.forEach((sec, i) => {
    if (!sec) return;
    const link = links[i];
    const top = sec.offsetTop;
    const bottom = top + sec.offsetHeight;
    if (fromTop >= top && fromTop < bottom) {
      link.classList.add("active");
    } else {
      link.classList.remove("active");
    }
  });
};
window.addEventListener("scroll", onScroll);
onScroll();

// Smooth scroll
links.forEach((a) =>
  a.addEventListener("click", (e) => {
    const href = a.getAttribute("href") || "";
    if (href.startsWith("#")) {
      e.preventDefault();
      document
        .querySelector(href)
        ?.scrollIntoView({ behavior: "smooth", block: "start" });
      nav?.classList.remove("show");
      burger?.setAttribute("aria-expanded", "false");
    }
  })
);

// Lightbox pour la galerie (placeholder)
const dlg = document.getElementById("lightbox");
const dlgTitle = document.querySelector(".lightbox-title");
const dlgImg = document.querySelector(".lightbox-img");
document.querySelectorAll(".gal").forEach((btn) => {
  btn.addEventListener("click", () => {
    dlgTitle.textContent = btn.dataset.title || "Aperçu";
    if (typeof dlg.showModal === "function") {
      dlg.showModal();
    } else {
      dlg.setAttribute("open", "");
    }
  });
});
document
  .querySelector("#lightbox .close")
  ?.addEventListener("click", () => dlg.close());
