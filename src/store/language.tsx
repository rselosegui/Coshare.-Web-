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
  'home.why.subtitle': { EN: 'A smarter, RTA-compliant way to access and optimize premium assets in the UAE.', AR: 'طريقة أذكى ومتوافقة مع هيئة الطرق والمواصلات للوصول إلى الأصول الفاخرة وتحسينها في الإمارات.' },
  'home.why.1.title': { EN: 'Smart Ownership', AR: 'ملكية ذكية' },
  'home.why.1.desc': { EN: 'Why pay 100% for an asset you use 15% of the time? Enjoy the full lifestyle for a fraction of the cost.', AR: 'لماذا تدفع 100٪ لأصل تستخدمه 15٪ من الوقت؟ استمتع بأسلوب الحياة الكامل بجزء بسيط من التكلفة.' },
  'home.why.2.title': { EN: 'RTA Compliance', AR: 'التوافق مع هيئة الطرق والمواصلات' },
  'home.why.2.desc': { EN: 'Legal title held by a vetted Lead Owner, with all participants registered as authorized Cosharers on the Mulkiya.', AR: 'الملكية القانونية يحتفظ بها مالك رئيسي معتمد، مع تسجيل جميع المشاركين كمشاركين مفوضين في الملكية.' },
  'home.why.3.title': { EN: 'Hassle-Free', AR: 'بدون عناء' },
  'home.why.3.desc': { EN: 'We handle maintenance, insurance, and storage. You just focus on the drive.', AR: 'نحن نتولى الصيانة والتأمين والتخزين. أنت تركز فقط على القيادة.' },
  'home.why.4.title': { EN: 'Secondary Market', AR: 'السوق الثانوية' },
  'home.why.4.desc': { EN: 'Lifestyle changes? Securely transfer your cosharing rights to other verified members anytime.', AR: 'تغير أسلوب حياتك؟ قم بنقل حقوق المشاركة الخاصة بك بأمان إلى أعضاء آخرين تم التحقق منهم في أي وقت.' },
  'home.why.5.title': { EN: 'Vetted Community', AR: 'مجتمع موثوق' },
  'home.why.5.desc': { EN: 'Join a private circle of luxury enthusiasts. Every participant undergoes rigorous vetting.', AR: 'انضم إلى دائرة خاصة من محبي الفخامة. يخضع كل مشارك لعملية تدقيق صارمة.' },
  'home.featured.title': { EN: 'Featured Assets', AR: 'الأصول المميزة' },
  'home.featured.viewAll': { EN: 'View All Assets', AR: 'عرض جميع الأصول' },
  'home.how.title': { EN: 'How it works', AR: 'كيف تعمل' },
  'home.how.1.title': { EN: '01. List & Invite', AR: '01. اعرض وادعُ' },
  'home.how.1.desc': { EN: 'Post your own asset or discover a new one. Invite your inner circle or find verified co-owners in our secure marketplace.', AR: 'اعرض أصلك الخاص أو اكتشف أصلاً جديداً. ادعُ دائرتك المقربة أو ابحث عن ملاك مشاركين تم التحقق منهم في سوقنا الآمن.' },
  'home.how.2.title': { EN: '02. Stake & Settle', AR: '02. الحصة والتسوية' },
  'home.how.2.desc': { EN: 'Expenses, insurance, and maintenance are automatically split by your stake. Settle costs transparently via the app.', AR: 'يتم تقسيم المصاريف والتأمين والصيانة تلقائياً حسب حصتك. قم بتسوية التكاليف بشفافية عبر التطبيق.' },
  'home.how.3.title': { EN: '03. Smart Scheduling', AR: '03. الجدولة الذكية' },
  'home.how.3.desc': { EN: 'Book your time with ease. Our AI-powered calendar prevents scheduling conflicts automatically, ensuring fair access.', AR: 'احجز وقتك بسهولة. يمنع تقويمنا المدعوم بالذكاء الاصطناعي تضارب المواعيد تلقائياً، مما يضمن وصولاً عادلاً.' },
  'home.how.4.title': { EN: '04. AI Governance', AR: '04. حوكمة الذكاء الاصطناعي' },
  'home.how.4.desc': { EN: 'Experience total peace of mind. From automated maintenance alerts to fair dispute resolution, our AI handles the harmony.', AR: 'استمتع براحة بال تامة. من تنبيهات الصيانة التلقائية إلى حل النزاعات العادل، يتولى الذكاء الاصطناعي الخاص بنا التناغم.' },
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
  'home.faq.title': { EN: 'Frequently Asked Questions', AR: 'الأسئلة الشائعة' },
  'home.faq.subtitle': { EN: 'Everything you need to know about fractional ownership in the UAE.', AR: 'كل ما تحتاج لمعرفته حول الملكية الجزئية في الإمارات.' },
  'home.faq.1.q': { EN: 'What is fractional ownership?', AR: 'ما هي الملكية الجزئية؟' },
  'home.faq.1.a': { EN: "Fractional ownership is a method in which several unrelated parties can share in, and mitigate the risk of, ownership of a high-value tangible asset. In Coshare's case, this includes supercars and yachts.", AR: 'الملكية الجزئية هي طريقة يمكن من خلالها لعدة أطراف غير مرتبطة المشاركة في ملكية أصل ملموس عالي القيمة وتخفيف مخاطرها. في حالة Coshare، يشمل ذلك السيارات الخارقة واليخوت.' },
  'home.faq.2.q': { EN: 'Is it legal in the UAE?', AR: 'هل هي قانونية في الإمارات؟' },
  'home.faq.2.a': { EN: 'Yes. Phase 1 utilizes a streamlined legal structure where legal title and registration (Mulkiya) are held by a vetted Lead Owner, with all other participants registered as authorized Cosharers (Named Drivers) to ensure strict RTA compliance.', AR: 'نعم. تستخدم المرحلة الأولى هيكلاً قانونياً مبسطاً حيث يحتفظ مالك رئيسي معتمد بالملكية القانونية والتسجيل (الملكية)، مع تسجيل جميع المشاركين الآخرين كمشاركين مفوضين (سائقين مسميين) لضمان الامتثال الصارم لهيئة الطرق والمواصلات.' },
  'home.faq.3.q': { EN: 'How are maintenance and insurance handled?', AR: 'كيف يتم التعامل مع الصيانة والتأمين؟' },
  'home.faq.3.a': { EN: 'Coshare provides a fully managed service. We handle all maintenance, comprehensive insurance, secure storage, and cleaning. Owners simply pay a proportional monthly management fee.', AR: 'توفر Coshare خدمة مدارة بالكامل. نحن نتولى جميع أعمال الصيانة والتأمين الشامل والتخزين الآمن والتنظيف. يدفع المالكون ببساطة رسوم إدارة شهرية تناسبية.' },
  'home.faq.4.q': { EN: 'Can I sell my fraction later?', AR: 'هل يمكنني بيع حصتي لاحقاً؟' },
  'home.faq.4.a': { EN: 'Yes. Coshare provides a secondary marketplace where you can list your shares for sale to other verified users, providing liquidity to your luxury investments.', AR: 'نعم. توفر Coshare سوقاً ثانوياً حيث يمكنك عرض حصصك للبيع لمستخدمين آخرين تم التحقق منهم، مما يوفر السيولة لاستثماراتك الفاخرة.' },
  'asset.legal.title': { EN: 'Legal & Ownership Structure', AR: 'الهيكل القانوني والملكية' },
  'asset.legal.desc': { EN: 'Phase 1 utilizes a streamlined legal structure where legal title and registration (Mulkiya) are held by a vetted Lead Owner, with all other participants registered as authorized Cosharers (Named Drivers) to ensure strict RTA compliance.', AR: 'تستخدم المرحلة الأولى هيكلاً قانونياً مبسطاً حيث يحتفظ مالك رئيسي معتمد بالملكية القانونية والتسجيل (الملكية)، مع تسجيل جميع المشاركين الآخرين كمشاركين مفوضين (سائقين مسميين) لضمان الامتثال الصارم لهيئة الطرق والمواصلات.' },
  'asset.legal.entityType': { EN: 'Entity Type', AR: 'نوع الكيان' },
  'asset.legal.entityValue': { EN: 'Lead Owner & Authorized Cosharers', AR: 'مالك رئيسي ومشاركون مفوضون' },
  'asset.legal.status': { EN: 'Asset Status', AR: 'حالة الأصل' },
  'asset.legal.statusValue': { EN: 'Fully Insured & RTA Compliant', AR: 'مؤمن بالكامل ومتوافق مع هيئة الطرق والمواصلات' },
  'asset.legal.docs': { EN: 'Due Diligence Documents', AR: 'وثائق العناية الواجبة' },
  'asset.legal.doc1': { EN: 'Cosharing Agreement (Draft)', AR: 'اتفاقية المشاركة (مسودة)' },
  'asset.legal.doc2': { EN: 'Independent Valuation Report', AR: 'تقرير تقييم مستقل' },
  'asset.legal.doc3': { EN: 'Physical Inspection Certificate', AR: 'شهادة فحص فيزيائي' },
  'asset.benefits.title': { EN: 'Ownership Benefits', AR: 'مزايا الملكية' },
  'asset.benefits.usage': { EN: 'Guaranteed Usage Days', AR: 'أيام استخدام مضمونة' },
  'asset.benefits.usageDesc': { EN: 'Enjoy proportional access to the asset throughout the year based on your share ownership.', AR: 'استمتع بوصول تناسبي للأصل طوال العام بناءً على ملكيتك للحصص.' },
  'asset.benefits.managed': { EN: 'Fully Managed', AR: 'مدار بالكامل' },
  'asset.benefits.managedDesc': { EN: 'Maintenance, insurance, and storage are completely handled by the coshare. team.', AR: 'يتم التعامل مع الصيانة والتأمين والتخزين بالكامل من قبل فريق coshare.' },
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
