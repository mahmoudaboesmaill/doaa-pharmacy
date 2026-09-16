// ============================================
// إعدادات وبيانات صيدلية د/ دعاء أحمد كمال
// ============================================

const PHARMACY = {
  // بيانات الصيدلية الأساسية
  name: "صيدلية د/ دعاء أحمد كمال",
  tagline: "صحتك تهمنا دائمًا",
  status: "مفتوح الآن • في خدمتكم دائمًا",
  
  // أرقام التواصل
  phone: "01126802211",
  whatsapp: "201090187051", // كود مصر 20 بدون علامة +
  
  // رسالة واتساب المسبقة لطلب الروشتة أو الدواء
  prescriptionMsg: "السلام عليكم، أود الاستفسار عن توافر دواء / إرسال صورة الروشتة.",

  // العنوان ورابط الموقع
  address: "أبو رواش، طريق المنصورية، أمام مسجد التوبة",
  mapsUrl: "https://maps.app.goo.gl/hLoWiJtnFauWVxUp9",

  // منصات التواصل الاجتماعي
  facebookUrl: "https://www.facebook.com/share/1B67WUr2Kw/",
  instagramUrl: "https://www.instagram.com/doctordoaa.pharmacy/",

  // وسائل الدفع والتحويل الإلكتروني
  payments: {
    instapay: {
      id: "instapay",
      label: "InstaPay",
      account: "01113540136",
      nameHolder: "د/ دعاء أحمد كمال",
      note: "تحويل فوري عبر شبكة المدفوعات اللحظية",
      appUrl: "https://ipn.eg/S/mahmoudaboesmaill/instapay/10oB5g"
    },
    vodafoneCash: {
      id: "vodafoneCash",
      label: "Vodafone Cash",
      account: "01090187051",
      nameHolder: "محفظة فودافون كاش",
      note: "تحويل لمحفظة فودافون كاش",
      appUrl: ""
    },
    etisalatCash: {
      id: "etisalatCash",
      label: "e& Cash",
      account: "01113540136",
      nameHolder: "محفظة إي آند كاش",
      note: "تحويل لمحفظة اتصالات كاش",
      appUrl: "https://app.etisalat.eg/my-etisalat/index.html?appScreens=cash&appScreen=cash&extra=screenId%3Asend_money%3Bdial%3A01113540136"
    }
  }
};
