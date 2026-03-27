import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: '왓챠 광고 | 콘텐츠 매니아 400만에게 다가가는 가장 확실한 방법',
  description: '왓챠 + 왓챠피디아, 두 플랫폼의 MAU 400만 유저에게 광고를 전달하세요. OTT 광고, MZ세대 타겟팅.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <body className="antialiased">{children}</body>
    </html>
  );
}
