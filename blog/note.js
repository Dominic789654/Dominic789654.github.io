(function () {
  var root = document.documentElement;
  var btn = document.getElementById("theme");

  function label(theme) {
    var text = theme === "dark" ? "Switch to light mode" : "Switch to dark mode";
    if (!btn) return;
    btn.setAttribute("aria-label", text);
    btn.setAttribute("title", text);
  }

  function apply(theme, persist) {
    root.dataset.theme = theme;
    root.classList.toggle("dark", theme === "dark");
    if (persist) {
      try { localStorage.setItem("theme", theme); } catch (e) { /* private mode */ }
    }
    label(theme);
  }

  label(root.dataset.theme === "dark" ? "dark" : "light");

  if (btn) {
    btn.addEventListener("click", function () {
      apply(root.dataset.theme === "dark" ? "light" : "dark", true);
    });
  }

  var bar = document.getElementById("read-bar");
  function onScroll() {
    if (!bar) return;
    var h = document.documentElement.scrollHeight - window.innerHeight;
    var p = h > 0 ? (window.scrollY / h) * 100 : 0;
    bar.style.width = Math.min(100, Math.max(0, p)) + "%";
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", onScroll);
  onScroll();

  var tocLinks = Array.prototype.slice.call(document.querySelectorAll(".toc a"));
  var sections = tocLinks
    .map(function (a) { return document.querySelector(a.getAttribute("href")); })
    .filter(Boolean);

  if ("IntersectionObserver" in window && sections.length) {
    var current = null;
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) current = entry.target.id;
      });
      if (!current) return;
      tocLinks.forEach(function (a) {
        var on = a.getAttribute("href") === "#" + current;
        a.classList.toggle("is-active", on);
        if (on) a.setAttribute("aria-current", "location");
        else a.removeAttribute("aria-current");
      });
    }, { rootMargin: "-18% 0px -68% 0px", threshold: [0, 1] });
    sections.forEach(function (section) { io.observe(section); });
  }
})();

(function () {
  var images = document.querySelectorAll("figure.fig img");
  Array.prototype.forEach.call(images, function (img) {
    var src = img.getAttribute("src");
    if (!src) return;
    fetch(src).then(function (res) {
      if (!res.ok) throw new Error("figure");
      return res.text();
    }).then(function (text) {
      var parsed = new DOMParser().parseFromString(text, "image/svg+xml");
      var svg = parsed.querySelector("svg");
      if (!svg || parsed.querySelector("parsererror")) return;
      svg.setAttribute("role", "img");
      if (img.alt) svg.setAttribute("aria-label", img.alt);
      svg.classList.add("fig-svg");
      img.replaceWith(document.importNode(svg, true));
    }).catch(function () { /* keep the file image */ });
  });
})();
