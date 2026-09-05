export function getCurrentIncarnonWeek(now = new Date()): number {
    // 기준점: 2024년 1월 8일 월요일 09:00:00 KST (Week 1 시작일)
    const EPOCH_DATE = new Date('2026-09-01T09:00:00+09:00');
    const TOTAL_WEEKS = 9;

    // 기준점 이전 날짜 예외 처리
    if (now.getTime() < EPOCH_DATE.getTime()) {
        return 1;
    }

    // 기준점으로부터 경과한 밀리초(ms) 계산
    const diffInMs = now.getTime() - EPOCH_DATE.getTime();

    // 밀리초를 '주(Week)' 단위로 변환
    const msInWeek = 7 * 24 * 60 * 60 * 1000;
    const passedWeeks = Math.floor(diffInMs / msInWeek);

    // 1부터 9까지 순환하는 주차 계산
    const currentWeek = (passedWeeks % TOTAL_WEEKS) + 1;

    return currentWeek;
}