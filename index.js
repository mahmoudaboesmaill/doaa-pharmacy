"use strict";

SITE.applyHeader();
SITE.renderWhatsappTopics();

const prescriptionMessage =
  PHARMACY.prescriptionMsg || "السلام عليكم، أود طلب علاج أو إرسال روشتة.";

SITE.configureWhatsappLink(document.getElementById("rxBtn"), prescriptionMessage);
SITE.configureWhatsappLink(document.getElementById("quickWa"));
document.getElementById("quickCall").href = `tel:${SITE.toE164(PHARMACY.phone)}`;
document.getElementById("quickMap").href = PHARMACY.mapsUrl;
