import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import {Act} from "@/lib/types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
export const getUTCTodayTimestamp = (date = new Date()): number => {
  return Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate());
};

// UTC 기준 이번 주 월요일 00:00:00 (ms) 구하기
export const getUTCWeeklyResetTimestamp = (date = new Date()): number => {
  const day = date.getUTCDay(); // 0: 일, 1: 월, ..., 6: 토
  // 월요일(1) 기준 지난 일수 계산 (일요일은 6일 전)
  const diffToMonday = day === 0 ? 6 : day - 1;
  return Date.UTC(
      date.getUTCFullYear(),
      date.getUTCMonth(),
      date.getUTCDate() - diffToMonday
  );
};


export const removeCheckedActs = (
    checked: Record<string, boolean>,
    targetActs: Act[]
): Record<string, boolean> => {
  const actIds = new Set(targetActs.map((a) => a.id));
  const newChecked = { ...checked };

  Object.keys(newChecked).forEach((id) => {
    if (actIds.has(id)) {
      delete newChecked[id];
    }
  });

  return newChecked;
};