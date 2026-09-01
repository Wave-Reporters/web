export type ActType = "daily" | "weekly";
export type Tab = "dashboard" | "daily" | "weekly";

export interface Act {
    id: string;
    type: ActType;
    title: string;
    desc: string;
}

export const DEFAULT_DAILY: Act[] = [
    {id: "d1", type: "daily", title: "출격 완료", desc: ""},
    {id: "d2", type: "daily", title: "강철의길 급습 완료", desc: "스틸 에센스 파밍"},
    {id: "d3", type: "daily", title: "중재 1판 돌기", desc: "쿠바 파밍"},
    {id: "d4", type: "daily", title: "추출기 돌리기", desc: "자원 파밍"},
    {id: "d6", type: "daily", title: "강범 1회 돌기", desc: ""},
];
export const DEFAULT_WEEKLY: Act[] = [
    {id: "w1", type: "weekly", title: "아야탄 유물", desc: ""},
    {id: "w2", type: "weekly", title: "집정관 사냥 완료", desc: "샤드 파밍"},
    {id: "w3", type: "weekly", title: "아르키메디아 완료", desc: "샤드 파밍"},
    {id: "w4", type: "weekly", title: "템포럴 아르키메디아 완료", desc: "샤드 파밍, 핫샷 파밍"},
    {id: "w5", type: "weekly", title: "새 3호 샤드 구매", desc: ""},
    {id: "w6", type: "weekly", title: "순환로 강길", desc: "인카논 파밍"},
    {id: "w8", type: "weekly", title: "순환로 일반", desc: "얻기 힘든 워프레임 파밍"},
    {id: "w7", type: "weekly", title: "나이트 웨이브 주간 미션 완료", desc: ""},
    {id: "w9", type: "weekly", title: "하강 강길", desc: "샤드 파밍"},
];

export const PRESET_DAILY: Act[] = [
    ...DEFAULT_DAILY,
    {id: "p1", type: "daily", title: "시터스 평판", desc: ""},
    {id: "p2", type: "daily", title: "퀼 평판", desc: ""},
    {id: "p3", type: "daily", title: "솔라리스 평판", desc: ""},
    {id: "p4", type: "daily", title: "복스 솔라리스 평판", desc: ""},
    {id: "p5", type: "daily", title: "벤트키드 평판", desc: ""},
    {id: "p7", type: "daily", title: "엔트라티 평판", desc: ""},
    {id: "p8", type: "daily", title: "카비아 평판", desc: ""},
    {id: "p9", type: "daily", title: "네크랄로이드 평판", desc: ""},
    {id: "p10", type: "daily", title: "사수자들 평판", desc: ""},
    {id: "p11", type: "daily", title: "사수자들 평판", desc: ""},
    {id: "p12", type: "daily", title: "1999 평판", desc: ""},
    {id: "p13", type: "daily", title: "세팔론 평판", desc: ""},
]

export const PRESET_WEEKLY: Act[] = [
    ...DEFAULT_WEEKLY,
    {id: "pw1", type: "weekly", title: "테신 쿠바 구매", desc: ""},
    {id: "pw2", type: "weekly", title: "칼 미션 완료하기", desc: ""},
    {id: "pw3", type: "weekly", title: "도그 데이즈 노가다", desc: ""},
    {id: "pw4", type: "weekly", title: "아이언 웨이크 리벤 사용", desc: ""},
]

export const TAB_CONFIG = {
    dashboard: {label: "대시보드", color: "primary", badgeColor: "bg-primary text-primary-foreground"},
    daily: {label: "일일 행동", color: "primary", badgeColor: "bg-primary text-primary-foreground"},
    weekly: {label: "주간 행동", color: "accent", badgeColor: "bg-accent text-accent-foreground"},
} as const;


export const ACT_COLOR_TEXT_COLOR = {
    'daily': 'text-primary border-primary/30',
    'weekly': 'text-accent border-accent/30',
}

export const ACT_TEXT_COLOR_ORIGIN = {
    'daily': 'text-primary border-primary',
    'weekly': 'text-accent border-accent',
}

export const TABS = [
    {label: "대시보드", href: "/", color: ACT_COLOR_TEXT_COLOR.daily},
    {label: "일일 행동", href: "/report/daily", color: ACT_COLOR_TEXT_COLOR.daily},
    {label: "주간 행동", href: "/report/weekly", color: ACT_COLOR_TEXT_COLOR.weekly},
];