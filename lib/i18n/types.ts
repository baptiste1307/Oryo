export type SupportedLanguage = "en" | "fr";

export interface TranslationDictionary {
  common: {
    save: string;
    saving: string;
    cancel: string;
    delete: string;
    deleting: string;
    edit: string;
    create: string;
    back: string;
    loading: string;
    error: string;
    success: string;
    search: string;
    close: string;
    confirm: string;
    actions: string;
    copy: string;
    copied: string;
    downloadPdf: string;
    noData: string;
    view: string;
    optional: string;
    required: string;
    all: string;
    status: string;
    or: string;
  };
  nav: {
    tools: string;
    quotes: string;
    calculations: string;
    library: string;
    dashboard: string;
    account: string;
    login: string;
    signup: string;
    logout: string;
    demoMode: string;
    demoModeTooltip: string;
    legalLinks: string;
  };
  home: {
    indicator: string;
    title: string;
    subtitle: string;
    cards: {
      quotesTitle: string;
      quotesDesc: string;
      calcTitle: string;
      calcDesc: string;
      historyTitle: string;
      historyDesc: string;
    };
    noAccount: {
      title: string;
      subtitle: string;
      generateQuote: string;
      calculateProfit: string;
    };
  };
  auth: {
    loginTitle: string;
    loginSubtitle: string;
    signupTitle: string;
    signupSubtitle: string;
    emailLabel: string;
    emailPlaceholder: string;
    passwordLabel: string;
    passwordPlaceholder: string;
    confirmPasswordLabel: string;
    confirmPasswordPlaceholder: string;
    loginButton: string;
    signupButton: string;
    forgotPassword: string;
    noAccount: string;
    hasAccount: string;
    googleAuth: string;
    logout: string;
    loggingIn: string;
    signingUp: string;
  };
  dashboard: {
    title: string;
    welcome: string;
    quotesTab: string;
    calculationsTab: string;
    libraryTab: string;
    newQuote: string;
    newCalculation: string;
    allQuotes: string;
    allCalculations: string;
    emptyQuotes: string;
    emptyCalculations: string;
    emptyLibrary: string;
    recentQuotes: string;
    recentCalculations: string;
    clientsCount: string;
    productsCount: string;
  };
  quotes: {
    newQuoteTitle: string;
    clientSection: string;
    itemsSection: string;
    totalHt: string;
    vat: string;
    totalTtc: string;
    downloadPdf: string;
    draft: string;
    sent: string;
    accepted: string;
    rejected: string;
    deleteConfirm: string;
  };
  calculator: {
    title: string;
    subtitle: string;
    turnover: string;
    dailyRate: string;
    daysWorked: string;
    materialCosts: string;
    expenses: string;
    netMargin: string;
    netProfit: string;
    calculate: string;
    saveCalculation: string;
  };
  account: {
    title: string;
    profile: string;
    email: string;
    editEmail: string;
    changePassword: string;
    subscription: string;
    deleteAccount: string;
    deleteConfirm: string;
    deleteWarning: string;
  };
  legal: {
    privacy: string;
    terms: string;
    copyright: string;
  };
}
