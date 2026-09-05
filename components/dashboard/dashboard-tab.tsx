"use client";

import {Card, CardContent} from "@/components/ui/card";
import {Progress} from "@/components/ui/progress";
import {Badge} from "@/components/ui/badge";
import {Act, ACT_COLOR_TEXT_COLOR, Tab} from "@/lib/types";
import {useDailyCountdown} from "@/hooks/use-daily-countdown";
import Link from "next/link";
import CircuitDashBoard from "@/features/circuit/ui/CircuitDashBoard";

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
            {/* Daily countdown Card */}
            <Card className="border-primary/30 bg-card relative overflow-hidden py-4">
                <div
                    className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-primary/60 via-primary/20 to-transparent"/>
                <CardContent className="">
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
                </CardContent>
            </Card>
            <CircuitDashBoard/>
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