import type { Metadata } from 'next';
import './globals.css';
import { watchaProducts, pediaProducts, faqItems } from '@/data/products';

const SITE_URL = 'https://siawang-alt.github.io/watcha-mediakit-web';

export const metadata: Metadata = {
  title: '왓챠 광고 상품 | WATCHA · 왓챠피디아 미디어킷 2026',
  description: '왓챠 & 왓챠피디아 MAU 400만, MZ세대 77%, 전체 가입자 1,000만+. OTT 광고 상품 11종 — 스플래시·보드배너·전면팝업·빅배너 등. 지금 문의하세요.',
  keywords: '왓챠 광고, 왓챠피디아 광고, OTT 광고 상품, 왓챠 미디어킷, MZ세대 광고 플랫폼, 왓챠 스플래시 광고, 왓챠피디아 보드배너, 영화 마케팅, 콘텐츠 광고, WATCHA ads',
  metadataBase: new URL(SITE_URL),
  alternates: {
    canonical: SITE_URL,
    languages: { 'ko': SITE_URL },
  },
  openGraph: {
    title: '왓챠 광고 상품 | WATCHA · 왓챠피디아 미디어킷 2026',
    description: '콘텐츠 매니아 400만에게 다가가는 가장 확실한 방법. OTT 광고 상품 11종, 지금 문의하세요.',
    url: SITE_URL,
    siteName: 'WATCHA 광고',
    locale: 'ko_KR',
    type: 'website',
    images: [
      {
        url: `${SITE_URL}/images/watcha_logo.png`,
        width: 1200,
        height: 630,
        alt: 'WATCHA 광고 상품 미디어킷',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: '왓챠 광고 상품 | WATCHA · 왓챠피디아 미디어킷 2026',
    description: '콘텐츠 매니아 400만에게 다가가는 가장 확실한 방법. OTT 광고 상품 11종.',
    images: [`${SITE_URL}/images/watcha_logo.png`],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
};

// 구조화 데이터: Organization + WebPage + Service(OfferCatalog) + FAQPage
const allProducts = [...watchaProducts.map(p => ({ ...p, platform: '왓챠' })), ...pediaProducts.map(p => ({ ...p, platform: '왓챠피디아' }))];

const jsonLd = [
  {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'WATCHA 광고사업팀',
    url: 'https://watcha.com',
    email: 'ad_sales@watcha.com',
    telephone: '+82-10-5033-9698',
    description: '왓챠 & 왓챠피디아 광고 플랫폼. MAU 400만의 프리미엄 유저에게 브랜드를 전달하세요.',
    sameAs: ['https://watcha.com'],
  },
  {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': `${SITE_URL}#webpage`,
    url: SITE_URL,
    name: '왓챠 광고 상품 | WATCHA · 왓챠피디아 미디어킷 2026',
    description: '왓챠 & 왓챠피디아 MAU 400만, OTT 광고 상품 11종',
    inLanguage: 'ko',
  },
  {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: '왓챠 광고',
    provider: { '@type': 'Organization', name: 'WATCHA' },
    description: '왓챠 & 왓챠피디아 OTT 광고 플랫폼',
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: '왓챠 광고 상품',
      itemListElement: allProducts.map((p, i) => ({
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: `${p.platform} - ${p.name}`,
          description: p.description,
        },
        position: i + 1,
      })),
    },
  },
  {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqItems.map(item => ({
      '@type': 'Question',
      name: item.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.a,
      },
    })),
  },
];

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <head>
        <link rel="preconnect" href="https://cdn.jsdelivr.net" crossOrigin="anonymous" />
        {jsonLd.map((data, i) => (
          <script
            key={i}
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
          />
        ))}
      </head>
      <body className="antialiased">{children}</body>
    </html>
  );
}
