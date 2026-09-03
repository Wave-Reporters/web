"use client";

import Link from "next/link";
import {usePathname} from "next/navigation";
import {TABS} from "@/lib/types";
import {CircleQuestionMark} from "lucide-react";

export function Navigation() {
    const pathname = usePathname();

    return (
        <header className="border-b border-border bg-background/95 sticky top-0 z-40 backdrop-blur-sm">
            <div className="max-w-3xl mx-auto px-4 py-3 flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <h1 className="font-mono text-sm font-bold tracking-widest text-foreground uppercase">
                        WAVE REPORTER
                    </h1>
                </div>
                <div className="flex items-center gap-2.5 font-mono text-[10px]">
                    <Link href={process.env.NEXT_PUBLIC_QUESTION || ""} target="_blank"
                          rel="noopener noreferrer">
                        <CircleQuestionMark className="w-5 h-5" color={'#e91e8c'}/>
                    </Link>
                </div>
            </div>


            {/* Tab Navigation */}
            <div className="max-w-3xl mx-auto flex border-t border-border">
                {TABS.map((tab) => {
                    const isActive = pathname === tab.href;
                    return (
                        <Link
                            key={tab.href}
                            href={tab.href}
                            className={`font-mono text-xs tracking-widest px-4 py-2.5 transition-all border-b-2 relative ${
                                isActive
                                    ? `font-bold ${tab.color}`
                                    : "text-muted-foreground border-transparent hover:text-foreground"
                            }`}
                        >
                            {tab.label}
                        </Link>
                    );
                })}
            </div>
        </header>
    );
}