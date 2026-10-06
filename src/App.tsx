import { useEffect, useMemo, useRef, useState } from 'react'
import { ArrowRight, ExternalLink, Flame, Menu, ShieldCheck, X } from 'lucide-react'
import { products } from './data/menu'
import heroBurger from './assets/hero-cheeseburger-triplo.png'
import rusticBurger from './assets/hamburguer-rustico.png'
import assemblyVideo from './assets/burger-assembly.mp4'

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
  useEffect(() => {
    const update = () => setScrolled(window.scrollY > 30)
    const close = (event: KeyboardEvent) => event.key === 'Escape' && setOpen(false)
    update()
    window.addEventListener('scroll', update, { passive: true })
    window.addEventListener('keydown', close)
    return () => { window.removeEventListener('scroll', update); window.removeEventListener('keydown', close) }
  }, [])
  return <header className={`site-header${scrolled ? ' is-scrolled' : ''}`}>
    <div className="container nav-wrap">
      <Brand />
      <button className="menu-toggle" onClick={() => setOpen(!open)} aria-expanded={open} aria-controls="main-nav" aria-label={open ? 'Fechar menu' : 'Abrir menu'}>{open ? <X /> : <Menu />}</button>
      <nav id="main-nav" className={open ? 'nav open' : 'nav'} aria-label="Navegação principal">
        <a href="#inicio" onClick={() => setOpen(false)}>Início</a><a href="#favoritos" onClick={() => setOpen(false)}>Favoritos</a><a href="#sobre" onClick={() => setOpen(false)}>Sobre</a><a href="#avaliacoes" onClick={() => setOpen(false)}>Avaliações</a><a href="#contato" onClick={() => setOpen(false)}>Contato</a>
        <OrderLink event="delivery_click_header" className="button button-small">Pedir agora <ArrowRight size={17} /></OrderLink>
      </nav>
    </div>
  </header>
}

function HeroAssembly() {
  const videoRef = useRef<HTMLVideoElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const surfaceRef = useRef<HTMLDivElement>(null)
  const frameRef = useRef(0)
  const durationRef = useRef(0)
  const seekToRef = useRef(0)
  const seekAtRef = useRef(0)
  useEffect(() => {
    const video = videoRef.current
    const canvas = canvasRef.current
    const surface = surfaceRef.current
    if (!video || !canvas || !surface) return
    let mounted = true
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const render = () => {
      if (!video.videoWidth || !video.videoHeight) return
      const scale = Math.min(1, 960 / video.videoWidth)
      const width = Math.round(video.videoWidth * scale)
      const height = Math.round(video.videoHeight * scale)
      if (canvas.width !== width || canvas.height !== height) { canvas.width = width; canvas.height = height }
      const context = canvas.getContext('2d', { willReadFrequently: true })
      if (!context) return
      context.clearRect(0, 0, width, height)
      context.drawImage(video, 0, 0, width, height)
      const frame = context.getImageData(0, 0, width, height)
      const pixels = frame.data
      for (let index = 0; index < pixels.length; index += 4) {
        const red = pixels[index], green = pixels[index + 1], blue = pixels[index + 2]
        const tealDistance = Math.min(green - red, blue - red)
        if (green > 18 && green >= blue * .76 && tealDistance > 2) {
          const alpha = 1 - Math.min(1, Math.max(0, (tealDistance - 2) / 18))
          pixels[index + 3] = Math.round(255 * alpha)
          if (alpha > 0) { pixels[index + 1] = Math.min(green, red * 1.06); pixels[index + 2] = Math.min(blue, red * 1.06) }
        } else if (green > 34 && green > red * 1.02 && blue > red * .45) {
          const edgeStrength = Math.min(1, (green - red) / 24)
          pixels[index + 3] = Math.round(255 * (1 - edgeStrength * .42))
          pixels[index + 1] = Math.min(green, red * .96)
          pixels[index + 2] = Math.min(blue, red * .92)
        }
      }
      context.putImageData(frame, 0, 0)
      surface.classList.add('is-rendered')
    }
    const animate = () => {
      if (!mounted) return
      const gap = seekToRef.current - seekAtRef.current
      if (durationRef.current && Math.abs(gap) > .0008) {
        seekAtRef.current += gap * .115
        if (video.readyState >= 2 && !video.seeking) {
          try { video.currentTime = seekAtRef.current } catch { /* Retry on the next frame. */ }
        }
      }
      frameRef.current = requestAnimationFrame(animate)
    }
    const readScroll = () => {
      const hero = surface.closest('.hero') as HTMLElement | null
      if (!hero || !durationRef.current) return
      const max = Math.max(1, hero.offsetHeight - window.innerHeight)
      const progress = Math.min(1, Math.max(0, -hero.getBoundingClientRect().top / max))
      seekToRef.current = progress * Math.max(0, durationRef.current - .04)
      hero.style.setProperty('--hero-progress', progress.toFixed(4))
    }
    const metadata = () => {
      durationRef.current = Number.isFinite(video.duration) ? video.duration : 0
      video.pause()
      if (reducedMotion) seekToRef.current = Math.max(0, durationRef.current - .04)
      readScroll()
      seekAtRef.current = seekToRef.current
      try { video.currentTime = seekAtRef.current } catch { /* Initial frame will render on loadeddata. */ }
    }
    const unlock = () => {
      const play = video.play()
      if (play) play.then(() => video.pause()).catch(() => undefined)
    }
    video.addEventListener('loadedmetadata', metadata)
    video.addEventListener('loadeddata', render)
    video.addEventListener('seeked', render)
    window.addEventListener('scroll', readScroll, { passive: true })
    window.addEventListener('resize', readScroll)
    ;['touchstart', 'pointerdown', 'wheel', 'keydown'].forEach(event => window.addEventListener(event, unlock, { once: true, passive: true }))
    if (video.readyState >= 1) metadata()
    if (video.readyState >= 2) render()
    frameRef.current = requestAnimationFrame(animate)
    return () => {
      mounted = false
      cancelAnimationFrame(frameRef.current)
      video.removeEventListener('loadedmetadata', metadata)
      video.removeEventListener('loadeddata', render)
      video.removeEventListener('seeked', render)
      window.removeEventListener('scroll', readScroll)
      window.removeEventListener('resize', readScroll)
    }
  }, [])
  return <div className="hero-visual video-scrubber"><div ref={surfaceRef} className="video-scrubber__surface">
    <video ref={videoRef} className="hero-assembly-video" src={assemblyVideo} muted playsInline preload="auto" disablePictureInPicture aria-hidden="true" tabIndex={-1} />
    <canvas ref={canvasRef} className="hero-assembly-canvas" role="img" aria-label="Montagem animada de um hambúrguer artesanal" />
  </div></div>
}

function Hero() {
  return <section id="inicio" className="hero">
    <div className="hero-word" aria-hidden="true">WILL</div>
    <div className="container hero-grid">
      <div className="hero-copy">
        <h1>Não é só<br /><em>um hambúrguer.</em></h1>
        <p>É artesanal. É feito na hora. É do jeito que tem que ser.</p>
        <div className="hero-actions"><OrderLink event="delivery_click_hero">Pedir agora <ArrowRight size={18} /></OrderLink><a className="text-link" href="#favoritos">Conhecer os favoritos</a></div>
        <div className="hero-trust" aria-label="Diferenciais"><span><Flame size={16} /> Feito na hora</span><span><ShieldCheck size={16} /> Pedido concluído no delivery</span></div>
      </div>
      <HeroAssembly />
    </div>
  </section>
}

function Favorites() {
  const favorites = useMemo(() => favoriteNames.map(name => products.find(product => product.name === name)).filter(Boolean), [])
  return <section id="favoritos" className="favorites section"><div className="container">
    <div className="section-intro"><h2>Os favoritos<br /><em>da casa.</em></h2><p>Os que fazem o pessoal voltar. Três escolhas reais do cardápio, sem transformar esta página em outro delivery.</p></div>
    <div className="favorite-list">{favorites.map((product, index) => product && <article className="favorite-item" key={product.name}>
      <div className={`favorite-media media-${index}`}>{index === 0 ? <img src={heroBurger} alt="Triplo Cheese da Will Sanduíches" loading="lazy" /> : <div className="photo-pending" aria-label={`Fotografia de ${product.name} ainda não fornecida`}><span>W</span><small>Foto oficial em breve</small></div>}</div>
      <div className="favorite-copy"><p>{product.category}</p><h3>{product.name}</h3><div className="favorite-description">{product.description}</div><strong>{money.format(product.price)}</strong><OrderLink event="delivery_click_product" className="text-link" product={product.name}>Quero esse <ExternalLink size={15} /></OrderLink></div>
    </article>)}</div>
  </div></section>
}

function BrandStory() {
  return <section id="sobre" className="brand-story section"><div className="container story-grid">
    <div className="story-image"><img src={rusticBurger} width="1254" height="1254" loading="lazy" alt="Hambúrguer artesanal com queijo, bacon e cebola grelhada" /></div>
    <div className="story-copy"><h2>Não fazemos<br />fast food.<br /><em>Fazemos hambúrguer.</em></h2><p>Carne preparada do jeito certo. Ingredientes selecionados. Montado na hora. Sem complicação.</p><OrderLink event="delivery_click_story" className="text-link light">Ver cardápio no delivery <ExternalLink size={16} /></OrderLink></div>
  </div></section>
}

const process = [
  ['01', 'Preparado', 'O pedido entra em preparo.'],
  ['02', 'Montado', 'O hambúrguer ganha forma.'],
  ['03', 'Embalado', 'Pronto para seguir viagem.'],
  ['04', 'Entregue', 'Do nosso fogo para a sua casa.'],
]

function Process() {
  return <section className="process section"><div className="container"><div className="section-intro"><h2>Do nosso fogo<br /><em>para sua casa.</em></h2><p>Uma sequência curta que mostra o cuidado entre o preparo e a entrega.</p></div><ol>{process.map(([number, title, text]) => <li key={number}><span>{number}</span><div><h3>{title}</h3><p>{text}</p></div></li>)}</ol></div></section>
}

function DesireBanner() {
  return <section className="desire"><img src={heroBurger} alt="Hambúrguer artesanal da Will Sanduíches em destaque" loading="lazy" /><div className="container desire-copy"><h2>Você ainda<br />tá só olhando?</h2><OrderLink event="delivery_click_banner" className="button button-light">Pedir agora <ArrowRight size={18} /></OrderLink></div></section>
}

function SocialProof() {
  return <section id="avaliacoes" className="proof section"><div className="container proof-grid"><div><h2>Quem prova,<br /><em>entende.</em></h2><p>Avaliações verificadas serão publicadas aqui assim que forem fornecidas pela marca ou integradas ao Google.</p></div><div className="proof-pending"><span aria-hidden="true">“</span><p>Espaço preparado para depoimentos reais, com nota, texto, autoria e origem.</p><small>Conteúdo pendente · não publicado como prova social</small></div></div></section>
}

function Contact() {
  return <section id="contato" className="contact section"><div className="container contact-grid"><div><h2>Onde a gente tá.</h2><p>Endereço, horário e WhatsApp ainda não foram fornecidos.</p></div><div className="contact-status"><span>Atendimento e retirada</span><strong>Consulte as modalidades disponíveis no delivery oficial.</strong><OrderLink event="delivery_click_contact" className="text-link">Abrir delivery <ExternalLink size={16} /></OrderLink></div></div></section>
}

function FinalCta() {
  return <section className="final-cta"><div className="container"><h2>Bateu<br /><em>a fome?</em></h2><p>Seu próximo hambúrguer está a poucos cliques.</p><OrderLink event="delivery_click_final" className="button button-light">Pedir agora <ArrowRight size={20} /></OrderLink></div></section>
}

function Footer() {
  return <footer><div className="container footer-grid"><Brand /><nav aria-label="Links do rodapé"><a href="#favoritos">Favoritos</a><a href="#sobre">Sobre</a><OrderLink event="delivery_click_footer" className="footer-link">Delivery <ExternalLink size={14} /></OrderLink></nav></div><div className="container footer-bottom"><p>© {new Date().getFullYear()} Will Sanduíches</p><p>Juiz de Fora · MG</p></div></footer>
}

function MobileOrder() {
  const [visible, setVisible] = useState(false)
  useEffect(() => { const update = () => setVisible(window.scrollY > window.innerHeight * .72); update(); window.addEventListener('scroll', update, { passive: true }); return () => window.removeEventListener('scroll', update) }, [])
  return <div className={`mobile-order${visible ? ' visible' : ''}`}><OrderLink event="delivery_click_mobile_fixed">Pedir agora <ArrowRight size={18} /></OrderLink></div>
}

export default function App() {
  useEffect(() => {
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
  return <><i className="page-progress" aria-hidden="true" /><Header /><main><Hero /><Favorites /><BrandStory /><Process /><DesireBanner /><SocialProof /><Contact /><FinalCta /></main><Footer /><MobileOrder /></>
}
