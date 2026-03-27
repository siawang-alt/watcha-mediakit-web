import type { Metadata } from 'next';
import './globals.css';

const SITE_URL = 'https://siawang-alt.github.io/watcha-mediakit-web';

export const metadata: Metadata = {
  title: '왓챠 광고 | 콘텐츠 매니아 400만에게 다가가는 가장 확실한 방법',
  description: '왓챠 + 왓챠피디아, 두 플랫폼의 MAU 400만 유저에게 광고를 전달하세요. OTT 광고, MZ세대 타겟팅, 높은 CTR의 프리미엄 광고 상품.',
  keywords: '왓챠 광고, 왓챠피디아 광고, OTT 광고, MZ세대 타겟 광고, 왓챠 광고 상품, 영화 마케팅, 콘텐츠 광고, 광고 매체, 왓챠 미디어킷, WATCHA ads',
  metadataBase: new URL(SITE_URL),
  alternates: {
    canonical: SITE_URL,
  },
  openGraph: {
    title: '왓챠 광고 | 콘텐츠 매니아 400만에게 다가가는 가장 확실한 방법',
    description: '왓챠 + 왓챠피디아, MAU 400만 유저에게 브랜드를 전달하세요. CTR 최대 2.9%, 프리미엄 광고 상품.',
    url: SITE_URL,
    siteName: 'WATCHA 광고',
    locale: 'ko_KR',
    type: 'website',
    images: [
      {
        url: `${SITE_URL}/images/watcha_logo.png`,
        width: 1200,
        height: 630,
        alt: 'WATCHA 광고',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: '왓챠 광고 | 콘텐츠 매니아 400만에게 다가가는 가장 확실한 방법',
    description: '왓챠 + 왓챠피디아, MAU 400만 유저에게 브랜드를 전달하세요.',
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
  verification: {
    // 구글 서치 콘솔 인증 코드 (등록 후 여기에 넣기)
    // google: 'GOOGLE_VERIFICATION_CODE',
    // 네이버 서치 어드바이저 인증 코드 (등록 후 여기에 넣기)
    // other: { 'naver-site-verification': 'NAVER_VERIFICATION_CODE' },
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Organization',
              name: 'WATCHA 광고사업팀',
              url: SITE_URL,
              email: 'ad_sales@watcha.com',
              telephone: '010-5033-9698',
              description: '왓챠 + 왓챠피디아 광고 플랫폼. MAU 400만의 프리미엄 유저에게 브랜드를 전달하세요.',
              sameAs: ['https://watcha.com'],
            }),
          }}
        />
      </head>
      <body className="antialiased">{children}</body>
    </html>
  );
}
