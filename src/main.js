document.querySelectorAll(".accordion-btn").forEach((btn) => {
  btn.addEventListener("click", () => {
    const item = btn.parentElement;
    const content = item.querySelector(".accordion-content");
    const icon = btn.querySelector(".accordion-icon");

    // Close all others (classic accordion)
    document.querySelectorAll(".accordion-content").forEach((el) => {
      if (el !== content) {
        el.classList.remove("grid-rows-[1fr]", "open");
        el.classList.add("grid-rows-[0fr]");
        el.previousElementSibling
          .querySelector(".accordion-icon")
          ?.classList.remove("rotate-180");
      }
    });

    // Toggle clicked one
    const isOpen = content.classList.contains("grid-rows-[1fr]");

    if (isOpen) {
      // closing
      content.classList.remove("grid-rows-[1fr]", "open");
      content.classList.add("grid-rows-[0fr]");
      icon.classList.remove("rotate-180");
    } else {
      // opening
      content.classList.remove("grid-rows-[0fr]");
      content.classList.add("grid-rows-[1fr]", "open");
      icon.classList.add("rotate-180");
    }
  });
});

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

  // Remove overflow: hidden on page unload (navigation)
  window.addEventListener("beforeunload", function () {
    body.style.overflow = "";
  });

  // Remove overflow: hidden if the menu is closed when leaving the page
  document.addEventListener("visibilitychange", function () {
    if (document.hidden) {
      body.style.overflow = "";
    }
  });

  // Handle jump links (anchor tags)
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
