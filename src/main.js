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
