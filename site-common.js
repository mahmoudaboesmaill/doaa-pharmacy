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
    this.registerServiceWorker();
  },

  renderWhatsappTopics(containerId = "waTopicsBar") {
    const container = document.getElementById(containerId);
    if (!container || !Array.isArray(PHARMACY.whatsappTopics)) return;

    const waNumber = this.toWaNumber(PHARMACY.whatsapp);
    const fragment = document.createDocumentFragment();

    PHARMACY.whatsappTopics.forEach((topic) => {
      const link = document.createElement("a");
      link.className = "wa-topic-pill";
      link.href = `https://wa.me/${waNumber}?text=${encodeURIComponent(topic.message)}`;
      link.target = "_blank";
      link.rel = "noopener noreferrer";
      if (topic.analyticsEvent) {
        link.dataset.analyticsEvent = topic.analyticsEvent;
      }

      const iconSpan = document.createElement("span");
      iconSpan.setAttribute("aria-hidden", "true");
      iconSpan.textContent = topic.icon;

      const labelSpan = document.createElement("span");
      labelSpan.textContent = topic.label;

      link.append(iconSpan, labelSpan);
      fragment.appendChild(link);
    });

    container.replaceChildren(fragment);
  },

  registerServiceWorker() {
    if ("serviceWorker" in navigator && window.location.protocol.startsWith("http")) {
      window.addEventListener("load", () => {
        navigator.serviceWorker.register("sw.js").catch(() => {});
      });
    }
  }
};
