(function () {
  /* =======================================================================
     RESTAURANT CONTACT DETAILS - EDIT THIS PART ONLY.
     Do not use @username here: paste FULL Facebook, Instagram and Google Maps URLs.
     You can enter one or more restaurant phone numbers.
     The separate "Created by Debar Osman" credit uses the requested number.
     Examples:
       facebook: "https://www.facebook.com/YOUR_PAGE",
       instagram: "https://www.instagram.com/YOUR_PAGE/",
       location: "https://maps.google.com/?q=YOUR_RESTAURANT",
       phones: ["0770 000 00 00", "0750 000 00 00"]
     No guessed restaurant details are used as real links.
     ======================================================================= */
  var CONTACT = {
    facebook: "",
    instagram: "",
    location: "",
    phones: []
  };
  function setupContact() {
    [
      ["contact-facebook", CONTACT.facebook, "Add link"],
      ["contact-instagram", CONTACT.instagram, "Add link"],
      ["contact-location", CONTACT.location, "Add map"]
    ].forEach(function (row) {
      var a = document.getElementById(row[0]);
      var url = String(row[1] || "").trim();
      var valid = /^https:\/\//i.test(url);
      if (valid) a.href = url;
      else { a.removeAttribute("href"); a.classList.add("is-empty"); a.setAttribute("aria-disabled", "true"); }
      a.querySelector(".contact-detail").textContent = valid ? "Open" : row[2];
    });
    var phones = (Array.isArray(CONTACT.phones) ? CONTACT.phones : [])
      .map(function (x) { return String(x || "").trim(); }).filter(Boolean);
    var first = document.getElementById("contact-phone");
    if (phones.length) {
      first.href = "tel:" + phones[0].replace(/[^+0-9]/g, "");
      first.querySelector(".contact-detail").textContent = phones[0];
      first.setAttribute("aria-label", "Call restaurant: " + phones[0]);
    } else {
      first.removeAttribute("href"); first.classList.add("is-empty");
      first.setAttribute("aria-disabled", "true");
    }
    var extra = document.getElementById("contact-more-phones");
    phones.slice(1).forEach(function (phone) {
      var a = document.createElement("a");
      a.href = "tel:" + phone.replace(/[^+0-9]/g, "");
      a.textContent = "☎ " + phone;
      extra.appendChild(a);
    });
    extra.hidden = phones.length <= 1;
  }
  setupContact();

  /* ---------- text ---------- */
  var UI = {
    ku: { menu: "لیستی خواردن", tag: "کافێ و چێشتخانە · سلێمانی", brand: "NET", cur: "دینار", name: "کوردی",
          thanks: "سوپاس کە ئێمەتان هەڵبژارد", enjoy: "نۆشی گیان", open: "بینینی لیستی خواردن",
          enlarge: "گەورەکردنی وێنەی ", close: "داخستن", prev: "پێشوو", next: "دواتر", change: "گۆڕینی زمان",
          note: "نرخەکان بە دیناری عێراقین. تکایە ئەگەر هەستیارییەکی خۆراکیت هەیە، بە گارسۆنەکە بڵێ." },
    ar: { menu: "القائمة", tag: "كافيه ومطعم · السليمانية", brand: "NET", cur: "د.ع", name: "العربية",
          thanks: "شكراً لاختياركم لنا", enjoy: "بالهناء والشفاء", open: "عرض القائمة",
          enlarge: "تكبير صورة ", close: "إغلاق", prev: "السابق", next: "التالي", change: "تغيير اللغة",
          note: "الأسعار بالدينار العراقي. يرجى إبلاغ النادل بأي حساسية غذائية." },
    en: { menu: "Menu", tag: "Caffe & Restaurant · Slemani", brand: "NET", cur: "IQD", name: "English",
          thanks: "Thank you for choosing us", enjoy: "Enjoy your meal", open: "View the menu",
          enlarge: "Enlarge photo of ", close: "Close", prev: "Previous", next: "Next", change: "Change language",
          note: "Prices are in Iraqi dinar. Please tell your server about any allergies." }
  };
  var TAG = { ku: "ckb", ar: "ar", en: "en" };
  var CART_TXT = {
    ku: { add: "زیادکردن", less: "کەمکردنەوە", view: "بینینی داواکاری", order: "داواکارییەکەت", total: "کۆی گشتی", clear: "سڕینەوەی هەموو",
          note: "ئەم لیستە نیشانی گارسۆنەکە بدە.", empty: "هێشتا هیچ خواردنێکت زیاد نەکردووە." },
    ar: { add: "إضافة", less: "إنقاص", view: "عرض الطلب", order: "طلبك", total: "المجموع", clear: "مسح الكل",
          note: "أرِ هذه القائمة للنادل.", empty: "لم تضف أي طعام بعد." },
    en: { add: "Add to order", less: "Remove one", view: "View order", order: "Your order", total: "Total", clear: "Clear all",
          note: "Show this list to your waiter.", empty: "Nothing added yet." }
  };

  /* =====================================================================
     FOOD PHOTOS -- ONLY COPY PHOTOS INTO THE images FOLDER

     Files are stored like this:
        index.html
        images/
          logo.png
          restaurant.jpg
          images.jpg
          lentil-soup.jpg
          ...

     Each item below has its own simple path, e.g.:
        img: "images/lentil-soup.jpg",
     That becomes HTML: <img src="images/lentil-soup.jpg">

     IMPORTANT: Every file name (including uppercase letters and .jpg/.png)
     must match the actual photo. To change a photo name, change only img:.
     ===================================================================== */
  /* =====================================================================
     ADD YOUR OWN MENU ITEMS IN THE CATEGORY YOU WANT BELOW.
     Example (copy into a category's items: [ ... ] list):
     { img: "images/my-food.jpg", p: 5000,
       n: { en: "Food name", ku: "ناوی خواردن", ar: "اسم الطعام" },
       d: { en: "Description", ku: "وەسف", ar: "الوصف" } },
     Keep the image in the images folder next to index.html.
     ===================================================================== */
  /* ================================================================
     WHAT'S NEW / FOOD SPOTLIGHT - CHOOSE YOUR RESTAURANT'S REAL NEW FOOD

     This list currently displays EXISTING dishes as example highlights.
     They are NOT verified new menu additions. Replace these three names
     with actual new food from the MENU section below when ready.
     Format: "category-id|English item name" (match exactly).
     To add actual new food: add it to MENU first, then put its key here.
     ================================================================ */
  var FEATURED_FOOD_KEYS = [
    "mains|Mixed grill",
    "mains|Qozi",
    "salads|Tabbouleh"
  ];
  /* RESTAURANT EXCHANGE / RETURN MESSAGE: edit these three language versions if needed. */
  var PROMISE_WORDS = {
    en: { eyebrow: "OUR SERVICE PROMISE", title: "Your satisfaction is our priority",
      message: "If your meal does not meet your expectations, please let our team know. We will gladly replace it or accept its return." },
    ku: { eyebrow: "بەڵێنی خزمەتگوزاری ئێمە", title: "ڕازیبوونی ئێوە لە پێشینەی کارەکانمانە",
      message: "ئەگەر خواردنەکەتان بە دڵتان نەبوو، تکایە ئاگاداری ستافەکەمان بکەن. بە خۆشحاڵییەوە خواردنەکەتان دەگۆڕین یان وەریدەگرینەوە." },
    ar: { eyebrow: "وعدنا لكم", title: "رضاكم أولويتنا",
      message: "إذا لم يكن الطعام على قدر توقعاتكم، يُرجى إبلاغ فريق العمل. يسعدنا استبداله أو قبول إرجاعه." }
  };
  var FEATURED_WORDS = {
    en: { eyebrow: "NET FOOD SPOTLIGHT", title: "What's New?", intro: "Explore our featured dishes. Ask our team about today's new additions.",
          badge: "Featured", explore: "Explore all food", coming: "New food will be added here soon." },
    ku: { eyebrow: "خواردنی تایبەت", title: "چی نوێیە؟", intro: "ئەم خواردنانە ببینە. بۆ خواردنی نوێی ئەمڕۆ پرسیار لە ستافەکەمان بکە.",
          badge: "پێشنیارکراو", explore: "بینینی هەموو خواردن", coming: "بەم زووانە خواردنی نوێ لێرە زیاد دەکرێت." },
    ar: { eyebrow: "أطباق مميزة", title: "ما الجديد؟", intro: "اكتشف أطباقنا المميزة، واسأل فريقنا عن الأطباق الجديدة اليوم.",
          badge: "مميز", explore: "استكشف كل الطعام", coming: "ستضاف أطباق جديدة هنا قريباً." }
  };

  /* HELP ME CHOOSE: translated UI, shared by Food, Drinks, Sweets and Shisha.
     Each suggestion comes ONLY from the existing MENU array. */
  var CHOICE_WORDS = {
    en: { kicker: "CAN'T DECIDE?", title: "Not sure what to choose?", sub: "Tap below and we’ll suggest a dish from this section.", start: "Help me choose", again: "Try another", detail: "View details", label: "Our pick for you", add: "Add to order", empty: "There are no items in this section yet. Add your menu items to activate suggestions.", item: "items", soon: "Coming soon" },
    ku: { kicker: "ناتوانیت بڕیار بدەیت؟", title: "نازانیت چی هەڵبژێریت؟", sub: "با ئێمە پێشنیارێکت بۆ بکەین.", start: "یارمەتیم بدە لە هەڵبژاردن", again: "پێشنیارێکی تر", detail: "بینینی وردەکاری", label: "پێشنیاری ئێمە بۆ تۆ", add: "زیادکردن بۆ داواکاری", empty: "هێشتا هیچ بەرهەمێک لەم بەشەدا نییە. کاتێک زیاد بکرێت، پێشنیارەکان کار دەکەن.", item: "دانە", soon: "بەم زووانە" },
    ar: { kicker: "محتار في الاختيار؟", title: "لا تعرف ماذا تختار؟", sub: "دعنا نقترح عليك صنفاً من قائمتنا.", start: "ساعدني في الاختيار", again: "جرّب اقتراحاً آخر", detail: "عرض التفاصيل", label: "اقتراحنا لك", add: "أضف إلى الطلب", empty: "لا توجد أصناف في هذا القسم حالياً. ستتوفر الاقتراحات عند إضافة الأصناف.", item: "أصناف", soon: "قريباً" }
  };
  var lastSuggestion = {};
  var GROUPS = [
    { id: "food", name: { en: "Food", ku: "خواردن", ar: "الطعام" } },
    { id: "drinks", name: { en: "Drinks", ku: "خواردنەوە", ar: "المشروبات" } },
    { id: "sweets", name: { en: "Sweets", ku: "شیرینی و میوە", ar: "الحلويات والفواكه" } },
    { id: "shisha", name: { en: "Shisha", ku: "نێرگەلە", ar: "الأرجيلة" } }
  ];
  var MENU = [
    /* -------- SALADS (FOOD) -------- */
    { id: "salads", group: "food", name: { en: "Salads", ku: "زەڵاتەکان", ar: "السلطات" },
      items: [
        { img: "images/Image 2.jpg", p: 4500,
           n: { en: "Tabbouleh", ku: "تەبولە", ar: "تبولة" },
          d: { en: "Parsley, tomato and fine bulgur with lemon and olive oil.",
               ku: "جەعدە، تەماتە و بلغور لەگەڵ لیمۆ و زەیت.",
               ar: "بقدونس وطماطم وبرغل ناعم مع الليمون وزيت الزيتون." } },
        /* >>> ADD ITEMS HERE: SALADS <<< */
      ]},

    /* -------- MAIN DISHES (FOOD) -------- */
    { id: "mains", group: "food", name: { en: "Main Dishes", ku: "خواردنی سەرەکی", ar: "الأطباق الرئيسية" },
      items: [
        { img: "images/12.jpg", p: 22000,
           n: { en: "Mixed grill", ku: "برژاوی تێکەڵ", ar: "مشاوي مشكلة" },
          d: { en: "Lamb kebab, shish tawook and lamb pieces with grilled tomato and onion.",
               ku: "کەبابی بەرخ، شیشی مریشک و گۆشتی برژاو لەگەڵ تەماتە و پیازی برژاو.",
               ar: "كباب لحم وشيش طاووق وقطع لحم مشوية مع طماطم وبصل." } },
        { img: "images/13.jpg", p: 12000,
           n: { en: "Lamb kebab", ku: "کەبابی بەرخ", ar: "كباب لحم" },
          d: { en: "Minced lamb with parsley and spices on skewers, served with tandoor bread.",
               ku: "گۆشتی کوتراوی بەرخ لەگەڵ جەعدە و بەهارات، لەگەڵ نانی تەنوور.",
               ar: "لحم غنم مفروم مع البقدونس والبهارات، يقدم مع خبز التنور." } },
        { img: "images/shish-tawook.jpg", p: 10000,
           n: { en: "Shish tawook", ku: "شیشی مریشک", ar: "شيش طاووق" },
          d: { en: "Chicken marinated in yoghurt and garlic, grilled and served with rice.",
               ku: "پارچە مریشکی برژاو کە بە ماست و سیر ئامادە کراوە، لەگەڵ برنج.",
               ar: "دجاج متبل باللبن والثوم، مشوي ويقدم مع الرز." } },
        { img: "images/dolma.jpg", p: 9000,
           n: { en: "Dolma", ku: "دۆڵمە", ar: "دولمة" },
          d: { en: "Vine leaves, onion and tomato stuffed with rice and lamb.",
               ku: "گەڵای مێو، پیاز و تەماتەی پڕکراو بە برنج و گۆشت.",
               ar: "ورق عنب وبصل وطماطم محشوة بالرز واللحم." } },
        { img: "images/chicken-biryani.jpg", p: 8500,
           n: { en: "Chicken biryani", ku: "بریانی مریشک", ar: "برياني دجاج" },
          d: { en: "Spiced rice with chicken, almonds and raisins.",
               ku: "برنجی بەهاراتدار لەگەڵ مریشک، بادەم و مێوژ.",
               ar: "رز متبل مع دجاج ولوز وزبيب." } },
        { img: "images/qozi.jpg", p: 16000,
           n: { en: "Qozi", ku: "قووزی", ar: "قوزي" },
          d: { en: "Slow-roasted lamb on spiced rice with almonds.",
               ku: "گۆشتی بەرخی بە هێواشی برژاو لەسەر برنج، لەگەڵ بادەم.",
               ar: "لحم غنم مشوي ببطء على الرز المتبل مع اللوز." } },
        { img: "images/masgouf.jpg", p: 18000,
           n: { en: "Masgouf", ku: "مەسگوف", ar: "مسكوف" },
          d: { en: "River carp split and grilled over wood fire, with tomato and onion.",
               ku: "ماسی ڕووبار کە بە ئاگری دار برژاوە، لەگەڵ تەماتە و پیاز.",
               ar: "سمك شبوط مفتوح يشوى على نار الحطب مع الطماطم والبصل." } },
        /* >>> ADD ITEMS HERE: MAIN DISHES <<< */
      ]},

    /* -------- SIDE DISHES (FOOD) -------- */
    { id: "sides", group: "food", name: { en: "Side Dishes", ku: "خواردنی لاوەکی", ar: "الأطباق الجانبية" },
      items: [
        { img: "images/net-logo.jpg", p: 4000,
           n: { en: "Hummus", ku: "حومس", ar: "حمص" },
          d: { en: "Chickpea purée with tahini, olive oil and lemon.",
               ku: "نۆکی هاڕاو لەگەڵ تەحینە، زەیتی زەیتوون و لیمۆ.",
               ar: "حمص مهروس مع الطحينة وزيت الزيتون والليمون." } },
        { img: "images/lentil-soup.jpg", p: 3500,
           n: { en: "Lentil soup", ku: "شۆربای نیسک", ar: "شوربة العدس" },
          d: { en: "Warm red lentil soup with lemon and toasted bread.",
               ku: "شۆربایەکی گەرمی نیسک لەگەڵ لیمۆ و نانی برژاو.",
               ar: "شوربة عدس دافئة تقدم مع الليمون والخبز المحمص." } },
        { img: "images/net-logo.jpg", p: 6000,
           n: { en: "Kibbeh", ku: "کوبە", ar: "كبة" },
          d: { en: "Fried bulgur shells filled with spiced minced lamb.",
               ku: "کوبەی سوورکراوەی پڕکراو بە گۆشت و بەهارات.",
               ar: "كبة مقلية محشوة بلحم مفروم متبل." } },
        /* >>> ADD ITEMS HERE: SIDE DISHES <<< */
      ]},

    /* -------- SANDWICHES (FOOD) -------- */
    { id: "sandwiches", group: "food", name: { en: "Sandwiches", ku: "ساندویچەکان", ar: "السندويشات" },
      items: [
        /* >>> ADD ITEMS HERE: SANDWICHES <<< */
      ]},

    /* -------- SAJ (FOOD) -------- */
    { id: "saj", group: "food", name: { en: "Saj", ku: "ساج", ar: "الصاج" },
      items: [
        /* >>> ADD ITEMS HERE: SAJ <<< */
      ]},

    /* -------- KENTUCKY (FOOD) -------- */
    { id: "kentucky", group: "food", name: { en: "Kentucky", ku: "کەنتاکی", ar: "كنتاكي" },
      items: [
        /* >>> ADD ITEMS HERE: KENTUCKY <<< */
      ]},

    /* -------- PIZZA (FOOD) -------- */
    { id: "pizza", group: "food", name: { en: "Pizza", ku: "پیتزا", ar: "بيتزا" },
      items: [
        /* >>> ADD ITEMS HERE: PIZZA <<< */
      ]},

    /* -------- SOFT DRINKS (DRINKS) -------- */
    { id: "soft-drinks", group: "drinks", name: { en: "Soft Drinks", ku: "خواردنەوە گازییەکان", ar: "المشروبات الغازية" },
      items: [
        /* >>> ADD ITEMS HERE: SOFT DRINKS <<< */
      ]},

    /* -------- ENERGY DRINKS (DRINKS) -------- */
    { id: "energy-drinks", group: "drinks", name: { en: "Energy Drinks", ku: "خواردنەوە وزەبەخشەکان", ar: "مشروبات الطاقة" },
      items: [
        /* >>> ADD ITEMS HERE: ENERGY DRINKS <<< */
      ]},

    /* -------- HOT DRINKS (DRINKS) -------- */
    { id: "hot-drinks", group: "drinks", name: { en: "Hot Drinks", ku: "خواردنەوە گەرمەکان", ar: "المشروبات الساخنة" },
      items: [
        { img: "images/tea.jpg", p: 1000,
           n: { en: "Tea", ku: "چای", ar: "شاي" },
          d: { en: "Black tea in a glass istikan.",
               ku: "چای ڕەش لە ئیستکانی شووشە.",
               ar: "شاي أسود في استكان زجاجي." } },
        { img: "images/arabic-coffee.jpg", p: 2500,
           n: { en: "Arabic coffee", ku: "قاوەی عەرەبی", ar: "قهوة عربية" },
          d: { en: "Lightly roasted coffee with cardamom.",
               ku: "قاوەی عەرەبی لەگەڵ هێل.",
               ar: "قهوة خفيفة التحميص بالهيل." } },
        /* >>> ADD ITEMS HERE: HOT DRINKS <<< */
      ]},

    /* -------- COLD DRINKS (DRINKS) -------- */
    { id: "cold-drinks", group: "drinks", name: { en: "Cold Drinks", ku: "خواردنەوە ساردەکان", ar: "المشروبات الباردة" },
      items: [
        { img: "images/doogh.jpg", p: 2000,
           n: { en: "Doogh", ku: "دۆ", ar: "لبن عيران" },
          d: { en: "Cold salted yoghurt drink with mint.",
               ku: "دۆی ساردی سویر لەگەڵ پونگ.",
               ar: "لبن عيران بارد مملح بالنعناع." } },
        /* >>> ADD ITEMS HERE: COLD DRINKS <<< */
      ]},

    /* -------- FRESH JUICE (DRINKS) -------- */
    { id: "fresh-juice", group: "drinks", name: { en: "Fresh Juice", ku: "شەربەتی تازە", ar: "العصائر الطازجة" },
      items: [
        { img: "images/pomegranate-juice.jpg", p: 5000,
           n: { en: "Pomegranate juice", ku: "شەربەتی ئەنار", ar: "عصير رمان" },
          d: { en: "Freshly pressed to order.",
               ku: "ئەنارێکی تازە گوشراو.",
               ar: "رمان طازج يعصر عند الطلب." } },
        /* >>> ADD ITEMS HERE: FRESH JUICE <<< */
      ]},

    /* -------- SWEETS (SWEETS) -------- */
    { id: "sweets", group: "sweets", name: { en: "Sweets", ku: "شیرینییەکان", ar: "الحلويات" },
      items: [
        { img: "images/baklava.jpg", p: 4500,
           n: { en: "Baklava", ku: "باقلاوە", ar: "بقلاوة" },
          d: { en: "Thin layered pastry with pistachios and syrup.",
               ku: "چەند توێژێک لە هەویری تەنک لەگەڵ فستەق و شەربەت.",
               ar: "طبقات من العجين الرقيق مع الفستق والقطر." } },
        { img: "images/kunafa.jpg", p: 5500,
           n: { en: "Kunafa", ku: "کونافە", ar: "كنافة" },
          d: { en: "Warm cheese kunafa with sugar syrup.",
               ku: "کونافەی گەرم لەگەڵ پەنیر و شەربەت.",
               ar: "كنافة ساخنة بالجبن والقطر." } },
        { img: "images/kleicha.jpg", p: 3000,
           n: { en: "Kleicha", ku: "کلێچە", ar: "كليجة" },
          d: { en: "Date-filled cookies, served with tea.",
               ku: "کلێچەی پڕکراو بە خورما، لەگەڵ چا.",
               ar: "كليجة محشوة بالتمر، تقدم مع الشاي." } },
        /* >>> ADD ITEMS HERE: SWEETS <<< */
      ]},

    /* -------- FRUIT (SWEETS) -------- */
    { id: "fruit", group: "sweets", name: { en: "Fruit", ku: "میوە", ar: "الفواكه" },
      items: [
        /* >>> ADD ITEMS HERE: FRUIT <<< */
      ]},

    /* -------- SHISHA (SHISHA) -------- */
    { id: "shisha", group: "shisha", name: { en: "Shisha", ku: "نێرگەلە", ar: "الأرجيلة" },
      items: [
        /* >>> ADD ITEMS HERE: SHISHA <<< */
      ]},

    /* -------- FRESH (SHISHA) -------- */
    { id: "fresh", group: "shisha", name: { en: "Fresh", ku: "فرێش", ar: "فريش" },
      items: [
        /* >>> ADD ITEMS HERE: FRESH <<< */
      ]},

  ];

  /* ---------- flags ---------- */
  var uid = 0;
  function sunStar() {
    var pts = [], cx = 18, cy = 12, ro = 6.8, ri = 4.1, i, r, a;
    for (i = 0; i < 42; i++) {
      r = i % 2 ? ri : ro; a = -Math.PI / 2 + i * Math.PI / 21;
      pts.push((cx + r * Math.cos(a)).toFixed(2) + "," + (cy + r * Math.sin(a)).toFixed(2));
    }
    return '<polygon points="' + pts.join(" ") + '" fill="#FDBA12"/>';
  }
  function flag(lang) {
    var open = '<svg viewBox="0 0 36 24" preserveAspectRatio="xMidYMid slice" aria-hidden="true" focusable="false">';
    if (lang === "ku") {
      return open + '<rect width="36" height="8" fill="#ED1C24"/><rect y="8" width="36" height="8" fill="#fff"/><rect y="16" width="36" height="8" fill="#278E43"/>' + sunStar() + "</svg>";
    }
    if (lang === "ar") {
      return open + '<rect width="36" height="8" fill="#CE1126"/><rect y="8" width="36" height="8" fill="#fff"/><rect y="16" width="36" height="8" fill="#000"/>' +
        '<text x="18" y="14.6" font-size="5.2" text-anchor="middle" fill="#007A3D" font-family="Noto Kufi Arabic, Vazirmatn, Tahoma, sans-serif" font-weight="700">الله أكبر</text></svg>';
    }
    var k = ++uid;
    return '<svg viewBox="0 0 60 30" preserveAspectRatio="xMidYMid slice" aria-hidden="true" focusable="false">' +
      '<clipPath id="uk-s' + k + '"><path d="M0,0v30h60v-30z"/></clipPath><clipPath id="uk-t' + k + '"><path d="M30,15h30v15zv15h-30zh-30v-15zv-15h30z"/></clipPath>' +
      '<g clip-path="url(#uk-s' + k + ')"><path d="M0,0v30h60v-30z" fill="#012169"/><path d="M0,0L60,30M60,0L0,30" stroke="#fff" stroke-width="6"/>' +
      '<path d="M0,0L60,30M60,0L0,30" clip-path="url(#uk-t' + k + ')" stroke="#C8102E" stroke-width="4"/><path d="M30,0v30M0,15h60" stroke="#fff" stroke-width="10"/><path d="M30,0v30M0,15h60" stroke="#C8102E" stroke-width="6"/></g></svg>';
  }

  /* ---------- helpers ---------- */
  var SUN = (function () {
    var pts = [], i, rr, a;
    for (i = 0; i < 42; i++) { rr = i % 2 ? 6.2 : 11.5; a = -Math.PI / 2 + i * Math.PI / 21; pts.push((12 + rr * Math.cos(a)).toFixed(2) + "," + (12 + rr * Math.sin(a)).toFixed(2)); }
    return '<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><polygon points="' + pts.join(" ") + '" fill="#F2B01E"/><circle cx="12" cy="12" r="4.2" fill="#D63A2B"/></svg>';
  })();
  var DIGITS = "٠١٢٣٤٥٦٧٨٩";
  function price(n, lang) {
    var s = n.toLocaleString("en-US");
    if (lang === "en") return s;
    return s.replace(/\d/g, function (d) { return DIGITS[d]; }).replace(/,/g, "٬");
  }

  /* ================================================================
     FOOD IMAGES - SIMPLE HTML <img src="images/food.jpg">

     1. Put your photos into the folder named images next to index.html.
     2. Use the EXACT filenames written above for each food.
     3. To change a filename, edit only that food's img: "images/...".

     IMPORTANT: A file needs to really exist inside the images folder.
     A .png file cannot load as .jpg without renaming the path to .png.
     ================================================================ */
  function foodImagePath(path) {
    return (function () { var p = String(path || "").trim().replace(/\\/g, "/"); return p && !/^(?:https?:|data:|\/)/i.test(p) ? "/" + p.replace(/^\.\//, "") : p; })();
  }
  function safeAttr(str) {
    return String(str).replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  }
  function pic(it, fullSize) {
    // Example output: <img src="images/dolma.jpg" ...>
    var src = foodImagePath(it.img);
    if (!src) return "";
    return '<img src="' + safeAttr(src) + '" class="art" alt="' + safeAttr(it.n.en) + '" loading="' + (fullSize ? 'eager' : 'lazy') + '" decoding="async">';
  }
  // One clear fallback, rather than trying many incorrect file names.
  document.addEventListener("error", function (e) {
    var img = e.target;
    if (!img || img.tagName !== "IMG" || !img.classList.contains("art")) return;
    var src = img.getAttribute("src") || "";
    console.warn("Food photo missing. Add this exact file:", src);
    var wrapper = img.parentElement;
    if (wrapper && !wrapper.querySelector(".photo-missing")) {
      var note = document.createElement("div");
      note.className = "photo-missing";
      note.textContent = "Photo coming soon";
      wrapper.appendChild(note);
    }
    img.remove();
  }, true);

  var $ = function (id) { return document.getElementById(id); };
  var picker = $("picker"), menu = $("menu"), content = $("content"), chips = $("chips"), splash = $("splash"), lb = $("lb");
  var cur = "en", flat = [], ALL = [], cart = {}, idx = 0, lastFocus = null, splashTimer = null;
  var activeGroup = "food", typeChips = $("type-chips"), typesNav = $("types-nav");
  var sheet = $("sheet"), basket = $("basket");

  // Freeze page scroll position while popups are open.
  var frozenY = 0, freezeDepth = 0;
  function lockPage() {
    if (freezeDepth++) return;
    frozenY = window.pageYOffset || document.documentElement.scrollTop || 0;
    document.body.style.position = "fixed";
    document.body.style.top = -frozenY + "px";
    document.body.style.left = "0";
    document.body.style.right = "0";
    document.body.style.width = "100%";
    document.documentElement.classList.add("lock");
  }
  function unlockPage() {
    if (!freezeDepth) return;
    if (--freezeDepth) return;
    var y = frozenY;
    document.documentElement.classList.remove("lock");
    document.body.style.position = "";
    document.body.style.top = "";
    document.body.style.left = "";
    document.body.style.right = "";
    document.body.style.width = "";
    var oldBehavior = document.documentElement.style.scrollBehavior;
    document.documentElement.style.scrollBehavior = "auto";
    window.scrollTo(0, y);
    requestAnimationFrame(function () {
      window.scrollTo(0, y);
      document.documentElement.style.scrollBehavior = oldBehavior;
    });
  }

  document.documentElement.classList.add("nos");
  var reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  document.querySelectorAll("[data-flag]").forEach(function (el) { el.innerHTML = flag(el.getAttribute("data-flag")); });

  /* Featured food appears before Salads, Main Dishes, and the rest.
     Cards use real menu data, prices, images and basket, never duplicate data. */
  function renderFeatured(lang) {
    if (activeGroup !== "food") return "";
    var w = FEATURED_WORDS[lang];
    var selected = FEATURED_FOOD_KEYS.map(function (key) {
      var k = ALL.findIndex(function (a) { return a.key === key; });
      return k < 0 ? null : { it: ALL[k].it, k: k };
    }).filter(Boolean);
    var tiles = selected.map(function (x) {
      var it = x.it, k = x.k;
      var img = foodImagePath(it.img) ? '<div class="feature-pic pic">' + pic(it) + '</div>' :
        '<div class="feature-pic feature-no-photo"></div>';
      return '<article class="feature-card open" data-open="' + k + '" role="button" tabindex="0" aria-label="' + safeAttr(it.n[lang]) + '">' +
        img + '<div class="feature-details"><span class="feature-tag">' + w.badge + '</span>' +
        '<h3>' + it.n[lang] + '</h3><p class="feature-description">' + it.d[lang] + '</p>' +
        '<div class="buy"><strong class="price">' + price(it.p, lang) + ' <small>' + UI[lang].cur +
        '</small></strong><span class="qty" data-k="' + k + '"></span></div></div></article>';
    }).join("");
    return '<section class="featured" id="featured" aria-labelledby="featured-title">' +
      '<div class="featured-heading"><div><span class="featured-eyebrow">' + w.eyebrow +
      '</span><h2 id="featured-title" class="display">' + w.title + '</h2><p>' + w.intro + '</p></div></div>' +
      (tiles ? '<div class="featured-list">' + tiles + '</div>' : '<p class="empty-category">' + w.coming + '</p>') +
      '<button type="button" class="featured-explore" data-jump="sec-salads">' +
        w.explore + ' <span aria-hidden="true">↓</span></button></section>';
  }

  function renderChooser(lang) {
    var w = CHOICE_WORDS[lang];
    return '<section class="choose-panel" id="choose-for-me" aria-labelledby="choose-title">' +
      '<div class="choose-head"><div class="choose-copy"><div class="choose-kicker">' + w.kicker +
      '</div><h2 id="choose-title">' + w.title + '</h2><p>' + w.sub +
      '</p></div><span class="choose-ico" aria-hidden="true">🎲</span></div>' +
      '<button type="button" class="choose-start" data-suggest="start">' + w.start + '</button>' +
      '<div id="suggestion-slot" aria-live="polite"></div></section>';
  }
  function showRandomSuggestion() {
    var slot = $('suggestion-slot');
    if (!slot) return;
    var w = CHOICE_WORDS[cur];
    var candidateIds = [];
    ALL.forEach(function (a, k) {
      var category = a.key.split('|')[0];
      if (MENU.some(function (cat) { return cat.id === category && cat.group === activeGroup; })) candidateIds.push(k);
    });
    if (!candidateIds.length) {
      slot.innerHTML = '<div class="suggest-empty" role="status">' + w.empty + '</div>';
      return;
    }
    var previous = lastSuggestion[activeGroup];
    var available = candidateIds.filter(function (k) { return k !== previous; });
    if (!available.length) available = candidateIds;
    var k = available[Math.floor(Math.random() * available.length)];
    lastSuggestion[activeGroup] = k;
    var it = ALL[k].it;
    var photo = foodImagePath(it.img) ? pic(it) : '<span>' + w.soon + '</span>';
    slot.innerHTML = '<div class="suggest-result"><div class="suggest-card">' +
      '<div class="suggest-photo' + (foodImagePath(it.img) ? '' : ' suggest-no-photo') + '">' + photo + '</div>' +
      '<div class="suggest-copy"><div class="suggest-label">' + w.label + '</div><h3 class="suggest-name">' + it.n[cur] +
      '</h3><p class="suggest-desc">' + it.d[cur] + '</p><p class="suggest-price">' + price(it.p, cur) + ' ' + UI[cur].cur +
      '</p></div></div><div class="suggest-actions"><button type="button" class="choose-again" data-suggest="again">' +
      w.again + ' ↻</button><button type="button" class="choose-details" data-suggest="details" data-k="' + k + '">' + w.detail +
      '</button></div><div class="suggest-order"><strong>' + w.add + '</strong><span class="qty" data-k="' + k + '"></span></div></div>';
    renderCart();
  }

  function render(lang) {
    var t = UI[lang];
    var promise = PROMISE_WORDS[lang];
    $("promise-eyebrow").textContent = promise.eyebrow;
    $("promise-title").textContent = promise.title;
    $("promise-message").textContent = promise.message;
    cur = lang;
    menu.lang = TAG[lang];
    menu.dir = lang === "en" ? "ltr" : "rtl";
    $("brand").textContent = t.brand;
    $("change-label").textContent = t.name;
    $("change").setAttribute("aria-label", t.change);
    $("menu-title").textContent = t.menu;
    $("tag").textContent = t.tag;
    $("thanks-1").textContent = t.thanks;
    $("thanks-2").textContent = t.enjoy;
    $("foot-1").textContent = t.thanks;
    $("note").textContent = t.note;
    $("splash-title").textContent = t.thanks;
    $("splash-sub").textContent = t.enjoy;
    $("lb-close").setAttribute("aria-label", t.close);
    $("lb-prev").setAttribute("aria-label", t.prev);
    $("lb-next").setAttribute("aria-label", t.next);

    // ALL includes every dish, even in a different menu group. This keeps
    // food + drink + sweet + shisha items together in the order basket.
    flat = [];
    ALL = [];
    MENU.forEach(function (cat) {
      cat.items.forEach(function (it) {
        ALL.push({ key: cat.id + "|" + it.n.en, it: it });
      });
    });
    var visibleCats = MENU.filter(function (cat) { return cat.group === activeGroup; });
    typeChips.innerHTML = GROUPS.map(function (g) {
      var symbol = { food: "🍽️", drinks: "🥤", sweets: "🍰", shisha: "💨" }[g.id];
      return '<button class="type-chip" type="button" data-group="' + g.id +
        '" aria-pressed="' + (g.id === activeGroup ? 'true' : 'false') + '"' +
        (g.id === activeGroup ? ' aria-current="true"' : '') +
        '><span class="type-emoji" aria-hidden="true">' + symbol + '</span><span class="type-name">' + g.name[lang] + '</span></button>';
    }).join("");
    chips.innerHTML = visibleCats.map(function (c, i) {
      return '<button class="chip" type="button" data-target="sec-' + c.id + '"' +
        (i === 0 ? ' aria-current="true"' : '') + '>' + c.name[lang] + '</button>';
    }).join("");
    content.innerHTML = renderFeatured(lang) + renderChooser(lang) + visibleCats.map(function (cat) {
      var cards = cat.items.map(function (it) {
        var hasPhoto = !!foodImagePath(it.img);
        var photo = hasPhoto ? '<div class="pic">' + pic(it) + '</div>' : '';
        var k = ALL.findIndex(function (a) { return a.key === cat.id + "|" + it.n.en; });
        return '<div class="cell"><article class="card open' + (hasPhoto ? '' : ' no-pic') + '" role="button" tabindex="0" data-open="' + k + '" aria-label="' + safeAttr(it.n[lang]) + '">' + photo +
          '<div class="info">' + "<h3>" + it.n[lang] + '</h3><p class="desc">' + it.d[lang] + '</p><div class="buy"><p class="price">' + price(it.p, lang) + " <small>" + t.cur + '</small></p><span class="qty" data-k="' + k + '"></span></div></div></article></div>';
      }).join("");
      var inside = cat.items.length ? '<div class="grid">' + cards + '</div>' :
        '<p class="empty-category">' + { en: "Items coming soon", ku: "بەزووانە خواردن و خواردنەوە زیاد دەکرێت", ar: "ستضاف الأصناف قريباً" }[lang] + '</p>';
      return '<section class="sec" id="sec-' + cat.id + '"><div class="sec-head"><h2 class="display">' + cat.name[lang] + '</h2><i aria-hidden="true"></i></div>' + inside + "</section>";
    }).join("");
    activeId = "";
    if (visibleCats.length) setActive("sec-" + visibleCats[0].id);
    motion();
    renderCart();
  }

  /* ---------- scroll motion ---------- */
  var io = null, rafId = 0;
  function measure() {
    var d = $("cats-nav");
    if (d && typesNav) {
      menu.style.setProperty("--type-h", typesNav.offsetHeight + "px");
      menu.style.setProperty("--dock-h", (typesNav.offsetHeight + d.offsetHeight) + "px");
    }
  }
  function onScroll() {
    if (rafId) return;
    rafId = requestAnimationFrame(function () {
      rafId = 0;
      if (!reduce) menu.style.setProperty("--sy", window.scrollY || 0);
      spy();
    });
  }
  function motion() {
    if (io) io.disconnect();
    measure();
    if (reduce || !("IntersectionObserver" in window)) return;
    io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        var cell = en.target, card = cell.firstElementChild;
        if (en.isIntersecting) {
          card.style.transitionDelay = ((+cell.getAttribute("data-i") % 3) * 90) + "ms";
          card.classList.remove("rv");
        } else {
          card.style.transitionDelay = "0ms";
          card.style.setProperty("--dy", (en.boundingClientRect.top > 0 ? 32 : -32) + "px");
          card.classList.add("rv");
        }
      });
    }, { rootMargin: "0px 0px -5% 0px", threshold: 0.05 });
    content.querySelectorAll(".sec").forEach(function (sec) {
      sec.querySelectorAll(".cell").forEach(function (cell, i) { cell.setAttribute("data-i", i); io.observe(cell); });
    });
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", measure);
  if (window.ResizeObserver) {
    var navResize = new ResizeObserver(measure);
    navResize.observe($("cats-nav"));
    navResize.observe(typesNav);
  }
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(measure);

  var activeId = "", spyLock = false, spySettled = false, spyY = 0, spyTimer = 0;
  function setActive(id) {
    if (id === activeId) return;
    activeId = id;
    chips.querySelectorAll(".chip").forEach(function (chip) {
      var on = chip.getAttribute("data-target") === id;
      if (!on) { chip.removeAttribute("aria-current"); return; }
      chip.setAttribute("aria-current", "true");
      var a = chip.getBoundingClientRect(), b = chips.getBoundingClientRect();
      var delta = (a.left + a.width / 2) - (b.left + b.width / 2);
      try { chips.scrollTo({ left: chips.scrollLeft + delta, behavior: reduce || menu.hidden ? "auto" : "smooth" }); } catch (err) { chips.scrollLeft += delta; }
    });
  }
  function spy() {
    if (menu.hidden) return;
    if (spyLock) {
      if (!spySettled || Math.abs((window.scrollY || 0) - spyY) < 24) return;
      spyLock = false;
    }
    var secs = content.querySelectorAll(".sec");
    if (!secs.length) return;
    var dockH = $("cats-nav").offsetHeight + typesNav.offsetHeight, line = dockH + (window.innerHeight - dockH) * 0.4, id = secs[0].id, i;
    for (i = 0; i < secs.length; i++) { if (secs[i].getBoundingClientRect().top <= line) id = secs[i].id; }
    var foot = document.querySelector(".foot");
    if (foot && (window.scrollY || 0) > 0 && foot.getBoundingClientRect().bottom <= window.innerHeight + 4) id = secs[secs.length - 1].id;
    setActive(id);
  }
  function goTo(id) {
    var sec = $(id);
    if (!sec) return;
    spyLock = true;
    spySettled = false;
    clearTimeout(spyTimer);
    spyTimer = setTimeout(function () { spySettled = true; spyY = window.scrollY || 0; }, reduce ? 80 : 1100);
    setActive(id);
    var top = sec.getBoundingClientRect().top + (window.scrollY || 0) - $("cats-nav").offsetHeight - typesNav.offsetHeight - 6;
    window.scrollTo({ top: Math.max(0, top), behavior: reduce ? "auto" : "smooth" });
  }

  /* ---------- order basket ---------- */
  var CK = "net-menu-order";
  function saveCart() { try { localStorage.setItem(CK, JSON.stringify(cart)); } catch (err) {} }
  function loadCart() {
    try { var v = JSON.parse(localStorage.getItem(CK) || "{}"); if (v && typeof v === "object") cart = v; } catch (err) { cart = {}; }
  }
  function money(n) { return price(n, cur) + " " + UI[cur].cur; }
  function qtyOf(k) { return cart[ALL[k].key] || 0; }
  function qtyHtml(k) {
    var c = CART_TXT[cur], q = qtyOf(k);
    var plus = '<button class="qbtn plus" type="button" data-act="add" data-k="' + k + '" aria-label="' + c.add + '">+</button>';
    if (!q) return plus;
    return '<button class="qbtn minus" type="button" data-act="less" data-k="' + k + '" aria-label="' + c.less + '">&minus;</button><span class="qnum">' + price(q, cur) + "</span>" + plus;
  }
  function setQty(k, q) {
    var key = ALL[k].key, before = cart[key] || 0;
    if (q <= 0) delete cart[key]; else cart[key] = Math.min(q, 99);
    saveCart();
    renderCart();
    if (q > before && !reduce) {
      var bag = $("bag");
      bag.classList.remove("bump");
      void bag.offsetWidth;
      bag.classList.add("bump");
    }
  }
  function renderCart() {
    var c = CART_TXT[cur], total = 0, n = 0, rows = "";
    Object.keys(cart).forEach(function (key) { if (!ALL.some(function (a) { return a.key === key; })) delete cart[key]; });
    content.querySelectorAll(".qty").forEach(function (el) { el.innerHTML = qtyHtml(+el.getAttribute("data-k")); });
    if (!lb.hidden) $("lb-qty").innerHTML = qtyHtml(idx);
    ALL.forEach(function (a, k) {
      var q = cart[a.key];
      if (!q) return;
      total += a.it.p * q;
      n += q;
      rows += '<li class="srow">' + (foodImagePath(a.it.img) ? '<span class="sthumb">' + pic(a.it) + '</span>' : '') + '<div class="sinfo"><b>' + a.it.n[cur] + "</b><span>" + money(a.it.p) + " &times; " + price(q, cur) + '</span></div>' +
        '<div class="sright"><span class="qty">' + qtyHtml(k) + '</span><b class="sline">' + money(a.it.p * q) + "</b></div></li>";
    });
    $("sheet-list").innerHTML = rows || '<li class="sempty">' + c.empty + "</li>";
    $("sheet-title").textContent = c.order;
    $("sheet-total-l").textContent = c.total;
    $("sheet-total").textContent = money(total);
    $("sheet-note").textContent = c.note;
    $("sheet-clear").textContent = c.clear;
    $("sheet-clear").hidden = n === 0;
    $("basket-label").textContent = c.view;
    $("basket-n").textContent = price(n, cur);
    $("basket-total").textContent = money(total);
    basket.hidden = n === 0;
    menu.classList.toggle("has-cart", n > 0);
    if (n === 0) closeSheet();
  }
  function openSheet() {
    if (!sheet.hidden) return;
    sheet.hidden = false;
    lockPage();
    $("sheet-x").focus({ preventScroll: true });
  }
  function closeSheet() {
    if (sheet.hidden) return;
    sheet.hidden = true;
    unlockPage();
    if (!basket.hidden) { try { basket.focus({ preventScroll: true }); } catch (err) {} }
  }
  function onCartClick(e) {
    var b = e.target.closest("[data-act]");
    if (!b) return;
    var k = +b.getAttribute("data-k"), q = qtyOf(k);
    setQty(k, b.getAttribute("data-act") === "add" ? q + 1 : q - 1);
  }
  content.addEventListener("click", onCartClick);
  $("sheet-list").addEventListener("click", onCartClick);
  $("lb-qty").addEventListener("click", onCartClick);
  basket.addEventListener("click", openSheet);
  $("sheet-x").addEventListener("click", closeSheet);
  $("sheet-back").addEventListener("click", closeSheet);
  $("sheet-clear").addEventListener("click", function () { cart = {}; saveCart(); renderCart(); });
  loadCart();

  /* ---------- splash ---------- */
  function closeSplash() {
    clearTimeout(splashTimer);
    if (splash.hidden) return;
    splash.classList.add("out");
    unlockPage();
    setTimeout(function () { splash.hidden = true; splash.classList.remove("out"); }, reduce ? 0 : 450);
    var h = $("menu-title"); if (h) h.focus({ preventScroll: true });
  }
  function openSplash() {
    splash.hidden = false;
    splash.classList.remove("out");
    lockPage();
    splashTimer = setTimeout(closeSplash, 2000);
  }
  splash.addEventListener("click", closeSplash);

  /* ---------- lightbox ---------- */
  function showPhoto(i) {
    var t = UI[cur], it;
    idx = (i + ALL.length) % ALL.length;
    it = ALL[idx].it;
    $("lb-card").classList.toggle("no-food-photo", !foodImagePath(it.img));
    $("lb-pic").innerHTML = pic(it, true);
    $("lb-qty").setAttribute("data-k", idx);
    $("lb-qty").innerHTML = qtyHtml(idx);
    $("lb-name").textContent = it.n[cur];
    $("lb-desc").textContent = it.d[cur];
    $("lb-price").innerHTML = price(it.p, cur) + " <small>" + t.cur + "</small>";
    lb.setAttribute("aria-label", it.n[cur]);
  }
  function openPhoto(i, opener) {
    lastFocus = opener || null;
    showPhoto(i);
    lb.hidden = false;
    lockPage();
    $("lb-close").focus({ preventScroll: true });
  }
  function closePhoto() {
    if (lb.hidden) return;
    lb.hidden = true;
    unlockPage();
    if (lastFocus) { try { lastFocus.focus({ preventScroll: true }); } catch (err) {} }
  }
  content.addEventListener("click", function (e) {
    var b = e.target.closest(".open");
    if (b && !e.target.closest(".buy")) openPhoto(+b.getAttribute("data-open"), b);
  });
  content.addEventListener("keydown", function (e) {
    if (e.key !== "Enter" && e.key !== " ") return;
    var b = e.target.closest(".open");
    if (b && e.target === b) { e.preventDefault(); openPhoto(+b.getAttribute("data-open"), b); }
  });
  $("lb-close").addEventListener("click", closePhoto);
  $("lb-prev").addEventListener("click", function () { showPhoto(idx - 1); });
  $("lb-next").addEventListener("click", function () { showPhoto(idx + 1); });
  lb.addEventListener("click", function (e) { if (e.target === lb) closePhoto(); });
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") { if (!sheet.hidden) closeSheet(); else if (!lb.hidden) closePhoto(); else if (!splash.hidden) closeSplash(); return; }
    if (lb.hidden) return;
    var rtl = menu.dir === "rtl";
    if (e.key === "ArrowRight") showPhoto(idx + (rtl ? -1 : 1));
    if (e.key === "ArrowLeft") showPhoto(idx + (rtl ? 1 : -1));
  });

  /* ---------- navigation ---------- */
  typeChips.addEventListener("click", function (e) {
    var b = e.target.closest("[data-group]");
    if (!b) return;
    var nextGroup = b.getAttribute("data-group");
    if (nextGroup !== activeGroup) {
      activeGroup = nextGroup;
      render(cur);
      measure();
      content.classList.remove("group-enter");
      void content.offsetWidth;
      content.classList.add("group-enter");
    }
    // Still one continuous, scrollable menu. New Food comes first on Food.
    // Scroll directly below the two navigation bars, not to a separate page.
    var desired = activeGroup === "food" ? $("featured") : $("choose-for-me");
    if (desired) {
      var navHeight = typesNav.offsetHeight + $("cats-nav").offsetHeight;
      var y = Math.max(0, desired.getBoundingClientRect().top + window.scrollY - navHeight - 8);
      window.scrollTo({top:y,behavior: reduce ? "auto" : "smooth"});
    }
  });
  content.addEventListener("click", function (e) {
    var suggest = e.target.closest("[data-suggest]");
    if (suggest) {
      var act = suggest.getAttribute("data-suggest");
      if (act === "details") { openPhoto(+suggest.getAttribute("data-k"), suggest); return; }
      showRandomSuggestion();
      return;
    }
    var jump = e.target.closest("[data-jump]");
    if (jump) goTo(jump.getAttribute("data-jump"));
  });
  chips.addEventListener("click", function (e) {
    var chip = e.target.closest(".chip");
    if (!chip) return;
    goTo(chip.getAttribute("data-target"));
  });

  picker.addEventListener("click", function (e) {
    var b = e.target.closest(".fs-lang");
    if (!b) return;
    activeGroup = "food";
    render(b.getAttribute("data-lang"));
    document.documentElement.classList.remove("nos");
    picker.hidden = true;
    menu.hidden = false;
    window.scrollTo(0, 0);
    measure();
    onScroll();
    // Open directly onto the featured food area, without the welcome overlay.
  });

  $("change").addEventListener("click", function () {
    closePhoto();
    closeSheet();
    menu.hidden = true;
    document.documentElement.classList.add("nos");
    picker.hidden = false;
    window.scrollTo(0, 0);
    picker.querySelector(".fs-lang").focus({ preventScroll: true });
  });
})();
