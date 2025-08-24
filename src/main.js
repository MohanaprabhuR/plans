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

function footerToggle() {
  const headers = document.querySelectorAll(".accordion-header");

  headers.forEach((header) => {
    const currentUl = header.nextElementSibling;
    const currentIcon = header.querySelector(".accordion-icon");

    // remove old event listeners (important on resize)
    header.replaceWith(header.cloneNode(true));
  });

  // re-select after cloning to reset event handlers
  const newHeaders = document.querySelectorAll(".accordion-header");

  newHeaders.forEach((header) => {
    const currentUl = header.nextElementSibling;
    const currentIcon = header.querySelector(".accordion-icon");

    if (window.innerWidth <= 767) {
      // mobile accordion
      header.addEventListener("click", () => {
        // close all other sections
        document.querySelectorAll(".accordion-content").forEach((ul) => {
          if (ul !== currentUl) {
            ul.style.height = ul.scrollHeight + "px";
            requestAnimationFrame(() => {
              ul.style.height = "0px";
              ul.style.opacity = "0";
            });
            ul.classList.remove("open");
          }
        });

        document.querySelectorAll(".accordion-icon").forEach((icon) => {
          if (icon !== currentIcon) {
            icon.classList.remove("rotate-180");
          }
        });

        // toggle current
        if (currentUl.classList.contains("open")) {
          currentUl.style.height = currentUl.scrollHeight + "px";
          requestAnimationFrame(() => {
            currentUl.style.height = "0px";
            currentUl.style.opacity = "0";
          });
          currentUl.classList.remove("open");
          currentIcon?.classList.remove("rotate-180");
        } else {
          currentUl.style.height = currentUl.scrollHeight + "px";
          currentUl.style.opacity = "1";
          currentUl.addEventListener(
            "transitionend",
            () => {
              currentUl.style.height = "auto";
            },
            { once: true }
          );
          currentUl.classList.add("open");
          currentIcon?.classList.add("rotate-180");
        }
      });
    } else {
      // desktop: keep sections always open
      currentUl.style.height = "auto";
      currentUl.style.opacity = "1";
      currentUl.classList.add("open");
      currentIcon?.classList.remove("rotate-180");
    }
  });
}

// run on load
footerToggle();

// re-run on resize
window.addEventListener("resize", footerToggle);
