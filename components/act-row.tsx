"use client";

import {Checkbox} from "@/components/ui/checkbox";
import {Act, ActType} from "@/lib/types";
import {X} from "lucide-react";
import {cn} from "@/lib/utils";

interface ActRowProps {
    act: Act;
    checked: boolean;
    onToggle: () => void;
    onDelete: () => void;
    type: ActType
}

export function ActRow({act, checked, onToggle, onDelete,type}: ActRowProps) {
    return (
        <div
            className={`group border-b border-border px-4 py-3 flex items-center gap-3 cursor-pointer transition-colors hover:bg-muted/50 ${
                checked ? "opacity-60 bg-muted/20" : ""
            }`}
            onClick={onToggle}
        >
            <Checkbox
                checked={checked}
                onCheckedChange={onToggle}
                className={cn("mt-0.5",
                    type === "daily"
                        ? "border-primary data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground"
                        : "border-accent data-checked:bg-accent data-checked:border-accent",
                )}
                onClick={(e) => e.stopPropagation()}
            />
            <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                    <span
                        className={`font-mono text-sm font-semibold ${
                            checked ? "line-through text-muted-foreground" : "text-foreground"
                        }`}
                    >
                        {act.title}
                    </span>
                </div>
                <p className="text-xs text-muted-foreground mt-0.5">{act.desc}</p>
            </div>

            {/* Hover 시 나타나는 빨간색 배경 삭제 버튼 */}
            <button
                type="button"
                onClick={(e) => {
                    e.stopPropagation();
                    onDelete();
                }}
                className="opacity-0 group-hover:opacity-100 p-1 bg-destructive/80 hover:bg-destructive text-destructive-foreground rounded-md transition-all focus:outline-none focus:opacity-100 shadow-sm cursor-pointer"
                aria-label="삭제"
            >
                <X className="w-4 h-4"/>
            </button>
        </div>
    );
}