"use client";

import Link from "next/link";
import {usePathname} from "next/navigation";
import {useActStore} from "@/store/use-act-stroe";
import {TABS} from "@/lib/types";

export function Navigation() {
    const pathname = usePathname();

    return (
        <header className="border-b border-border bg-background/95 sticky top-0 z-40 backdrop-blur-sm">
            <div className="max-w-3xl mx-auto px-4 py-3 flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <h1 className="font-mono text-sm font-bold tracking-widest text-foreground uppercase">
                        WAVE REPORT
                    </h1>
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