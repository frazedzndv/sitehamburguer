import { useEffect, useMemo, useRef, useState } from 'react'
import { ArrowRight, ExternalLink, Flame, Menu, ShieldCheck, X } from 'lucide-react'
import { products } from './data/menu'
import heroBurger from './assets/hero-cheeseburger-triplo.png'
import rusticBurger from './assets/hamburguer-rustico.png'

const links = {
  delivery: 'https://instadelivery.com.br/willsanduiches',
  whatsapp: '',
  instagram: '',
  maps: '',
  products: {} as Record<string, string>,
}

const money = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' })
const favoriteNames = ['Triplo Cheese', 'Monster Bacon', 'Double Melt']

declare global {
  interface Window { dataLayer?: Array<Record<string, unknown>> }
}

function track(event: string, detail: Record<string, unknown> = {}) {
  window.dataLayer?.push({ event, ...detail })
  window.dispatchEvent(new CustomEvent('will:conversion', { detail: { event, ...detail } }))
}

function OrderLink({ event, className = 'button', children, product }: { event: string; className?: string; children: React.ReactNode; product?: string }) {
  const href = product ? links.products[product] || links.delivery : links.delivery
  return <a className={className} href={href} target="_blank" rel="noreferrer" data-conversion-event={event} onClick={() => track(event, product ? { product } : {})}>{children}</a>
}

function Brand() {
  return <a className="brand" href="#inicio" aria-label="Will Sanduíches — início"><span>W</span><strong>Will<small>Sanduíches</small></strong></a>
}

function Header() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const toggleRef = useRef<HTMLButtonElement>(null)
  useEffect(() => {
    const update = () => setScrolled(window.scrollY > 30)
    const close = (event: KeyboardEvent) => {
      if (event.key !== 'Escape') return
      setOpen(false)
      toggleRef.current?.focus()
    }
    const closeAtDesktop = () => window.innerWidth >= 1024 && setOpen(false)
    update()
    window.addEventListener('scroll', update, { passive: true })
    window.addEventListener('keydown', close)
    window.addEventListener('resize', closeAtDesktop)
    return () => { window.removeEventListener('scroll', update); window.removeEventListener('keydown', close); window.removeEventListener('resize', closeAtDesktop) }
  }, [])
  return <header className={`site-header${scrolled ? ' is-scrolled' : ''}`}>
    <div className="container nav-wrap">
      <Brand />
      <button ref={toggleRef} type="button" className="menu-toggle" onClick={() => setOpen(!open)} aria-expanded={open} aria-controls="main-nav" aria-label={open ? 'Fechar menu' : 'Abrir menu'}>{open ? <X /> : <Menu />}</button>
      <nav id="main-nav" className={open ? 'nav open' : 'nav'} aria-label="Navegação principal">
        <a href="#inicio" onClick={() => setOpen(false)}>Início</a><a href="#favoritos" onClick={() => setOpen(false)}>Favoritos</a><a href="#sobre" onClick={() => setOpen(false)}>Sobre</a>
        <OrderLink event="delivery_click_header" className="button button-small">Pedir agora <ArrowRight size={17} /></OrderLink>
      </nav>
    </div>
  </header>
}

function Hero() {
  return <section id="inicio" className="hero">
    <div className="hero-word" aria-hidden="true">WILL</div>
    <div className="container hero-grid">
      <div className="hero-copy">
        <h1>Não é só<br /><em><span>um</span>{' '}<span>hambúrguer.</span></em></h1>
        <p>É artesanal. É feito na hora. É do jeito que tem que ser.</p>
        <div className="hero-actions"><OrderLink event="delivery_click_hero"><span className="desktop-label">Pedir agora</span><span className="mobile-label">Fazer pedido</span> <ArrowRight size={18} /></OrderLink><a className="text-link" href="#favoritos"><span className="desktop-label">Conhecer os favoritos</span><span className="mobile-label">Ver cardápio</span></a></div>
        <div className="hero-trust" aria-label="Diferenciais"><span><Flame size={16} /> Feito na hora</span><span><ShieldCheck size={16} /> Pedido concluído no delivery</span></div>
      </div>
      <div className="hero-visual"><img className="hero-product" src={heroBurger} width="1536" height="1024" alt="Hambúrguer artesanal da Will Sanduíches" fetchPriority="high" /></div>
    </div>
  </section>
}

function Favorites() {
  const favorites = useMemo(() => favoriteNames.map(name => products.find(product => product.name === name)).filter(Boolean), [])
  return <section id="favoritos" className="favorites section"><div className="container">
    <div className="section-intro"><h2>Os favoritos<br /><em>da casa.</em></h2><p>Três escolhas reais para conhecer o cardápio da Will antes de seguir para o delivery.</p></div>
    <div className="favorite-list">{favorites.map((product, index) => product && <article className="favorite-item" key={product.name}>
      <div className={`favorite-media media-${index}`}><div className="photo-pending" aria-label={`Fotografia de ${product.name} ainda não fornecida`}><span>W</span><small>Foto oficial em breve</small></div></div>
      <div className="favorite-copy"><p>{product.category}</p><h3>{product.name}</h3><div className="favorite-description">{product.description}</div><strong>{money.format(product.price)}</strong><OrderLink event="delivery_click_product" className="text-link" product={product.name}>Ver no delivery <ExternalLink size={15} /></OrderLink></div>
    </article>)}</div>
  </div></section>
}

function BrandStory() {
  return <section id="sobre" className="brand-story section"><div className="container story-grid">
    <div className="story-image"><img src={rusticBurger} width="1254" height="1254" loading="lazy" alt="Hambúrguer artesanal com queijo, bacon e cebola grelhada" /></div>
    <div className="story-copy"><h2>Do cardápio<br /><em>para o seu pedido.</em></h2><p>A Will reúne sanduíches artesanais, clássicos, bebidas, sobremesas e molhos. Aqui você conhece a marca; no delivery, escolhe e conclui o pedido.</p><OrderLink event="delivery_click_story" className="text-link light">Ver cardápio no delivery <ExternalLink size={16} /></OrderLink></div>
  </div></section>
}

const process = [
  ['01', 'Preparado', 'O pedido entra em preparo.'],
  ['02', 'Montado', 'O hambúrguer ganha forma.'],
  ['03', 'Embalado', 'Pronto para seguir viagem.'],
  ['04', 'Concluído', 'Delivery ou retirada conforme a opção disponível.'],
]

function Process() {
  return <section className="process section"><div className="container"><div className="section-intro"><h2>Do nosso fogo<br /><em>para sua casa.</em></h2><p>Uma sequência curta que mostra o cuidado entre o preparo e a entrega.</p></div><ol>{process.map(([number, title, text]) => <li key={number}><span>{number}</span><div><h3>{title}</h3><p>{text}</p></div></li>)}</ol></div></section>
}

function DesireBanner() {
  return <section className="desire"><img src={heroBurger} alt="Hambúrguer artesanal da Will Sanduíches em destaque" loading="lazy" /><div className="container desire-copy"><h2>Você ainda<br />tá só olhando?</h2><OrderLink event="delivery_click_banner" className="button button-light">Pedir agora <ArrowRight size={18} /></OrderLink></div></section>
}

function FinalCta() {
  return <section className="final-cta"><div className="container"><h2>Bateu<br /><em>a fome?</em></h2><p>Seu próximo hambúrguer está a poucos cliques.</p><OrderLink event="delivery_click_final" className="button button-light">Pedir agora <ArrowRight size={20} /></OrderLink></div></section>
}

function Footer() {
  return <footer><div className="container footer-grid"><Brand /><nav aria-label="Links do rodapé"><a href="#favoritos">Favoritos</a><a href="#sobre">Sobre</a><OrderLink event="delivery_click_footer" className="footer-link">Delivery <ExternalLink size={14} /></OrderLink></nav></div><div className="container footer-bottom"><p>© {new Date().getFullYear()} Will Sanduíches</p><p>Juiz de Fora · MG</p></div></footer>
}

function MobileOrder() {
  const [visible, setVisible] = useState(false)
  const finalVisibleRef = useRef(false)
  useEffect(() => {
    const update = () => setVisible(window.scrollY > window.innerHeight && !finalVisibleRef.current)
    const finalCta = document.querySelector('.final-cta')
    const observer = new IntersectionObserver(([entry]) => { finalVisibleRef.current = entry.isIntersecting; update() }, { threshold: .15 })
    if (finalCta) observer.observe(finalCta)
    update()
    window.addEventListener('scroll', update, { passive: true })
    return () => { observer.disconnect(); window.removeEventListener('scroll', update) }
  }, [])
  return <div className={`mobile-order${visible ? ' visible' : ''}`} aria-hidden={!visible}><OrderLink event="delivery_click_mobile_fixed">Pedir agora <ArrowRight size={18} /></OrderLink></div>
}

export default function App() {
  useEffect(() => {
    if ('scrollRestoration' in history) history.scrollRestoration = 'manual'
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' })
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced) return
    const observer = new IntersectionObserver(entries => entries.forEach(entry => entry.isIntersecting && entry.target.classList.add('is-visible')), { threshold: .12 })
    document.querySelectorAll('.section, .desire').forEach(element => observer.observe(element))
    let frame = 0
    const progress = () => {
      if (frame) return
      frame = requestAnimationFrame(() => {
        frame = 0
        const max = document.documentElement.scrollHeight - window.innerHeight
        document.documentElement.style.setProperty('--page-progress', String(max > 0 ? window.scrollY / max : 0))
      })
    }
    progress()
    window.addEventListener('scroll', progress, { passive: true })
    return () => { observer.disconnect(); window.removeEventListener('scroll', progress); cancelAnimationFrame(frame) }
  }, [])
  return <><i className="page-progress" aria-hidden="true" /><Header /><main><Hero /><Favorites /><BrandStory /><Process /><DesireBanner /><FinalCta /></main><Footer /><MobileOrder /></>
}
