import { Geist, Geist_Mono } from "next/font/google"

import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { cn } from "@/lib/utils";
import {Navigation} from "@/components/common/navigation";
import {Metadata} from "next";

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
    description: "워프레임 일일 주간 체크리스트",
    keywords: [
        "WAVE REPORTER",
        "웨이브 리포터",
        "태스크 트래커",
        '워프레임',
        '워프레임 체크리스트',
        "행동 트래커",
        "일일 행동",
        "주간 행동",
        "Daily Acts",
        "Weekly Acts",
    ],
    authors: [{ name: "WAVE REPORTER Team" }],
    creator: "WAVE REPORTER",
    openGraph: {
        type: "website",
        locale: "ko_KR",
        title: "WAVE REPORTER — 워프레임 체크리스트",
        description: "일일·주간 행동 목표 완수를 위한 체크리스트.",
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
        title: "WAVE REPORTER — 사이버 텍 행동 & 태스크 트래커",
        description: "일일·주간 행동 목표 완수를 위한 최적의 사이버 트래커.",
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
      <body>
      {/* 클라이언트 스토어 리셋 검사 */}

      <div className="min-h-screen bg-background text-foreground relative overflow-x-hidden">
        {/* 클라이언트 네비게이션 */}
        <Navigation />

        {/* Page Content */}
        <main className="max-w-3xl mx-auto px-4 py-5">
          {children}

          {/* Footer */}
          <footer className="border-t border-border mt-8 pt-4 pb-6 text-center">
            <p className="font-mono text-[10px] text-muted-foreground/60 tracking-widest">
            </p>
          </footer>
        </main>
      </div>
      </body>
      </html>
  );
}
