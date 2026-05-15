const body = document.body;
const menuToggle = document.querySelector("[data-menu-toggle]");
const nav = document.querySelector("[data-nav]");
const navLinks = document.querySelectorAll("[data-nav-link]");
const yearElements = document.querySelectorAll("[data-year]");
const contactForm = document.querySelector("[data-contact-form]");
const formMessage = document.querySelector("[data-form-message]");

const normalizePath = (path) => {
  const fileName = path.split("/").pop() || "index.html";
  return fileName === "" ? "index.html" : fileName;
};

const currentPage = normalizePath(window.location.pathname);

navLinks.forEach((link) => {
  const linkPage = normalizePath(link.getAttribute("href"));

  if (linkPage === currentPage) {
    link.classList.add("is-active");
    link.setAttribute("aria-current", "page");
  }

  link.addEventListener("click", () => {
    nav?.classList.remove("is-open");
    body.classList.remove("menu-open");
    menuToggle?.setAttribute("aria-expanded", "false");
  });
});

menuToggle?.addEventListener("click", () => {
  const isOpen = nav?.classList.toggle("is-open") ?? false;
  body.classList.toggle("menu-open", isOpen);
  menuToggle.setAttribute("aria-expanded", String(isOpen));
});

yearElements.forEach((element) => {
  element.textContent = String(new Date().getFullYear());
});

contactForm?.addEventListener("submit", (event) => {
  event.preventDefault();
  const formData = new FormData(contactForm);
  const name = String(formData.get("nome") || "").trim();

  if (formMessage) {
    formMessage.textContent = name
      ? `${name}, sua mensagem foi recebida. Em breve retornaremos com a confirmacao da reserva.`
      : "Sua mensagem foi recebida. Em breve retornaremos com a confirmacao da reserva.";
  }

  contactForm.reset();
});
