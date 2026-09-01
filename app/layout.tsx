import { Geist, Geist_Mono } from "next/font/google"

import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { cn } from "@/lib/utils";
import {Navigation} from "@/components/navigation";

const geist = Geist({subsets:['latin'],variable:'--font-sans'})

const fontMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
})

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
