"use strict";

const SITE = {
  toE164(rawNumber, countryCode = "20") {
    const cleaned = String(rawNumber || "").trim().replace(/[\s()-]/g, "");
    if (!cleaned) return "";
    if (cleaned.startsWith("+")) return `+${cleaned.slice(1).replace(/\D/g, "")}`;
    const digits = cleaned.replace(/\D/g, "");
    if (!digits) return "";
    if (digits.startsWith("00")) return `+${digits.slice(2)}`;
    if (digits.startsWith("0")) return `+${countryCode}${digits.slice(1)}`;
    if (digits.startsWith(countryCode)) return `+${digits}`;
    return `+${countryCode}${digits}`;
  },

  toWaNumber(rawNumber, countryCode = "20") {
    return this.toE164(rawNumber, countryCode).replace(/^\+/, "");
  },

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
