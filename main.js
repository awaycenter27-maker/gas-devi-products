/* ============================================================
   Devi Gas Products - interactions
   - mobile nav
   - external links + email from content.js
   - rendered product / factory / group lists
   - enquiry form: client-side validation, states, mailto fallback
   - subtle one-time reveal on scroll
   ============================================================ */
(function () {
  "use strict";
  var D = window.DGP || {};

  /* ---------- helpers ---------- */
  function $(s, c) { return (c || document).querySelector(s); }
  function $all(s, c) { return Array.prototype.slice.call((c || document).querySelectorAll(s)); }
  function esc(t) {
    return String(t == null ? "" : t).replace(/[&<>"']/g, function (m) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[m];
    });
  }

  /* ---------- year ---------- */
  $all("[data-year]").forEach(function (el) { el.textContent = new Date().getFullYear(); });

  /* ---------- email links ---------- */
  $all("[data-email]").forEach(function (el) {
    if (!D.email) return;
    if (el.tagName === "A") { el.setAttribute("href", "mailto:" + D.email); }
    el.textContent = D.email;
  });

  /* ---------- external group links ---------- */
  // Any element with data-extlink="awayCenterUrl" (or hanumanUrl) becomes a
  // live link when the URL exists, or a disabled "Link to be added" when empty.
  $all("[data-extlink]").forEach(function (el) {
    var key = el.getAttribute("data-extlink");
    var url = D[key];
    if (url) {
      el.setAttribute("href", url);
      el.setAttribute("target", "_blank");
      el.setAttribute("rel", "noopener");
      el.removeAttribute("aria-disabled");
    } else {
      el.setAttribute("href", "#");
      el.setAttribute("aria-disabled", "true");
      el.classList.add("is-pending");
      el.addEventListener("click", function (e) { e.preventDefault(); });
      if (el.hasAttribute("data-pending-text")) {
        el.textContent = el.getAttribute("data-pending-text");
      }
    }
  });

  /* ---------- mobile nav ---------- */
  var nav = $(".nav");
  var toggle = $(".nav__toggle");
  if (nav && toggle) {
    toggle.addEventListener("click", function () {
      var open = nav.getAttribute("data-open") === "true";
      nav.setAttribute("data-open", String(!open));
      toggle.setAttribute("aria-expanded", String(!open));
    });
    $all(".nav__links a").forEach(function (a) {
      a.addEventListener("click", function () {
        nav.setAttribute("data-open", "false");
        toggle.setAttribute("aria-expanded", "false");
      });
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") { nav.setAttribute("data-open", "false"); toggle.setAttribute("aria-expanded", "false"); }
    });
  }

  /* ---------- render products ---------- */
  var pMount = $("[data-render='products']");
  if (pMount && D.products) {
    pMount.innerHTML = D.products.map(function (p) {
      var tagClass = p.status === "made" ? "tag--made" : "tag--supplied";
      return (
        '<article class="pcard reveal">' +
          '<span class="pcard__tag ' + tagClass + '">' + esc(p.statusLabel) + "</span>" +
          "<h3>" + esc(p.name) + "</h3>" +
          "<p>" + esc(p.summary) + "</p>" +
          '<div class="pcard__foot">' +
            '<a class="textlink" href="contact.html?product=' + encodeURIComponent(p.id) + '">Request a quote</a>' +
          "</div>" +
        "</article>"
      );
    }).join("");
  }

  /* ---------- render products (detailed, products page) ---------- */
  var pDetail = $("[data-render='products-detail']");
  if (pDetail && D.products) {
    pDetail.innerHTML = D.products.map(function (p) {
      var tagClass = p.status === "made" ? "tag--made" : "tag--supplied";
      return (
        '<article class="pcard reveal">' +
          '<span class="pcard__tag ' + tagClass + '">' + esc(p.statusLabel) + "</span>" +
          "<h3>" + esc(p.name) + "</h3>" +
          "<p>" + esc(p.summary) + " " + esc(p.detail) + "</p>" +
          '<div class="pcard__foot">' +
            '<a class="textlink" href="contact.html?product=' + encodeURIComponent(p.id) + '">Request a quote for ' + esc(p.name) + "</a>" +
          "</div>" +
        "</article>"
      );
    }).join("");
  }

  /* ---------- render factories (location cards, no per-site photos) ---------- */
  var fMount = $("[data-render='factories']");
  if (fMount && D.factories) {
    fMount.innerHTML = D.factories.map(function (f) {
      var lis = (f.points || []).map(function (pt) { return "<li>" + esc(pt) + "</li>"; }).join("");
      return (
        '<article class="factory-card reveal">' +
          '<span class="factory-card__loc">' + esc(f.region) + "</span>" +
          "<h3>" + esc(f.name) + "</h3>" +
          "<p>" + esc(f.blurb) + "</p>" +
          "<ul>" + lis + "</ul>" +
        "</article>"
      );
    }).join("");
  }

  /* ---------- render group companies ---------- */
  var gMount = $("[data-render='group']");
  if (gMount && D.group) {
    gMount.innerHTML = D.group.map(function (g) {
      var foot = "";
      if (g.linkKey) {
        foot =
          '<div class="gcard__foot">' +
            '<a class="textlink" data-extlink="' + esc(g.linkKey) + '" data-pending-text="Website link to be added" href="#">Visit website</a>' +
          "</div>";
      }
      var note = g.note ? '<span class="gcard__note">' + esc(g.note) + "</span>" : "";
      return (
        '<article class="gcard reveal">' +
          '<div class="gcard__top">' +
            '<span class="gcard__mark" aria-hidden="true">' + esc(g.mark) + "</span>" +
            "<h3>" + esc(g.name) + "</h3>" +
          "</div>" +
          "<p>" + esc(g.blurb) + "</p>" +
          note +
          foot +
        "</article>"
      );
    }).join("");
    // wire any freshly-rendered external links
    $all("[data-extlink]", gMount).forEach(function (el) {
      var key = el.getAttribute("data-extlink");
      var url = D[key];
      if (url) {
        el.setAttribute("href", url); el.setAttribute("target", "_blank"); el.setAttribute("rel", "noopener");
      } else {
        el.setAttribute("href", "#"); el.setAttribute("aria-disabled", "true"); el.classList.add("is-pending");
        if (el.hasAttribute("data-pending-text")) el.textContent = el.getAttribute("data-pending-text");
        el.addEventListener("click", function (e) { e.preventDefault(); });
      }
    });
  }

  function cameraIcon() {
    return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true"><path d="M3 8.5A1.5 1.5 0 0 1 4.5 7h2l1.2-1.6a1 1 0 0 1 .8-.4h3a1 1 0 0 1 .8.4L13.5 7h2A1.5 1.5 0 0 1 17 8.5v8A1.5 1.5 0 0 1 15.5 18h-11A1.5 1.5 0 0 1 3 16.5z" transform="translate(2 1)"/><circle cx="12" cy="12.5" r="3"/></svg>';
  }

  /* ---------- enquiry form ---------- */
  var form = $("#enquiry-form");
  if (form) {
    // product preselect from ?product=
    var params = new URLSearchParams(window.location.search);
    var preselect = params.get("product");
    var gasSelect = $("#gas", form);
    if (preselect && gasSelect) {
      var match = Array.prototype.some.call(gasSelect.options, function (o) { return o.value === preselect; });
      if (match) gasSelect.value = preselect;
    }

    var okAlert = $("#form-ok", form);
    var errAlert = $("#form-err", form);
    var submitBtn = $("#form-submit", form);
    var submitLabel = submitBtn ? submitBtn.querySelector(".label") : null;

    function setInvalid(field, show) {
      var input = $("#" + field, form);
      var errEl = $("#err-" + field, form);
      if (input) input.setAttribute("aria-invalid", show ? "true" : "false");
      if (errEl) errEl.classList.toggle("show", show);
    }

    function validate() {
      var ok = true;
      var required = ["name", "contact", "message"];
      required.forEach(function (f) {
        var el = $("#" + f, form);
        var val = el ? el.value.trim() : "";
        var bad = !val;
        if (f === "contact" && val) {
          // accept an email or a phone-like string
          var isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val);
          var isPhone = /^[+()\-\s0-9]{7,}$/.test(val);
          bad = !(isEmail || isPhone);
        }
        setInvalid(f, bad);
        if (bad) ok = false;
      });
      return ok;
    }

    // live clearing of errors
    ["name", "contact", "message"].forEach(function (f) {
      var el = $("#" + f, form);
      if (el) el.addEventListener("input", function () {
        if (el.getAttribute("aria-invalid") === "true") setInvalid(f, false);
      });
    });

    function buildMailto() {
      var get = function (id) { var e = $("#" + id, form); return e ? e.value.trim() : ""; };
      var lines = [
        "Name: " + get("name"),
        "Company: " + get("company"),
        "Contact (phone / email): " + get("contact"),
        "Gas required: " + (gasSelect ? gasSelect.options[gasSelect.selectedIndex].text : ""),
        "Quantity: " + get("quantity"),
        "Delivery location: " + get("location"),
        "",
        "Message:",
        get("message"),
      ];
      var subject = "Enquiry from " + (get("name") || "website") + (get("company") ? " (" + get("company") + ")" : "");
      var body = lines.join("\n");
      return "mailto:" + (D.email || "") + "?subject=" + encodeURIComponent(subject) + "&body=" + encodeURIComponent(body);
    }

    var busy = false;
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      if (busy) return;
      okAlert.classList.remove("show");
      errAlert.classList.remove("show");

      // honeypot: if filled, silently treat as spam and stop
      var hp = $("#company_url", form);
      if (hp && hp.value) { return; }

      if (!validate()) {
        errAlert.querySelector(".alert__text").innerHTML =
          "<b>Please check the highlighted fields.</b>Add your name, a phone number or email we can reply to, and a short message.";
        errAlert.classList.add("show");
        var firstBad = form.querySelector('[aria-invalid="true"]');
        if (firstBad) firstBad.focus();
        return;
      }

      // No backend yet: show loading, then open the user's email client
      // pre-filled, and confirm. This is the interface-only flow.
      busy = true;
      if (submitBtn) {
        submitBtn.setAttribute("disabled", "true");
        if (submitLabel) submitLabel.textContent = "Preparing your enquiry";
        submitBtn.insertAdjacentHTML("afterbegin", '<span class="spinner" aria-hidden="true"></span>');
      }

      setTimeout(function () {
        try {
          window.location.href = buildMailto();
          okAlert.querySelector(".alert__text").innerHTML =
            "<b>Your enquiry is ready to send.</b>We have opened your email app with the details filled in. Send that email and we will get back to you. If nothing opened, email us at " +
            (D.email ? '<a class="textlink" href="mailto:' + esc(D.email) + '">' + esc(D.email) + "</a>" : "our address") + ".";
          okAlert.classList.add("show");
          okAlert.setAttribute("tabindex", "-1");
          okAlert.focus();
        } catch (err) {
          errAlert.querySelector(".alert__text").innerHTML =
            "<b>Something went wrong preparing your enquiry.</b>Please email us directly at " +
            (D.email ? '<a class="textlink" href="mailto:' + esc(D.email) + '">' + esc(D.email) + "</a>" : "our address") +
            ". <button type='button' class='alert__retry' id='retry'>Try again</button>";
          errAlert.classList.add("show");
          var retry = $("#retry", errAlert);
          if (retry) retry.addEventListener("click", function () { errAlert.classList.remove("show"); });
        } finally {
          busy = false;
          if (submitBtn) {
            submitBtn.removeAttribute("disabled");
            var sp = submitBtn.querySelector(".spinner");
            if (sp) sp.remove();
            if (submitLabel) submitLabel.textContent = "Send enquiry";
          }
        }
      }, 650);
    });
  }

  /* ---------- one-time reveal ---------- */
  var reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var reveals = $all(".reveal");
  if (reduce || !("IntersectionObserver" in window)) {
    reveals.forEach(function (el) { el.classList.add("in"); });
  } else {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add("in"); io.unobserve(en.target); }
      });
    }, { rootMargin: "0px 0px -8% 0px", threshold: 0.12 });
    reveals.forEach(function (el) { io.observe(el); });
    // observe late-rendered reveals too
    setTimeout(function () { $all(".reveal:not(.in)").forEach(function (el) { io.observe(el); }); }, 60);
  }
})();
