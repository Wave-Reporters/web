"use client";

import React, { useRef, useState, useEffect } from "react";
import { GripVertical } from "lucide-react";
import {
    draggable,
    dropTargetForElements,
} from "@atlaskit/pragmatic-drag-and-drop/element/adapter";
import {
    attachClosestEdge,
    extractClosestEdge,
    Edge,
} from "@atlaskit/pragmatic-drag-and-drop-hitbox/closest-edge";
import { Act, ActType } from "@/lib/types";
import { ActRow } from "@/components/act/act-row";
import { cn } from "@/lib/utils";
import { setCustomNativeDragPreview } from "@atlaskit/pragmatic-drag-and-drop/element/set-custom-native-drag-preview"; // 추가

interface SortableActRowProps {
    act: Act;
    index: number;
    type: ActType;
    checked: boolean;
    onToggle: () => void;
    onDelete: () => void;
    onUpdate: (act: Act) => void;
}

export function SortableActRow({
                                   act,
                                   index,
                                   type,
                                   checked,
                                   onToggle,
                                   onDelete,
                                   onUpdate,
                               }: SortableActRowProps) {
    const ref = useRef<HTMLDivElement>(null);
    const handleRef = useRef<HTMLDivElement>(null);
    const [isDragging, setIsDragging] = useState(false);
    const [closestEdge, setClosestEdge] = useState<Edge | null>(null);

    useEffect(() => {
        const element = ref.current;
        const handle = handleRef.current;
        if (!element || !handle) return;

        // 드래그 요소 등록
        const cleanupDraggable = draggable({
            element,
            dragHandle: handle,
            getInitialData: () => ({ id: act.id, index, category: act.category || "기타" }),
            onGenerateDragPreview({ nativeSetDragImage }) {
                setCustomNativeDragPreview({
                    nativeSetDragImage,
                    render({ container }) {
                        // 빈 div를 생성하여 미리보기 이미지를 투명하게 비워버립니다.
                    },
                });
            },
            onDragStart: () => setIsDragging(true),
            onDrop: () => setIsDragging(false),
        });

        // 드롭 타겟 요소 등록
        const cleanupDropTarget = dropTargetForElements({
            element,
            getData: ({ input, element }) => {
                const data = { id: act.id, index, category: act.category || "기타" };
                return attachClosestEdge(data, {
                    input,
                    element,
                    allowedEdges: ["top", "bottom"],
                });
            },
            onDrag: ({ self }) => {
                const edge = extractClosestEdge(self.data);
                setClosestEdge(edge);
            },
            onDragLeave: () => setClosestEdge(null),
            onDrop: () => setClosestEdge(null),
        });

        return () => {
            cleanupDraggable();
            cleanupDropTarget();
        };
    }, [act.id, act.category, index]);

    return (
        <div
            ref={ref}
            className={cn(
                "relative flex items-center border-b border-border last:border-b-0 transition-colors",
                isDragging && "opacity-30 bg-muted/50"
            )}
        >
            {/* 상단 드롭 가이드 라인 */}
            {closestEdge === "top" && (
                <div className="absolute top-0 left-0 right-0 h-0.5 bg-primary z-10" />
            )}

            {/* 드래그 핸들 */}
            <div
                ref={handleRef}
                className="px-2 cursor-grab active:cursor-grabbing text-muted-foreground hover:text-foreground transition-colors"
            >
                <GripVertical className="w-4 h-4" />
            </div>

            {/* ActRow 본문 */}
            <div className="flex-1">
                <ActRow
                    type={type}
                    act={act}
                    checked={checked}
                    onToggle={onToggle}
                    onDelete={onDelete}
                    onUpdate={onUpdate}
                />
            </div>

            {/* 하단 드롭 가이드 라인 */}
            {closestEdge === "bottom" && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary z-10" />
            )}
        </div>
    );
}