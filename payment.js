"use strict";

SITE.applyHeader();

const paymentMethods = [
  {
    data: PHARMACY.payments.instapay,
    className: "logo-instapay",
    logoImg: "instapay_logo.png"
  },
  {
    data: PHARMACY.payments.etisalatCash,
    className: "logo-etisalat",
    logoImg: "etisalat_logo.png"
  },
  {
    data: PHARMACY.payments.vodafoneCash,
    className: "logo-vodafone",
    logoImg: "vodafone_cash_logo.png"
  }
];

let toastTimer;
const ANA_VODAFONE_ANDROID_PACKAGE = "com.emeint.android.myservices";

function showToast(message) {
  const toast = document.getElementById("toast");
  document.getElementById("toastText").textContent = message;
  toast.classList.add("show");
  window.clearTimeout(toastTimer);
  toastTimer = window.setTimeout(() => toast.classList.remove("show"), 2200);
}

function fallbackCopy(text) {
  const helper = document.createElement("textarea");
  helper.value = text;
  helper.setAttribute("readonly", "");
  helper.className = "clipboard-helper";
  document.body.appendChild(helper);
  helper.select();
  helper.setSelectionRange(0, helper.value.length);

  let copied = false;
  try {
    copied = document.execCommand("copy");
  } finally {
    helper.remove();
  }

  if (!copied) throw new Error("Clipboard fallback failed");
}

async function writeToClipboard(text) {
  if (navigator.clipboard && window.isSecureContext) {
    try {
      await navigator.clipboard.writeText(text);
      return;
    } catch (_error) {
      // بعض المتصفحات ترفض Clipboard API؛ نستخدم البديل المتوافق أدناه.
    }
  }

  fallbackCopy(text);
}

async function copyText(text, button) {
  if (!text || text.includes("اكتب")) {
    showToast("عذراً، لم يتم تحديد الرقم بعد");
    return;
  }

  const label = button.querySelector(".btn-label");

  try {
    await writeToClipboard(text);
    button.classList.add("copied");
    label.textContent = "تم النسخ";
    showToast("تم نسخ البيانات إلى الحافظة ✓");

    window.setTimeout(() => {
      button.classList.remove("copied");
      label.textContent = "نسخ الرقم";
    }, 2000);
  } catch (_error) {
    showToast("تعذر النسخ تلقائياً؛ يمكنك نسخه يدوياً");
    window.prompt("انسخ الرقم يدوياً:", text);
  }
}

function getMobilePlatform() {
  const userAgent = navigator.userAgent || "";
  const isIPadOS =
    navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1;

  if (/Android/i.test(userAgent)) return "android";
  if (/iPad|iPhone|iPod/i.test(userAgent) || isIPadOS) return "ios";
  return "other";
}

function createAndroidIntentUrl(appUrl) {
  let parsedUrl;

  try {
    parsedUrl = new URL(appUrl, window.location.href);
  } catch (_error) {
    return appUrl;
  }

  if (!/^https?:$/.test(parsedUrl.protocol)) return appUrl;

  const scheme = parsedUrl.protocol.slice(0, -1);
  const destination =
    parsedUrl.host + parsedUrl.pathname + parsedUrl.search + parsedUrl.hash;

  return (
    `intent://${destination}#Intent;scheme=${scheme};` +
    `package=${ANA_VODAFONE_ANDROID_PACKAGE};` +
    "end"
  );
}

const androidLaunchDialog = document.getElementById("androidLaunchDialog");
const androidLaunchRetry = document.getElementById("androidLaunchRetry");
const androidLaunchCopy = document.getElementById("androidLaunchCopy");
const androidLaunchClose = document.getElementById("androidLaunchClose");
const androidLaunchBrowser = document.getElementById("androidLaunchBrowser");
const androidLaunchNumber = document.getElementById("androidLaunchNumber");

let activeAndroidPayment;
let activeAndroidIntentUrl;
let activeAndroidTrigger;

function closeAndroidLaunchDialog() {
  if (androidLaunchDialog.hidden) return;

  androidLaunchDialog.hidden = true;
  document.body.classList.remove("app-launch-open");
  activeAndroidTrigger?.focus({ preventScroll: true });
}

function showAndroidLaunchDialog(payment, appLink) {
  activeAndroidPayment = payment;
  activeAndroidIntentUrl = createAndroidIntentUrl(payment.appUrl);
  activeAndroidTrigger = appLink;
  androidLaunchNumber.textContent = payment.account;
  androidLaunchBrowser.href = payment.appUrl;
  androidLaunchDialog.hidden = false;
  document.body.classList.add("app-launch-open");
}

function launchAndroidVodafoneApp() {
  if (!activeAndroidIntentUrl) return;
  window.location.assign(activeAndroidIntentUrl);
}

function openVodafoneOnAndroid(event, payment, appLink) {
  event.preventDefault();
  showAndroidLaunchDialog(payment, appLink);
  launchAndroidVodafoneApp();
}

async function copyAndroidVodafoneNumber() {
  if (!activeAndroidPayment) return;

  try {
    await writeToClipboard(activeAndroidPayment.account);
    showToast("تم نسخ رقم فودافون كاش ✓");
  } catch (_error) {
    showToast("انسخ رقم المحفظة يدوياً");
    window.prompt("انسخ رقم فودافون كاش:", activeAndroidPayment.account);
  }
}

androidLaunchRetry.addEventListener("click", launchAndroidVodafoneApp);
androidLaunchCopy.addEventListener("click", copyAndroidVodafoneNumber);
androidLaunchClose.addEventListener("click", closeAndroidLaunchDialog);

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") closeAndroidLaunchDialog();
});

document.addEventListener("visibilitychange", () => {
  if (document.hidden) closeAndroidLaunchDialog();
});

async function openVodafoneOnIOS(event, payment, appLink) {
  event.preventDefault();
  appLink.setAttribute("aria-busy", "true");

  try {
    await writeToClipboard(payment.account);
    showToast("تم نسخ رقم فودافون كاش؛ الصقه داخل التطبيق ✓");
  } catch (_error) {
    showToast("انسخ رقم المحفظة ثم الصقه داخل التطبيق");
    window.prompt("انسخ رقم فودافون كاش:", payment.account);
  } finally {
    appLink.removeAttribute("aria-busy");
    window.location.assign(payment.appUrl);
  }
}

function configureVodafoneLink(payment, appLink, platformHelp) {
  const platform = getMobilePlatform();
  const linkLabel = appLink.querySelector("span");

  // فتح الرابط في نفس الصفحة يقلل التبويبات الوسيطة على الموبايل.
  appLink.removeAttribute("target");

  if (platform === "android") {
    appLink.href = createAndroidIntentUrl(payment.appUrl);
    linkLabel.textContent = "فتح Ana Vodafone";
    appLink.addEventListener("click", (event) =>
      openVodafoneOnAndroid(event, payment, appLink)
    );
    return;
  }

  if (platform === "ios") {
    appLink.href = payment.appUrl;
    linkLabel.textContent = "نسخ الرقم ثم فتح";
    platformHelp.hidden = false;
    platformHelp.textContent =
      "على iPhone: سيتم نسخ الرقم أولاً؛ الصقه في خانة رقم المستلم داخل Ana Vodafone.";
    appLink.addEventListener("click", (event) =>
      openVodafoneOnIOS(event, payment, appLink)
    );
    return;
  }

  appLink.href = payment.appUrl;
}

const container = document.getElementById("paymentCardsList");
const template = document.getElementById("paymentCardTemplate");

paymentMethods.forEach((method) => {
  const payment = method.data;
  if (!payment) return;

  const fragment = template.content.cloneNode(true);
  const logoBox = fragment.querySelector(".payment-logo");
  const logo = fragment.querySelector(".payment-logo img");
  const actions = fragment.querySelector(".payment-actions");
  const copyButton = fragment.querySelector(".btn-copy");
  const appLink = fragment.querySelector(".btn-app");
  const platformHelp = fragment.querySelector(".payment-platform-help");

  logoBox.classList.add(method.className);
  logo.src = method.logoImg;
  logo.alt = payment.label;
  fragment.querySelector(".payment-name").textContent = payment.label;
  fragment.querySelector(".payment-note").textContent =
    payment.note || "تحويل إلكتروني";
  fragment.querySelector(".account-holder").textContent =
    payment.nameHolder || "الحساب الرسمي";
  fragment.querySelector(".account-number").textContent = payment.account;

  copyButton.addEventListener("click", () => copyText(payment.account, copyButton));

  if (payment.appUrl) {
    if (payment.id === "vodafoneCash") {
      configureVodafoneLink(payment, appLink, platformHelp);
    } else {
      appLink.href = payment.appUrl;
    }
  } else {
    appLink.remove();
    actions.classList.add("single");
  }

  container.appendChild(fragment);
});
