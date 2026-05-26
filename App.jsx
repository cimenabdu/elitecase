import { useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { ShoppingBag, User, ShieldCheck, Star, Truck, CreditCard, Upload, Search, SlidersHorizontal, Minus, Plus, X } from 'lucide-react'

const phones = {
  Apple: ['iPhone 15', 'iPhone 15 Plus', 'iPhone 15 Pro', 'iPhone 15 Pro Max', 'iPhone 14', 'iPhone 14 Plus', 'iPhone 14 Pro', 'iPhone 14 Pro Max', 'iPhone 13', 'iPhone 13 Pro', 'iPhone 13 Pro Max', 'iPhone 12', 'iPhone 12 Pro', 'iPhone 11', 'iPhone XR', 'iPhone SE'],
  Samsung: ['Samsung Galaxy S24', 'Samsung Galaxy S24 Plus', 'Samsung Galaxy S24 Ultra', 'Samsung Galaxy S23', 'Samsung Galaxy S23 Plus', 'Samsung Galaxy S23 Ultra', 'Samsung Galaxy S22', 'Samsung Galaxy S21', 'Samsung Galaxy A55', 'Samsung Galaxy A54', 'Samsung Galaxy A35', 'Samsung Galaxy A34', 'Samsung Galaxy A15', 'Samsung Galaxy Z Flip', 'Samsung Galaxy Z Fold'],
  Xiaomi: ['Xiaomi 14', 'Xiaomi 13', 'Xiaomi 12', 'Redmi Note 13', 'Redmi Note 12', 'Redmi Note 11', 'Poco X6', 'Poco X5', 'Poco F5'],
  Huawei: ['Huawei P60', 'Huawei P50', 'Huawei P40', 'Huawei Mate 50', 'Huawei Mate 40', 'Huawei Nova 11', 'Huawei Nova 10'],
  OPPO: ['OPPO Find X5', 'OPPO Find X3', 'OPPO Reno 10', 'OPPO Reno 8', 'OPPO Reno 7', 'OPPO A98', 'OPPO A78', 'OPPO A58'],
  Autres: ['Honor', 'OnePlus', 'Google Pixel', 'Motorola', 'Realme', 'Vivo', 'Je ne trouve pas mon modèle'],
}

const categories = ['Tous', 'Papillon', 'Vague', 'Dino', 'Marbre', 'Minimaliste', 'Floral', 'Cœur', 'Initiales', 'Animal', 'Abstrait', 'Luxe noir', 'Ligne blanche', 'Univers étoilé', 'Smile', 'Damier', 'Citation']

const products = [
  { id: 1, name: 'Coque Papillon Élégance', category: 'Papillon', price: '24,90 €', badge: 'Tendance', pattern: 'butterfly' },
  { id: 2, name: 'Coque Vague Minimal', category: 'Vague', price: '24,90 €', badge: 'Nouveau', pattern: 'wave' },
  { id: 3, name: 'Coque Dino Cute', category: 'Dino', price: '24,90 €', badge: '', pattern: 'dino' },
  { id: 4, name: 'Coque Marbre Noir', category: 'Marbre', price: '24,90 €', badge: 'Best-seller', pattern: 'marble' },
  { id: 5, name: 'Coque Floral White', category: 'Floral', price: '24,90 €', badge: 'Nouveau', pattern: 'floral' },
  { id: 6, name: 'Coque Abstrait Premium', category: 'Abstrait', price: '24,90 €', badge: 'Tendance', pattern: 'abstract' },
  { id: 7, name: 'Coque Cœur Signature', category: 'Cœur', price: '24,90 €', badge: '', pattern: 'heart' },
  { id: 8, name: 'Coque Damier Luxe', category: 'Damier', price: '24,90 €', badge: 'Tendance', pattern: 'checker' },
]

function PhoneSelect({ value, onChange, compact = false }) {
  return (
    <select className={compact ? 'select compact' : 'select'} value={value} onChange={(e) => onChange(e.target.value)}>
      <option value="">Choisir un modèle</option>
      {Object.entries(phones).map(([brand, models]) => (
        <optgroup label={brand} key={brand}>
          {models.map((model) => <option value={model} key={model}>{model}</option>)}
        </optgroup>
      ))}
    </select>
  )
}

function PhoneMockup({ image, text, zoom, offsetX, offsetY, finish }) {
  return (
    <div className={`phone-shell ${finish.toLowerCase().replaceAll(' ', '-')}`}>
      <div className="camera-block"><span /><span /></div>
      <div className="phone-inner">
        {image ? (
          <img src={image} alt="Aperçu personnalisé" style={{ transform: `translate(${offsetX}px, ${offsetY}px) scale(${zoom})` }} />
        ) : (
          <div className="placeholder-art">
            <span>ELITE</span>
            <small>Importez votre photo</small>
          </div>
        )}
        {text && <div className="custom-text">{text}</div>}
      </div>
    </div>
  )
}

function DesignPhone({ pattern }) {
  return (
    <div className={`design-phone ${pattern}`}>
      <div className="camera-dot" />
      <div className="design-content">
        {pattern === 'butterfly' && <><span>◇</span><strong>Butterfly</strong><span>◇</span></>}
        {pattern === 'wave' && <><span>∿∿∿</span><strong>Wave</strong><span>∿∿∿</span></>}
        {pattern === 'dino' && <><span>◢</span><strong>DINO</strong><span>◣</span></>}
        {pattern === 'marble' && <><span>╱╲╱</span><strong>Marble</strong><span>╲╱╲</span></>}
        {pattern === 'floral' && <><span>✧</span><strong>Floral</strong><span>✧</span></>}
        {pattern === 'abstract' && <><span>● ○</span><strong>Abstract</strong><span>○ ●</span></>}
        {pattern === 'heart' && <><span>♡</span><strong>Signature</strong><span>♡</span></>}
        {pattern === 'checker' && <><span>▦</span><strong>Luxe</strong><span>▦</span></>}
      </div>
    </div>
  )
}

export default function App() {
  const [selectedPhone, setSelectedPhone] = useState('')
  const [customPhone, setCustomPhone] = useState('')
  const [finish, setFinish] = useState('Mat')
  const [protection, setProtection] = useState('Standard')
  const [image, setImage] = useState(null)
  const [customText, setCustomText] = useState('')
  const [zoom, setZoom] = useState(1)
  const [offsetX, setOffsetX] = useState(0)
  const [offsetY, setOffsetY] = useState(0)
  const [brandFilter, setBrandFilter] = useState('Toutes')
  const [designFilter, setDesignFilter] = useState('Tous')
  const [cart, setCart] = useState([])
  const [cartOpen, setCartOpen] = useState(false)

  const visibleProducts = useMemo(() => products.filter(p => designFilter === 'Tous' || p.category === designFilter), [designFilter])

  const addToCart = (item) => {
    setCart((prev) => [...prev, { ...item, cartId: Date.now() + Math.random(), phone: selectedPhone || 'Modèle à confirmer' }])
    setCartOpen(true)
  }

  const total = cart.reduce((sum, item) => sum + Number(item.price.replace(' €', '').replace(',', '.')), 0).toFixed(2).replace('.', ',')

  const onUpload = (event) => {
    const file = event.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = () => setImage(reader.result)
    reader.readAsDataURL(file)
  }

  return (
    <div className="site">
      <header className="header">
        <a className="logo" href="#accueil">ELITE CASE</a>
        <nav>
          <a href="#accueil">Accueil</a><a href="#best-seller">Best-seller</a><a href="#personnaliser">Personnaliser</a><a href="#designs">Designs</a><a href="#avis">Avis</a><a href="#contact">Contact</a>
        </nav>
        <div className="header-actions">
          <button onClick={() => setCartOpen(true)}><ShoppingBag size={18} /> Panier <span>{cart.length}</span></button>
          <button><User size={18} /> Compte</button>
        </div>
      </header>

      <main>
        <section className="hero" id="accueil">
          <motion.div className="hero-copy" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .7 }}>
            <span className="badge">Best-seller</span>
            <h1>Créez votre coque personnalisée avec la photo de votre choix</h1>
            <p>Importez votre image, choisissez votre modèle de téléphone et recevez une coque unique, élégante et résistante.</p>
            <div className="hero-buttons">
              <a className="btn primary" href="#personnaliser">Personnaliser ma coque</a>
              <a className="btn secondary" href="#designs">Voir les designs prêts à commander</a>
            </div>
            <div className="trust-row"><span><ShieldCheck size={17}/> Paiement sécurisé</span><span><Truck size={17}/> Livraison rapide</span><span><Star size={17}/> 5/5 clients</span></div>
          </motion.div>
          <motion.div className="hero-visual" initial={{ opacity: 0, scale: .95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: .8 }}>
            <PhoneMockup image={image} text={customText || 'Votre style'} zoom={zoom} offsetX={offsetX} offsetY={offsetY} finish={finish} />
          </motion.div>
        </section>

        <section className="product-highlight" id="best-seller">
          <div className="section-heading">
            <span className="eyebrow">Produit principal</span>
            <h2>Coque Photo Personnalisée Premium</h2>
            <p>Le best-seller ELITE CASE : une coque photo haut de gamme, créée à partir de votre image.</p>
          </div>
          <div className="highlight-grid" id="personnaliser">
            <div className="preview-card">
              <span className="badge">Best-seller</span>
              <PhoneMockup image={image} text={customText} zoom={zoom} offsetX={offsetX} offsetY={offsetY} finish={finish} />
              <button className="btn secondary full">Voir un aperçu</button>
            </div>
            <div className="config-card">
              <h3>À partir de 29,90 €</h3>
              <p>Importez la photo ou l’image de votre choix et transformez-la en coque unique. Parfaite pour offrir, garder un souvenir ou afficher votre style.</p>
              <label className="upload-box"><Upload size={20}/><span>Importer une photo ou une image</span><input type="file" accept="image/*" onChange={onUpload}/></label>
              <div className="form-grid">
                <div><label>Modèle de téléphone</label><PhoneSelect value={selectedPhone} onChange={setSelectedPhone}/></div>
                <div><label>Ajouter du texte ou des initiales</label><input className="input" value={customText} onChange={(e) => setCustomText(e.target.value)} placeholder="Ex : AC, LOVE, 2026" /></div>
              </div>
              {selectedPhone === 'Je ne trouve pas mon modèle' && <div className="custom-request"><label>Demande personnalisée</label><input className="input" value={customPhone} onChange={(e) => setCustomPhone(e.target.value)} placeholder="Indiquez la marque et le modèle exact" /></div>}
              <div className="controls">
                <label>Zoom photo <input type="range" min="1" max="2" step="0.05" value={zoom} onChange={(e) => setZoom(e.target.value)} /></label>
                <label>Déplacer horizontalement <input type="range" min="-45" max="45" value={offsetX} onChange={(e) => setOffsetX(e.target.value)} /></label>
                <label>Déplacer verticalement <input type="range" min="-45" max="45" value={offsetY} onChange={(e) => setOffsetY(e.target.value)} /></label>
              </div>
              <div className="choice-block"><strong>Rendu</strong><div>{['Mat','Brillant','Transparent','Noir','Blanc'].map(v => <button className={finish === v ? 'pill active' : 'pill'} key={v} onClick={() => setFinish(v)}>{v}</button>)}</div></div>
              <div className="choice-block"><strong>Protection</strong><div>{['Standard','Renforcée','Premium antichoc'].map(v => <button className={protection === v ? 'pill active' : 'pill'} key={v} onClick={() => setProtection(v)}>{v}</button>)}</div></div>
              <button className="btn primary full" onClick={() => addToCart({ name: 'Coque Photo Personnalisée Premium', price: protection === 'Premium antichoc' ? '34,90 €' : '29,90 €', badge: 'Best-seller' })}>Créer ma coque</button>
            </div>
          </div>
        </section>

        <section className="designs" id="designs">
          <div className="section-heading"><span className="eyebrow">Designs prêts</span><h2>Choisissez un design déjà prêt</h2><p>Des modèles élégants et tendance pour commander rapidement votre coque sans personnalisation photo.</p></div>
          <div className="filters"><div><SlidersHorizontal size={18}/><select className="select compact" value={brandFilter} onChange={(e) => setBrandFilter(e.target.value)}><option>Toutes</option>{Object.keys(phones).map(brand => <option key={brand}>{brand}</option>)}</select></div><div><Search size={18}/><select className="select compact" value={designFilter} onChange={(e) => setDesignFilter(e.target.value)}>{categories.map(cat => <option key={cat}>{cat}</option>)}</select></div></div>
          <div className="category-strip">{categories.slice(1).map(cat => <button key={cat} onClick={() => setDesignFilter(cat)} className={designFilter === cat ? 'chip active' : 'chip'}>{cat}</button>)}</div>
          <div className="product-grid">
            {visibleProducts.map(product => <motion.article className="product-card" key={product.id} whileHover={{ y: -6 }}><div className="product-visual"><DesignPhone pattern={product.pattern}/>{product.badge && <span className="badge small">{product.badge}</span>}</div><h3>{product.name}</h3><p>{product.price}</p><PhoneSelect compact value="" onChange={() => {}}/><button className="btn primary full" onClick={() => addToCart(product)}>Ajouter au panier</button></motion.article>)}
          </div>
        </section>

        <section className="steps"><div className="step"><span>01</span><h3>Choisissez votre modèle</h3><p>Sélectionnez votre téléphone parmi Apple, Samsung, Xiaomi, Huawei, OPPO et plus.</p></div><div className="step"><span>02</span><h3>Importez ou choisissez</h3><p>Ajoutez votre photo, ajustez l’aperçu ou sélectionnez un design déjà prêt.</p></div><div className="step"><span>03</span><h3>Validez votre commande</h3><p>Votre coque premium est préparée avec soin puis expédiée rapidement.</p></div></section>

        <section className="benefits"><h2>Une expérience premium jusque dans les détails</h2><div className="benefit-grid">{['Impression haute qualité','Coque résistante et élégante','Compatible Apple, Samsung, Xiaomi, Huawei, OPPO et plus','Aperçu avant commande','Livraison rapide','Paiement sécurisé','Idéal pour offrir'].map(item => <div className="benefit" key={item}><ShieldCheck size={20}/><span>{item}</span></div>)}</div></section>

        <section className="reviews" id="avis"><div className="section-heading"><span className="eyebrow">Avis clients</span><h2>Ils ont choisi ELITE CASE</h2></div><div className="review-grid">{['La qualité de la photo est incroyable.','Le rendu est élégant et la coque protège très bien.','J’ai commandé une coque avec une photo souvenir, le résultat est parfait.','Très beau design, livraison rapide.'].map((r,i) => <article className="review" key={r}><div>★★★★★</div><p>“{r}”</p><strong>Client vérifié {i+1}</strong></article>)}</div></section>

        <section className="faq"><h2>Questions fréquentes</h2>{['Puis-je importer n’importe quelle photo ?','Quels formats d’image sont acceptés ?','Puis-je recadrer ma photo avant de commander ?','Que faire si mon modèle de téléphone n’apparaît pas ?','Les coques protègent-elles bien le téléphone ?','Combien de temps prend la livraison ?','Puis-je commander une coque avec un design déjà prêt ?','Est-ce possible d’ajouter du texte sur la coque ?'].map((q, i) => <details key={q}><summary>{q}</summary><p>{i === 3 ? 'Choisissez “Je ne trouve pas mon modèle” et indiquez votre demande personnalisée.' : 'Oui. ELITE CASE propose une expérience simple, claire et premium avant validation de commande.'}</p></details>)}</section>
      </main>

      <footer className="footer" id="contact"><div><h2>ELITE CASE</h2><p>Des coques personnalisées premium, créées pour vous.</p></div><div className="footer-links"><a>Accueil</a><a>Personnaliser</a><a>Designs</a><a>Livraison</a><a>Retours</a><a>Contact</a><a>CGV</a><a>Politique de confidentialité</a></div><form className="newsletter"><input placeholder="Votre email"/><button>S’inscrire</button></form><p className="payments">Paiement sécurisé · Visa · Mastercard · PayPal · Apple Pay</p></footer>

      {cartOpen && <aside className="cart-panel"><button className="close" onClick={() => setCartOpen(false)}><X/></button><h2>Votre panier</h2>{cart.length === 0 ? <p>Votre panier est vide.</p> : <>{cart.map(item => <div className="cart-item" key={item.cartId}><div><strong>{item.name}</strong><span>{item.phone}</span></div><b>{item.price}</b><button onClick={() => setCart(cart.filter(x => x.cartId !== item.cartId))}>Retirer</button></div>)}<div className="cart-total"><span>Total</span><strong>{total} €</strong></div><button className="btn primary full">Commander maintenant</button><button className="btn secondary full">Continuer mes achats</button></>}</aside>}
    </div>
  )
}
