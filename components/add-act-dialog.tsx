"use client";

import {useState} from "react";
import {Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle,} from "@/components/ui/dialog";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {Label} from "@/components/ui/label";
import {Act, ActType, PRESET_DAILY, PRESET_WEEKLY, TAB_CONFIG} from "@/lib/types";
import {cn} from "@/lib/utils";

interface AddActDialogProps {
    open: boolean;
    type: ActType;
    onClose: () => void;
    onAdd: (act: Act) => void;
}

const PRESETS: Record<string, Array<{ title: string; desc: string }>> = {
    daily: [
        ...PRESET_DAILY
    ],
    weekly: [
        ...PRESET_WEEKLY
    ],
};

export function AddActDialog({open, type, onClose, onAdd}: AddActDialogProps) {
    const [title, setTitle] = useState("");
    const [desc, setDesc] = useState("");

    const cfg = TAB_CONFIG[type];
    const presets: any[] = PRESETS[type] || [];

    // 프리셋 선택 시 Input 값 자동 채움
    const handleSelectPreset = (preset: { title: string; desc: string }) => {
        setTitle(preset.title);
        setDesc(preset.desc);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!title.trim()) return;
        onAdd({
            id: `custom-${Date.now()}`,
            type,
            title: title.trim(),
            desc: desc.trim(),
        });
        setTitle("");
        setDesc("");
        onClose();
    };

    return (
        <Dialog open={open} onOpenChange={(v) => !v && onClose()}>
            <DialogContent className="sm:max-w-md bg-card border-border">
                <DialogHeader>
                    <p className={cn("font-mono text-[10px] tracking-widest text-primary mb-0.5",
                        type === 'daily' ?
                            "text-primary" : 'text-accent'
                    )}>
                        NEW ACT — {cfg.label.toUpperCase()}
                    </p>
                    <DialogTitle className="font-mono text-sm font-bold">행동 추가</DialogTitle>
                </DialogHeader>

                {/* 프리셋 영역 */}
                {presets.length > 0 ? (
                    <div className="space-y-1.5 pt-1">
                        <Label className="font-mono text-[10px] tracking-widest text-muted-foreground">
                            PRESETS (클릭하여 채우기)
                        </Label>
                        <div className="flex flex-wrap gap-1.5">
                            {presets.map((p, idx) => (
                                <button
                                    key={idx}
                                    type="button"
                                    onClick={() => handleSelectPreset(p)}
                                    className={cn("font-mono text-xs px-2.5 py-1 rounded-sm border border-border bg-background  transition-all text-left text-muted-foreground hover:text-foreground cursor-pointer",
                                        type === 'daily' ?
                                            'hover:bg-primary/10 hover:border-primary/50'
                                            :
                                            'hover:bg-accent/10 hover:border-accent/50'
                                    )
                                    }
                                >
                                    + {p.title}
                                </button>
                            ))}
                        </div>
                    </div>
                ) : null}
                <form onSubmit={handleSubmit} className="space-y-4 py-2">
                    <div className="space-y-1">
                        <Label className="font-mono text-[10px] tracking-widest text-muted-foreground">
                            행동 이름 <span className="text-primary">*</span>
                        </Label>
                        <Input
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder="예: 상승 9판 돌기"
                            className={cn("bg-background font-mono text-sm",
                                type === 'daily'?
                                    'focus-visible:ring-ring/50' : 'focus-visible:ring-ring-accent/50 focus-visible:border-ring-accent'
                            )}
                            autoFocus
                        />
                    </div>

                    <div className="space-y-1">
                        <Label className="font-mono text-[10px] tracking-widest text-muted-foreground">메모</Label>
                        <Input
                            value={desc}
                            onChange={(e) => setDesc(e.target.value)}
                            placeholder="예: 플래 파밍용"
                            className={cn("bg-background font-mono text-sm",
                                type === 'daily'?
                                    'focus-visible:ring-ring/50' : 'focus-visible:ring-ring-accent/50 focus-visible:border-ring-accent'
                            )}
                        />
                    </div>

                    <DialogFooter className="flex gap-2 pt-2">
                        <Button type="button" variant="outline" onClick={onClose} className="flex-1 font-mono text-xs cursor-pointer">
                            취소
                        </Button>
                        <Button
                            type="submit"
                            className={cn("flex-1 font-mono text-xs font-bold cursor-pointer",
                                type === 'daily' ?
                                'bg-primary text-primary-foreground' : 'bg-accent text-accent-foreground hover:bg-accent/80')
                            }
                        >
                            추가
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}