"use strict";

const SITE = {
  getStatusText() {
    const hours = PHARMACY.hours;

    if (hours && hours.mode === "always-open") {
      return hours.openLabel || "مفتوح الآن • في خدمتكم 24 ساعة";
    }

    return "تواصل معنا للتأكد من مواعيد العمل";
  },

  applyHeader() {
    const name = document.getElementById("pharmacyName");
    const tagline = document.getElementById("pharmacyTagline");
    const status = document.getElementById("pharmacyStatus");

    if (name) name.textContent = PHARMACY.name;
    if (tagline) tagline.textContent = PHARMACY.tagline;
    if (status) status.textContent = this.getStatusText();
  }
};
