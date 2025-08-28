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

function scrollAnimation() {
  const items = document.querySelectorAll(".animate-item");

  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const index = [...items].indexOf(entry.target);
          entry.target.style.transitionDelay = `${index * 0.1}s`;
          entry.target.classList.add("show");
          obs.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.2 },
  );

  items.forEach((item) => observer.observe(item));
}

scrollAnimation();

const sections = document.querySelectorAll("h3[id]");
const navLinks = document.querySelectorAll(".list-item a");

// Highlight on scroll
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        navLinks.forEach((link) => {
          link.classList.remove(
            "text-orange-200",
            "font-variation-settings:var(--font-var-600)]",
          );
          if (link.getAttribute("href") === `#${entry.target.id}`) {
            link.classList.add(
              "text-orange-200",
              "font-variation-settings:var(--font-var-600)]",
            );
          }
        });
      }
    });
  },
  { threshold: 0.5 }, // adjust if needed
);

sections.forEach((section) => observer.observe(section));

// Smooth scroll with 100px offset
navLinks.forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault(); // prevent default jump

    // remove old highlight
    navLinks.forEach((lnk) =>
      lnk.classList.remove(
        "text-orange-200",
        "font-variation-settings:var(--font-var-600)]",
      ),
    );

    // add highlight to clicked link
    e.currentTarget.classList.add(
      "text-orange-200",
      "font-variation-settings:var(--font-var-600)]",
    );

    // get target section
    const targetId = link.getAttribute("href").substring(1);
    const target = document.getElementById(targetId);

    if (target) {
      const yOffset = -100; // offset from top
      const y =
        target.getBoundingClientRect().top + window.pageYOffset + yOffset;

      window.scrollTo({ top: y, behavior: "smooth" });
    }
  });
});
