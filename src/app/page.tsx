'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { watchaProducts, pediaProducts, faqItems, Product } from '@/data/products';

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
function ProductModal({ product, accent, onClose }: { product: Product; accent: 'watcha' | 'pedia'; onClose: () => void }) {
  const borderColor = accent === 'watcha' ? 'border-watcha' : 'border-pedia';
  const tagBg = accent === 'watcha' ? 'bg-watcha' : 'bg-pedia';

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4" onClick={onClose}>
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
      <div className="relative bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl" onClick={(e) => e.stopPropagation()}>
        <button onClick={onClose} className="absolute top-4 right-4 z-10 w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 transition-colors">
          <svg className="w-4 h-4 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
        </button>
        <div className="bg-gray-50 p-6 rounded-t-2xl">
          <Image src={product.image} alt={product.name} width={800} height={600} className="w-full h-auto object-contain" />
        </div>
        <div className={`p-8 border-t-4 ${borderColor}`}>
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-2xl font-bold text-gray-900">{product.name}</h3>
            <span className={`${tagBg} text-white text-sm px-3 py-1 rounded-full font-medium`}>{product.tag}</span>
          </div>
          <p className="text-gray-600 mb-6 leading-relaxed">{product.description}</p>
          <div className="flex gap-4 mb-6">
            {product.impressions !== '-' && (
              <div className="bg-gray-50 rounded-xl px-5 py-3 text-center flex-1">
                <div className="text-xs text-gray-500 mb-1">예상 노출수</div>
                <div className="text-xl font-bold text-gray-900">{product.impressions}</div>
              </div>
            )}
            {product.ctr !== '-' && (
              <div className="bg-gray-50 rounded-xl px-5 py-3 text-center flex-1">
                <div className="text-xs text-gray-500 mb-1">예상 CTR</div>
                <div className="text-xl font-bold text-gray-900">{product.ctr}</div>
              </div>
            )}
          </div>
          <div className="space-y-3 text-sm text-gray-600">
            <div className="flex items-start gap-3"><span className="text-base">📍</span><div><span className="font-medium text-gray-900">노출 위치</span><br/>{product.location}</div></div>
            <div className="flex items-start gap-3"><span className="text-base">🎯</span><div><span className="font-medium text-gray-900">구좌</span><br/>{product.slots}</div></div>
            <div className="flex items-start gap-3"><span className="text-base">📱</span><div><span className="font-medium text-gray-900">디바이스</span><br/>{product.device}</div></div>
            <div className="flex items-start gap-3"><span className="text-base">🎨</span><div><span className="font-medium text-gray-900">소재</span><br/>{product.material}</div></div>
          </div>
          <a href="#contact" onClick={onClose} className={`block text-center mt-6 ${tagBg} hover:opacity-90 text-white font-semibold py-3 rounded-xl transition-opacity`}>
            이 상품 문의하기
          </a>
        </div>
      </div>
    </div>
  );
}

/* ─── Product Card ─── */
function ProductCard({ product, accent }: { product: Product; accent: 'watcha' | 'pedia' }) {
  const [modalOpen, setModalOpen] = useState(false);
  const borderColor = accent === 'watcha' ? 'border-watcha' : 'border-pedia';
  const tagBg = accent === 'watcha' ? 'bg-watcha' : 'bg-pedia';

  return (
    <>
      <div
        className="bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden cursor-pointer group"
        onClick={() => setModalOpen(true)}
      >
        <div className={`p-6 border-t-4 ${borderColor}`}>
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-lg font-bold text-gray-900">{product.name}</h3>
            <span className={`${tagBg} text-white text-xs px-2.5 py-1 rounded-full font-medium`}>{product.tag}</span>
          </div>
          <p className="text-gray-600 text-sm leading-relaxed">{product.description}</p>
        </div>
      </div>
      {modalOpen && <ProductModal product={product} accent={accent} onClose={() => setModalOpen(false)} />}
    </>
  );
}

/* ─── FAQ Accordion ─── */
function FaqItem({ question, answer }: { question: string; answer: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-gray-200">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between py-5 text-left"
      >
        <span className="font-medium text-gray-900">{question}</span>
        <svg className={`w-5 h-5 text-gray-500 transition-transform ${open ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      <div className={`overflow-hidden transition-all duration-300 ${open ? 'max-h-40 pb-5' : 'max-h-0'}`}>
        <p className="text-gray-600 text-sm leading-relaxed">{answer}</p>
      </div>
    </div>
  );
}

/* ─── Main Page ─── */
export default function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);

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
      await fetch('https://formspree.io/f/xpwrjqgk', {
        method: 'POST',
        body: data,
        headers: { Accept: 'application/json' },
      });
      setFormSubmitted(true);
    } catch {
      alert('전송 중 오류가 발생했습니다. ad_sales@watcha.com으로 직접 문의해주세요.');
    }
  };

  return (
    <>
      {/* ── Header ── */}
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-white/90 backdrop-blur-md shadow-sm' : 'bg-transparent'}`}>
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <Image src={scrolled ? '/watcha-mediakit-web/images/watcha_logo.png' : '/watcha-mediakit-web/images/watcha_logo_white.png'} alt="WATCHA" width={120} height={28} className="h-7 w-auto" />
          <nav className="hidden md:flex items-center gap-8">
            {[
              ['플랫폼 소개', '#platform'],
              ['왓챠 광고', '#watcha'],
              ['왓챠피디아 광고', '#pedia'],
              ['FAQ', '#faq'],
            ].map(([label, href]) => (
              <a key={href} href={href} className={`text-sm font-medium transition-colors ${scrolled ? 'text-gray-700 hover:text-watcha' : 'text-white/80 hover:text-white'}`}>
                {label}
              </a>
            ))}
            <a href="#contact" className="bg-watcha hover:bg-watcha-dark text-white text-sm font-semibold px-5 py-2.5 rounded-full transition-colors">
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
              <a key={h} href={h} onClick={() => setMobileMenuOpen(false)} className="block px-6 py-3 text-gray-700 hover:bg-gray-50">{l}</a>
            ))}
          </div>
        )}
      </header>

      {/* ── Hero ── */}
      <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-950 via-gray-900 to-black overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_40%,rgba(255,45,120,0.15),transparent_60%)]" />
        <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white leading-tight mb-6">
            콘텐츠 매니아 <span className="text-watcha">400만</span>에게<br />다가가는 가장 확실한 방법
          </h1>
          <p className="text-lg md:text-xl text-gray-400 mb-12 max-w-2xl mx-auto">
            왓챠 + 왓챠피디아, 두 플랫폼의 프리미엄 유저에게 브랜드를 전달하세요.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
            {[
              { end: 400, suffix: '만+', label: '통합 MAU' },
              { end: 7.5, suffix: '억+', label: '누적 별점', isDecimal: true },
              { end: 77, suffix: '%', label: '20~30대 비율' },
              { end: 1000, suffix: '만+', label: '전체 가입자' },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-3xl md:text-5xl font-bold text-watcha">
                  {stat.isDecimal ? <>{stat.end}{stat.suffix}</> : <Counter end={stat.end} suffix={stat.suffix} />}
                </div>
                <div className="text-gray-500 text-sm mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
          <a href="#watcha" className="inline-flex items-center gap-2 bg-watcha hover:bg-watcha-dark text-white font-semibold px-8 py-4 rounded-full text-lg transition-colors">
            광고 상품 둘러보기
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" /></svg>
          </a>
        </div>
      </section>

      {/* ── Platform Compare ── */}
      <section id="platform" className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-4">두 플랫폼, 하나의 광고 솔루션</h2>
          <p className="text-gray-500 text-center mb-16 max-w-2xl mx-auto">MZ세대 콘텐츠 매니아가 매일 찾는 두 플랫폼에서 브랜드를 만나보세요.</p>
          <div className="grid md:grid-cols-2 gap-8">
            {/* WATCHA */}
            <div className="rounded-2xl border-2 border-gray-100 p-8 hover:border-watcha/30 transition-colors">
              <div className="flex items-center gap-3 mb-6">
                <span className="bg-watcha text-white text-sm font-bold px-3 py-1 rounded-full">WATCHA</span>
                <span className="text-gray-500 text-sm">OTT 스트리밍</span>
              </div>
              <div className="grid grid-cols-2 gap-4 mb-6">
                {[['MAU','약 100만'],['일간 방문','약 3회'],['일일 체류','약 2시간'],['전체 가입자','1,000만+']].map(([l,v]) => (
                  <div key={l} className="bg-gray-50 rounded-xl p-4">
                    <div className="text-xs text-gray-500">{l}</div>
                    <div className="text-lg font-bold text-gray-900">{v}</div>
                  </div>
                ))}
              </div>
              <p className="text-gray-600 text-sm leading-relaxed">MZ세대가 매일 3번씩 방문하여 2시간씩 머무르는 프리미엄 OTT. 전체 가입자 1,000만 이상의 대규모 유저 집단입니다.</p>
            </div>
            {/* WATCHA PEDIA */}
            <div className="rounded-2xl border-2 border-gray-100 p-8 hover:border-pedia/30 transition-colors">
              <div className="flex items-center gap-3 mb-6">
                <span className="bg-pedia text-white text-sm font-bold px-3 py-1 rounded-full">WATCHA PEDIA</span>
                <span className="text-gray-500 text-sm">콘텐츠 리뷰</span>
              </div>
              <div className="grid grid-cols-2 gap-4 mb-6">
                {[['MAU','약 300만'],['주간 방문','12.2회'],['누적 별점','7.5억+'],['누적 가입자','1,387만']].map(([l,v]) => (
                  <div key={l} className="bg-gray-50 rounded-xl p-4">
                    <div className="text-xs text-gray-500">{l}</div>
                    <div className="text-lg font-bold text-gray-900">{v}</div>
                  </div>
                ))}
              </div>
              <p className="text-gray-600 text-sm leading-relaxed">7.5억 별점 데이터 기반의 콘텐츠 리뷰 플랫폼. 주간 12.2회 재방문하는 충성도 높은 콘텐츠 매니아가 모여있습니다.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Why Advertise ── */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-16">왜 왓챠에 광고해야 할까요?</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: '👥', title: '프리미엄 오디언스', desc: '전체 가입자 1,000만 이상. 높은 구매력의 MZ세대가 집중된 대규모 유저 집단입니다.' },
              { icon: '⏱️', title: '높은 몰입도', desc: '하루 평균 2시간 체류, 주 12.2회 재방문. 업계 최고 수준의 충성도를 보여줍니다.' },
              { icon: '🎬', title: '다양한 업종 커버', desc: '영화, 드라마, 뷰티, 식음료, 가전, 도서, 패션 등 다양한 업종의 광고주가 왓챠와 함께하고 있습니다.' },
            ].map((item) => (
              <div key={item.title} className="text-center p-8">
                <div className="text-5xl mb-6">{item.icon}</div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{item.title}</h3>
                <p className="text-gray-600 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── WATCHA Products ── */}
      <section id="watcha" className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex items-center gap-3 justify-center mb-4">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">왓챠 광고 상품</h2>
            <span className="bg-watcha/10 text-watcha text-sm font-bold px-3 py-1 rounded-full">3개 상품</span>
          </div>
          <p className="text-gray-500 text-center mb-12">앱 진입 시 높은 주목도, 브랜딩에 최적화된 상품</p>
          <div className="grid md:grid-cols-3 gap-8">
            {watchaProducts.map((p) => <ProductCard key={p.name} product={p} accent="watcha" />)}
          </div>
        </div>
      </section>

      {/* ── PEDIA Products ── */}
      <section id="pedia" className="py-24 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex items-center gap-3 justify-center mb-4">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">왓챠피디아 광고 상품</h2>
            <span className="bg-pedia/10 text-pedia text-sm font-bold px-3 py-1 rounded-full">8개 상품</span>
          </div>
          <p className="text-gray-500 text-center mb-12">높은 방문 빈도, 다양한 지면에 노출되는 상품</p>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {pediaProducts.map((p) => <ProductCard key={p.name} product={p} accent="pedia" />)}
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section id="faq" className="py-24 bg-white">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-12">자주 묻는 질문</h2>
          <div>
            {faqItems.map((item) => <FaqItem key={item.q} question={item.q} answer={item.a} />)}
          </div>
        </div>
      </section>

      {/* ── Contact ── */}
      <section id="contact" className="py-24 bg-gradient-to-br from-gray-950 via-gray-900 to-black relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_60%,rgba(255,45,120,0.1),transparent_60%)]" />
        <div className="relative z-10 max-w-6xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-white mb-4">광고 문의하기</h2>
          <p className="text-gray-400 text-center mb-12">담당자가 1영업일 이내에 연락드리겠습니다.</p>

          <div className="grid md:grid-cols-5 gap-12">
            <div className="md:col-span-3">
              {formSubmitted ? (
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-12 text-center">
                  <div className="text-5xl mb-4">✅</div>
                  <h3 className="text-2xl font-bold text-white mb-2">문의가 접수되었습니다!</h3>
                  <p className="text-gray-400">담당자가 1영업일 이내에 연락드리겠습니다.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <input name="company" required placeholder="회사명 *" className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-gray-500 focus:outline-none focus:border-watcha" />
                    <input name="name" required placeholder="담당자 이름 *" className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-gray-500 focus:outline-none focus:border-watcha" />
                  </div>
                  <div className="grid md:grid-cols-2 gap-4">
                    <input name="email" type="email" required placeholder="이메일 *" className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-gray-500 focus:outline-none focus:border-watcha" />
                    <input name="phone" placeholder="연락처 (선택)" className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-gray-500 focus:outline-none focus:border-watcha" />
                  </div>
                  <select name="purpose" className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-gray-400 focus:outline-none focus:border-watcha">
                    <option value="">광고 목적 (선택)</option>
                    <option>브랜드 인지도</option>
                    <option>클릭 유도</option>
                    <option>전환/가입</option>
                    <option>이벤트 참여</option>
                  </select>
                  <textarea name="message" rows={4} placeholder="문의 내용 (선택)" className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-gray-500 focus:outline-none focus:border-watcha resize-none" />
                  <button type="submit" className="w-full bg-watcha hover:bg-watcha-dark text-white font-semibold py-4 rounded-xl text-lg transition-colors">
                    문의 보내기
                  </button>
                </form>
              )}
            </div>

            <div className="md:col-span-2 flex flex-col justify-center">
              <div className="space-y-6">
                <div>
                  <div className="text-gray-500 text-sm mb-1">이메일</div>
                  <div className="text-white font-medium">ad_sales@watcha.com</div>
                </div>
                <div>
                  <div className="text-gray-500 text-sm mb-1">전화</div>
                  <div className="text-white font-medium">010-5033-9698</div>
                </div>
                <div>
                  <div className="text-gray-500 text-sm mb-1">팀</div>
                  <div className="text-white font-medium">WATCHA 광고사업팀</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="bg-black py-8">
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between">
          <Image src="/watcha-mediakit-web/images/watcha_logo.png" alt="WATCHA" width={100} height={24} className="h-6 w-auto" />
          <span className="text-gray-600 text-sm mt-2 md:mt-0">© 2026 WATCHA. 광고사업팀</span>
        </div>
      </footer>
    </>
  );
}
