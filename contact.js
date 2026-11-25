"use strict";

SITE.applyHeader();
SITE.renderWhatsappTopics();

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

function foldVcardLine(line) {
  const maxLen = 74;
  if (line.length <= maxLen) return line;
  const parts = [];
  for (let i = 0; i < line.length; i += maxLen) {
    parts.push(i === 0 ? line.slice(i, i + maxLen) : ` ${line.slice(i, i + maxLen)}`);
  }
  return parts.join("\r\n");
}

let cachedPhotoLine = "";
const photoReadyPromise = (async function preloadVcardPhoto() {
  try {
    const response = await fetch("vcard-photo.jpg");
    if (!response.ok) return "";
    const bytes = new Uint8Array(await response.arrayBuffer());
    let binary = "";
    for (let i = 0; i < bytes.length; i += 1) {
      binary += String.fromCharCode(bytes[i]);
    }
    const base64 = window.btoa(binary);
    cachedPhotoLine = foldVcardLine(`PHOTO;ENCODING=b;TYPE=JPEG:${base64}`);
    return cachedPhotoLine;
  } catch (_err) {
    return "";
  }
})();

async function saveContact() {
  const photoLine = cachedPhotoLine || (await photoReadyPromise);
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
    photoLine,
    "NOTE:صحتك تهمنا دائمًا",
    "END:VCARD"
  ]
    .filter(Boolean)
    .join("\r\n");

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
