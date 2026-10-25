"use strict";

(function initializeAnalytics() {
  const measurementId = "G-RL9CV4SLNX";

  window.dataLayer = window.dataLayer || [];
  window.gtag =
    window.gtag ||
    function gtag() {
      window.dataLayer.push(arguments);
    };

  window.gtag("js", new Date());
  window.gtag("config", measurementId, {
    allow_google_signals: false,
    allow_ad_personalization_signals: false
  });

  document.addEventListener(
    "click",
    (event) => {
      const trackedElement = event.target.closest("[data-analytics-event]");
      if (!trackedElement) return;

      const eventName = trackedElement.dataset.analyticsEvent;
      if (!/^[a-z][a-z0-9_]{0,39}$/.test(eventName)) return;

      // لا نرسل النص أو الرابط حتى لا تنتقل أرقام الهاتف أو بيانات الدفع.
      window.gtag("event", eventName);
    },
    { capture: true }
  );
})();
