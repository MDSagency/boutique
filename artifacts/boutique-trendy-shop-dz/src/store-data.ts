export type Locale = 'fr' | 'ar';

export const business = {
  name: 'BOUTIQUE TRENDY',
  whatsappNumber: '',
  instagram: 'https://www.instagram.com/boutique_trendyshopdz/',
  instagramPlaceholder: '#',
  announcement: {
    fr: 'Une nouvelle allure, tout simplement',
    ar: 'إطلالة جديدة، بكل بساطة',
  },
};

export const wilayas = [
  'Adrar', 'Chlef', 'Laghouat', 'Oum El Bouaghi', 'Batna', 'Béjaïa', 'Biskra', 'Béchar', 'Blida', 'Bouira',
  'Tamanrasset', 'Tébessa', 'Tlemcen', 'Tiaret', 'Tizi Ouzou', 'Alger', 'Djelfa', 'Jijel', 'Sétif', 'Saïda',
  'Skikda', 'Sidi Bel Abbès', 'Annaba', 'Guelma', 'Constantine', 'Médéa', 'Mostaganem', 'M\'Sila', 'Mascara', 'Ouargla',
  'Oran', 'El Bayadh', 'Illizi', 'Bordj Bou Arréridj', 'Boumerdès', 'El Tarf', 'Tindouf', 'Tissemsilt', 'El Oued', 'Khenchela',
  'Souk Ahras', 'Tipaza', 'Mila', 'Aïn Defla', 'Naâma', 'Aïn Témouchent', 'Ghardaïa', 'Relizane',
  'Timimoun', 'Bordj Badji Mokhtar', 'Ouled Djellal', 'Béni Abbès', 'In Salah', 'In Guezzam', 'Touggourt', 'Djanet', 'El M\'Ghair', 'El Menia',
];

export const copy = {
  fr: {
    home: 'Accueil', menu: 'Ouvrir le menu',
    navNew: 'Nouveautés', navCollections: 'Collections', navStory: 'Notre univers', bag: 'Panier',
    heroKicker: 'La sélection du moment', heroTitle: 'Des ongles qui vous ressemblent.', heroText: 'Découvrez des press-on nails, gels et accessoires pensés pour sublimer vos mains au quotidien.', shop: 'DÉCOUVRIR LA COLLECTION',
    categories: 'Explorer par envie', categoriesSub: 'Des styles choisis pour chaque occasion.',
    all: 'Tout voir', dresses: 'Press-on', sets: 'Gel & Vernis', accessories: 'Accessoires', new: 'Nouveautés',
    bestTitle: 'Les incontournables', bestSub: 'Nos essentiels du moment', arrivalsTitle: 'Tout juste arrivés', arrivalsSub: 'La collection se renouvelle.',
    quick: 'Voir le produit', from: 'À partir de', indicative: 'Prix indicatifs — contenu démo',
    editorTitle: 'Une manucure qui vous appartient.', editorText: 'Des finitions soignées, des teintes délicates et une élégance sans effort. Trouvez le style qui vous ressemble.', discover: 'Explorer les nouveautés',
    instagram: 'Un peu de notre univers', instagramSub: 'Retrouvez Nous sur Instagram', follow: 'Suivre le compte',
    footerText: 'Une sélection de press-on nails, gels et accessoires pensée pour sublimer vos mains avec élégance.', explore: 'Explorer', help: 'À votre écoute', contact: 'Contact', legal: 'Mentions légales', rights: 'Tous droits réservés.', demo: 'Catalogue illustratif. Produits, visuels, prix et options sont des exemples éditables.',
    search: 'Rechercher un produit…', catalog: 'La collection', showing: 'produits à découvrir', filters: 'Filtrer par catégorie', sort: 'Trier',
    back: 'Retour à la collection', selectSize: 'Choisir une taille', selectColor: 'Choisir une teinte', quantity: 'Quantité', add: 'Ajouter à mon panier', added: 'Ajouté à votre panier', details: 'Détails du produit', demoPrice: 'Prix indicatif en DZD — exemple de démonstration.',
    cart: 'Votre panier', empty: 'Votre panier vous attend.', continue: 'Continuer mes achats', subtotal: 'Sous-total indicatif', checkout: 'Passer commande', remove: 'Retirer', orderDemo: 'Les articles et montants sont indicatifs. Le prix final reste à confirmer par la boutique.',
    checkoutTitle: 'Finaliser votre demande', customer: 'Vos coordonnées', fullName: 'Nom complet', phone: 'Téléphone', wilaya: 'Wilaya', commune: 'Commune', address: 'Adresse', instructions: 'Instructions complémentaires', required: 'Champ obligatoire', makeMessage: 'Acheter', messageTitle: 'Votre message est prêt', copy: 'Copier le message', copied: 'Message copié', setup: 'Configuration nécessaire : ajoutez le numéro WhatsApp de la boutique dans la configuration pour activer l\'envoi. Aucun numéro fictif ne sera utilisé.', whatsappUnavailable: 'WhatsApp n\'est pas configuré. Vous pouvez consulter ou copier votre message de démonstration.', orderLines: 'Articles', options: 'Options', orderTotal: 'Sous-total indicatif',
    language: 'العربية', notFound: 'Ce produit n\'existe pas dans la collection démo.', requiredPhone: 'Saisissez un numéro de téléphone valide.', close: 'Fermer',
    softDays: 'La douceur des beaux jours', demoVisual: 'VISUEL DÉMO', decrease: 'Diminuer', increase: 'Augmenter', image: 'Image',
    priceUp: 'Prix croissant', priceDown: 'Prix décroissant', catalogueKicker: 'BOUTIQUE TRENDY — NAIL COLLECTION', editorialKicker: 'L\'ART DE LA MANUCURE',
    delivery: 'Livraison', deliveryMethod: 'Mode de livraison', deliveryHome: 'Livraison à domicile', deliveryPickup: 'Retrait en magasin', wilayaLabel: 'Wilaya de livraison', communeLabel: 'Commune',
  },
  ar: {
    home: 'الرئيسية', menu: 'فتح القائمة',
    navNew: 'وصل حديثًا', navCollections: 'التشكيلة', navStory: 'عالمنا', bag: 'السلة',
    heroKicker: 'اختيارات الموسم', heroTitle: 'أظافر تعبّر عنكِ.', heroText: 'اكتشفي أظافر press-on والجل والإكسسوارات المختارة بعناية لتجميل يديكِ كل يوم.', shop: 'اكتشفي التشكيلة',
    categories: 'اختاري ما يناسبك', categoriesSub: 'أنماط مختارة لكل مناسبة.',
    all: 'كل المنتجات', dresses: 'أظافر جاهزة', sets: 'جل وطلاء', accessories: 'إكسسوارات', new: 'وصل حديثًا',
    bestTitle: 'الأكثر طلبًا', bestSub: 'أساسياتنا لهذا الموسم', arrivalsTitle: 'وصلت للتو', arrivalsSub: 'تشكيلة تتجدد باستمرار.',
    quick: 'عرض المنتج', from: 'ابتداءً من', indicative: 'أسعار توضيحية — محتوى تجريبي',
    editorTitle: 'مانيكير يعكس أسلوبك.', editorText: 'لمسات نهائية أنيقة وألوان ناعمة وجمال بلا مجهود. اختاري ما يشبهك.', discover: 'اكتشفي الجديد',
    instagram: 'لمحة من عالمنا', instagramSub: 'تابعينا على إنستغرام', follow: 'زيارة الحساب',
    footerText: 'تشكيلة من أظافر press-on والجل والإكسسوارات لتجميل يديكِ بأناقة.', explore: 'اكتشفي', help: 'نحن هنا لمساعدتك', contact: 'تواصل', legal: 'معلومات قانونية', rights: 'جميع الحقوق محفوظة.', demo: 'كتالوج توضيحي. المنتجات والصور والأسعار والخيارات أمثلة قابلة للتعديل.',
    search: 'ابحثي عن منتج…', catalog: 'التشكيلة', showing: 'منتجات لاكتشافها', filters: 'التصفية حسب الفئة', sort: 'الترتيب',
    back: 'العودة إلى التشكيلة', selectSize: 'اختاري المقاس', selectColor: 'اختاري الدرجة', quantity: 'الكمية', add: 'أضيفي إلى السلة', added: 'أُضيفت إلى السلة', details: 'تفاصيل المنتج', demoPrice: 'سعر توضيحي بالدينار — مثال تجريبي.',
    cart: 'سلتك', empty: 'سلتك بانتظار اختياراتك.', continue: 'متابعة التسوق', subtotal: 'المجموع الفرعي التوضيحي', checkout: 'إرسال الطلب', remove: 'حذف', orderDemo: 'المنتجات والأسعار توضيحية. يجب تأكيد السعر النهائي من المتجر.',
    checkoutTitle: 'إتمام طلبك', customer: 'معلومات التواصل', fullName: 'الاسم الكامل', phone: 'رقم الهاتف', wilaya: 'الولاية', commune: 'البلدية', address: 'العنوان', instructions: 'تعليمات إضافية', required: 'هذا الحقل مطلوب', makeMessage: 'شراء', messageTitle: 'رسالتك جاهزة', copy: 'نسخ الرسالة', copied: 'تم نسخ الرسالة', setup: 'يلزم الإعداد: أضيفي رقم واتساب المتجر في الإعدادات لتفعيل الإرسال. لن نستخدم رقمًا وهميًا.', whatsappUnavailable: 'واتساب غير مُعدّ. يمكنك الاطلاع على رسالة الطلب التجريبية أو نسخها.', orderLines: 'المنتجات', options: 'الخيارات', orderTotal: 'المجموع الفرعي التوضيحي',
    language: 'Français', notFound: 'هذا المنتج غير موجود في التشكيلة التجريبية.', requiredPhone: 'أدخلي رقم هاتف صحيحًا.', close: 'إغلاق',
    softDays: 'رقة الأيام الجميلة', demoVisual: 'صورة توضيحية', decrease: 'تقليل', increase: 'زيادة', image: 'صورة',
    priceUp: 'السعر: من الأقل', priceDown: 'السعر: من الأعلى', catalogueKicker: 'BOUTIQUE TRENDY — تشكيلة الأظافر', editorialKicker: 'فن المانيكير',
    delivery: 'التوصيل', deliveryMethod: 'طريقة التوصيل', deliveryHome: 'توصيل للمنزل', deliveryPickup: 'استلام من المتجر', wilayaLabel: 'ولاية التوصيل', communeLabel: 'البلدية',
  },
} as const;

export const categories = [
  { id: 'Nouveautés', fr: 'Nouveautés', ar: 'وصل حديثًا', image: '/nails-1.jpg' },
  { id: 'Press-on', fr: 'Press-on', ar: 'أظافر جاهزة', image: '/nails-2.jpg' },
  { id: 'Gel & Vernis', fr: 'Gel & Vernis', ar: 'جل وطلاء', image: '/nails-3.jpg' },
  { id: 'Accessoires', fr: 'Accessoires', ar: 'إكسسوارات', image: '/nails-4.jpg' },
];

export type Product = {
  id: string; slug: string; category: string; price: number; image: string; gallery: string[];
  sizes: string[]; colors: { fr: string; ar: string; hex: string }[];
  title: { fr: string; ar: string }; description: { fr: string; ar: string };
  arrival: boolean; best: boolean;
};

export const products: Product[] = [
  { id: 'p1', slug: 'press-on-rose-glaze', category: 'Press-on', price: 2800, image: '/nails-1.jpg', gallery: ['/nails-1.jpg', '/nails-2.jpg'], sizes: ['XS', 'S', 'M', 'L'], colors: [{ fr: 'Rose glacé', ar: 'وردي لامع', hex: '#f4a6c1' }, { fr: 'Nude', ar: 'نود', hex: '#e8d3c5' }], title: { fr: 'Press-on Rose Glaze', ar: 'أظافر روز غليز' }, description: { fr: 'Un set press-on glossy aux tons roses, facile à poser pour une manucure élégante en quelques minutes.', ar: 'طقم أظافر جاهزة لامع بدرجات وردية، سهل التطبيق لمانيكير أنيق في دقائق.' }, arrival: true, best: true },
  { id: 'p2', slug: 'gel-blush-milky', category: 'Gel & Vernis', price: 2200, image: '/nails-3.jpg', gallery: ['/nails-3.jpg', '/nails-1.jpg'], sizes: ['15 ml'], colors: [{ fr: 'Blush', ar: 'بلوش', hex: '#f2b8c6' }, { fr: 'Milky', ar: 'حليبي', hex: '#f7ece8' }], title: { fr: 'Gel Blush Milky', ar: 'جل بلوش ميلكي' }, description: { fr: 'Une teinte douce et lumineuse pour un fini propre, naturel et raffiné.', ar: 'درجة ناعمة ومضيئة لمظهر نظيف وطبيعي وأنيق.' }, arrival: true, best: true },
  { id: 'p3', slug: 'press-on-french-pink', category: 'Press-on', price: 3200, image: '/nails-2.jpg', gallery: ['/nails-2.jpg', '/nails-4.jpg'], sizes: ['XS', 'S', 'M', 'L'], colors: [{ fr: 'French rose', ar: 'فرنش وردي', hex: '#f6ccd8' }, { fr: 'Ivoire', ar: 'عاجي', hex: '#f3eadf' }], title: { fr: 'Press-on French Pink', ar: 'أظافر فرنش وردي' }, description: { fr: 'Le classique French revisité en rose tendre, idéal pour toutes les occasions.', ar: 'فرنش كلاسيكي بلمسة وردية ناعمة، مناسب لكل المناسبات.' }, arrival: false, best: true },
  { id: 'p4', slug: 'kit-soin-ongles', category: 'Accessoires', price: 1900, image: '/nails-4.jpg', gallery: ['/nails-4.jpg', '/nails-3.jpg'], sizes: ['Kit'], colors: [{ fr: 'Rose', ar: 'وردي', hex: '#ec4899' }, { fr: 'Transparent', ar: 'شفاف', hex: '#f5f5f5' }], title: { fr: 'Kit Soin Ongles', ar: 'طقم العناية بالأظافر' }, description: { fr: 'Les essentiels pour préparer, poser et retirer vos nails avec soin. Modèle illustratif.', ar: 'أساسيات التحضير والتركيب والإزالة بعناية. نموذج توضيحي.' }, arrival: true, best: false },
];
