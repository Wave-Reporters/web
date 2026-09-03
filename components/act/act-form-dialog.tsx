"use client";

import React, {useEffect, useState} from "react";
import {cn} from "@/lib/utils";
import {Dialog, DialogContent, DialogHeader, DialogTitle,} from "@/components/ui/dialog";
import {Input} from "@/components/ui/input";
import {Label} from "@/components/ui/label";
import {Button} from "@/components/ui/button";
import {ActFormData, ActType, PresetItem} from "@/lib/types";


interface ActFormDialogProps {
    open: boolean;
    type: ActType;
    mode: "add" | "edit";
    initialValues?: Partial<ActFormData>;
    presets?: PresetItem[];
    onClose: () => void;
    onSubmit: (data: ActFormData) => void;
}

export function ActFormDialog({
                                  open,
                                  type,
                                  mode,
                                  initialValues,
                                  presets = [],
                                  onClose,
                                  onSubmit,
                              }: ActFormDialogProps) {
    const [title, setTitle] = useState("");
    const [desc, setDesc] = useState("");
    const [category, setCategory] = useState("일일 미션");

    // 초기값 동기화
    useEffect(() => {
        if (open) {
            setTitle(initialValues?.title || "");
            setDesc(initialValues?.desc || "");
            setCategory(initialValues?.category || "");
        }
    }, [open, initialValues]);

    const isDaily = type === "daily";
    const labelType = isDaily ? "DAILY" : "WEEKLY";
    const modeTitle = mode === "add" ? "추가" : "수정";
    const submitText = mode === "add" ? "추가" : "저장";

    // 스타일 클래스
    const focusRingClass = isDaily
        ? "focus-visible:ring-ring/50"
        : "focus-visible:ring-ring-accent/50 focus-visible:border-ring-accent";

    const presetHoverClass = isDaily
        ? "hover:bg-primary/10 hover:border-primary/50"
        : "hover:bg-accent/10 hover:border-accent/50";

    const handleSelectPreset = (preset: PresetItem) => {
        setTitle(preset.title);
        setDesc(preset.desc);
        if (preset.category) setCategory(preset.category);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!title.trim()) return;

        onSubmit({
            title: title.trim(),
            desc: desc.trim(),
            category: category.trim(),
        });
        onClose();
    };

    return (
        <Dialog open={open} onOpenChange={(v) => !v && onClose()}>
            <DialogContent className="sm:max-w-md bg-card border-border p-0">
                <div className={'px-4 pt-4'}>
                    <DialogHeader>
                        <p className={cn("font-mono text-[10px] tracking-widest mb-0.5", isDaily ? "text-primary" : "text-accent")}>
                            {mode.toUpperCase()} ACT — {labelType}
                        </p>
                        <DialogTitle className="font-mono text-sm font-bold">{modeTitle}</DialogTitle>
                    </DialogHeader>

                    {/* 프리셋 영역 (추가 모드 && 프리셋이 있을 때만 노출) */}
                    {mode === "add" && presets?.length > 0 && (
                        <div className="space-y-1.5 pt-1">
                            <Label className="font-mono text-[10px] tracking-widest text-muted-foreground">
                                PRESETS (클릭하여 채우기)
                            </Label>
                            <div className="flex flex-wrap gap-1.5">
                                {presets?.map((p, idx) => (
                                    <button
                                        key={idx}
                                        type="button"
                                        onClick={() => handleSelectPreset(p)}
                                        className={cn(
                                            "font-mono text-xs px-2.5 py-1 rounded-sm border border-border bg-background transition-all text-left text-muted-foreground hover:text-foreground cursor-pointer",
                                            presetHoverClass
                                        )}
                                    >
                                        + {p.title}
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
                <form onSubmit={handleSubmit} className="space-y-4 pt-2">
                    <div className={'px-4 space-y-4'}>
                        {/* 대분류 (카테고리) */}
                        <div className="space-y-1">
                            <Label className="font-mono text-[10px] tracking-widest text-muted-foreground">
                                대분류 (카테고리)
                            </Label>
                            <Input
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
                                placeholder="예: 여유 있을때"
                                className={cn("bg-background font-mono text-sm", focusRingClass)}
                            />
                        </div>

                        {/* 행동 이름 */}
                        <div className="space-y-1">
                            <Label className="font-mono text-[10px] tracking-widest text-muted-foreground">
                                행동 이름 <span className="text-primary">*</span>
                            </Label>
                            <Input
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                placeholder="예: 상승 9판 돌기"
                                className={cn("bg-background font-mono text-sm", focusRingClass)}
                                autoFocus
                            />
                        </div>

                        {/* 메모 */}
                        <div className="space-y-1">
                            <Label className="font-mono text-[10px] tracking-widest text-muted-foreground">메모</Label>
                            <Input
                                value={desc}
                                onChange={(e) => setDesc(e.target.value)}
                                placeholder="예: 플래 파밍용"
                                className={cn("bg-background font-mono text-sm", focusRingClass)}
                            />
                        </div>
                    </div>
                    <div className="flex gap-2 pt-2 px-4 pb-4 bg-muted/50">
                        <Button type="button" variant="outline" onClick={onClose}
                                className="flex-1 font-mono text-xs cursor-pointer">
                            취소
                        </Button>
                        <Button
                            type="submit"
                            className={cn(
                                "flex-1 font-mono text-xs font-bold cursor-pointer",
                                isDaily ? "bg-primary text-primary-foreground" : "bg-accent text-accent-foreground hover:bg-accent/80"
                            )}
                        >
                            {submitText}
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
}