export const en = {
  // Navigation / Sidebar
  sidebar: {
    dashboard: "Dashboard",
    pos: "POS Terminal",
    inventory: "Inventory",
    transactions: "Transactions",
    admin: "Admin Panel",
    newSale: "New Sale",
    collapseSidebar: "Collapse Sidebar",
    expandSidebar: "Expand Sidebar",
    manager: "Manager"
  },
  
  // Dashboard View
  dashboard: {
    title: "Dashboard Overview",
    todayStoreRevenue: "Today's Store Revenue",
    monthlyProfit: "Monthly Profit ({margin} GM)",
    stockThresholds: "Stock Thresholds",
    allHealthy: "All Healthy",
    needsAction: "Needs Action",
    createNewSale: "Create New Sale",
    exportPdfReport: "Export PDF Report",
    hourlyRevenueVolume: "Hourly Revenue & Volume",
    recentTransactions: "Recent Transactions",
    viewAll: "View All Transactions",
    lowStockAlerts: "Low Stock Alerts",
    flagged: "flagged",
    last24Hours: "Last 24 Hours",
    revenue: "Revenue",
    salesCount: "Sales Count",
    bestSellers: "Top Selling Products",
    unitsSold: "units sold",
    noRecentTx: "No recent transactions found today."
  },

  // POS Terminal View
  pos: {
    title: "POS Terminal",
    searchPlaceholder: "Search brand, specs, category...",
    allCategories: "All Categories",
    allBrands: "All Brands",
    imeiRequired: "IMEI / Serial Required",
    imeiPlaceholder: "Enter IMEI number...",
    addToCart: "Add to Cart",
    currentCart: "Current Cart",
    emptyCart: "Cart is empty. Select products from the left to start checking out.",
    subtotal: "Subtotal",
    tax: "Tax (5%)",
    discount: "Discount",
    total: "Total",
    paymentMethod: "Payment Method",
    customerInfo: "Customer Information",
    customerName: "Customer Name",
    customerEmail: "Customer Email",
    completeCheckout: "Complete Checkout",
    invalidImei: "Please provide a valid IMEI for product: {name}",
    enterCustomerName: "Customer name is required",
    checkoutSuccess: "Transaction successfully completed!",
    outOfStock: "Out of Stock"
  },

  // Inventory View
  inventory: {
    title: "Inventory Management",
    searchPlaceholder: "Search product name, brand, or specs...",
    addNewProduct: "Add New Product",
    editProduct: "Edit Product",
    productName: "Product Name",
    brand: "Brand",
    category: "Category",
    price: "Price",
    stock: "Stock Qty",
    color: "Color / Finish",
    specs: "Specifications",
    saveChanges: "Save Product",
    cancel: "Cancel",
    actions: "Actions",
    noProducts: "No products matched your search filter.",
    createSuccess: "Product created successfully!",
    updateSuccess: "Product updated successfully!",
    deleteSuccess: "Product deleted successfully!"
  },

  // Transactions View
  transactions: {
    title: "Transaction History",
    searchPlaceholder: "Search by customer name, email, or transaction ID...",
    txnId: "Transaction ID",
    dateTime: "Date / Time",
    customer: "Customer",
    payment: "Payment Method",
    amount: "Amount",
    status: "Status",
    viewDetails: "View Details",
    receiptTitle: "Store Receipt",
    printReceipt: "Print Receipt",
    refundTransaction: "Refund Transaction",
    refundSuccess: "Transaction refunded successfully!",
    statusCompleted: "Completed",
    statusRefunded: "Refunded",
    statusPending: "Pending",
    totalPurchased: "Total Purchased Items",
    noTxns: "No transactions match your query."
  },

  // Admin View
  admin: {
    title: "Admin Panel & Controls",
    storeSettings: "Store & Profile Settings",
    storeName: "Store Name",
    managerName: "Manager Name",
    currencySymbol: "Currency Symbol",
    taxRate: "Tax Rate (%)",
    saveSettings: "Save Configuration",
    settingsSaved: "Store configuration saved successfully!",
    systemMaintenance: "System Maintenance",
    resetData: "Reset Store Database",
    resetWarning: "This will restore the products and transactions database to the default demo data. Existing modifications will be lost.",
    resetBtn: "Restore Demo Defaults",
    resetSuccess: "Database has been reset to defaults."
  },

  // Auth Layout (Login & Register)
  auth: {
    loginTitle: "Sign In to Premium Hub",
    loginSub: "Access your MobilePulse management workspace",
    registerTitle: "Create Workspace Account",
    registerSub: "Get started by creating a new manager profile",
    email: "Email Address",
    emailPlaceholder: "manager@mobilepulse.com",
    password: "Password",
    passwordPlaceholder: "Enter secure password",
    confirmPassword: "Confirm Password",
    confirmPasswordPlaceholder: "Re-enter secure password",
    fullName: "Full Name",
    fullNamePlaceholder: "Alex Rivera",
    rememberMe: "Remember me",
    forgotPassword: "Forgot Password?",
    signInBtn: "Sign In to Workspace",
    registerBtn: "Register Account",
    noAccount: "Don't have an account?",
    signUpLink: "Sign up here",
    haveAccount: "Already have an account?",
    signInLink: "Sign in here",
    agreeToTerms: "I agree to the Terms & Conditions",
    errorRequired: "This field is required",
    errorEmailInvalid: "Please enter a valid email address",
    errorPasswordMatch: "Passwords do not match",
    errorPasswordLength: "Password must be at least 6 characters",
    termsRequired: "You must agree to the terms",
    loginSuccess: "Successfully authenticated!",
    registerSuccess: "Registration simulated successfully! Redirecting to login..."
  },

  // Theme Toggle
  theme: {
    darkMode: "Dark Mode",
    lightMode: "Light Mode"
  }
};

export type Translations = typeof en;
