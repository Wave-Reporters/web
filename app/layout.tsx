import { Geist, Geist_Mono } from "next/font/google"

import "./globals.css"
import {Navigation} from "@/components/common/navigation";
import {Metadata} from "next";
import { GoogleTagManager,GoogleAnalytics } from '@next/third-parties/google'
const geist = Geist({subsets:['latin'],variable:'--font-sans'})

const fontMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
})
export const metadata: Metadata = {
    title: {
        default: "WAVE REPORTER — 워프레임 체크 리스트",
        template: "%s | WAVE REPORTER",
    },
    description: "워프레임 일일 주간 체크리스트, 강철의 길 순환로 추천 리스트,바로 키 티어 아이템 목록 및 구매 추천 리스트",
    keywords: [
        "순환로",
        "강철의길 순환로",
        "워프레임 순환로",
        "WAVE REPORTER",
        "체크 리스트",
        "웨이브 리포터",
        '워프레임',
        '워프레임 체크리스트',
        "워프레임 인카논",
        "Warframe incarnon",
        "워프레임 보이드 상인",
        "바로 키티어"
    ],
    authors: [{ name: "WAVE REPORTER Team" }],
    creator: "WAVE REPORTER",
    openGraph: {
        type: "website",
        locale: "ko_KR",
        title: "WAVE REPORTER — 워프레임 체크리스트",
        description: "워프레임 일일 주간 체크리스트, 강철의 길 순환로 추천 리스트",
        siteName: "WAVE REPORTER",
        images: [
            {
                url: "/og-image.png", // 32x32 스펙트럼 아이콘 기반 OG 이미지
                width: 1200,
                height: 630,
                alt: "WAVE REPORTER Preview",
            },
        ],
    },
    twitter: {
        card: "summary_large_image",
        title: "WAVE REPORTER — 워프레임 체크리스트",
        description: "일일·주간 행동 목표 완수를 위한 체크리스트.",
        images: ["/og-image.png"],
    },
    robots: {
        index: true,
        follow: true,
    },
};


export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
      <html lang="ko">
      <GoogleTagManager gtmId={process.env.NEXT_PUBLIC_TAG_MANAGER || ""} />
      <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA4 || ""} />
      <body>
      {/* 클라이언트 스토어 리셋 검사 */}

      <div className="min-h-screen bg-background text-foreground relative overflow-x-hidden">
        {/* 클라이언트 네비게이션 */}
        <Navigation />

        {/* Page Content */}
        <main className="max-w-5xl mx-auto px-4 py-5">
          {children}
          {/* Footer */}
          <footer className="border-t border-border mt-8 pt-4 pb-6 text-center">
              <div>
                  <p className="font-mono text-[10px] text-muted-foreground/60 tracking-widest">
                      면책 조항<br/>
                      Digital Extremes Ltd, Warframe 및 Warframe 로고는 등록 상표입니다. 모든 권리는 전 세계적으로 보유됩니다. 이 사이트는 Digital Extremes Ltd 또는 Warframe과 공식적인 관계가 없습니다. 이러한 상표와 관련된 모든 삽화, 스크린샷, 캐릭터 또는 기타 인식 가능한 지적 재산은 마찬가지로 Digital Extremes Ltd의 소유입니다.
                  </p>
              </div>
          </footer>
        </main>
      </div>
      </body>
      </html>
  );
}
