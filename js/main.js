/* Sylvyn — mobile nav. Respects prefers-reduced-motion. */
(function () {
  var toggle = document.querySelector(".nav-toggle");
  var nav = document.getElementById("site-nav");
  if (!toggle || !nav) return;

  var MQ = window.matchMedia("(max-width: 880px)");

  function setOpen(open) {
    nav.classList.toggle("is-open", open);
    toggle.setAttribute("aria-expanded", open ? "true" : "false");
  }

  toggle.addEventListener("click", function () {
    setOpen(!nav.classList.contains("is-open"));
  });

  nav.querySelectorAll("a").forEach(function (link) {
    link.addEventListener("click", function () {
      setOpen(false);
    });
  });

  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") setOpen(false);
  });

  function onMq() {
    if (!MQ.matches) setOpen(false);
  }
  if (typeof MQ.addEventListener === "function") {
    MQ.addEventListener("change", onMq);
  } else if (typeof MQ.addListener === "function") {
    MQ.addListener(onMq);
  }
})();
