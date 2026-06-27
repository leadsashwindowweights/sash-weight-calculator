/*
 * Sash Weight Calculator
 * Estimates the lead sash weight needed to balance a box sash window.
 *
 * Model
 * -----
 *   sashArea (m²)  = width(mm)/1000 × height(mm)/1000
 *   glassWeight    = glass(kg/m²) × sashArea × GLASS_COVERAGE
 *   timberWeight   = timber(kg/m²) × sashArea
 *   totalSash      = glassWeight + timberWeight
 *   eachWeight     = totalSash / 2          (two weights, one per side)
 *
 * The pair of counterweights together roughly equals the sash weight, so the
 * lead you buy ≈ totalSash. Everything runs in the browser; there is no
 * tracking, no network access and no dependencies.
 */
(function () {
  "use strict";

  var GLASS_COVERAGE = 0.88; // glass typically fills ~88% of the sash opening
  var KG_TO_LB = 2.20462;

  var $ = function (id) { return document.getElementById(id); };

  var els = {
    w: $("w"), h: $("h"),
    glass: $("glass"), frame: $("frame"),
    glassCustom: $("glassCustom"), frameCustom: $("frameCustom"),
    glassCustomWrap: $("glassCustomWrap"), frameCustomWrap: $("frameCustomWrap"),
    price: $("price"),
    perSideKg: $("perSideKg"), perSideLb: $("perSideLb"),
    totalKg: $("totalKg"), totalLb: $("totalLb"),
    costOut: $("costOut")
  };

  function num(el, fallback) {
    var v = parseFloat(el && el.value);
    return isFinite(v) && v >= 0 ? v : fallback;
  }

  function glassPerM2() {
    return els.glass.value === "custom" ? num(els.glassCustom, 0) : num(els.glass, 0);
  }
  function framePerM2() {
    return els.frame.value === "custom" ? num(els.frameCustom, 0) : num(els.frame, 0);
  }

  function fmt(kg) {
    if (!isFinite(kg) || kg <= 0) return "—";
    return (kg < 10 ? kg.toFixed(2) : kg.toFixed(1));
  }
  function lb(kg) {
    if (!isFinite(kg) || kg <= 0) return "—";
    return "≈ " + (kg * KG_TO_LB).toFixed(1) + " lb";
  }

  function syncCustomFields() {
    els.glassCustomWrap.classList.toggle("hidden", els.glass.value !== "custom");
    els.frameCustomWrap.classList.toggle("hidden", els.frame.value !== "custom");
  }

  function calculate() {
    var w = num(els.w, 0), h = num(els.h, 0);
    var area = (w / 1000) * (h / 1000); // m²

    var glass = glassPerM2() * area * GLASS_COVERAGE;
    var timber = framePerM2() * area;
    var total = glass + timber;
    var each = total / 2;

    els.totalKg.textContent = fmt(total);
    els.totalLb.textContent = lb(total);
    els.perSideKg.textContent = fmt(each);
    els.perSideLb.textContent = lb(each);

    var price = num(els.price, 0);
    els.costOut.textContent = (total > 0 && price > 0)
      ? "£" + (total * price).toFixed(2)
      : "—";
  }

  function onChange() {
    syncCustomFields();
    calculate();
  }

  // Recalculate on any input/change.
  document.addEventListener("input", onChange);
  document.addEventListener("change", onChange);

  // Initial render.
  onChange();
})();
