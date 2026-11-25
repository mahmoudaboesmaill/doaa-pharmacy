"use strict";

SITE.applyHeader();

document.getElementById("addressText").textContent = PHARMACY.address;
document.getElementById("phoneLabel").textContent = PHARMACY.phone;
document.getElementById("phoneTile").href = `tel:${SITE.toE164(PHARMACY.phone)}`;
document.getElementById("mapsTile").href = PHARMACY.mapsUrl;
document.getElementById("directionsBtn").href = PHARMACY.mapsUrl;

const waNumber = SITE.toWaNumber(PHARMACY.whatsapp);
const encodedMessage = encodeURIComponent(
  PHARMACY.prescriptionMsg || "السلام عليكم، أود طلب علاج أو إرسال روشتة."
);
document.getElementById("rxBtn").href =
  `https://wa.me/${waNumber}?text=${encodedMessage}`;
document.getElementById("waTile").href = `https://wa.me/${waNumber}`;

const facebookLink = document.getElementById("fbTile");
if (PHARMACY.facebookUrl) {
  facebookLink.href = PHARMACY.facebookUrl;
} else {
  facebookLink.hidden = true;
}

const instagramLink = document.getElementById("igTile");
if (PHARMACY.instagramUrl) {
  instagramLink.href = PHARMACY.instagramUrl;
} else {
  instagramLink.hidden = true;
}

function saveContact() {
  const vcard = [
    "BEGIN:VCARD",
    "VERSION:3.0",
    `N:;${PHARMACY.name};;;`,
    `FN:${PHARMACY.name}`,
    `ORG:${PHARMACY.name}`,
    "TITLE:صيدلية",
    `TEL;TYPE=WORK,VOICE:${SITE.toE164(PHARMACY.phone)}`,
    `TEL;TYPE=CELL,VOICE,MSG:${SITE.toE164(PHARMACY.whatsapp)}`,
    `ADR;TYPE=WORK:;;${PHARMACY.address};;;;`,
    `URL:${PHARMACY.mapsUrl}`,
    "NOTE:صحتك تهمنا دائمًا",
    "END:VCARD"
  ].join("\r\n");

  const blob = new Blob([vcard], { type: "text/vcard;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = "صيدلية د. دعاء كمال.vcf";
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
}

document.getElementById("saveContactBtn").addEventListener("click", saveContact);
