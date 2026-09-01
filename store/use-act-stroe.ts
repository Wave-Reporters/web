import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { Act, DEFAULT_DAILY, DEFAULT_WEEKLY } from "@/lib/types";
import {getUTCTodayTimestamp, getUTCWeeklyResetTimestamp, removeCheckedActs} from "@/lib/utils";

interface ActState {
    checked: Record<string, boolean>;
    dailyActs: Act[];
    weeklyActs: Act[];
    lastDailyReset: number; // UTC timestamp (ms)
    lastWeeklyReset: number; // UTC timestamp (ms)
    toggle: (id: string) => void;
    handleAdd: (act: Act) => void;
    deleteAct:(id:string) => void;
    checkAndReset: () => void;
}


export const useActStore = create<ActState>()(
    persist(
        (set, get) => ({
            checked: {},
            dailyActs: DEFAULT_DAILY,
            weeklyActs: DEFAULT_WEEKLY,
            lastDailyReset: 0,
            lastWeeklyReset: 0,

            toggle: (id: string) =>
                set((state) => ({
                    checked: {
                        ...state.checked,
                        [id]: !state.checked[id],
                    },
                })),

            handleAdd: (act: Act) =>
                set((state) => ({
                    dailyActs: act.type === "daily" ? [...state.dailyActs, act] : state.dailyActs,
                    weeklyActs: act.type === "weekly" ? [...state.weeklyActs, act] : state.weeklyActs,
                })),

            deleteAct: (id: string) =>
                set((state) => ({
                    dailyActs: state.dailyActs.filter((act) => act.id !== id),
                    weeklyActs: state.weeklyActs.filter((act) => act.id !== id),
                })),

            // UTC 00시 기준 초기화 검사 함수
            checkAndReset: () => {
                const { checked, dailyActs, weeklyActs, lastDailyReset, lastWeeklyReset } = get();
                const now = new Date();

                const currentUTCToday = getUTCTodayTimestamp(now);
                const currentUTCWeeklyReset = getUTCWeeklyResetTimestamp(now);

                let updatedChecked = checked;
                let updatedDailyReset = lastDailyReset;
                let updatedWeeklyReset = lastWeeklyReset;

                // 1. Daily 초기화
                if (lastDailyReset < currentUTCToday) {
                    updatedChecked = removeCheckedActs(updatedChecked, dailyActs);
                    updatedDailyReset = currentUTCToday;
                }

                // 2. Weekly 초기화
                if (lastWeeklyReset < currentUTCWeeklyReset) {
                    updatedChecked = removeCheckedActs(updatedChecked, weeklyActs);
                    updatedWeeklyReset = currentUTCWeeklyReset;
                }

                // 변경사항이 있을 때만 업데이트
                if (
                    updatedDailyReset !== lastDailyReset ||
                    updatedWeeklyReset !== lastWeeklyReset
                ) {
                    set({
                        checked: updatedChecked,
                        lastDailyReset: updatedDailyReset,
                        lastWeeklyReset: updatedWeeklyReset,
                    });
                }
            },
        }),
        {
            name: "act-storage",
            storage: createJSONStorage(() => localStorage),
            // persist 복원 완료 후 실행되는 콜백
            onRehydrateStorage: () => (state) => {
                state?.checkAndReset();
            },
        }
    )
);