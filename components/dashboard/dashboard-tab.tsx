"use client";

import {Card, CardContent} from "@/components/ui/card";
import {Progress} from "@/components/ui/progress";
import {Badge} from "@/components/ui/badge";
import {Act, ACT_COLOR_TEXT_COLOR, Tab, TAB_OBJ} from "@/lib/types";
import {useDailyCountdown} from "@/hooks/use-daily-countdown";
import Link from "next/link";
import CircuitDashBoard from "@/features/circuit/ui/CircuitDashBoard";
import DashBoardBannerContent from "@/features/dashboard/ui/DashBoardBannerContent";
import Image from "next/image";
import React from "react";
import {ChevronRight} from "lucide-react";

interface DashboardTabProps {
    dailyActs: Act[];
    weeklyActs: Act[];
    checked: Record<string, boolean>;
    onNavigate: (tab: Tab) => void;
}

export function DashboardTab({dailyActs, weeklyActs, checked, onNavigate}: DashboardTabProps) {
    const {display: countdown, secondsLeft} = useDailyCountdown();

    const dailyDone = dailyActs.filter((a) => checked[a.id]).length;
    const weeklyDone = weeklyActs.filter((a) => checked[a.id]).length;
    const dayProgress = Math.round(((86400 - secondsLeft) / 86400) * 100);

    const sections = [
        {
            label: "일일 행동",
            done: dailyDone,
            total: dailyActs.length,
            colorClass: ACT_COLOR_TEXT_COLOR.daily,
            tab: "report/daily" as Tab
        },
        {
            label: "주간 행동",
            done: weeklyDone,
            total: weeklyActs.length,
            colorClass: ACT_COLOR_TEXT_COLOR.weekly,
            tab: "report/weekly" as Tab
        },
    ];

    return (
        <div className="space-y-4">
            <DashBoardBannerContent
                className="relative overflow-hidden p-6 bg-card border border-primary/20 rounded-xl">
                {/* 1. 배경 바로 키티어 캐릭터 이미지 (우측 밀착 + 왼쪽으로 자연스러운 Fade) */}
                <Link className={'w-full'} href={TAB_OBJ.baro.href}>
                    <div
                        className="absolute top-0 right-0 h-full w-[220px] sm:w-[280px] pointer-events-none select-none">
                        <div
                            className="relative w-full h-full opacity-25 [mask-image:linear-gradient(to_left,black_20%,transparent_100%)] ">
                            <Image
                                src="/images/char/baro.webp"
                                alt="Baro Ki'Teer"
                                fill
                                className="object-contain object-right-bottom"
                                priority
                            />
                        </div>
                    </div>

                    {/* 2. 메인 콘텐츠 영역 */}
                    <div
                        className="relative z-10 flex flex-col justify-between h-full min-h-[110px] max-w-xl space-y-3">
                        {/* 상단 태그 & 서브 타이틀 */}
                        <div className="space-y-1">
                            <div
                                className="text-lg sm:text-xl font-bold tracking-tight text-foreground font-mono flex flex-row items-center">
                                <div>
                                    바로 키티어 특별 품목
                                </div>
                                <ChevronRight/>
                            </div>
                        </div>

                        {/* 본문 설명 */}
                        <p className="text-xs text-muted-foreground leading-relaxed ">
                            보이드 상인이 가져온 프라임 모드, 무기, 아카넷 정보와<br className="hidden sm:block"/>
                            2주마다 갱신되는 전체 입고 로테이션 항목을 빠르게 확인하세요.
                        </p>

                        {/* 하단 상태 안내 뱃지 */}
                        <div className="pt-1 flex items-center gap-2">
                        <span
                            className="px-2 py-0.5 text-[10px] font-mono font-bold border border-primary/30 text-primary bg-primary/10 rounded">
                            전체 품목 서치
                        </span>
                            <span
                                className="px-2 py-0.5 text-[10px] font-mono font-bold border border-amber-500/50 text-amber-400 bg-amber-500/10 rounded">
                            구매 추천(개발중)
                        </span>
                        </div>
                    </div>
                </Link>
            </DashBoardBannerContent>
            <CircuitDashBoard/>
            {/* Daily countdown Card */}
            <DashBoardBannerContent>
                <p className="font-mono text-[10px] text-muted-foreground tracking-widest mb-2">일일 초기화까지 남은 시간</p>
                <p className="font-mono text-4xl font-bold text-primary tracking-widest tabular-nums ">
                    {countdown}
                </p>

                <div className="mt-4 space-y-1.5">
                    <div className="flex justify-between font-mono text-[10px] text-muted-foreground">
                        <span>오늘 경과</span>
                        <span>{dayProgress}%</span>
                    </div>
                    <Progress value={dayProgress} className="h-1.5 "/>
                    <p className="font-mono text-[10px] text-muted-foreground/60 tracking-widest">UTC+0</p>
                </div>
            </DashBoardBannerContent>


            {/* Progress Cards */}
            {sections.map((s) => {
                const pct = s.total > 0 ? Math.round((s.done / s.total) * 100) : 0;
                const allDone = s.done === s.total;

                return (
                    <Link
                        key={s.label}
                        href={s.tab} // 또는 `/${s.tab}` 등 이동할 경로
                        className="block no-underline"
                    >
                        <Card
                            key={s.label}
                            className={`cursor-pointer transition-all hover:border-primary/50 bg-card ${
                                allDone ? "border-primary/60 shadow-[0_0_16px_rgba(233,30,140,0.1)]" :
                                    "border-border hover:border-primary hover:shadow-[0_0_12px_rgba(107,39,224,0.25)]"
                            }`}
                        >
                            <CardContent className="p-4">
                                <div className="flex items-center justify-between mb-3">
                                    <div className="flex items-center gap-2">
                                    <span className={`font-mono text-xs font-bold tracking-widest ${s.colorClass}`}>
                                        {s.label}
                                    </span>
                                        {allDone && (
                                            <Badge variant="outline" className={s.colorClass}>
                                                완료
                                            </Badge>
                                        )}
                                    </div>
                                    <div className="flex items-baseline gap-1 font-mono">
                                        <span className="text-2xl font-bold text-foreground">{s.done}</span>
                                        <span className="text-sm text-muted-foreground">/ {s.total}</span>
                                    </div>
                                </div>

                                <Progress value={pct} className="h-2"/>

                                <div className="mt-2 flex items-center justify-between">
                                    <div className="flex gap-1">
                                        {Array.from({length: s.total}).map((_, i) => (
                                            <div
                                                key={i}
                                                className={`w-1.5 h-1.5 transition-all ${
                                                    i < s.done ? "bg-primary" : "bg-muted"
                                                }`}
                                            />
                                        ))}
                                    </div>
                                    <span className="font-mono text-[10px] text-muted-foreground">{pct}%</span>
                                </div>
                            </CardContent>
                        </Card>
                    </Link>
                );
            })}
        </div>
    );
}