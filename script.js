const header = document.querySelector("[data-elevate]");
const menuToggle = document.querySelector("[data-menu-toggle]");
const leadForms = document.querySelectorAll("[data-lead-form]");
const revealItems = document.querySelectorAll(".reveal");

if (menuToggle && header) {
  menuToggle.addEventListener("click", () => {
    const isOpen = header.classList.toggle("menu-open");
    menuToggle.setAttribute("aria-expanded", String(isOpen));
  });

  header.querySelectorAll(".nav a").forEach((link) => {
    link.addEventListener("click", () => {
      header.classList.remove("menu-open");
      menuToggle.setAttribute("aria-expanded", "false");
    });
  });
}

leadForms.forEach((form) => {
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const success = form.querySelector(".form-success");
    const button = form.querySelector("button[type='submit']");

    if (button) {
      button.disabled = true;
      button.textContent = "Заявка принята";
    }

    if (success) {
      success.textContent = "Спасибо. Заявка принята, менеджер свяжется с вами.";
    }

    window.setTimeout(() => {
      if (button) {
        button.disabled = false;
        button.innerHTML = 'Оставить заявку <svg aria-hidden="true" viewBox="0 0 24 24"><path d="M5 12h14"></path><path d="m12 5 7 7-7 7"></path></svg>';
      }
      form.reset();
    }, 2600);
  });
});

if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.14 }
  );

  revealItems.forEach((item) => observer.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add("is-visible"));
}
