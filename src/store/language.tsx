import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';

type Language = 'EN' | 'AR';

interface Translations {
  [key: string]: {
    EN: string;
    AR: string;
  };
}

export const translations: Translations = {
  'nav.vault': { EN: 'Vault', AR: 'الخزنة' },
  'nav.assets': { EN: 'Assets', AR: 'الأصول' },
  'nav.lounge': { EN: 'Lounge', AR: 'الردهة' },
  'nav.booking': { EN: 'Booking', AR: 'الحجز' },
  'nav.signin': { EN: 'Sign In', AR: 'تسجيل الدخول' },
  'home.hero.title': { EN: 'Own More. Together.', AR: 'امتلك أكثر. معاً.' },
  'home.hero.subtitle': { EN: 'The AI-powered fractional ownership platform in the UAE.', AR: 'منصة الملكية الجزئية المدعومة بالذكاء الاصطناعي في الإمارات.' },
  'home.hero.start': { EN: 'Start Cosharing', AR: 'ابدأ المشاركة' },
  'home.hero.list': { EN: 'List Your Asset', AR: 'اعرض أصلك' },
  'home.why.title': { EN: 'Why coshare.', AR: 'لماذا coshare.' },
  'home.why.subtitle': { EN: 'A smarter way to access and optimize premium assets.', AR: 'طريقة أذكى للوصول إلى الأصول الفاخرة والاستفادة منها.' },
  'home.why.1.title': { EN: 'Smart Ownership', AR: 'ملكية ذكية' },
  'home.why.1.desc': { EN: 'Why pay 100% for an asset you use 15% of the time? Enjoy premium lifestyle with shared ownership and exclusive use.', AR: 'لماذا تدفع 100٪ لأصل تستخدمه 15٪ من الوقت؟ استمتع بأسلوب الحياة الفاخر مع الملكية المشتركة والاستخدام الحصري.' },
  'home.why.2.title': { EN: 'Hassle-Free Experience', AR: 'تجربة خالية من المتاعب' },
  'home.why.2.desc': { EN: 'One fraction, pure enjoyment. We handle maintenance, insurance, and storage. You just focus on the experience.', AR: 'حصة واحدة، متعة خالصة. نحن نتولى الصيانة والتأمين والتخزين. أنت تركز فقط على الاستمتاع بالتجربة.' },
  'home.why.3.title': { EN: 'Guaranteed Access', AR: 'وصول مضمون' },
  'home.why.3.desc': { EN: 'Our AI-driven booking system ensures fair and equal access for all co-owners, even during peak seasons.', AR: 'يضمن نظام الحجز المدعوم بالذكاء الاصطناعي الخاص بنا وصولاً عادلاً ومتساوياً لجميع الملاك المشاركين، حتى خلال مواسم الذروة.' },
  'home.featured.title': { EN: 'Featured Assets', AR: 'الأصول المميزة' },
  'home.featured.viewAll': { EN: 'View All Assets', AR: 'عرض جميع الأصول' },
  'home.how.title': { EN: 'How it works', AR: 'كيف تعمل' },
  'home.how.1.title': { EN: '1. Choose your asset', AR: '1. اختر أصلك' },
  'home.how.1.desc': { EN: 'Browse our curated collection of premium assets.', AR: 'تصفح مجموعتنا المختارة من الأصول الفاخرة.' },
  'home.how.2.title': { EN: '2. Buy your fraction', AR: '2. اشترِ حصتك' },
  'home.how.2.desc': { EN: 'Acquire from 1/8th to 1/2 of the asset securely.', AR: 'احصل على من 1/8 إلى 1/2 من الأصل بأمان.' },
  'home.how.3.title': { EN: '3. Enjoy the lifestyle', AR: '3. استمتع بأسلوب الحياة' },
  'home.how.3.desc': { EN: 'Book your days via the app and let us handle the rest.', AR: 'احجز أيامك عبر التطبيق ودعنا نتولى الباقي.' },
  'asset.calculator.title': { EN: 'Investment Calculator', AR: 'حاسبة الاستثمار' },
  'asset.calculator.shares': { EN: 'Select Shares', AR: 'حدد الحصص' },
  'asset.calculator.days': { EN: 'Days per year', AR: 'أيام في السنة' },
  'asset.calculator.total': { EN: 'Total Investment', AR: 'إجمالي الاستثمار' },
  'asset.share': { EN: 'Share', AR: 'حصة' },
  'asset.shares': { EN: 'Shares', AR: 'حصص' },
  'asset.available': { EN: 'Available', AR: 'متاح' },
  'asset.soldOut': { EN: 'Sold Out', AR: 'مباع بالكامل' },
  'asset.acquire': { EN: 'Acquire Share', AR: 'احصل على حصة' },
  'asset.pricePerShare': { EN: 'Price per Share', AR: 'السعر لكل حصة' },
  'footer.tagline': { EN: 'Own More. Together', AR: 'امتلك أكثر. معاً' },
  'footer.terms': { EN: 'Terms', AR: 'الشروط' },
  'footer.privacy': { EN: 'Privacy', AR: 'الخصوصية' },
  'footer.contact': { EN: 'Contact', AR: 'اتصل بنا' },
};

interface LanguageContextType {
  lang: Language;
  toggleLang: () => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [lang, setLang] = useState<Language>('EN');

  useEffect(() => {
    document.documentElement.dir = lang === 'AR' ? 'rtl' : 'ltr';
    document.documentElement.lang = lang.toLowerCase();
  }, [lang]);

  const toggleLang = () => {
    setLang((prev) => (prev === 'EN' ? 'AR' : 'EN'));
  };

  const t = (key: string): string => {
    if (translations[key]) {
      return translations[key][lang];
    }
    return key;
  };

  return (
    <LanguageContext.Provider value={{ lang, toggleLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
