//FAQ Section

document.querySelectorAll(".accordion-btn").forEach((btn) => {
  btn.addEventListener("click", () => {
    const item = btn.parentElement;
    const content = item.querySelector(".accordion-content");
    const icon = btn.querySelector(".accordion-icon");
    document.querySelectorAll(".accordion-content").forEach((el) => {
      if (el !== content) {
        el.classList.remove("grid-rows-[1fr]", "open");
        el.classList.add("grid-rows-[0fr]");
        el.previousElementSibling
          .querySelector(".accordion-icon")
          ?.classList.remove("rotate-180");
      }
    });

    const isOpen = content.classList.contains("grid-rows-[1fr]");

    if (isOpen) {
      content.classList.remove("grid-rows-[1fr]", "open");
      content.classList.add("grid-rows-[0fr]");
      icon.classList.remove("rotate-180");
    } else {
      content.classList.remove("grid-rows-[0fr]");
      content.classList.add("grid-rows-[1fr]", "open");
      icon.classList.add("rotate-180");
    }
  });
});

//Add Class name to page scroll
const header = document.querySelector(".site-header");
window.addEventListener("scroll", () => {
  if (window.scrollY > 100) {
    header.classList.add("scrolled");
  } else {
    header.classList.remove("scrolled");
  }
});

//Toggle Menu
document.addEventListener("DOMContentLoaded", () => {
  const navbarToggler = document.querySelector(".navbar-toggler");
  const navbarCollapse = document.querySelector(".navbar-collapse");

  if (navbarToggler && navbarCollapse) {
    navbarToggler.addEventListener("click", function () {
      navbarCollapse.classList.toggle("nav-open");
      this.classList.toggle("collapsed");
    });
  }
});

function navToggle() {
  const navbarToggler = document.querySelector(".navbar-toggler");
  const siteHeader = document.querySelector(".site-header");
  const body = document.body;

  if (navbarToggler && siteHeader) {
    navbarToggler.addEventListener("click", function () {
      siteHeader.classList.toggle("menu-opened");
      body.style.overflow = siteHeader.classList.contains("menu-opened")
        ? "hidden"
        : "";
    });
  }
  window.addEventListener("beforeunload", function () {
    body.style.overflow = "";
  });
  document.addEventListener("visibilitychange", function () {
    if (document.hidden) {
      body.style.overflow = "";
    }
  });

  document.addEventListener("click", function (event) {
    const target = event.target.closest("a");
    if (
      target &&
      target.hash &&
      target.origin + target.pathname ===
        window.location.origin + window.location.pathname
    ) {
      setTimeout(() => {
        body.style.overflow = "";
        siteHeader.classList.remove("menu-opened");
      }, 100);
    }
  });
}

navToggle();
