'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import Image from 'next/image';
import { watchaProducts, pediaProducts, faqItems, Product } from '@/data/products';

/* ─── Scroll Reveal Hook ─── */
function useReveal() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) el.classList.add('visible'); },
      { threshold: 0.05 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);
  return ref;
}

/* ─── Animated Counter ─── */
function Counter({ end, suffix = '', duration = 2000 }: { end: number; suffix?: string; duration?: number }) {
  const [count, setCount] = useState(0);
  const [started, setStarted] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setStarted(true); },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!started) return;
    const startTime = Date.now();
    const timer = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * end));
      if (progress >= 1) clearInterval(timer);
    }, 16);
    return () => clearInterval(timer);
  }, [started, end, duration]);

  return <span ref={ref}>{count.toLocaleString()}{suffix}</span>;
}

/* ─── Product Modal ─── */
function ProductModal({ product, accent, onClose, onInquiry }: { product: Product; accent: 'watcha' | 'pedia'; onClose: () => void; onInquiry: (name: string) => void }) {
  const borderColor = accent === 'watcha' ? 'border-watcha' : 'border-pedia';
  const tagBg = accent === 'watcha' ? 'bg-watcha' : 'bg-pedia';

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4" onClick={onClose}>
      <div className="fixed inset-0 bg-black/70 backdrop-blur-md" />
      <div role="dialog" aria-modal="true" aria-label={product.name} className="relative z-[10000] bg-white rounded-3xl max-w-2xl w-full max-h-[85vh] overflow-y-auto overscroll-contain shadow-2xl" onClick={(e) => e.stopPropagation()}>
        <button onClick={onClose} className="absolute top-4 right-4 z-10 w-10 h-10 flex items-center justify-center rounded-full bg-black/5 hover:bg-black/10 transition-colors">
          <svg className="w-5 h-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
        </button>
        <div className="bg-gradient-to-b from-gray-50 to-white p-8 rounded-t-3xl">
          <Image src={product.image} alt={product.name} width={800} height={600} className="w-full h-auto object-contain rounded-xl" />
        </div>
        <div className={`p-8 border-t-4 ${borderColor}`}>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-2xl font-bold text-gray-900">{product.name}</h3>
            <span className={`${tagBg} text-white text-sm px-4 py-1.5 rounded-full font-medium`}>{product.tag}</span>
          </div>
          <p className="text-gray-600 mb-8 leading-relaxed text-[15px]">{product.description}</p>
          <div className="flex gap-4 mb-8">
            {product.impressions !== '-' && (
              <div className="bg-gray-50 rounded-2xl px-6 py-4 text-center flex-1 border border-gray-100">
                <div className="text-xs text-gray-400 mb-1 uppercase tracking-wider">예상 노출수</div>
                <div className="text-2xl font-bold text-gray-900">{product.impressions}</div>
              </div>
            )}
            {product.ctr !== '-' && (
              <div className="bg-gray-50 rounded-2xl px-6 py-4 text-center flex-1 border border-gray-100">
                <div className="text-xs text-gray-400 mb-1 uppercase tracking-wider">예상 CTR</div>
                <div className="text-2xl font-bold text-gray-900">{product.ctr}</div>
              </div>
            )}
          </div>
          <div className="bg-gray-50 rounded-2xl p-6 space-y-4 text-sm text-gray-600 mb-8">
            <div className="flex items-start gap-3"><span className="w-8 h-8 rounded-lg bg-white flex items-center justify-center text-base shadow-sm">📍</span><div><span className="font-semibold text-gray-900">노출 위치</span><br/>{product.location}</div></div>
            <div className="flex items-start gap-3"><span className="w-8 h-8 rounded-lg bg-white flex items-center justify-center text-base shadow-sm">🎯</span><div><span className="font-semibold text-gray-900">구좌</span><br/>{product.slots}</div></div>
            <div className="flex items-start gap-3"><span className="w-8 h-8 rounded-lg bg-white flex items-center justify-center text-base shadow-sm">📱</span><div><span className="font-semibold text-gray-900">디바이스</span><br/>{product.device}</div></div>
            <div className="flex items-start gap-3"><span className="w-8 h-8 rounded-lg bg-white flex items-center justify-center text-base shadow-sm">🎨</span><div><span className="font-semibold text-gray-900">소재</span><br/>{product.material}</div></div>
          </div>
          <a href="#contact" onClick={() => { onInquiry(product.name); onClose(); }} className={`block text-center ${tagBg} hover:opacity-90 text-white font-semibold py-4 rounded-2xl transition-opacity cursor-pointer text-lg`}>
            이 상품 문의하기
          </a>
        </div>
      </div>
    </div>
  );
}

/* ─── Product Card ─── */
function ProductCard({ product, accent, onInquiry }: { product: Product; accent: 'watcha' | 'pedia'; onInquiry: (name: string) => void }) {
  const [modalOpen, setModalOpen] = useState(false);
  const borderColor = accent === 'watcha' ? 'border-l-watcha' : 'border-l-pedia';
  const tagBg = accent === 'watcha' ? 'bg-watcha' : 'bg-pedia';
  const hoverBg = accent === 'watcha' ? 'hover:bg-watcha/[0.02]' : 'hover:bg-pedia/[0.02]';

  return (
    <>
      <button
        type="button"
        className={`bg-white rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden cursor-pointer group border-l-4 ${borderColor} ${hoverBg} text-left w-full`}
        onClick={() => setModalOpen(true)}
      >
        <div className="p-6 pointer-events-none">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-lg font-bold text-gray-900 group-hover:text-gray-700 transition-colors">{product.name}</h3>
            <span className={`${tagBg} text-white text-[11px] px-2.5 py-1 rounded-full font-medium`}>{product.tag}</span>
          </div>
          <p className="text-gray-500 text-sm leading-relaxed mb-4">{product.description}</p>
          <div className="flex items-center justify-between">
            <div className="flex gap-3">
              {product.impressions !== '-' && (
                <span className="text-xs text-gray-400 bg-gray-50 px-2.5 py-1 rounded-lg">노출 {product.impressions}</span>
              )}
              {product.ctr !== '-' && (
                <span className="text-xs text-gray-400 bg-gray-50 px-2.5 py-1 rounded-lg">CTR {product.ctr}</span>
              )}
            </div>
            <span className={`inline-flex items-center gap-1 text-xs font-semibold ${accent === 'watcha' ? 'text-watcha' : 'text-pedia'}`}>
              자세히 보기
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
            </span>
          </div>
        </div>
      </button>
      {modalOpen && <ProductModal product={product} accent={accent} onClose={() => setModalOpen(false)} onInquiry={onInquiry} />}
    </>
  );
}

/* ─── FAQ Accordion ─── */
function FaqItem({ question, answer, index }: { question: string; answer: string; index: number }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden mb-3">
      <button
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        className="w-full flex items-center justify-between p-5 text-left hover:bg-gray-50 transition-colors"
      >
        <div className="flex items-center gap-4">
          <span className="text-watcha font-bold text-sm w-6">Q{index + 1}</span>
          <span className="font-medium text-gray-900">{question}</span>
        </div>
        <svg className={`w-5 h-5 text-gray-400 transition-transform flex-shrink-0 ml-4 ${open ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      <div className={`overflow-hidden transition-all duration-300 ${open ? 'max-h-48 pb-5' : 'max-h-0'}`}>
        <div className="px-5 pl-14">
          <p className="text-gray-600 text-sm leading-relaxed">{answer}</p>
        </div>
      </div>
    </div>
  );
}

/* ─── Section Heading ─── */
function SectionHeading({ title, subtitle, badge, badgeColor }: { title: string; subtitle?: string; badge?: string; badgeColor?: string }) {
  const ref = useReveal();
  return (
    <div ref={ref} className="reveal text-center mb-16">
      <div className="section-divider" />
      <div className="flex items-center gap-3 justify-center mb-4">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900">{title}</h2>
        {badge && <span className={`${badgeColor} text-sm font-bold px-3 py-1 rounded-full`}>{badge}</span>}
      </div>
      {subtitle && <p className="text-gray-500 max-w-2xl mx-auto">{subtitle}</p>}
    </div>
  );
}

/* ─── Main Page ─── */
export default function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [inquiry, setInquiry] = useState('');

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    try {
      const response = await fetch('https://formspree.io/f/xpwrjqgk', {
        method: 'POST',
        body: data,
        headers: { Accept: 'application/json' },
      });
      if (response.ok) {
        setFormSubmitted(true);
      } else {
        alert('문의 전송에 실패했습니다. ad_sales@watcha.com으로 직접 문의해주세요.');
      }
    } catch {
      alert('네트워크 오류가 발생했습니다. ad_sales@watcha.com으로 직접 문의해주세요.');
    }
  };

  const platformRef = useReveal();
  const whyRef = useReveal();
  const watchaRef = useReveal();
  const pediaRef = useReveal();
  const faqRef = useReveal();
  const contactRef = useReveal();

  return (
    <>
      {/* ── Header ── */}
      <header role="banner" className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? 'bg-white/95 backdrop-blur-lg shadow-sm h-16' : 'bg-transparent h-20'}`}>
        <div className="max-w-7xl mx-auto px-6 h-full flex items-center justify-between">
          <Image src={scrolled ? '/watcha-mediakit-web/images/watcha_logo.png' : '/watcha-mediakit-web/images/watcha_logo_white.png'} alt="WATCHA 로고" width={120} height={28} className="h-7 w-auto" />
          <nav aria-label="메인 메뉴" className="hidden md:flex items-center gap-8">
            {[
              ['플랫폼 소개', '#platform'],
              ['왓챠 광고', '#watcha'],
              ['왓챠피디아 광고', '#pedia'],
              ['FAQ', '#faq'],
            ].map(([label, href]) => (
              <a key={href} href={href} className={`text-sm font-medium transition-colors ${scrolled ? 'text-gray-600 hover:text-watcha' : 'text-white/70 hover:text-white'}`}>
                {label}
              </a>
            ))}
            <a href="#contact" className="bg-watcha hover:bg-watcha-dark text-white text-sm font-semibold px-6 py-2.5 rounded-full transition-all hover:shadow-lg hover:shadow-watcha/25">
              광고 문의하기
            </a>
          </nav>
          <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="md:hidden">
            <svg className={`w-6 h-6 ${scrolled ? 'text-gray-900' : 'text-white'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={mobileMenuOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'} />
            </svg>
          </button>
        </div>
        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-t shadow-lg">
            {[['플랫폼 소개','#platform'],['왓챠 광고','#watcha'],['왓챠피디아 광고','#pedia'],['FAQ','#faq'],['광고 문의하기','#contact']].map(([l,h]) => (
              <a key={h} href={h} onClick={() => setMobileMenuOpen(false)} className="block px-6 py-4 text-gray-700 hover:bg-gray-50 font-medium">{l}</a>
            ))}
          </div>
        )}
      </header>

      {/* ── Hero ── */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#0a0a0f]">
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-watcha/20 rounded-full blur-[120px] glow-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-pedia/10 rounded-full blur-[100px] glow-pulse" style={{ animationDelay: '2s' }} />
        </div>
        <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/10 rounded-full px-4 py-2 mb-8">
            <span className="w-2 h-2 bg-watcha rounded-full animate-pulse" />
            <span className="text-white/60 text-sm">광고주 모집 중</span>
          </div>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-white leading-[1.1] mb-8 tracking-tight">
            콘텐츠 매니아<br /><span className="gradient-text">400만</span>에게 다가가는<br />가장 확실한 방법
          </h1>
          <p className="text-lg md:text-xl text-gray-400 mb-14 max-w-2xl mx-auto leading-relaxed">
            왓챠 & 왓챠피디아, 두 플랫폼의 프리미엄 유저에게<br className="hidden md:block" /> 브랜드를 전달하세요.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-10 mb-14 max-w-3xl mx-auto">
            {[
              { end: 400, suffix: '만+', label: '통합 MAU' },
              { end: 7.5, suffix: '억+', label: '누적 별점', isDecimal: true },
              { end: 77, suffix: '%', label: '20~30대 비율' },
              { end: 1000, suffix: '만+', label: '전체 가입자' },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-2xl md:text-4xl font-black gradient-text mb-1 whitespace-nowrap">
                  {stat.isDecimal ? <>{stat.end}{stat.suffix}</> : <Counter end={stat.end} suffix={stat.suffix} />}
                </div>
                <div className="text-gray-500 text-xs md:text-sm tracking-wide">{stat.label}</div>
              </div>
            ))}
          </div>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="#watcha" className="inline-flex items-center justify-center gap-2 bg-watcha hover:bg-watcha-dark text-white font-semibold px-8 py-4 rounded-full text-lg transition-all hover:shadow-lg hover:shadow-watcha/25">
              광고 상품 둘러보기
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" /></svg>
            </a>
            <a href="#contact" className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20 text-white font-semibold px-8 py-4 rounded-full text-lg transition-all">
              문의하기
            </a>
          </div>
        </div>
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce-slow">
          <svg className="w-6 h-6 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7" /></svg>
        </div>
      </section>

      <main>
      {/* ── Platform Compare ── */}
      <section id="platform" className="py-28 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <SectionHeading title="두 플랫폼, 하나의 광고 솔루션" subtitle="MZ세대 콘텐츠 매니아가 매일 찾는 두 플랫폼에서 브랜드를 만나보세요." />
          <div ref={platformRef} className="reveal grid md:grid-cols-2 gap-8">
            <div className="rounded-3xl border border-gray-200 p-8 hover:border-watcha/40 hover:shadow-xl transition-all duration-300 group">
              <div className="flex items-center gap-3 mb-8">
                <span className="bg-watcha text-white text-sm font-bold px-4 py-1.5 rounded-full">WATCHA</span>
                <span className="text-gray-400 text-sm">OTT 스트리밍</span>
              </div>
              <div className="grid grid-cols-2 gap-3 mb-8">
                {[['MAU','약 100만'],['일간 방문','약 3회'],['일일 체류','약 2시간'],['전체 가입자','1,000만+']].map(([l,v]) => (
                  <div key={l} className="bg-gray-50 rounded-2xl p-4 group-hover:bg-watcha/[0.03] transition-colors">
                    <div className="text-[11px] text-gray-400 uppercase tracking-wider mb-1">{l}</div>
                    <div className="text-lg font-bold text-gray-900">{v}</div>
                  </div>
                ))}
              </div>
              <p className="text-gray-500 text-sm leading-relaxed">MZ세대가 매일 3번씩 방문하여 2시간씩 머무르는 프리미엄 OTT. 전체 가입자 1,000만 이상의 대규모 유저 집단입니다.</p>
            </div>
            <div className="rounded-3xl border border-gray-200 p-8 hover:border-pedia/40 hover:shadow-xl transition-all duration-300 group">
              <div className="flex items-center gap-3 mb-8">
                <span className="bg-pedia text-white text-sm font-bold px-4 py-1.5 rounded-full">WATCHA PEDIA</span>
                <span className="text-gray-400 text-sm">콘텐츠 리뷰</span>
              </div>
              <div className="grid grid-cols-2 gap-3 mb-8">
                {[['MAU','약 300만'],['주간 방문','12.2회'],['누적 별점','7.5억+'],['누적 가입자','1,387만']].map(([l,v]) => (
                  <div key={l} className="bg-gray-50 rounded-2xl p-4 group-hover:bg-pedia/[0.03] transition-colors">
                    <div className="text-[11px] text-gray-400 uppercase tracking-wider mb-1">{l}</div>
                    <div className="text-lg font-bold text-gray-900">{v}</div>
                  </div>
                ))}
              </div>
              <p className="text-gray-500 text-sm leading-relaxed">7.5억 별점 데이터 기반의 콘텐츠 리뷰 플랫폼. 주간 12.2회 재방문하는 충성도 높은 콘텐츠 매니아가 모여있습니다.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Why Advertise ── */}
      <section className="py-28 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6">
          <SectionHeading title="왜 왓챠에 광고해야 할까요?" />
          <div ref={whyRef} className="reveal stagger grid md:grid-cols-3 gap-6">
            {[
              { icon: '👥', title: '프리미엄 오디언스', desc: '전체 가입자 1,000만 이상. 높은 구매력의 MZ세대가 집중된 대규모 유저 집단입니다.' },
              { icon: '⏱️', title: '높은 몰입도', desc: '하루 평균 2시간 체류, 주 12.2회 재방문. 업계 최고 수준의 충성도를 보여줍니다.' },
              { icon: '🎬', title: '다양한 업종 커버', desc: '영화, 드라마, 뷰티, 식음료, 가전, 도서, 패션 등 다양한 업종의 광고주가 왓챠와 함께하고 있습니다.' },
            ].map((item) => (
              <div key={item.title} className="bg-white rounded-3xl p-10 text-center hover:shadow-xl transition-all duration-300 border border-gray-100">
                <div className="w-16 h-16 rounded-2xl bg-gray-50 flex items-center justify-center text-3xl mx-auto mb-6">{item.icon}</div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{item.title}</h3>
                <p className="text-gray-500 leading-relaxed text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── WATCHA Products ── */}
      <section id="watcha" className="py-28 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <SectionHeading title="왓챠 광고 상품" subtitle="앱 진입 시 높은 주목도, 브랜딩에 최적화된 상품" badge="3개 상품" badgeColor="bg-watcha/10 text-watcha" />
          <div ref={watchaRef} className="reveal stagger grid md:grid-cols-3 gap-6">
            {watchaProducts.map((p) => <ProductCard key={p.name} product={p} accent="watcha" onInquiry={(name) => setInquiry(`[왓챠 - ${name}] 상품에 대해 문의드립니다.\n\n`)} />)}
          </div>
        </div>
      </section>

      {/* ── PEDIA Products ── */}
      <section id="pedia" className="py-28 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6">
          <SectionHeading title="왓챠피디아 광고 상품" subtitle="높은 방문 빈도, 다양한 지면에 노출되는 상품" badge="8개 상품" badgeColor="bg-pedia/10 text-pedia" />
          <div ref={pediaRef} className="reveal stagger grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {pediaProducts.map((p) => <ProductCard key={p.name} product={p} accent="pedia" onInquiry={(name) => setInquiry(`[왓챠피디아 - ${name}] 상품에 대해 문의드립니다.\n\n`)} />)}
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section id="faq" className="py-28 bg-white">
        <div className="max-w-3xl mx-auto px-6">
          <SectionHeading title="자주 묻는 질문" />
          <div ref={faqRef} className="reveal">
            {faqItems.map((item, i) => <FaqItem key={item.q} question={item.q} answer={item.a} index={i} />)}
          </div>
        </div>
      </section>

      {/* ── Contact ── */}
      <section id="contact" className="py-28 relative overflow-hidden bg-[#0a0a0f]">
        <div className="absolute inset-0">
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-watcha/10 rounded-full blur-[150px]" />
        </div>
        <div ref={contactRef} className="reveal relative z-10 max-w-6xl mx-auto px-6">
          <div className="text-center mb-14">
            <div className="section-divider" />
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">광고 문의하기</h2>
            <p className="text-gray-500">담당자가 1영업일 이내에 연락드리겠습니다.</p>
          </div>

          <div className="grid md:grid-cols-5 gap-12">
            <div className="md:col-span-3">
              {formSubmitted ? (
                <div className="bg-white/5 backdrop-blur-sm rounded-3xl p-14 text-center border border-white/10">
                  <div className="text-6xl mb-6">✅</div>
                  <h3 className="text-2xl font-bold text-white mb-3">문의가 접수되었습니다!</h3>
                  <p className="text-gray-400">담당자가 1영업일 이내에 연락드리겠습니다.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <input name="company" required placeholder="회사명 *" className="w-full px-5 py-4 rounded-2xl bg-white/5 border border-white/10 text-white placeholder-gray-600 focus:outline-none focus:border-watcha/50 focus:bg-white/[0.07] transition-all" />
                    <input name="name" required placeholder="담당자 이름 *" className="w-full px-5 py-4 rounded-2xl bg-white/5 border border-white/10 text-white placeholder-gray-600 focus:outline-none focus:border-watcha/50 focus:bg-white/[0.07] transition-all" />
                  </div>
                  <div className="grid md:grid-cols-2 gap-4">
                    <input name="email" type="email" required placeholder="이메일 *" className="w-full px-5 py-4 rounded-2xl bg-white/5 border border-white/10 text-white placeholder-gray-600 focus:outline-none focus:border-watcha/50 focus:bg-white/[0.07] transition-all" />
                    <input name="phone" placeholder="연락처 (선택)" className="w-full px-5 py-4 rounded-2xl bg-white/5 border border-white/10 text-white placeholder-gray-600 focus:outline-none focus:border-watcha/50 focus:bg-white/[0.07] transition-all" />
                  </div>
                  <select name="purpose" className="w-full px-5 py-4 rounded-2xl bg-white/5 border border-white/10 text-gray-500 focus:outline-none focus:border-watcha/50 transition-all">
                    <option value="">광고 목적 (선택)</option>
                    <option>브랜드 인지도</option>
                    <option>클릭 유도</option>
                    <option>전환/가입</option>
                    <option>이벤트 참여</option>
                  </select>
                  <textarea name="message" rows={4} placeholder="문의 내용 (선택)" value={inquiry} onChange={(e) => setInquiry(e.target.value)} className="w-full px-5 py-4 rounded-2xl bg-white/5 border border-white/10 text-white placeholder-gray-600 focus:outline-none focus:border-watcha/50 focus:bg-white/[0.07] transition-all resize-none" />
                  <button type="submit" className="w-full bg-watcha hover:bg-watcha-dark text-white font-semibold py-4 rounded-2xl text-lg transition-all hover:shadow-lg hover:shadow-watcha/25">
                    문의 보내기
                  </button>
                </form>
              )}
            </div>

            <div className="md:col-span-2 flex flex-col justify-center">
              <div className="bg-white/5 backdrop-blur-sm rounded-3xl p-8 border border-white/10 space-y-8">
                <div className="flex items-center gap-4">
                  <span className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-lg">📧</span>
                  <div>
                    <div className="text-gray-500 text-xs uppercase tracking-wider">이메일</div>
                    <a href="mailto:ad_sales@watcha.com" className="text-white font-medium hover:text-watcha transition-colors">ad_sales@watcha.com</a>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <span className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-lg">📱</span>
                  <div>
                    <div className="text-gray-500 text-xs uppercase tracking-wider">전화</div>
                    <a href="tel:+82-10-5033-9698" className="text-white font-medium hover:text-watcha transition-colors">010-5033-9698</a>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <span className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-lg">👤</span>
                  <div>
                    <div className="text-gray-500 text-xs uppercase tracking-wider">팀</div>
                    <div className="text-white font-medium">WATCHA 광고사업팀</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      </main>
      {/* ── Footer ── */}
      <footer role="contentinfo" className="bg-[#050508] py-10 border-t border-white/5">
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <Image src="/watcha-mediakit-web/images/watcha_logo.png" alt="WATCHA" width={100} height={24} className="h-5 w-auto opacity-60" />
          <span className="text-gray-700 text-sm">© 2026 WATCHA. 광고사업팀</span>
        </div>
      </footer>
    </>
  );
}
