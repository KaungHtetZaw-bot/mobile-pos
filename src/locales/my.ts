import type { Translations } from "./en";

export const my: Translations = {
  // Navigation / Sidebar
  sidebar: {
    dashboard: "ဒက်ရှ်ဘုတ်",
    pos: "အရောင်းကောင်တာ (POS)",
    inventory: "ကုန်ပစ္စည်းစာရင်း",
    transactions: "အရောင်းမှတ်တမ်းများ",
    admin: "စီမံခန့်ခွဲမှု",
    newSale: "အရောင်းအသစ်",
    collapseSidebar: "ဘေးဘားသိမ်းရန်",
    expandSidebar: "ဘေးဘားချဲ့ရန်",
    manager: "မန်နေဂျာ"
  },
  
  // Dashboard View
  dashboard: {
    title: "ဒက်ရှ်ဘုတ် ခြုံငုံသုံးသပ်ချက်",
    todayStoreRevenue: "ယနေ့ အရောင်းရငွေစုစုပေါင်း",
    monthlyProfit: "ခန့်မှန်းခြေ လစဉ်အမြတ် (45% GM)",
    stockThresholds: "ကုန်ပစ္စည်းသိုလှောင်မှု အခြေအနေ",
    allHealthy: "သိုလှောင်မှု လုံလောက်ပါသည်",
    needsAction: "စစ်ဆေးရန်လိုအပ်သည်",
    createNewSale: "အရောင်းအသစ်ဖွင့်ရန်",
    exportPdfReport: "PDF အစီရင်ခံစာ ထုတ်ယူရန်",
    hourlyRevenueVolume: "နာရီအလိုက် အရောင်းရငွေနှင့် အရေအတွက်",
    recentTransactions: "မကြာသေးမီက အရောင်းမှတ်တမ်းများ",
    viewAll: "အရောင်းမှတ်တမ်းအားလုံးကြည့်ရန်",
    lowStockAlerts: "လက်ကျန်နည်းနေသော သတိပေးချက်များ",
    flagged: "အရေအတွက်နည်းနေပါသည်",
    last24Hours: "လွန်ခဲ့သော ၂၄ နာရီအတွင်း",
    revenue: "ရောင်းရငွေ",
    salesCount: "အရောင်းအကြိမ်ရေ",
    bestSellers: "လူကြိုက်အများဆုံး ရောင်းအားကောင်းကုန်ပစ္စည်းများ",
    unitsSold: "ခု ရောင်းချပြီး",
    noRecentTx: "ယနေ့အတွက် မကြာသေးမီက အရောင်းမှတ်တမ်းများ မရှိသေးပါ။"
  },

  // POS Terminal View
  pos: {
    title: "အရောင်းကောင်တာ",
    searchPlaceholder: "တံဆိပ်၊ အချက်အလက် သို့မဟုတ် အမျိုးအစား ရှာဖွေရန်...",
    allCategories: "အမျိုးအစားအားလုံး",
    imeiRequired: "IMEI / စီရီယယ်နံပါတ် လိုအပ်သည်",
    imeiPlaceholder: "IMEI နံပါတ် ရိုက်ထည့်ပါ...",
    addToCart: "ခြင်းတောင်းထဲထည့်ရန်",
    currentCart: "ရွေးချယ်ထားသောပစ္စည်းများ",
    emptyCart: "ခြင်းတောင်းထဲတွင် ပစ္စည်းမရှိသေးပါ။ ကျေးဇူးပြု၍ ဘယ်ဘက်မှ ပစ္စည်းများကို ရွေးချယ်ပေးပါ။",
    subtotal: "စုစုပေါင်း",
    tax: "အခွန် (၅%)",
    discount: "လျှော့စျေး",
    total: "ကျသင့်ငွေစုစုပေါင်း",
    paymentMethod: "ငွေပေးချေမှုစနစ်",
    customerInfo: "ဝယ်ယူသူ အချက်အလက်",
    customerName: "ဝယ်ယူသူအမည်",
    customerEmail: "အီးမေးလ်လိပ်စာ",
    completeCheckout: "ငွေတောင်းခံလွှာပိတ်ရန်",
    invalidImei: "ကျေးဇူးပြု၍ ကုန်ပစ္စည်းအတွက် မှန်ကန်သော IMEI ထည့်သွင်းပေးပါ - {name}",
    enterCustomerName: "ဝယ်ယူသူအမည် ထည့်သွင်းရန် လိုအပ်ပါသည်",
    checkoutSuccess: "ဝယ်ယူမှု အောင်မြင်စွာ ဆောင်ရွက်ပြီးပါပြီ။",
    outOfStock: "ပစ္စည်းပြတ်နေသည်"
  },

  // Inventory View
  inventory: {
    title: "ကုန်ပစ္စည်းစာရင်း စီမံခန့်ခွဲမှု",
    searchPlaceholder: "ကုန်ပစ္စည်းအမည်၊ တံဆိပ် သို့မဟုတ် အချက်အလက်များ ရှာဖွေရန်...",
    addNewProduct: "ကုန်ပစ္စည်းအသစ်ထည့်ရန်",
    editProduct: "ကုန်ပစ္စည်းအချက်အလက်ပြင်ရန်",
    productName: "ကုန်ပစ္စည်းအမည်",
    brand: "တံဆိပ်/ကုန်အမှတ်တံဆိပ်",
    category: "အမျိုးအစား",
    price: "စျေးနှုန်း",
    stock: "လက်ကျန်အရေအတွက်",
    color: "အရောင် / ပုံစံ",
    specs: "အသေးစိတ်အချက်အလက်များ",
    saveChanges: "ကုန်ပစ္စည်း သိမ်းဆည်းရန်",
    cancel: "မလုပ်တော့ပါ",
    actions: "လုပ်ဆောင်ချက်များ",
    noProducts: "ရှာဖွေမှုနှင့် ကိုက်ညီသော ကုန်ပစ္စည်းများ မရှိပါ။",
    createSuccess: "ကုန်ပစ္စည်းအသစ် ထည့်သွင်းပြီးပါပြီ။",
    updateSuccess: "ကုန်ပစ္စည်းအချက်အလက်ကို ပြင်ဆင်ပြီးပါပြီ။",
    deleteSuccess: "ကုန်ပစ္စည်းကို ဖျက်သိမ်းပြီးပါပြီ။"
  },

  // Transactions View
  transactions: {
    title: "အရောင်းမှတ်တမ်းများ",
    searchPlaceholder: "ဝယ်ယူသူအမည်၊ အီးမေးလ် သို့မဟုတ် ဘောက်ချာနံပါတ်ဖြင့် ရှာရန်...",
    txnId: "ဘောက်ချာနံပါတ်",
    dateTime: "နေ့ရက်နှင့် အချိန်",
    customer: "ဝယ်ယူသူ",
    payment: "ငွေပေးချေမှုပုံစံ",
    amount: "စုစုပေါင်းကျသင့်ငွေ",
    status: "အခြေအနေ",
    viewDetails: "အသေးစိတ်ကြည့်ရန်",
    receiptTitle: "ငွေရပြေစာ",
    printReceipt: "ဘောက်ချာထုတ်ရန်",
    refundTransaction: "ငွေပြန်အမ်းရန်",
    refundSuccess: "ငွေပြန်အမ်းမှု အောင်မြင်ပါသည်!",
    statusCompleted: "အောင်မြင်သည်",
    statusRefunded: "ပြန်အမ်းပြီး",
    statusPending: "ဆိုင်းငံ့ထားဆဲ",
    totalPurchased: "ဝယ်ယူခဲ့သော ပစ္စည်းအရေအတွက်",
    noTxns: "ကိုက်ညီသော အရောင်းမှတ်တမ်း မရှိပါ။"
  },

  // Admin View
  admin: {
    title: "စီမံခန့်ခွဲမှု ကဏ္ဍ",
    storeSettings: "ဆိုင်အချက်အလက်နှင့် ပရိုဖိုင်",
    storeName: "ဆိုင်အမည်",
    managerName: "မန်နေဂျာအမည်",
    currencySymbol: "ငွေကြေးသင်္ကေတ",
    taxRate: "အခွန်နှုန်းထား (%)",
    saveSettings: "ပြင်ဆင်ချက်များ သိမ်းရန်",
    settingsSaved: "ဆိုင်သတ်မှတ်ချက်များကို အောင်မြင်စွာ သိမ်းဆည်းပြီးပါပြီ!",
    systemMaintenance: "စနစ် ထိန်းသိမ်းခြင်း",
    resetData: "ဆိုင်အချက်အလက်များ မူလအတိုင်းပြန်ထားရန်",
    resetWarning: "ဤလုပ်ဆောင်ချက်သည် ရှိပြီးသား ကုန်ပစ္စည်းများနှင့် အရောင်းမှတ်တမ်းများအားလုံးကို နမူနာအချက်အလက်များအတိုင်း အစားထိုးပါမည်။ လက်ရှိပြင်ဆင်ထားမှုများ ဆုံးရှုံးပါလိမ့်မည်။",
    resetBtn: "နမူနာအချက်အလက်များအတိုင်း ပြန်လည်စတင်ရန်",
    resetSuccess: "အချက်အလက်များကို နမူနာအချက်အလက်များအတိုင်း ပြန်လည်ပြင်ဆင်ပြီးပါပြီ။"
  },

  // Auth Layout (Login & Register)
  auth: {
    loginTitle: "စီမံခန့်ခွဲမှုကဏ္ဍသို့ ဝင်ရောက်ရန်",
    loginSub: "မိုဘိုင်းပတ်စ် (MobilePulse) ဆိုင်စီမံခန့်ခွဲမှုစနစ် သို့ ဝင်ရောက်ပါ",
    registerTitle: "အကောင့်အသစ် ဖွင့်လှစ်ရန်",
    registerSub: "ဆိုင်မန်နေဂျာ အကောင့်အသစ်တစ်ခုကို စတင်ဖန်တီးပါ",
    email: "အီးမေးလ် လိပ်စာ",
    emailPlaceholder: "manager@mobilepulse.com",
    password: "လျှို့ဝှက်နံပါတ်",
    passwordPlaceholder: "လျှို့ဝှက်နံပါတ် ရိုက်ထည့်ပါ",
    confirmPassword: "လျှို့ဝှက်နံပါတ် ထပ်မံအတည်ပြုရန်",
    confirmPasswordPlaceholder: "လျှို့ဝှက်နံပါတ် ထပ်မံရိုက်ထည့်ပါ",
    fullName: "အမည်အပြည့်အစုံ",
    fullNamePlaceholder: "ကိုကျော်စွာ",
    rememberMe: "မှတ်ထားပါ",
    forgotPassword: "လျှို့ဝှက်နံပါတ် မေ့သွားပါသလား?",
    signInBtn: "စနစ်ထဲသို့ ဝင်ရောက်ရန်",
    registerBtn: "အကောင့်အသစ် ဖန်တီးရန်",
    noAccount: "အကောင့်မရှိသေးပါသလား?",
    signUpLink: "ဤနေရာတွင် အကောင့်သစ်ဖွင့်ပါ",
    haveAccount: "အကောင့်ရှိပြီးသားလား?",
    signInLink: "ဤနေရာတွင် ဝင်ရောက်ပါ",
    agreeToTerms: "စည်းကမ်းချက်များကို သဘောတူပါသည်",
    errorRequired: "ဤအကွက်ကို ဖြည့်စွက်ရန် လိုအပ်သည်",
    errorEmailInvalid: "မှန်ကန်သော အီးမေးလ်လိပ်စာ ရိုက်ထည့်ပေးပါ",
    errorPasswordMatch: "လျှို့ဝှက်နံပါတ်များ ကိုက်ညီမှု မရှိပါ",
    errorPasswordLength: "လျှို့ဝှက်နံပါတ်သည် အနည်းဆုံး ၆ လုံး ရှိရမည်",
    termsRequired: "စည်းကမ်းချက်များကို သဘောတူရန် လိုအပ်သည်",
    loginSuccess: "စနစ်ထဲသို့ အောင်မြင်စွာ ဝင်ရောက်ပြီးပါပြီ။",
    registerSuccess: "အကောင့်ဖန်တီးမှု စမ်းသပ်မှု အောင်မြင်ပါသည်။ ဝင်ရောက်ရန် စာမျက်နှာသို့ ပြန်ညွှန်နေပါသည်..."
  },

  // Theme Toggle
  theme: {
    darkMode: "ညဘက်မုဒ်",
    lightMode: "နေ့ဘက်မုဒ်"
  }
};
