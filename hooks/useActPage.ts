"use client"

// hooks/useActPage.ts
import {useEffect, useState} from "react";
import {useActStore} from "@/store/use-act-stroe";
import {Act, ActType} from "@/lib/types";
import { extractClosestEdge } from "@atlaskit/pragmatic-drag-and-drop-hitbox/closest-edge";
import { monitorForElements } from "@atlaskit/pragmatic-drag-and-drop/element/adapter";
import { reorderWithEdge } from "@atlaskit/pragmatic-drag-and-drop-hitbox/util/reorder-with-edge";

export function useActPage(type: ActType) {
    const {
        dailyActs,
        weeklyActs,
        checked,
        toggle,
        handleAdd,
        deleteAct,
        updateAct,
        checkAll,
        unCheckAll,
        reorderActs,
    } = useActStore();
    const [showModal, setShowModal] = useState(false);

    // 1. 타입에 따른 데이터 바인딩
    const acts = type === "daily" ? dailyActs : weeklyActs;

    // 3. 액션 핸들러 정의
    const handleDelete = (id: string) => {
        deleteAct(id);
    };

    const handleToggleAll = (actsGroup: Act[], isAllCompleted: Boolean) => {
        // 그룹 내 모든 항목이 이미 완료 상태인지 확인
        const allIds = actsGroup.map((act) => act.id);

        if (isAllCompleted) {
            // 이미 모두 완료되었으면 -> 전체 체크 해제
            unCheckAll(allIds);
        } else {
            // 미완료 항목이 하나라도 있으면 -> 전체 체크 완료
            checkAll(allIds);
        }
    };
    const handleReorder = (newActs: Act[]) => {
        reorderActs(type, newActs);
    };


    useEffect(() => {
        return monitorForElements({
            onDrop({ source, location }) {
                const target = location.current.dropTargets[0];
                if (!target) return;

                const sourceData = source.data as { id: string; category: string };
                const targetData = target.data as { id: string; category: string };

                // 다른 카테고리 간 이동 방지
                if (sourceData.category !== targetData.category) return;

                const category = sourceData.category;
                const categoryActs = acts.filter((act) => (act.category || "기타") === category);

                const startIndex = categoryActs.findIndex((a) => a.id === sourceData.id);
                const targetIndex = categoryActs.findIndex((a) => a.id === targetData.id);

                if (startIndex === -1 || targetIndex === -1) return;

                const closestEdgeOfTarget = extractClosestEdge(target.data);
                if (!closestEdgeOfTarget) return;

                // Pragmatic DnD 전용 배열 재배치
                const reorderedGroup = reorderWithEdge({
                    list: categoryActs,
                    startIndex,
                    indexOfTarget: targetIndex,
                    closestEdgeOfTarget,
                    axis: "vertical",
                });

                // 원본 acts 배열 갱신
                let groupIdx = 0;
                const newActs = acts.map((act) => {
                    if ((act.category || "기타") === category) {
                        return reorderedGroup[groupIdx++];
                    }
                    return act;
                });

                handleReorder(newActs);
            },
        });
    }, [acts, handleReorder]);

    return {
        acts,
        checked,
        showModal,
        setShowModal,
        toggle,
        handleAdd,
        updateAct,
        handleDelete,
        handleToggleAll,
        handleReorder
    };
}