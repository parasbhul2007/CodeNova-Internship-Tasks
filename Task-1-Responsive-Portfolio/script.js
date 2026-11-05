const menu = document.querySelector(".menu"),
  links = document.querySelector("#links");
menu.addEventListener("click", () => {
  const open = links.classList.toggle("open");
  menu.setAttribute("aria-expanded", String(open));
  menu.setAttribute(
    "aria-label",
    open ? "Close navigation" : "Open navigation",
  );
});
links.querySelectorAll("a").forEach((a) =>
  a.addEventListener("click", () => {
    links.classList.remove("open");
    menu.setAttribute("aria-expanded", "false");
  }),
);
const theme = document.querySelector("#theme");
if (localStorage.getItem("portfolio-theme") === "dark")
  document.documentElement.dataset.theme = "dark";
theme.addEventListener("click", () => {
  const dark = document.documentElement.dataset.theme !== "dark";
  if (dark) document.documentElement.dataset.theme = "dark";
  else delete document.documentElement.dataset.theme;
  localStorage.setItem("portfolio-theme", dark ? "dark" : "light");
});
document.querySelector("#year").textContent = new Date().getFullYear();
document.querySelector("#contact-form").addEventListener("submit", (e) => {
  e.preventDefault();
  const f = e.currentTarget,
    recipient = "YOUR_EMAIL@example.com";
  if (recipient.startsWith("YOUR_")) {
    document.querySelector("#status").textContent =
      "Replace YOUR_EMAIL@example.com in js/main.js with your email address.";
    return;
  }
  const subject = encodeURIComponent("Portfolio message from " + f.name.value),
    body = encodeURIComponent(f.message.value + "\nFrom: " + f.email.value);
  location.href = `mailto:${recipient}?subject=${subject}&body=${body}`;
});
