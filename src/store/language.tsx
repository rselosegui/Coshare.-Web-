import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';

type Language = 'EN' | 'AR';

interface Translations {
  [key: string]: {
    EN: string;
    AR: string;
  };
}

export const translations: Translations = {
  'nav.howItWorks': { EN: 'How It Works', AR: 'كيف تعمل' },
  'nav.useCases': { EN: 'Use Cases', AR: 'حالات الاستخدام' },
  'nav.faq': { EN: 'FAQs', AR: 'الأسئلة الشائعة' },
  'banner.text': { EN: 'Coshare is now available on iOS!', AR: 'كوشير متاح الآن على نظام iOS!' },
  'banner.cta': { EN: 'Download App', AR: 'تحميل التطبيق' },
  'home.hero.title': { EN: 'Own More. Together.', AR: 'امتلك أكثر. معاً.' },
  'home.hero.subtitle': { EN: 'Share what you own, swap for the experiences you want, and co-own cars, boats, and more you love, all seamlessly handled by AI.', AR: 'شارك ما تملكه، وبادل للحصول على التجارب التي تريدها، وامتلك سيارات وقوارب والمزيد مما تحب، كل ذلك يتم إدارته بسلاسة بواسطة الذكاء الاصطناعي.' },
  'home.hero.start': { EN: 'Start Cosharing', AR: 'ابدأ المشاركة' },
  'home.why.title': { EN: 'Why ', AR: 'لماذا ' },
  'home.why.subtitle': { EN: 'The smart ecosystem for modern asset ownership. Share what you own for global Swap Credits, or team up to co-own assets for a fraction of the price. We handle the legal framework, cost-splitting, and seamless scheduling.', AR: 'النظام البيئي الذكي للملكية الحديثة للأصول. شارك ما تملكه للحصول على أرصدة مبادلة عالمية، أو تعاون لامتلاك أصول بشكل مشترك بجزء من السعر. نحن نتولى الإطار القانوني وتقسيم التكاليف والجدولة السلسة.' },
  'home.why.1.title': { EN: 'The Share & Swap Network', AR: 'شبكة المشاركة والتبادل' },
  'home.why.1.desc': { EN: 'Monetize your assets or shares to earn global Swap Credits. Simply release unused days to the pool and unlock access to homes, cars, and things worldwide.', AR: 'حوّل أصولك أو حصصك إلى أرصدة مبادلة عالمية. أطلق أيامك غير المستخدمة في المجموعة وافتح الوصول إلى المنازل والسيارات وغيرها حول العالم.' },
  'home.why.1.badge': { EN: 'Global Network', AR: 'شبكة عالمية' },
  'home.why.2.title': { EN: 'Split Costs Automatically', AR: 'تقسيم التكاليف تلقائياً' },
  'home.why.2.desc': { EN: 'Our platform automatically divides maintenance, insurance, and storage costs seamlessly among co-owners, proportional to each person\'s stake.', AR: 'تقوم منصتنا تلقائياً بتوزيع تكاليف الصيانة والتأمين والتخزين بسلاسة بين الملاك المشاركين بما يتناسب مع حصة كل شخص.' },
  'home.why.2.badge': { EN: 'Auto Split', AR: 'تقسيم آلي' },
  'home.why.3.title': { EN: 'Conflict-Free Scheduling', AR: 'جدولة بلا نزاعات' },
  'home.why.3.desc': { EN: 'Our AI manages the heavy lifting — from scheduling preventive maintenance to resolving disputes — all automatically, as seamlessly as day-to-day.', AR: 'يتولى الذكاء الاصطناعي لدينا المهام الثقيلة — من جدولة الصيانة الوقائية إلى حل النزاعات — كل ذلك تلقائياً وبسلاسة تامة.' },
  'home.why.3.badge': { EN: 'AI Powered', AR: 'مدعوم بالذكاء الاصطناعي' },
  'home.why.4.title': { EN: 'Generate Earnings', AR: 'توليد الأرباح' },
  'home.why.4.desc': { EN: 'Let your asset work for you. The pool creates the best opportunities to monetize your unused days as passive income.', AR: 'دع أصلك يعمل لصالحك. تخلق المجموعة أفضل الفرص لتحقيق الدخل من أيامك غير المستخدمة كدخل سلبي.' },
  'home.why.4.badge': { EN: 'Passive Income', AR: 'دخل سلبي' },
  'home.why.5.title': { EN: 'Easy to Sell', AR: 'سهل البيع' },
  'home.why.5.desc': { EN: 'Your assets never sit forever. When you\'re ready to move on, our public marketplace lets you list your fraction for sale at any time.', AR: 'أصولك لا تظل خاملة إلى الأبد. عندما تكون مستعداً للانتقال، يتيح لك سوقنا العام عرض حصتك للبيع في أي وقت.' },
  'home.why.5.badge': { EN: 'Liquidity', AR: 'سيولة' },
  'home.why.6.title': { EN: 'Smart Ownership', AR: 'ملكية ذكية' },
  'home.why.6.desc': { EN: 'Pay only your fractional share of the cost. Co-own premium assets for 1/2 to 1/12 of the price, with all maintenance, insurance, and running costs split proportionally by stake.', AR: 'ادفع فقط حصتك الجزئية من التكلفة. شارك في ملكية الأصول المميزة بما يتراوح بين 1/2 و1/12 من السعر، مع تقسيم جميع تكاليف الصيانة والتأمين والتشغيل بشكل متناسب حسب الحصة.' },
  'home.why.6.badge': { EN: 'Smart Ownership', AR: 'ملكية ذكية' },
  'home.why.7.title': { EN: 'Safe, Legal & Insured', AR: 'آمن وقانوني ومؤمن' },
  'home.why.7.desc': { EN: 'We wrap the red tape. Every asset is officially registered and structured to comply with local laws, with full insurance coverage included.', AR: 'نتولى الإجراءات القانونية. كل أصل مسجل رسمياً وهيكله يتوافق مع القوانين المحلية، مع تغطية تأمينية كاملة.' },
  'home.why.7.badge': { EN: '100% Legal', AR: 'قانوني 100%' },
  'home.why.8.title': { EN: 'Care-for-Hire', AR: 'رعاية بالطلب' },
  'home.why.8.desc': { EN: 'Full-service concierge for your asset. Premium storage, detailing, fueling, and delivery are all available on-demand through the app.', AR: 'خدمة كونسيرج متكاملة لأصلك. التخزين المميز والتلميع والتزويد بالوقود والتوصيل — كلها متاحة عند الطلب عبر التطبيق.' },
  'home.why.8.badge': { EN: 'Concierge', AR: 'كونسيرج' },
  'home.how.title': { EN: 'How it works', AR: 'كيف تعمل' },
  'home.how.subtitle': { EN: 'Four simple steps to owning and enjoying assets.', AR: 'أربع خطوات بسيطة لامتلاك والاستمتاع بالأصول.' },
  'home.how.ferrariStradale': { EN: 'Ferrari SF90 Stradale', AR: 'فيراري SF90 سترادال' },
  'home.how.lamborghini': { EN: 'Lamborghini Revuelto', AR: 'لامبورجيني ريفويلتو' },
  'home.how.totalPrice': { EN: 'AED 250,000', AR: '250,000 درهم' },
  'home.how.learnMore': { EN: 'Learn more about the process', AR: 'تعرف على المزيد حول العملية' },
  'home.how.1.title': { EN: '01. List & Invite', AR: '01. اعرض وادعُ' },
  'home.how.1.desc': { EN: 'Post your own asset or discover a new one. Invite your inner circle or find verified co-owners in our secure marketplace.', AR: 'اعرض أصلك الخاص أو اكتشف أصلاً جديداً. ادعُ دائرتك المقربة أو ابحث عن ملاك مشاركين تم التحقق منهم في سوقنا الآمن.' },
  'home.how.2.title': { EN: '02. Stake & Settle', AR: '02. الحصة والتسوية' },
  'home.how.2.desc': { EN: 'Expenses, insurance, and maintenance are automatically split by your stake. Settle costs transparently via the app.', AR: 'يتم تقسيم المصاريف والتأمين والصيانة تلقائياً حسب حصتك. قم بتسوية التكاليف بشفافية عبر التطبيق.' },
  'home.how.3.title': { EN: '03. Smart Scheduling', AR: '03. الجدولة الذكية' },
  'home.how.3.desc': { EN: 'Book your time with ease. Our AI-powered calendar prevents scheduling conflicts automatically, ensuring fair access.', AR: 'احجز وقتك بسهولة. يمنع تقويمنا المدعوم بالذكاء الاصطناعي تضارب المواعيد تلقائياً، مما يضمن وصولاً عادلاً.' },
  'home.how.4.title': { EN: '04. AI Governance', AR: '04. حوكمة الذكاء الاصطناعي' },
  'home.how.4.desc': { EN: 'Experience total peace of mind. From automated maintenance alerts to fair dispute resolution, our AI handles the harmony.', AR: 'استمتع براحة بال تامة. من تنبيهات الصيانة التلقائية إلى حل النزاعات العادل، يتولى الذكاء الاصطناعي الخاص بنا التناغم.' },
  'home.useCases.title': { EN: 'Who is Coshare For?', AR: 'لمن منصة Coshare؟' },
  'home.useCases.subtitle': { EN: 'Whether you\'re looking for lifestyle upgrades or smart sharing, there\'s a place for you.', AR: 'سواء كنت تبحث عن ترقية نمط حياتك أو المشاركة الذكية، فهناك مكان لك.' },
  'home.useCases.1.title': { EN: 'The Inner Circle', AR: 'الدائرة المقربة' },
  'home.useCases.1.desc': { EN: 'Co-own assets with friends, family, or colleagues while our platform seamlessly handles the financial splits and scheduling.', AR: 'شارك في ملكية الأصول مع الأصدقاء أو العائلة أو الزملاء بينما تتولى منصتنا بسلاسة التقسيمات المالية والجدولة.' },
  'home.useCases.2.title': { EN: 'The Weekend Adventurer', AR: 'مغامر عطلة نهاية الأسبوع' },
  'home.useCases.2.desc': { EN: 'Enjoy sports cars and boats exactly when you want them, without the burden of full-time maintenance.', AR: 'استمتع بالسيارات الرياضية واليخوت في الوقت الذي تريده بالضبط، دون عبء الصيانة بدوام كامل.' },
  'home.useCases.3.title': { EN: 'The Smart Optimizer', AR: 'المحسن الذكي' },
  'home.useCases.3.desc': { EN: 'Why pay 100% for an asset you only use 10% of the time? Unlock fractional ownership and maximize your capital.', AR: 'لماذا تدفع 100٪ مقابل أصل تستخدمه 10٪ فقط من الوقت؟ افتح آفاق الملكية الجزئية وعظم رأس مالك.' },
  'home.useCases.4.title': { EN: 'The Yield Seeker', AR: 'الباحث عن العوائد' },
  'home.useCases.4.desc': { EN: 'Build a diversified portfolio of high-value assets and generate passive income by renting them out when not in use.', AR: 'قم ببناء محفظة متنوعة من الأصول عالية القيمة وولد دخلاً سلبياً عن طريق تأجيرها عند عدم استخدامها.' },
  'home.faq.title': { EN: 'Frequently Asked Questions', AR: 'الأسئلة الشائعة' },
  'home.faq.subtitle': { EN: 'Everything you need to know about cosharing.', AR: 'كل ما تحتاج لمعرفته حول المشاركة.' },
  'home.faq.viewAll': { EN: 'View all FAQs', AR: 'عرض جميع الأسئلة الشائعة' },
  'home.faq.1.q': { EN: 'What is cosharing?', AR: 'ما هي المشاركة؟' },
  'home.faq.1.a': { EN: "Cosharing is a modern ownership model where multiple parties share the cost and usage of a tangible asset. In Coshare's case, this includes cars, and we are working to bring boats and real estate soon.", AR: '.المشاركة في الملكية هي نموذج ملكية حديث تتشارك فيه أطراف متعددة تكلفة الأصل الملموس واستخدامه. في حالة Coshare، يشمل ذلك السيارات، ونعمل على إضافة اليخوت والعقارات قريباً' },
  'home.faq.2.q': { EN: 'Is it legal?', AR: 'هل هي قانونية؟' },
  'home.faq.2.a': { EN: 'Yes. Phase 1 utilizes a streamlined legal structure protected by a comprehensive co-ownership agreement and official registration to ensure strict compliance.', AR: 'نعم. تستخدم المرحلة الأولى هيكلاً قانونياً مبسطاً محمياً بموجب اتفاقية ملكية مشتركة شاملة وتسجيل رسمي لضمان الامتثال الصارم.' },
  'home.faq.3.q': { EN: 'How are maintenance and insurance handled?', AR: 'كيف يتم التعامل مع الصيانة والتأمين؟' },
  'home.faq.3.a': { EN: 'We facilitate maintenance and insurance to keep things simple. While we offer a fully managed service if required, costs are transparently split, and you only pay for the services you need.', AR: '.نحن نسهل الصيانة والتأمين لإبقاء الأمور بسيطة. بينما نقدم خدمة مدارة بالكامل إذا لزم الأمر، يتم تقسيم التكاليف بشفافية، وأنت تدفع فقط مقابل الخدمات التي تحتاجها' },
  'home.faq.4.q': { EN: 'Can I sell my fraction later?', AR: 'هل يمكنني بيع حصتي لاحقاً؟' },
  'home.faq.4.a': { EN: 'Yes. Coshare provides a secondary marketplace where you can list your fraction for sale to the public, providing liquidity without waiting for the asset to be sold entirely.', AR: '.نعم. توفر كوشير سوقاً ثانوياً حيث يمكنك عرض حصتك للبيع للعامة، مما يوفر السيولة دون انتظار بيع الأصل بالكامل' },
  'home.faq.5.q': { EN: 'How do I book time with the asset?', AR: 'كيف يمكنني حجز وقت لاستخدام الأصل؟' },
  'home.faq.5.a': { EN: 'You can book time through the Coshare app. Our AI-powered calendar ensures fair distribution of peak and off-peak days based on your share percentage.', AR: 'يمكنك حجز الوقت من خلال تطبيق Coshare. يضمن تقويمنا المدعوم بالذكاء الاصطناعي التوزيع العادل لأيام الذروة والأيام العادية بناءً على نسبة حصتك.' },
  'home.faq.6.q': { EN: 'What happens if an asset is damaged?', AR: 'ماذا يحدث إذا تعرض الأصل للتلف؟' },
  'home.faq.6.a': { EN: 'In the event of damage, repair costs may be covered fully or partially according to the user\'s insurance policy. To preserve the asset\'s value, our team can handle the entire claims and repair process if desired.', AR: '.في حالة حدوث ضرر، قد يتم تغطية تكاليف الإصلاح كلياً أو جزئياً وفقاً لبوليصة تأمين المستخدم. وللحفاظ على قيمة الأصل، يمكن لفريقنا التعامل مع عملية المطالبات والإصلاح بالكامل إذا رغبت في ذلك' },
  'home.faq.7.q': { EN: 'Are there any hidden fees?', AR: 'هل هناك أي رسوم خفية؟' },
  'home.faq.7.a': { EN: 'No, there are no hidden fees. We pride ourselves on complete transparency. While the core co-ownership structure is clear, we do offer optional additional services (like premium storage, specialized cleaning, or delivery) whose prices may vary according to the specific asset and user requests.', AR: 'لا، لا توجد رسوم خفية. نحن نفخر بالشفافية الكاملة. في حين أن هيكل الملكية المشتركة الأساسي واضح، فإننا نقدم خدمات إضافية اختيارية (مثل التخزين الممتاز، أو التنظيف المتخصص، أو التوصيل) والتي قد تختلف أسعارها وفقاً للأصل المحدد وطلبات المستخدم.' },
  'home.faq.8.q': { EN: 'Who can use the asset?', AR: 'من يمكنه استخدام الأصل؟' },
  'home.faq.8.a': { EN: 'Only verified co-owners who have passed our strict KYC and background checks are authorized to use the asset.', AR: 'فقط الملاك المشاركون الذين تم التحقق منهم واجتازوا فحوصات "اعرف عميلك" والخلفية الصارمة الخاصة بنا مصرح لهم باستخدام الأصل.' },
  'home.faq.9.q': { EN: 'How are expenses split?', AR: 'كيف يتم تقسيم النفقات؟' },
  'home.faq.9.a': { EN: 'All running costs—including insurance, routine maintenance, and registration—are divided proportionally based on your ownership stake. Our platform automates this process, providing transparent, itemized billing so you only pay your fair share.', AR: 'يتم تقسيم جميع تكاليف التشغيل - بما في ذلك التأمين والصيانة الروتينية والتسجيل - بشكل متناسب بناءً على حصة ملكيتك. تقوم منصتنا بأتمتة هذه العملية، مما يوفر فواتير شفافة ومفصلة بحيث تدفع فقط حصتك العادلة.' },
  'home.faq.10.q': { EN: 'How are conflicts resolved?', AR: 'كيف يتم حل النزاعات؟' },
  'home.faq.10.a': { EN: 'Conflicts are mediated by our dedicated support team using clear guidelines, with the primary goal of preserving the asset\'s value for everyone involved.', AR: '.يتم التوسط في النزاعات من قبل فريق الدعم المخصص لدينا باستخدام إرشادات واضحة، والهدف الأساسي هو الحفاظ على قيمة الأصل لجميع المعنيين' },
  'home.cta.title1': { EN: 'Start Cosharing', AR: 'ابدأ المشاركة' },
  'home.cta.title2': { EN: 'Today.', AR: 'اليوم.' },
  'home.cta.desc': { EN: 'Join a growing community of co-owners all around the world sharing Cars (supercars, 4x4s, classics), with Boats & Real Estate coming soon. Download the Coshare mobile app to browse available assets, purchase shares, and book your time to use and enjoy instantly.', AR: '.انضم إلى مجتمع متنامٍ من الملاك المشاركين في جميع أنحاء العالم الذين يتشاركون السيارات (الخارقة، وذات الدفع الرباعي، والكلاسيكية)، مع اقتراب توفر اليخوت والعقارات قريباً. حمّل تطبيق كوشير للهواتف المحمولة لتصفح الأصول المتاحة وشراء الحصص وحجز وقتك للاستخدام والاستمتاع فوراً'},
  'home.cta.downloadOn': { EN: 'Download on the', AR: 'تنزيل من' },
  'home.cta.appStore': { EN: 'App Store', AR: 'متجر التطبيقات' },
  'home.cta.getItOn': { EN: 'Coming soon', AR: 'قريباً' },
  'home.cta.googlePlay': { EN: 'Google Play', AR: 'جوجل بلاي' },
  'home.cta.earlyAdopters': { EN: 'Early Adopters', AR: 'المتبنون الأوائل' },
  'home.cta.alreadyCoOwning': { EN: 'already co-owning', AR: 'يتشاركون الملكية بالفعل' },
  'home.cta.assetInsured': { EN: 'Asset Insured', AR: 'الأصل مؤمن' },
  'home.cta.fullyCovered': { EN: 'Fully Covered', AR: 'تغطية شاملة' },
  'home.cta.nextBooking': { EN: 'Next Booking', AR: 'الحجز القادم' },
  'home.cta.tomorrow10am': { EN: 'Tomorrow, 10 AM', AR: 'غداً، 10 صباحاً' },
  'home.cta.portfolioValue': { EN: 'Portfolio Value', AR: 'قيمة المحفظة' },
  'home.cta.shares28': { EN: '2/8 Shares', AR: '2/8 حصص' },
  'home.cta.shares18': { EN: '1/8 Shares', AR: '1/8 حصص' },
  'home.cta.location1': { EN: 'Miami, USA', AR: 'ميامي، الولايات المتحدة' },
  'home.cta.location2': { EN: 'Monaco', AR: 'موناكو' },
  'home.cta.bookTime': { EN: 'Book Time', AR: 'حجز وقت' },
  'home.cta.tradeShares': { EN: 'Trade Shares', AR: 'تداول الحصص' },
  'home.seo.title': { EN: 'Coshare | Co-own and Share Assets', AR: 'كوشير | امتلك وشارك الأصول' },
  'home.seo.description': { EN: 'Join the future of ownership. Co-own cars, boats, real estate and more all around the world with Coshare\'s AI-powered cosharing marketplace.', AR: 'انضم إلى مستقبل الملكية. شارك في ملكية السيارات واليخوت والعقارات والمزيد في جميع أنحاء العالم مع سوق المشاركة المدعوم بالذكاء الاصطناعي من كوشير.' },
  'home.visuals.newListing': { EN: 'New Listing', AR: 'إدراج جديد' },
  'home.visuals.draft': { EN: 'Draft', AR: 'مسودة' },
  'home.visuals.inviteCoowners': { EN: 'Invite Co-owners', AR: 'دعوة شركاء' },
  'home.visuals.invited': { EN: 'Invited', AR: 'مدعو' },
  'home.visuals.invite': { EN: 'Invite', AR: 'دعوة' },
  'home.visuals.financials': { EN: 'Financials', AR: 'المالية' },
  'home.visuals.march2026': { EN: 'March 2026', AR: 'مارس 2026' },
  'home.visuals.yourStake': { EN: 'Your Stake', AR: 'حصتك' },
  'home.visuals.insurance': { EN: 'Insurance', AR: 'تأمين' },
  'home.visuals.aed1250': { EN: 'AED 1,250', AR: '1,250 درهم' },
  'home.visuals.maintenance': { EN: 'Maintenance', AR: 'صيانة' },
  'home.visuals.aed800': { EN: 'AED 800', AR: '800 درهم' },
  'home.visuals.yourShare25': { EN: 'Your Share (25%)', AR: 'حصتك (25%)' },
  'home.visuals.aed512': { EN: 'AED 512.50', AR: '512.50 درهم' },
  'home.visuals.calendar': { EN: 'Calendar', AR: 'التقويم' },
  'home.visuals.yourDays': { EN: 'Your Days', AR: 'أيامك' },
  'home.visuals.booked': { EN: 'Booked', AR: 'محجوز' },
  'home.visuals.aiAgent': { EN: 'AI Agent', AR: 'وكيل الذكاء الاصطناعي' },
  'home.visuals.systemAlert': { EN: 'System Alert', AR: 'تنبيه النظام' },
  'home.visuals.alertMsg': { EN: 'The Porsche 911 is due for its 10,000km service next week. I\'ve found 3 available slots at the authorized dealer.', AR: 'حان موعد صيانة بورش 911 لمسافة 10,000 كم الأسبوع المقبل. لقد وجدت 3 مواعيد متاحة لدى الوكيل المعتمد.' },
  'home.visuals.userMsg': { EN: 'Please book the Tuesday morning slot.', AR: 'يرجى حجز موعد صباح الثلاثاء.' },
  'home.visuals.confirmMsg': { EN: 'Confirmed. Tuesday at 9:00 AM is booked. The estimated cost of AED 2,400 will be split according to your stakes.', AR: 'تم التأكيد. تم حجز يوم الثلاثاء الساعة 9:00 صباحاً. سيتم تقسيم التكلفة التقديرية البالغة 2,400 درهم وفقاً لحصصكم.' },
  'how.hero.title': { EN: 'Cosharing, Simplified.', AR: 'المشاركة، مبسطة.' },
  'how.hero.subtitle': { EN: 'Discover how Coshare makes owning assets accessible, hassle-free, and smart.', AR: 'اكتشف كيف تجعل Coshare امتلاك الأصول في متناول اليد، وخالياً من المتاعب، وذكياً.' },
  'how.step1.title': { EN: '01. Browse & Acquire', AR: '01. تصفح واكتسب' },
  'how.step1.desc': { EN: 'Find the perfect asset or list your own. We divide ownership into 1/2 to 1/12 shares, making assets accessible for a fractional of a cost and split cost.', AR: 'ابحث عن الأصل المثالي أو اعرض أصلك الخاص. نقسم الملكية إلى حصص من 1/2 إلى 1/12، مما يجعل الأصول في متناول اليد بجزء من التكلفة وتقسيم النفقات.' },
  'how.step1.point1': { EN: 'Rigorously vetted assets', AR: 'أصول تم فحصها بدقة' },
  'how.step1.point2': { EN: 'Transparent pricing & history', AR: 'تسعير وتاريخ شفاف' },
  'how.step1.point3': { EN: 'Purchase 1 to 6 shares (1/12 to 1/2 ownership)', AR: 'شراء من 1 إلى 6 حصص (1/12 إلى 1/2 ملكية)' },
  'how.step2.title': { EN: '02. Legal & Financial Setup', AR: '02. الإعداد القانوني والمالي' },
  'how.step2.desc': { EN: 'We handle the complex paperwork. Each asset is protected by a comprehensive co-ownership agreement to ensure full compliance.', AR: 'نحن نتعامل مع المعاملات الورقية المعقدة. يتم حماية كل أصل بموجب اتفاقية ملكية مشتركة شاملة لضمان الامتثال الكامل.' },
  'how.step2.point1': { EN: 'True legal protection via official registration', AR: 'حماية قانونية حقيقية عبر التسجيل الرسمي' },
  'how.step2.point2': { EN: 'Automated, transparent expense splitting', AR: 'تقسيم تلقائي وشفاف للمصروفات' },
  'how.step2.point3': { EN: 'Facilitated insurance coverage options', AR: 'خيارات تغطية تأمينية ميسرة' },
  'how.step3.title': { EN: '03. Smart Scheduling', AR: '03. الجدولة الذكية' },
  'how.step3.desc': { EN: 'Book your time effortlessly through the Coshare app. Our proprietary algorithm ensures fair access to peak seasons and weekends for all co-owners.', AR: 'احجز وقتك بسهولة من خلال تطبيق Coshare. تضمن خوارزميتنا الخاصة وصولاً عادلاً إلى مواسم الذروة وعطلات نهاية الأسبوع لجميع الملاك المشاركين.' },
  'how.step3.point1': { EN: 'Guaranteed days of usage per year based on your share fraction', AR: 'أيام استخدام مضمونة سنوياً بناءً على نسبة حصتك' },
  'how.step3.point2': { EN: 'Equitable distribution of holidays', AR: 'توزيع عادل للعطلات' },
  'how.step3.point3': { EN: 'Instant booking & modifications', AR: 'حجز وتعديلات فورية' },
  'how.step4.title': { EN: '04. Additional Services', AR: '04. خدمات إضافية' },
  'how.step4.desc': { EN: 'Just show up and enjoy. Premium storage, detailing, fueling, and concierge delivery can be requested directly through the platform.', AR: '.فقط احضر واستمتع. يمكن طلب خدمات التخزين المميز والتلميع والتزويد بالوقود والتوصيل بالكونسيرج مباشرةً عبر المنصة' },
  'how.step4.point1': { EN: 'Optional secure storage', AR: 'تخزين آمن اختياري' },
  'how.step4.point2': { EN: 'On-demand cleaning & fueling', AR: 'تنظيف وتزويد بالوقود عند الطلب' },
  'how.step4.point3': { EN: 'Delivery to your location', AR: 'التوصيل إلى موقعك' },
  'how.math.title': { EN: 'The Financial Advantage', AR: 'الميزة المالية' },
  'how.math.subtitle': { EN: 'Why pay 100% for an asset you use 10% of the time? See how cosharing compares to traditional buying or renting.', AR: 'لماذا تدفع 100٪ مقابل أصل تستخدمه 10٪ من الوقت؟ شاهد كيف تقارن المشاركة بالشراء أو الاستئجار التقليدي.' },
  'how.math.traditional': { EN: 'Traditional Ownership', AR: 'الملكية التقليدية' },
  'how.math.coshare': { EN: 'Coshare', AR: 'Coshare' },
  'how.math.purchase': { EN: 'Purchase Price', AR: 'سعر الشراء' },
  'how.math.depreciation': { EN: 'Annual Depreciation', AR: 'الاستهلاك السنوي' },
  'how.math.maintenance': { EN: 'Maintenance & Insurance', AR: 'الصيانة والتأمين' },
  'how.math.utilization': { EN: 'Typical Utilization', AR: 'الاستخدام النموذجي' },
  'how.math.100': { EN: '100% Cost', AR: '100% تكلفة' },
  'how.math.12': { EN: '12.5% Cost', AR: '12.5% تكلفة' },
  'how.math.high': { EN: 'High (Borne alone)', AR: 'مرتفع (يتحمله شخص واحد)' },
  'how.math.split': { EN: 'Split 8 ways', AR: 'مقسم على 8' },
  'how.math.low': { EN: 'Low (Asset sits idle)', AR: 'منخفض (الأصل يظل خاملاً)' },
  'how.math.optimized': { EN: 'Optimized (Maximized value)', AR: 'محسن (قيمة قصوى)' },
  'how.concierge.title': { EN: 'We Handle Everything', AR: 'نحن نتعامل مع كل شيء' },
  'how.concierge.subtitle': { EN: 'Coshare acts as your dedicated asset manager, removing the friction from ownership.', AR: 'تعمل Coshare كمدير أصول مخصص لك، مما يزيل الاحتكاك من الملكية.' },
  'how.concierge.legal': { EN: 'Legal & Registration Setup', AR: 'الإعداد القانوني والتسجيل' },
  'how.concierge.legalDesc': { EN: 'We establish and manage the legal framework that protects your co-ownership rights.', AR: 'نقوم بتأسيس وإدارة الإطار القانوني الذي يحمي حقوق الملكية المشتركة الخاصة بك.' },
  'how.concierge.insurance': { EN: 'Insurance & Reg', AR: 'التأمين والتسجيل' },
  'how.concierge.insuranceDesc': { EN: 'Comprehensive coverage and compliance handled annually.', AR: 'تغطية شاملة وامتثال يتم التعامل معها سنوياً.' },
  'how.concierge.storage': { EN: 'Storage, Cleaning, Fueling, Delivery', AR: 'التخزين، التنظيف، التزويد بالوقود، التوصيل' },
  'how.concierge.storageDesc': { EN: 'These services can be easily hired directly within the platform as needed.', AR: 'يمكن استئجار هذه الخدمات بسهولة مباشرة داخل المنصة حسب الحاجة.' },
  'how.concierge.maintenance': { EN: 'Maintenance', AR: 'الصيانة' },
  'how.concierge.maintenanceDesc': { EN: 'Scheduled servicing and unexpected repairs managed by experts.', AR: 'صيانة مجدولة وإصلاحات غير متوقعة يديرها خبراء.' },
  'how.concierge.resale': { EN: 'Resale Facilitation', AR: 'تسهيل إعادة البيع' },
  'how.concierge.resaleDesc': { EN: 'Ready to exit? We help you sell your share on our marketplace.', AR: 'مستعد للتخارج؟ نساعدك في بيع حصتك في سوقنا.' },
  'how.cta.title': { EN: 'Ready to experience true ownership?', AR: 'مستعد لتجربة الملكية الحقيقية؟' },
  'how.cta.desc': { EN: 'Browse our curated collection of assets and find your perfect match today.', AR: 'تصفح مجموعتنا المنسقة من الأصول وابحث عن ما يناسبك اليوم.' },
  'how.cta.button': { EN: 'Browse Assets', AR: 'تصفح الأصول' },
  'nav.listAsset': { EN: 'List Asset', AR: 'اعرض أصلك' },
  'listAsset.hero.title': { EN: 'Turn your asset into a global key.', AR: 'حوّل أصلك إلى مفتاح عالمي.' },
  'listAsset.hero.subtitle': { EN: 'Stop letting your asset sit idle. Sell up to 11/12ths of it to free up cash, keep the fraction you actually use, and unlock the global swap network for yourself. Let us handle the management.', AR: 'لا تدع أصلك يبقى خاملاً. بع ما يصل إلى 11/12 منه لتحرير النقد، واحتفظ بالحصة التي تستخدمها بالفعل، وافتح شبكة التبادل العالمية لنفسك. دعنا نتعامل مع الإدارة.' },
  'listAsset.globalKey.badge': { EN: 'Network Effect', AR: 'تأثير الشبكة' },
  'listAsset.globalKey.title': { EN: 'Your Asset is your Global Key', AR: 'أصلك هو مفتاحك العالمي' },
  'listAsset.globalKey.desc': { EN: "By listing a fraction of your asset, you don't just get cash upfront; you unlock access to a global network of vehicles and homes.", AR: 'من خلال إدراج جزء من أصلك، لا تحصل فقط على النقد مقدماً؛ بل تفتح لك إمكانية الوصول إلى شبكة عالمية من المركبات والمنازل.' },
  'listAsset.step1.title': { EN: '01. Submit & Evaluate', AR: '01. التقديم والتقييم' },
  'listAsset.step1.desc': { EN: "Upload high-quality photos, specifications, and your desired valuation. Our team will review the submission to ensure it meets Coshare's marketplace standards.", AR: 'قم بتحميل صور عالية الجودة والمواصفات والتقييم المطلوب. سيقوم فريقنا بمراجعة التقديم للتأكد من أنه يلبي معايير سوق Coshare.' },
  'listAsset.step2.title': { EN: '02. Due Diligence & Structuring', AR: '02. العناية الواجبة والهيكلة' },
  'listAsset.step2.desc': { EN: 'We conduct an independent valuation and physical inspection. Once approved, we structure your asset into logical fractions (e.g., 1/8 or 1/12 shares) to maximize its market appeal.', AR: 'نجري تقييماً مستقلاً وفحصاً مادياً. بمجرد الموافقة، نقوم بهيكلة أصلك إلى حصص منطقية (مثل 1/8 أو 1/12) لزيادة جاذبيته في السوق.' },
  'listAsset.step3.title': { EN: '03. The SHA & Legal Setup', AR: '03. اتفاقية المساهمين والإعداد القانوني' },
  'listAsset.step3.desc': { EN: 'Review and digitally sign the Shareholder Agreement (SHA). This contract establishes you as the Lead Owner, defines the rights of Authorized Users, and legally prepares the asset for co-ownership compliance.', AR: 'راجع ووقع اتفاقية المساهمين (SHA) رقمياً. يحدد هذا العقد صفتك كمالك رئيسي، ويحدد حقوق المستخدمين المعتمدين، ويعد الأصل قانونياً للامتثال للملكية المشتركة.' },
  'listAsset.step4.title': { EN: '04. Go Live & Get Funded', AR: '04. الإطلاق والتمويل' },
  'listAsset.step4.desc': { EN: "Your asset goes live. You retain your desired fraction for guaranteed usage, receive upfront funds for the sold shares, and can immediately start earning Swap Credits when you don't use your days.", AR: 'يتم إطلاق أصلك لمجتمعنا العالمي. تحتفظ بالحصة المطلوبة من الأصل، ومع قيام المستخدمين الآخرين بشراء الحصص المتبقية، تتلقى الأموال المباشرة في المحفظة، ويمكنك البدء بكسب أرصدة المبادلة.' },
  'listAsset.why.title': { EN: 'Why List with Coshare?', AR: 'لماذا تعرض أصلك مع Coshare؟' },
  'listAsset.why.1.title': { EN: 'Unlock Capital', AR: 'تحرير رأس المال' },
  'listAsset.why.1.desc': { EN: 'Free up cash tied in your asset while still getting to use it.', AR: 'حرر النقد المقيد في أصلك مع الاستمرار في استخدامه.' },
  'listAsset.why.2.title': { EN: 'Zero Hassle', AR: 'بدون متاعب' },
  'listAsset.why.2.desc': { EN: 'We facilitate the insurance, maintenance, and scheduling.', AR: 'نحن نسهل التأمين والصيانة والجدولة.' },
  'listAsset.why.3.title': { EN: 'Vetted Co-owners', AR: 'ملاك مشاركون موثوقون' },
  'listAsset.why.3.desc': { EN: 'Your asset is only shared with KYC-verified Authorized Users.', AR: 'تتم مشاركة أصلك فقط مع المستخدمين المعتمدين الذين تم التحقق من هويتهم.' },
  'listAsset.why.4.title': { EN: 'Earn Swap Credits', AR: 'اكسب أرصدة المبادلة' },
  'listAsset.why.4.desc': { EN: 'Release your unused days back to the network and travel the world.', AR: 'حرر أيامك غير المستخدمة للشبكة وسافر حول العالم.' },
  'footer.tagline': { EN: 'Own More. Together', AR: 'امتلك أكثر. معاً' },
  'footer.follow': { EN: 'Follow Us', AR: 'تابعنا' },
  'footer.download': { EN: 'Download on the', AR: 'حمل من' },
  'footer.appStore': { EN: 'App Store', AR: 'متجر التطبيقات' },
  'footer.rights': { EN: 'All rights reserved.', AR: 'جميع الحقوق محفوظة.' },
  'footer.terms': { EN: 'Terms', AR: 'الشروط' },
  'footer.privacy': { EN: 'Privacy', AR: 'الخصوصية' },
};

interface LanguageContextType {
  lang: Language;
  toggleLang: () => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [lang, setLang] = useState<Language>(() => {
    const saved = localStorage.getItem('coshare_lang');
    return (saved === 'AR' || saved === 'EN') ? saved : 'EN';
  });

  useEffect(() => {
    document.documentElement.dir = lang === 'AR' ? 'rtl' : 'ltr';
    document.documentElement.lang = lang.toLowerCase();
    localStorage.setItem('coshare_lang', lang);
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