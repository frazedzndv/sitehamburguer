import { useEffect, useMemo, useRef, useState, type CSSProperties, type MutableRefObject } from 'react'
import { ArrowRight, ExternalLink, Menu, Search, X } from 'lucide-react'
import { categories, products, type Category, type Product } from './data/menu'
import heroBurger from './assets/hero-cheeseburger-triplo.png'
import rusticBurger from './assets/hamburguer-rustico.png'
import assemblyVideo from './assets/burger-assembly.mp4'

const ORDER_URL = 'https://instadelivery.com.br/willsanduiches'
const money = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' })

function Brand() {
  return <a className="brand" href="#inicio" aria-label="Will Sanduíches — início"><span>W</span><strong>Will<small>Sanduíches</small></strong></a>
}

function Header() {
  const [open, setOpen] = useState(false)
  useEffect(() => {
    const close = (event: KeyboardEvent) => event.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', close)
    return () => window.removeEventListener('keydown', close)
  }, [])
  return <header className="site-header">
    <div className="container nav-wrap">
      <Brand />
      <button className="menu-toggle" onClick={() => setOpen(!open)} aria-expanded={open} aria-controls="main-nav" aria-label={open ? 'Fechar menu' : 'Abrir menu'}>{open ? <X /> : <Menu />}</button>
      <nav id="main-nav" className={open ? 'nav open' : 'nav'} aria-label="Navegação principal">
        <a href="#inicio" onClick={() => setOpen(false)}>Início</a>
        <a href="#cardapio" onClick={() => setOpen(false)}>Cardápio</a>
        <a href="#sobre" onClick={() => setOpen(false)}>Sobre</a>
        <a className="button button-small" href={ORDER_URL} target="_blank" rel="noreferrer">Fazer pedido <ExternalLink size={16} /></a>
      </nav>
    </div>
  </header>
}

type HeroScrubController = { setProgress: (progress: number) => void }

function HeroVisual({ controllerRef }: { controllerRef: MutableRefObject<HeroScrubController | null> }) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const surfaceRef = useRef<HTMLDivElement>(null)
  const rangeRef = useRef<HTMLInputElement>(null)
  const targetRef = useRef(0)
  const progressRef = useRef(0)
  const durationRef = useRef(0)
  const currentRef = useRef(0)
  const frameRef = useRef(0)
  const isVisibleRef = useRef(false)
  const mobilePlayedRef = useRef(false)
  const setProgress = (progress: number) => {
    const normalized = Math.min(1, Math.max(0, progress))
    progressRef.current = normalized
    targetRef.current = normalized * durationRef.current
    if (rangeRef.current) rangeRef.current.value = String(Math.round(normalized * 100))
  }
  useEffect(() => {
    const video = videoRef.current
    const canvas = canvasRef.current
    const surface = surfaceRef.current
    if (!video || !canvas || !surface) return
    let mounted = true
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const coarsePointer = window.matchMedia('(hover: none), (pointer: coarse)').matches
    const clampTime = (value: number) => Math.min(Math.max(0, durationRef.current - .04), Math.max(0, value))
    const renderTransparentFrame = () => {
      if (!video.videoWidth || !video.videoHeight) return
      const maxWidth = 960
      const scale = Math.min(1, maxWidth / video.videoWidth)
      const width = Math.round(video.videoWidth * scale)
      const height = Math.round(video.videoHeight * scale)
      if (canvas.width !== width || canvas.height !== height) {
        canvas.width = width
        canvas.height = height
      }
      const context = canvas.getContext('2d', { willReadFrequently: true })
      if (!context) return
      context.clearRect(0, 0, width, height)
      context.drawImage(video, 0, 0, width, height)
      const frame = context.getImageData(0, 0, width, height)
      const pixels = frame.data
      for (let index = 0; index < pixels.length; index += 4) {
        const red = pixels[index]
        const green = pixels[index + 1]
        const blue = pixels[index + 2]
        const tealDistance = Math.min(green - red, blue - red)
        const isChromaHue = green > 18 && green >= blue * .76 && tealDistance > 2
        if (isChromaHue) {
          const alpha = 1 - Math.min(1, Math.max(0, (tealDistance - 2) / 18))
          pixels[index + 3] = Math.round(255 * alpha)
          if (alpha > 0) {
            pixels[index + 1] = Math.min(green, red * 1.06)
            pixels[index + 2] = Math.min(blue, red * 1.06)
          }
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
    const maybePlayMobile = () => {
      if (coarsePointer && !reducedMotion && isVisibleRef.current && durationRef.current && !mobilePlayedRef.current) {
        mobilePlayedRef.current = true
        setProgress(1)
      }
    }
    const metadata = () => {
      durationRef.current = Number.isFinite(video.duration) ? video.duration : 0
      video.pause()
      currentRef.current = 0
      targetRef.current = progressRef.current * durationRef.current
      try { video.currentTime = .001 } catch { /* The first decoded frame remains visible. */ }
      maybePlayMobile()
    }
    const frame = () => {
      if (!mounted) return
      const gap = targetRef.current - currentRef.current
      if (durationRef.current && Math.abs(gap) > .003) {
        currentRef.current = clampTime(currentRef.current + gap * .14)
        if (video.readyState >= 2 && !video.seeking) {
          try { video.currentTime = currentRef.current } catch { /* Wait for the next decoded frame. */ }
        }
      }
      frameRef.current = requestAnimationFrame(frame)
    }
    video.addEventListener('loadedmetadata', metadata)
    video.addEventListener('loadeddata', renderTransparentFrame)
    video.addEventListener('seeked', renderTransparentFrame)
    if (video.readyState >= 1) metadata()
    if (video.readyState >= 2) renderTransparentFrame()
    const observer = new IntersectionObserver(([entry]) => {
      isVisibleRef.current = entry.isIntersecting
      if (entry.isIntersecting) maybePlayMobile()
    }, { threshold: .35 })
    observer.observe(surface)
    frameRef.current = requestAnimationFrame(frame)
    return () => {
      mounted = false
      cancelAnimationFrame(frameRef.current)
      observer.disconnect()
      video.removeEventListener('loadedmetadata', metadata)
      video.removeEventListener('loadeddata', renderTransparentFrame)
      video.removeEventListener('seeked', renderTransparentFrame)
    }
  }, [])
  useEffect(() => {
    controllerRef.current = { setProgress }
    return () => { controllerRef.current = null }
  })
  return <div className="hero-visual video-scrubber">
    <div ref={surfaceRef} className="video-scrubber__surface">
      <img className="hero-video-poster" src={heroBurger} width="1254" height="1254" alt="" aria-hidden="true" />
      <video ref={videoRef} className="hero-assembly-video" src={assemblyVideo} muted playsInline preload="auto" disablePictureInPicture aria-hidden="true" tabIndex={-1} />
      <canvas ref={canvasRef} className="hero-assembly-canvas" role="img" aria-label="Montagem interativa de um hambúrguer" />
      <img className="hero-static-fallback" src={heroBurger} width="1254" height="1254" alt="Cheeseburger triplo montado com queijo derretido e cebola grelhada" />
    </div>
    <input className="video-progress-sr" ref={rangeRef} type="range" min="0" max="100" defaultValue="0" aria-label="Progresso da montagem do hambúrguer" onInput={(event) => setProgress(Number(event.currentTarget.value) / 100)} />
  </div>
}

function Hero() {
  const heroRef = useRef<HTMLElement>(null)
  const scrubController = useRef<HeroScrubController | null>(null)
  const wheelProgressRef = useRef(0)
  useEffect(() => {
    const hero = heroRef.current
    if (!hero || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const desktop = window.matchMedia('(min-width: 901px) and (hover: hover) and (pointer: fine)')
    const handleWheel = (event: WheelEvent) => {
      if (!desktop.matches || event.ctrlKey) return
      const rect = hero.getBoundingClientRect()
      const heroIsActive = rect.top <= 82 && rect.bottom >= window.innerHeight * .72
      if (!heroIsActive) return
      const progress = wheelProgressRef.current
      const shouldCapture = (event.deltaY > 0 && progress < 1) || (event.deltaY < 0 && progress > 0)
      if (!shouldCapture) return
      event.preventDefault()
      const unit = event.deltaMode === 1 ? 18 : event.deltaMode === 2 ? window.innerHeight : 1
      const next = Math.min(1, Math.max(0, progress + (event.deltaY * unit) / 820))
      wheelProgressRef.current = next
      scrubController.current?.setProgress(next)
      hero.style.setProperty('--hero-scroll', next.toFixed(4))
    }
    window.addEventListener('wheel', handleWheel, { passive: false })
    return () => {
      window.removeEventListener('wheel', handleWheel)
    }
  }, [])
  return <section ref={heroRef} id="inicio" className="hero">
    <div className="hero-portal-word" aria-hidden="true">WILL</div>
    <div className="container hero-grid">
      <div className="hero-copy reveal">
        <p className="eyebrow"><span /> Will Sanduíches · Juiz de Fora</p>
        <h1>Seu próximo favorito <em>começa aqui.</em></h1>
        <p className="hero-lead">Conheça os sanduíches do Will e escolha o seu favorito.</p>
        <div className="hero-actions">
          <a className="button" href="#cardapio">Ver cardápio <ArrowRight size={18} /></a>
          <a className="text-link" href={ORDER_URL} target="_blank" rel="noreferrer">Fazer pedido <ExternalLink size={16} /></a>
        </div>
      </div>
      <HeroVisual controllerRef={scrubController} />
    </div>
    <div className="ticker" aria-hidden="true"><span>49 escolhas</span><i /> <span>7 categorias</span><i /> <span>pedido no InstaDelivery</span></div>
  </section>
}

function ProductVisual({ product, index }: { product: Product; index: number }) {
  const short = product.category === 'Bebidas' ? 'BEBIDA' : product.category === 'Sobremesas' ? 'DOCE' : product.category === 'Molho extra' ? 'EXTRA' : 'WILL'
  return <div className={`product-media media-${index % 5}`} aria-label={`Espaço reservado para foto de ${product.name}`} role="img">
    <span>{String(index + 1).padStart(2, '0')}</span><strong>{short}</strong><i aria-hidden="true" />
    <small>foto em breve</small>
  </div>
}

function ProductCard({ product, index }: { product: Product; index: number }) {
  const mayHaveOptions = !['Bebidas', 'Sobremesas', 'Molho extra'].includes(product.category)
  return <article className="product-card" style={{ '--reveal-delay': `${(index % 3) * 65}ms` } as CSSProperties}>
    <ProductVisual product={product} index={index} />
    <div className="product-body">
      <p className="product-category">{product.category}</p>
      <h3>{product.name}</h3>
      {product.description && <p className="product-description">{product.description}</p>}
      <div className="product-footer">
        <div><small>{mayHaveOptions ? 'A partir de' : 'Preço'}</small><strong>{money.format(product.price)}</strong></div>
        <a href={ORDER_URL} target="_blank" rel="noreferrer" aria-label={`Pedir ${product.name} no InstaDelivery`}>Pedir <ExternalLink size={14} /></a>
      </div>
    </div>
  </article>
}

function MenuSection() {
  const [category, setCategory] = useState<Category | 'Todos'>('Todos')
  const [query, setQuery] = useState('')
  const normalized = query.trim().toLocaleLowerCase('pt-BR')
  const filtered = useMemo(() => products.filter(product => {
    const inCategory = category === 'Todos' || product.category === category
    const haystack = `${product.name} ${product.description ?? ''}`.toLocaleLowerCase('pt-BR')
    return inCategory && (!normalized || haystack.includes(normalized))
  }), [category, normalized])
  const clear = () => { setCategory('Todos'); setQuery('') }
  return <section id="cardapio" className="menu-section">
    <div className="container">
      <div className="section-heading reveal"><div><p className="eyebrow"><span /> Cardápio completo</p><h2>Escolha sem pressa.<br /><em>Peça sem complicação.</em></h2></div><p>Use a busca ou selecione uma categoria. O pedido é concluído com segurança no InstaDelivery.</p></div>
      <div className="menu-tools reveal">
        <label className="search-field"><span className="sr-only">Buscar no cardápio</span><Search size={20} /><input value={query} onChange={e => setQuery(e.target.value)} placeholder="Busque por nome ou ingrediente" /><kbd>{filtered.length}</kbd></label>
        <div className="filters" aria-label="Filtrar produtos por categoria">
          {(['Todos', ...categories] as const).map(item => <button key={item} className={category === item ? 'active' : ''} aria-pressed={category === item} onClick={() => setCategory(item)}>{item}</button>)}
        </div>
      </div>
      <p className="results" aria-live="polite">{filtered.length} {filtered.length === 1 ? 'item encontrado' : 'itens encontrados'}{category !== 'Todos' ? ` em ${category}` : ''}</p>
      {filtered.length ? <div className="product-grid">{filtered.map((product) => <ProductCard key={`${product.category}-${product.name}`} product={product} index={products.indexOf(product)} />)}</div> : <div className="empty-state"><span>0</span><h3>Nenhum lanche por aqui.</h3><p>Tente outro nome, ingrediente ou volte a ver o cardápio completo.</p><button className="button" onClick={clear}>Limpar busca</button></div>}
    </div>
  </section>
}

function About() {
  const sectionRef = useRef<HTMLElement>(null)
  const [active, setActive] = useState(false)
  const [entered, setEntered] = useState(false)
  useEffect(() => {
    const section = sectionRef.current
    if (!section) return
    const observer = new IntersectionObserver(([entry]) => {
      setActive(entry.isIntersecting)
      if (entry.isIntersecting) setEntered(true)
    }, { threshold: .18 })
    observer.observe(section)
    return () => observer.disconnect()
  }, [])
  return <section ref={sectionRef} id="sobre" className={`about about-motion${active ? ' is-active' : ''}${entered ? ' has-entered' : ''}`}><div className="container about-grid">
    <div className="about-visual" onPointerMove={(event) => {
      if (event.pointerType !== 'mouse') return
      const rect = event.currentTarget.getBoundingClientRect()
      event.currentTarget.style.setProperty('--about-x', `${(((event.clientX - rect.left) / rect.width) - .5) * 16}px`)
      event.currentTarget.style.setProperty('--about-y', `${(((event.clientY - rect.top) / rect.height) - .5) * 16}px`)
    }} onPointerLeave={(event) => {
      event.currentTarget.style.setProperty('--about-x', '0px')
      event.currentTarget.style.setProperty('--about-y', '0px')
    }}>
      <span className="about-word" aria-hidden="true">WILL</span>
      <div className="about-image-entry"><div className="about-image-parallax"><div className="about-image-float">
        <img src={rusticBurger} width="1254" height="1254" loading="lazy" alt="Hambúrguer rústico artesanal com queijo, bacon e cebola grelhada" />
      </div></div></div>
    </div>
    <div className="about-copy"><p className="eyebrow about-copy-item"><span /> Sobre o Will</p><h2 className="about-copy-item">Do cardápio<br />para a sua mesa.</h2><p className="about-copy-item">A Will Sanduíches reúne opções artesanais, clássicos, bebidas, sobremesas e molhos extras. Escolha o que combina com a sua fome e siga para o InstaDelivery para consultar as modalidades disponíveis de delivery ou retirada.</p><a className="text-link light about-copy-item" href={ORDER_URL} target="_blank" rel="noreferrer">Abrir cardápio de pedidos <ExternalLink size={16} /></a></div>
  </div></section>
}

function FinalCta() {
  return <section className="final-cta"><div className="container"><p>Seu pedido está a um clique</p><h2>Já escolheu<br /><em>o seu?</em></h2><a className="button button-light" href={ORDER_URL} target="_blank" rel="noreferrer">Fazer pedido <ExternalLink size={18} /></a></div></section>
}

function Footer() {
  return <footer><div className="container footer-grid"><Brand /><nav aria-label="Navegação do rodapé"><a href="#inicio">Início</a><a href="#cardapio">Cardápio</a><a href="#sobre">Sobre</a></nav><a className="footer-order" href={ORDER_URL} target="_blank" rel="noreferrer">Cardápio de pedidos <ExternalLink size={15} /></a></div><div className="container footer-bottom"><p>© {new Date().getFullYear()} Will Sanduíches</p><p>Juiz de Fora · MG</p></div></footer>
}

export default function App() {
  useEffect(() => {
    const observer = new IntersectionObserver(entries => entries.forEach(entry => {
      if (!entry.isIntersecting) return
      entry.target.classList.add('visible')
      observer.unobserve(entry.target)
    }), { threshold: .08, rootMargin: '0px 0px -5% 0px' })
    document.querySelectorAll('.reveal').forEach(el => observer.observe(el))
    let frame = 0
    const updateProgress = () => {
      frame = 0
      const max = document.documentElement.scrollHeight - window.innerHeight
      document.documentElement.style.setProperty('--page-progress', String(max > 0 ? window.scrollY / max : 0))
    }
    const schedule = () => { if (!frame) frame = requestAnimationFrame(updateProgress) }
    updateProgress()
    window.addEventListener('scroll', schedule, { passive: true })
    window.addEventListener('resize', schedule)
    return () => { observer.disconnect(); cancelAnimationFrame(frame); window.removeEventListener('scroll', schedule); window.removeEventListener('resize', schedule) }
  }, [])
  return <><div className="page-progress" aria-hidden="true" /><Header /><main><Hero /><MenuSection /><About /><FinalCta /></main><Footer /></>
}
