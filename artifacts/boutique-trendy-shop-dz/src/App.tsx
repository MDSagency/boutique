import { useEffect, useMemo, useState, type CSSProperties } from 'react';
import { Link, Route, Switch, useLocation, useRoute } from 'wouter';
import { ArrowLeft, ArrowRight, Check, ChevronDown, Instagram, Menu, Minus, Plus, Search, ShoppingBag, X } from 'lucide-react';
import { business, categories, copy, products, type Locale, type Product } from './store-data';
import './shop.css';

type CartLine = { productId: string; size: string; color: string; quantity: number };
type CartOps = { cart: CartLine[]; add: (line: CartLine) => void; update: (index: number, amount: number) => void; remove: (index: number) => void };
const priceText = (price: number, locale: Locale) => `${price.toLocaleString(locale === 'fr' ? 'fr-DZ' : 'ar-DZ')} DZD`;
const productFor = (id: string) => products.find((p) => p.id === id);

function App() {
  const [locale, setLocale] = useState<Locale>(() => localStorage.getItem('bt-locale') === 'ar' ? 'ar' : 'fr');
  const [cart, setCart] = useState<CartLine[]>(() => {
    try { return JSON.parse(localStorage.getItem('bt-cart') || '[]') as CartLine[]; } catch { return []; }
  });
  const [location, navigate] = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  useEffect(() => { localStorage.setItem('bt-cart', JSON.stringify(cart)); }, [cart]);
  useEffect(() => { localStorage.setItem('bt-locale', locale); document.documentElement.lang = locale; document.documentElement.dir = locale === 'ar' ? 'rtl' : 'ltr'; }, [locale]);
  useEffect(() => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduceMotion || !('IntersectionObserver' in window)) {
      document.documentElement.classList.remove('motion-enabled');
      return;
    }

    document.documentElement.classList.add('motion-enabled');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -36px 0px' });
    document.querySelectorAll<HTMLElement>('[data-reveal]:not(.is-visible)').forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, [location]);
  const t = copy[locale];
  const add = (line: CartLine) => setCart((old) => {
    const found = old.findIndex((x) => x.productId === line.productId && x.size === line.size && x.color === line.color);
    if (found < 0) return [...old, line];
    return old.map((x, i) => i === found ? { ...x, quantity: x.quantity + line.quantity } : x);
  });
  const update = (index: number, amount: number) => setCart((old) => old.map((x, i) => i === index ? { ...x, quantity: Math.max(1, x.quantity + amount) } : x));
  const remove = (index: number) => setCart((old) => old.filter((_, i) => i !== index));
  const ops = { cart, add, update, remove };
  const count = cart.reduce((sum, item) => sum + item.quantity, 0);
  return <main className="shop" dir={locale === 'ar' ? 'rtl' : 'ltr'}>
    <header className="site-header">
      <div className="announcement">{business.announcement[locale]} <span aria-hidden="true">·</span> <span>{t.indicative}</span></div>
      <div className="header-main wrap">
        <button className="icon-button mobile-menu" aria-label={t.menu} aria-expanded={mobileMenuOpen} onClick={() => setMobileMenuOpen(!mobileMenuOpen)}><Menu size={20}/></button>
        <nav className="main-nav"><Link href="/">{t.home}</Link><Link href="/catalogue">{t.navCollections}</Link><Link href="/catalogue?filter=Nouveautés">{t.navNew}</Link><a href="#contact">{t.contact}</a></nav>
        <Link className="wordmark" href="/">BOUTIQUE <span>TRENDY</span><small>ALGER · SÉLECTION MODE</small></Link>
        <div className="header-actions"><button className="icon-button header-search" aria-label={t.search} title={t.search} onClick={() => { setMobileMenuOpen(false); navigate('/catalogue?focus=search'); }}><Search size={18}/></button><button className="language" onClick={() => setLocale(locale === 'fr' ? 'ar' : 'fr')}>{t.language}</button><Link className="bag-link" href="/panier" aria-label={t.bag}><ShoppingBag size={19}/><span>{t.bag}</span><b>{count}</b></Link></div>
      </div>
      {mobileMenuOpen && <nav className="mobile-menu-panel" aria-label={t.menu}><Link href="/" onClick={() => setMobileMenuOpen(false)}>{t.home}</Link><Link href="/catalogue" onClick={() => setMobileMenuOpen(false)}>{t.navCollections}</Link><Link href="/catalogue?filter=Nouveautés" onClick={() => setMobileMenuOpen(false)}>{t.navNew}</Link><a href="#contact" onClick={() => setMobileMenuOpen(false)}>{t.contact}</a></nav>}
    </header>
    <Switch>
      <Route path="/">
        <Home locale={locale} t={t} ops={ops}/>
      </Route>
      <Route path="/catalogue">
        <Catalogue locale={locale} t={t} ops={ops}/>
      </Route>
      <Route path="/produit/:slug">
        <ProductPage locale={locale} t={t} ops={ops}/>
      </Route>
      <Route path="/panier">
        <CartPage locale={locale} t={t} ops={ops}/>
      </Route>
      <Route>
        <div className="not-found wrap"><h1 className="serif">BOUTIQUE TRENDY</h1><Link className="text-link" href="/">{t.back}</Link></div>
      </Route>
    </Switch>
    <Footer locale={locale} t={t}/>
    {location === '/panier' && <button className="back-to-top" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} aria-label={t.close}><ArrowLeft size={16}/></button>}
  </main>;
}

type SharedProps = { locale: Locale; t: typeof copy.fr | typeof copy.ar; ops: CartOps };

function Home({ locale, t, ops }: SharedProps) {
  const [selected, setSelected] = useState('Tout voir');
  const [toast, setToast] = useState('');
  const addDemo = (p: Product) => { ops.add({ productId: p.id, size: p.sizes[0], color: p.colors[0].fr, quantity: 1 }); setToast(t.added); window.setTimeout(() => setToast(''), 2200); };
  const displayed = products.filter((p) => selected === 'Tout voir' || p.category === selected || (selected === 'Nouveautés' && p.arrival));
  const categoryNames = [{ id: 'Tout voir', fr: t.all, ar: t.all }, ...categories.map((c) => ({ id: c.id, fr: c.fr, ar: c.ar }))];
  return <>
    <section className="hero wrap">
      <div className="hero-copy fade-up"><div className="eyebrow"><i/> {t.heroKicker}</div><h1 className="serif">{t.heroTitle.split('\\n').map((line, i) => <span key={line}>{line}{i === 0 && <br/>}</span>)}</h1><p>{t.heroText}</p><Link className="button-dark" href="/catalogue">{t.shop}<ArrowRight size={16}/></Link><div className="hero-index"><span>01</span><span className="index-rule"/><span>04</span><small>{t.scroll}</small></div></div>
      <div className="hero-visual" data-reveal="right"><img src="/editorial-hero.jpg" alt={locale === 'fr' ? 'Éditorial mode, robe rose poudré' : 'إطلالة أزياء بفستان وردي هادئ'} /><div className="hero-caption"><span className="eyebrow">{t.edit} — 01</span><span className="serif">{t.softDays}</span></div><span className="hero-stamp">B · T</span></div>
      <div className="hero-side-note">UNE ALLURE SINGULIÈRE <span>—</span> ALGÉRIE</div>
    </section>
    <section className="category-section wrap" data-reveal>
      <div className="section-heading"><div><div className="eyebrow">{t.categories}</div><p>{t.categoriesSub}</p></div><Link className="text-link" href="/catalogue">{t.all}<ArrowRight size={14}/></Link></div>
      <div className="category-grid">{categories.map((cat, i) => <button className={`category-tile category-${i}`} data-reveal key={cat.id} onClick={() => { setSelected(cat.id); document.getElementById('featured')?.scrollIntoView({ behavior: 'smooth' }); }}><img src={cat.image} alt="" /><span className="category-no">0{i + 1}</span><span className="category-name serif">{locale === 'fr' ? cat.fr : cat.ar}</span><span className="category-arrow"><ArrowRight size={16}/></span></button>)}</div>
    </section>
    <section className="product-section wrap" id="featured">
      <div className="section-heading product-heading" data-reveal><div><div className="eyebrow">{t.bestSub}</div><h2 className="serif">{t.bestTitle}</h2></div><div className="filter-chips">{categoryNames.map((c) => <button className={selected === c.id ? 'chip active' : 'chip'} key={c.id} onClick={() => setSelected(c.id)}>{locale === 'fr' ? c.fr : c.ar}</button>)}</div></div>
      <div className="products-grid">{displayed.map((p) => <ProductCard key={p.id} p={p} locale={locale} t={t} onAdd={() => addDemo(p)}/>)}</div>
      <div className="demo-caption">{t.indicative}</div>
    </section>
    <section className="editorial-band" id="univers" data-reveal="right"><div className="editorial-image"><img src="/ensemble-editorial.jpg" alt={locale === 'fr' ? 'Ensemble crème dans un décor lumineux' : 'طقم بلون كريمي في أجواء مضيئة'}/></div><div className="editorial-copy"><div className="eyebrow">{t.editorialKicker}</div><h2 className="serif">{t.editorTitle}</h2><p>{t.editorText}</p><Link className="text-link" href="/catalogue?filter=Nouveautés">{t.discover}<ArrowRight size={15}/></Link><span className="editorial-index">{t.editorialIndex}</span></div></section>
    <section className="arrivals-section wrap" data-reveal><div className="section-heading"><div><div className="eyebrow">{t.arrivalsSub}</div><h2 className="serif">{t.arrivalsTitle}</h2></div><Link className="text-link" href="/catalogue">{t.all}<ArrowRight size={14}/></Link></div><div className="arrivals-row">{products.filter((p) => p.arrival).slice(0, 3).map((p) => <ProductCard key={p.id} p={p} locale={locale} t={t} compact onAdd={() => addDemo(p)}/>)}</div></section>
    <section className="instagram-section" data-reveal><div className="instagram-top"><div className="eyebrow">{t.instagram}</div><h2 className="serif">{t.instagramSub}</h2><a className="text-link" href={business.instagram} target="_blank" rel="noreferrer"><Instagram size={16}/>{t.follow}</a></div><a className="insta-grid" href={business.instagram} target="_blank" rel="noreferrer" aria-label={t.follow}>{['/editorial-hero.jpg','/robe-editorial.jpg','/ensemble-editorial.jpg','/editorial-hero.jpg'].map((img, i) => <img src={img} key={i} alt={`Éditorial de mode ${i + 1}`}/>)}</a><div className="instagram-handle">@BOUTIQUE_TRENDYSHOPDZ</div></section>
    {toast && <div className="toast" role="status"><Check size={16}/>{toast}</div>}
  </>;
}

type CardProps = { p: Product; locale: Locale; t: SharedProps['t']; onAdd: () => void; compact?: boolean };
function ProductCard({ p, locale, t, onAdd, compact }: CardProps) {
  const title = locale === 'fr' ? p.title.fr : p.title.ar;
  return <article className={`product-card ${compact ? 'compact' : ''}`} data-reveal><Link className="product-photo" href={`/produit/${p.slug}`}><img src={p.image} alt={title}/><span className="photo-label">{p.arrival ? t.new : 'B · T'}</span></Link><div className="product-info"><Link className="product-title serif" href={`/produit/${p.slug}`}>{title}</Link><span className="product-price">{priceText(p.price, locale)}</span><button className="add-quick" onClick={onAdd} aria-label={`${t.add}: ${title}`}><Plus size={17}/></button></div><div className="product-subtitle">{t.demoPrice}</div></article>;
}

function Catalogue({ locale, t, ops }: SharedProps) {
  const [category, setCategory] = useState('Tout voir');
  const [query, setQuery] = useState('');
  const [sort, setSort] = useState('featured');
  const [, params] = useRoute('/catalogue');
  useEffect(() => {
    const search = new URLSearchParams(window.location.search);
    const filter = search.get('filter');
    if (filter) setCategory(filter);
    if (search.get('focus') === 'search') {
      window.setTimeout(() => document.getElementById('catalogue-search')?.focus(), 0);
    }
  }, [params]);
  const allCats = ['Tout voir', ...categories.map((c) => c.id)];
  const results = useMemo(() => products.filter((p) => (category === 'Tout voir' || p.category === category || (category === 'Nouveautés' && p.arrival)) && (locale === 'fr' ? p.title.fr : p.title.ar).toLowerCase().includes(query.toLowerCase())).sort((a, b) => sort === 'price-low' ? a.price - b.price : sort === 'price-high' ? b.price - a.price : 0), [category, query, sort, locale]);
  return <section className="catalogue wrap"><div className="breadcrumb"><Link href="/">{locale === 'fr' ? 'Accueil' : 'الرئيسية'}</Link><span>/</span>{t.catalog}</div><div className="catalogue-title" data-reveal><div className="eyebrow">{t.catalogueKicker}</div><h1 className="serif">{t.catalog}</h1><p>{results.length} {t.showing}. <span>{t.indicative}</span></p></div>
    <div className="catalog-tools" data-reveal><div className="catalog-filters">{allCats.map((cat) => <button key={cat} className={category === cat ? 'chip active' : 'chip'} onClick={() => setCategory(cat)}>{cat === 'Tout voir' ? t.all : locale === 'fr' ? categories.find((x) => x.id === cat)?.fr : categories.find((x) => x.id === cat)?.ar}</button>)}</div><div className="catalog-utility"><label className="search-box"><Search size={16}/><input id="catalogue-search" value={query} onChange={(e) => setQuery(e.target.value)} placeholder={t.search} aria-label={t.search}/>{query && <button onClick={() => setQuery('')} aria-label={t.close}><X size={14}/></button>}</label><label className="sort-control"><span>{t.sort}</span><select value={sort} onChange={(e) => setSort(e.target.value)}><option value="featured">{t.all}</option><option value="price-low">{t.priceUp}</option><option value="price-high">{t.priceDown}</option></select><ChevronDown size={14}/></label></div></div>
    {results.length ? <div className="products-grid catalogue-grid">{results.map((p) => <ProductCard key={p.id} p={p} locale={locale} t={t} onAdd={() => ops.add({ productId: p.id, size: p.sizes[0], color: p.colors[0].fr, quantity: 1 })}/>)}</div> : <div className="empty-state"><div className="eyebrow">{t.catalog}</div><h2 className="serif">{t.empty}</h2><button className="text-link" onClick={() => { setQuery(''); setCategory('Tout voir'); }}>{t.all}</button></div>}
  </section>;
}

function ProductPage({ locale, t, ops }: SharedProps) {
  const [, params] = useRoute('/produit/:slug');
  const p = products.find((x) => x.slug === params?.slug);
  const [size, setSize] = useState(''); const [color, setColor] = useState(''); const [qty, setQty] = useState(1);
  const [image, setImage] = useState(p?.image || '');
  useEffect(() => { if (p) { setImage(p.image); setSize(p.sizes[0]); setColor(p.colors[0].fr); setQty(1); } }, [p]);
  const [notice, setNotice] = useState('');
  if (!p) return <div className="not-found wrap"><h1 className="serif">{t.notFound}</h1><Link className="text-link" href="/catalogue">{t.back}</Link></div>;
  const title = locale === 'fr' ? p.title.fr : p.title.ar;
  return <section className="detail-page wrap"><div className="breadcrumb"><Link href="/catalogue">{t.back}</Link><span>/</span>{title}</div><div className="detail-layout" data-reveal><div className="gallery"><div className="gallery-main"><img src={image} alt={title}/><span className="demo-image-tag">{t.demoVisual}</span></div><div className="gallery-thumbs">{p.gallery.map((src, i) => <button key={src} className={image === src ? 'selected' : ''} onClick={() => setImage(src)} aria-label={`${t.image} ${i + 1}`}><img src={src} alt=""/></button>)}</div></div><div className="detail-copy"><div className="eyebrow">BOUTIQUE TRENDY / {categories.find((c) => c.id === p.category)?.[locale]}</div><h1 className="serif">{title}</h1><div className="detail-price">{priceText(p.price, locale)} <span>{t.demoPrice}</span></div><p className="detail-description">{locale === 'fr' ? p.description.fr : p.description.ar}</p><div className="option-block"><div className="option-label">{t.selectSize}<span>{size}</span></div><div className="size-options">{p.sizes.map((s) => <button key={s} className={size === s ? 'size-option selected' : 'size-option'} onClick={() => setSize(s)}>{s}</button>)}</div></div><div className="option-block"><div className="option-label">{t.selectColor}<span>{locale === 'fr' ? p.colors.find((c) => c.fr === color)?.fr : p.colors.find((c) => c.fr === color)?.ar}</span></div><div className="color-options">{p.colors.map((c) => <button key={c.fr} className={color === c.fr ? 'color-option selected' : 'color-option'} style={{ '--swatch': c.hex } as CSSProperties} onClick={() => setColor(c.fr)} aria-label={locale === 'fr' ? c.fr : c.ar} title={locale === 'fr' ? c.fr : c.ar}/>)}</div></div><div className="quantity-row"><span>{t.quantity}</span><div className="quantity-control"><button aria-label={t.decrease} onClick={() => setQty(Math.max(1, qty - 1))}><Minus size={14}/></button><span>{qty}</span><button aria-label={t.increase} onClick={() => setQty(qty + 1)}><Plus size={14}/></button></div></div><button className="button-dark add-to-cart" onClick={() => { ops.add({ productId: p.id, size, color, quantity: qty }); setNotice(t.added); window.setTimeout(() => setNotice(''), 2600); }}>{t.add}<ArrowRight size={16}/></button>{notice && <div className="inline-notice" role="status"><Check size={15}/>{notice}<Link href="/panier">{t.bag}</Link></div>}<div className="detail-disclosure"><div className="eyebrow">{t.details}</div><p>{locale === 'fr' ? p.description.fr : p.description.ar}</p><div className="hairline"/><div className="eyebrow">{t.indicative}</div></div></div></div></section>;
}

function CartPage({ locale, t, ops }: SharedProps) {
  const [form, setForm] = useState({ name: '', phone: '', wilaya: '', commune: '', address: '', instructions: '' });
  const [message, setMessage] = useState('');
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState('');
  const subtotal = ops.cart.reduce((sum, line) => sum + (productFor(line.productId)?.price || 0) * line.quantity, 0);
  const field = (key: keyof typeof form, label: string, required = true, multiline = false) => <label className={`field ${multiline ? 'field-wide' : ''}`} key={key}>{label}{required && <i> *</i>}{multiline ? <textarea value={form[key]} onChange={(e) => setForm({ ...form, [key]: e.target.value })} rows={3}/> : <input value={form[key]} onChange={(e) => setForm({ ...form, [key]: e.target.value })} required={required}/>}</label>;
  const makeMessage = () => {
    if (!ops.cart.length) { setError(t.empty); return; }
    if (!form.name.trim() || !form.phone.trim() || !form.wilaya.trim() || !form.commune.trim() || !form.address.trim()) { setError(t.required); return; }
    if (!/^[+\d\s()-]{8,}$/.test(form.phone)) { setError(t.requiredPhone); return; }
    const lines = ops.cart.map((line) => { const p = productFor(line.productId)!; return `• ${locale === 'fr' ? p.title.fr : p.title.ar} — ${line.quantity} × ${priceText(p.price, locale)} | ${locale === 'fr' ? 'Taille' : 'المقاس'}: ${line.size} | ${locale === 'fr' ? 'Couleur' : 'اللون'}: ${locale === 'fr' ? p.colors.find((c) => c.fr === line.color)?.fr : p.colors.find((c) => c.fr === line.color)?.ar}`; }).join('\n');
    setMessage(locale === 'fr'
      ? `Bonjour BOUTIQUE TRENDY,\n\nJe souhaite préparer cette commande :\n${lines}\n\nSous-total indicatif : ${priceText(subtotal, locale)}\n\nNom : ${form.name}\nTéléphone : ${form.phone}\nWilaya : ${form.wilaya}\nCommune : ${form.commune}\nAdresse : ${form.address}${form.instructions ? `\nInstructions : ${form.instructions}` : ''}\n\nMerci de confirmer la disponibilité et le prix final.`
      : `مرحبًا BOUTIQUE TRENDY،\n\nأرغب في طلب المنتجات التالية:\n${lines}\n\nالمجموع الفرعي التوضيحي: ${priceText(subtotal, locale)}\n\nالاسم: ${form.name}\nالهاتف: ${form.phone}\nالولاية: ${form.wilaya}\nالبلدية: ${form.commune}\nالعنوان: ${form.address}${form.instructions ? `\nتعليمات: ${form.instructions}` : ''}\n\nيرجى تأكيد التوفر والسعر النهائي.`);
    setError('');
  };
  const copyMessage = async () => { try { await navigator.clipboard.writeText(message); setCopied(true); window.setTimeout(() => setCopied(false), 2000); } catch { setError(locale === 'fr' ? 'Copie non disponible sur cet appareil.' : 'النسخ غير متاح على هذا الجهاز.'); } };
  const openWhatsApp = () => { if (!business.whatsappNumber) { setError(t.whatsappUnavailable); return; } window.open(`https://wa.me/${business.whatsappNumber.replace(/\D/g, '')}?text=${encodeURIComponent(message)}`, '_blank', 'noopener,noreferrer'); };
  return <section className="cart-page wrap"><div className="breadcrumb"><Link href="/">{t.continue}</Link><span>/</span>{t.cart}</div><div className="cart-title"><div className="eyebrow">BOUTIQUE TRENDY / COMMANDE</div><h1 className="serif">{t.cart}</h1></div>
    {ops.cart.length === 0 ? <div className="cart-empty" data-reveal><span className="empty-icon"><ShoppingBag size={26}/></span><h2 className="serif">{t.empty}</h2><Link className="button-dark" href="/catalogue">{t.continue}<ArrowRight size={16}/></Link></div> : <div className="cart-layout" data-reveal><div className="cart-items"><div className="cart-section-label">{ops.cart.length} {t.orderLines}</div>{ops.cart.map((line, index) => { const p = productFor(line.productId); if (!p) return null; return <article className="cart-item" key={`${p.id}-${line.size}-${line.color}-${index}`}><Link href={`/produit/${p.slug}`} className="cart-thumb"><img src={p.image} alt={locale === 'fr' ? p.title.fr : p.title.ar}/></Link><div className="cart-item-main"><Link className="serif cart-product-name" href={`/produit/${p.slug}`}>{locale === 'fr' ? p.title.fr : p.title.ar}</Link><div className="cart-variant">{line.size} · {locale === 'fr' ? p.colors.find((c) => c.fr === line.color)?.fr : p.colors.find((c) => c.fr === line.color)?.ar}</div><div className="quantity-control cart-quantity"><button aria-label="Diminuer" onClick={() => ops.update(index, -1)}><Minus size={13}/></button><span>{line.quantity}</span><button aria-label="Augmenter" onClick={() => ops.update(index, 1)}><Plus size={13}/></button></div></div><div className="cart-item-end"><span>{priceText(p.price * line.quantity, locale)}</span><button className="remove-button" onClick={() => ops.remove(index)}>{t.remove}</button></div></article>; })}<Link className="continue-link" href="/catalogue"><ArrowLeft size={15}/>{t.continue}</Link></div>
      <div className="checkout-panel"><div className="checkout-summary"><h2 className="serif">{t.checkoutTitle}</h2><div className="subtotal-row"><span>{t.subtotal}</span><strong>{priceText(subtotal, locale)}</strong></div><p>{t.orderDemo}</p></div><form className="checkout-form" onSubmit={(e) => { e.preventDefault(); makeMessage(); }}><div className="eyebrow">{t.customer}</div><div className="form-grid">{field('name', t.fullName)}{field('phone', t.phone)}{field('wilaya', t.wilaya)}{field('commune', t.commune)}{field('address', t.address, true, true)}{field('instructions', t.instructions, false, true)}</div><button type="submit" className="button-dark checkout-button">{t.makeMessage}<ArrowRight size={16}/></button></form>
        {error && <div className="form-error" role="alert">{error}</div>}
        {message && <div className="prepared-message"><div className="prepared-heading"><Check size={16}/><strong>{t.messageTitle}</strong></div><pre>{message}</pre><div className="message-actions"><button className="button-outline" onClick={copyMessage}>{copied ? t.copied : t.copy}</button>{business.whatsappNumber ? <button className="button-dark" onClick={openWhatsApp}>WhatsApp <ArrowRight size={15}/></button> : <span className="setup-notice">{t.setup}</span>}</div></div>}
      </div></div>}
  </section>;
}

function Footer({ locale, t }: { locale: Locale; t: SharedProps['t'] }) {
  return <footer className="site-footer" id="contact"><div className="footer-main wrap"><div className="footer-brand"><Link className="wordmark footer-mark" href="/">BOUTIQUE <span>TRENDY</span></Link><p>{t.footerText}</p><span className="eyebrow">ALGÉRIE — ÉDITION MODE</span></div><div className="footer-column"><div className="eyebrow">{t.explore}</div><Link href="/">{t.home}</Link><Link href="/catalogue">{t.navCollections}</Link><Link href="/catalogue?filter=Nouveautés">{t.navNew}</Link><a href="#univers">{t.navStory}</a></div><div className="footer-column"><div className="eyebrow">{t.help}</div><Link href="/panier">{t.bag}</Link><a href={business.instagram} target="_blank" rel="noreferrer">{t.contact}</a><span>{t.legal}</span></div><div className="footer-social"><a href={business.instagram} target="_blank" rel="noreferrer" aria-label="Instagram"><Instagram size={19}/></a><span className="eyebrow">@BOUTIQUE_TRENDYSHOPDZ</span></div></div><div className="footer-bottom wrap"><span>© {new Date().getFullYear()} BOUTIQUE TRENDY. {t.rights}</span><span>{t.demo}</span><span>{locale === 'fr' ? 'Conçu avec soin' : 'صُمم بعناية'}</span></div></footer>;
}

export default App;
