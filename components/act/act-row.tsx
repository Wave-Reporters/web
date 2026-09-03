"use client";

import React, {useCallback, useState} from "react";
import {Checkbox} from "@/components/ui/checkbox";
import {cn} from "@/lib/utils";
import {Pencil, X} from "lucide-react";
import EditActDialog from "@/components/act/edit-act-dialog";
import {Act} from "@/lib/types";

// 수정 팝업 Dialog import (경로에 맞게 수정)

export interface ActRowProps {
    act: Act;
    checked: boolean;
    onToggle: () => void;
    onDelete: () => void;
    onUpdate?: (updatedAct: Act) => void;
    type: string;
}

// ── 하위 액션 버튼 컴포넌트 ──
const EditButton = ({ onClick }: { onClick: () => void }) => (
    <button
        type="button"
        onClick={(e) => {
            e.stopPropagation();
            onClick();
        }}
        className="p-1 bg-secondary hover:bg-secondary/80 text-secondary-foreground rounded-md transition-colors focus:outline-none focus:opacity-100 shadow-sm cursor-pointer"
        aria-label="수정"
    >
        <Pencil className="w-4 h-4" />
    </button>
);

const DeleteButton = ({ onDelete }: { onDelete: () => void }) => (
    <button
        type="button"
        onClick={(e) => {
            e.stopPropagation();
            onDelete();
        }}
        className="p-1 bg-destructive/80 hover:bg-destructive text-destructive-foreground rounded-md transition-all focus:outline-none focus:opacity-100 shadow-sm cursor-pointer"
        aria-label="삭제"
    >
        <X className="w-4 h-4" />
    </button>
);

// ── 메인 컴포넌트 ──
export function ActRow({ act, checked, onToggle, onDelete, onUpdate, type }: ActRowProps) {
    const [showEditModal, setShowEditModal] = useState(false);

    const handleSave = useCallback((updatedAct: Act) => {
        onUpdate?.(updatedAct);
        setShowEditModal(false);
    }, [onUpdate]);

    return (
        <>
            <div
                className={cn(
                    "group border-b border-border px-4 py-3 flex items-center gap-3 cursor-pointer transition-colors hover:bg-muted/50",
                    checked && "opacity-60 bg-muted/20"
                )}
                onClick={onToggle}
            >
                {/* 체크박스 */}
                <Checkbox
                    checked={checked}
                    onCheckedChange={onToggle}
                    className={cn(
                        "mt-0.5",
                        type === "daily"
                            ? "border-primary data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground"
                            : "border-accent data-[state=checked]:bg-accent data-[state=checked]:border-accent"
                    )}
                    onClick={(e) => e.stopPropagation()}
                />

                {/* 텍스트 영역 */}
                <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                        <span
                            className={cn(
                                "font-mono text-sm font-semibold",
                                checked ? "line-through text-muted-foreground" : "text-foreground"
                            )}
                        >
                            {act.title}
                        </span>
                    </div>
                    {act.desc && <p className="text-xs text-muted-foreground mt-0.5">{act.desc}</p>}
                </div>

                {/* 버튼 그룹 (Hover 시 노출) */}
                <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-all">
                    <EditButton onClick={() => setShowEditModal(true)} />
                    <DeleteButton onDelete={onDelete} />
                </div>
            </div>

            {/* 수정 모달 */}
            {showEditModal && (
                <EditActDialog
                    open={showEditModal}
                    act={act}
                    onClose={() => setShowEditModal(false)}
                    onSave={handleSave}
                />
            )}
        </>
    );
}