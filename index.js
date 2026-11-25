"use strict";

SITE.applyHeader();

const encodedMessage = encodeURIComponent(
  PHARMACY.prescriptionMsg || "السلام عليكم، أود طلب علاج أو إرسال روشتة."
);

const waNumber = SITE.toWaNumber(PHARMACY.whatsapp);

document.getElementById("rxBtn").href =
  `https://wa.me/${waNumber}?text=${encodedMessage}`;
document.getElementById("quickWa").href = `https://wa.me/${waNumber}`;
document.getElementById("quickCall").href = `tel:${SITE.toE164(PHARMACY.phone)}`;
document.getElementById("quickMap").href = PHARMACY.mapsUrl;
