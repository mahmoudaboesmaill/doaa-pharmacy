// ============================================
// إعدادات وبيانات صيدلية د/ دعاء أحمد كمال
// ============================================

const PHARMACY = {
  // بيانات الصيدلية الأساسية
  name: "صيدلية د/ دعاء أحمد كمال",
  tagline: "صحتك تهمنا دائمًا",
  hours: {
    mode: "always-open",
    timezone: "Africa/Cairo",
    openLabel: "مفتوح الآن • في خدمتكم 24 ساعة"
  },

  // أرقام التواصل
  phone: "01126802211",
  whatsapp: "201090187051", // كود مصر 20 بدون علامة +

  // رسالة واتساب المسبقة لطلب الروشتة أو الدواء
  prescriptionMsg: "السلام عليكم، أود الاستفسار عن توافر دواء / إرسال صورة الروشتة.",

  // العنوان ورابط الموقع
  address: "أبو رواش، طريق المنصورية، أمام مسجد التوبة",
  mapsUrl: "https://maps.app.goo.gl/hLoWiJtnFauWVxUp9",
  mapsReviewUrl: "https://www.google.com/maps/place/Doaa+Ahmed+Kamal+Pharmacy/@30.0463882,31.0951061,17z/data=!4m8!3m7!1s0x145844c6e76d61af:0x98616a39fa9bdbb6!8m2!3d30.0463882!4d31.0951061!9m1!1b1!16s%2Fg%2F11frp_7_7q",

  // اختيارات سريعة لرسائل واتساب
  whatsappTopics: [
    {
      id: "rx",
      icon: "📄",
      label: "إرسال روشتة",
      message: "السلام عليكم، أود إرسال صورة روشتة لصرف العلاج المطلوب.",
      analyticsEvent: "wa_topic_rx_click"
    },
    {
      id: "availability",
      icon: "💊",
      label: "توافر دواء",
      message: "السلام عليكم، أود الاستفسار عن توافر دواء أو بديله.",
      analyticsEvent: "wa_topic_stock_click"
    }
  ],

  // منصات التواصل الاجتماعي
  facebookUrl: "https://www.facebook.com/profile.php?id=100064100042655",
  instagramUrl: "https://www.instagram.com/doctordoaa.pharmacy/",

  // وسائل الدفع والتحويل الإلكتروني (InstaPay & e& money & Vodafone Cash)
  payments: {
    instapay: {
      id: "instapay",
      label: "InstaPay",
      account: "01109275859",
      ipa: "dokamalph@instapay",
      nameHolder: "د/ دعاء أحمد كمال",
      note: "تحويل فوري عبر شبكة المدفوعات اللحظية",
      logo: "instapay_logo.webp",
      appUrl: "https://ipn.eg/S/dokamalph/instapay/3yQYHI"
    },
    etisalatCash: {
      id: "etisalatCash",
      label: "e& money (اتصالات كاش)",
      account: "01109275859",
      nameHolder: "محفظة إي آند كاش",
      note: "تحويل لمحفظة اتصالات كاش",
      logo: "etisalat_logo.webp",
      appUrl: "https://app.etisalat.eg/?appScreens=cash&appScreen=cash&extra=screenId:send_money;dial:01109275859"
    },
    vodafoneCash: {
      id: "vodafoneCash",
      label: "Vodafone Cash (فودافون كاش)",
      account: "01090187051",
      nameHolder: "محفظة فودافون كاش",
      note: "تحويل لمحفظة فودافون كاش",
      logo: "vodafone_cash_logo.webp",
      appUrl: "https://vf.eg/vfcash?id=mt&qrId=Y3LVeG"
    }
  }
};
