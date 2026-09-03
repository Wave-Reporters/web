// hooks/useActPage.ts
import {useState} from "react";
import {useActStore} from "@/store/use-act-stroe";
import {Act, ActType} from "@/lib/types";

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
        unCheckAll
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
        console.log("A?SDAS?DAS?D?",actsGroup)
        const allIds = actsGroup.map((act) => act.id);

        if (isAllCompleted) {
            // 이미 모두 완료되었으면 -> 전체 체크 해제
            unCheckAll(allIds);
        } else {
            // 미완료 항목이 하나라도 있으면 -> 전체 체크 완료
            checkAll(allIds);
        }
    };


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
    };
}