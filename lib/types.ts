export type ActType = "daily" | "weekly";
export type Tab = "dashboard" | "daily" | "weekly";

export interface Act {
    id: string;
    type: ActType;
    title: string;
    desc: string;
    category: string;
}

export const DEFAULT_DAILY: Act[] = [
    { id: "d1", type: "daily", title: "출격 완료", desc: "", category: "기타" },
    { id: "d2", type: "daily", title: "강철의길 급습 완료", desc: "스틸 에센스 파밍", category: "기타" },
    { id: "d4", type: "daily", title: "추출기 돌리기", desc: "자원 파밍", category: "필수" },

    { id: "d5", type: "daily", title: "오스트론 평판 올리기", desc: "평판작", category: "시터스" },
    { id: "d6", type: "daily", title: "퀼 평판 올리기", desc: "평판작", category: "시터스" },

    { id: "d7", type: "daily", title: "솔라리스 평판 올리기", desc: "평판작", category: "포르투나" },
    { id: "d8", type: "daily", title: "복스 솔라리스 평판 올리기", desc: "평판작", category: "포르투나" },
    { id: "d9", type: "daily", title: "벤트키드 평판 올리기", desc: "평판작", category: "포르투나" },

    { id: "d10", type: "daily", title: "엔트라피 평판 올리기", desc: "평판작", category: "네트랄리스크" },
    { id: "d11", type: "daily", title: "네크랄리스크 평판 올리기", desc: "평판작", category: "네트랄리스크" },
    { id: "d12", type: "daily", title: "카비아 평판 올리기", desc: "평판작", category: "해부의 성역" },

    { id: "d13", type: "daily", title: "사수자들 평판 올리기", desc: "평판작", category: "자리만" },

    { id: "d14", type: "daily", title: "헥스 평판 올리기", desc: "평판작", category: "1999" },
];
export const DEFAULT_WEEKLY: Act[] = [
    {id: "w1", type: "weekly", title: "아야탄 유물", desc: "",category: "기타"},
    {id: "w2", type: "weekly", title: "집정관 사냥 완료", desc: "샤드 파밍",category:"샤드"},
    {id: "w3", type: "weekly", title: "아르키메디아 완료", desc: "샤드 파밍" ,category: "샤드"},
    {id: "w4", type: "weekly", title: "템포럴 아르키메디아 완료", desc: "샤드 파밍, 핫샷 파밍",category:"샤드"},
    {id: "w5", type: "weekly", title: "새 3호 샤드 구매", desc: "",category:"샤드"},
    {id: "w6", type: "weekly", title: "순환로 강길", desc: "인카논 파밍",category:"인카논"},
    {id: "w8", type: "weekly", title: "순환로 일반", desc: "얻기 힘든 워프레임 파밍",category:"워프레임 파밍"},
    {id: "w7", type: "weekly", title: "나이트 웨이브 주간 미션 완료", desc: "",category:"기타"},
    {id: "w9", type: "weekly", title: "하강 강길", desc: "샤드 파밍",category:"샤드"},
    {id: "w13", type: "weekly", title: "1999 달력", desc: "샤드 파밍",category:"샤드"},
    {id: "w10", type: "weekly", title: "칼 미션 완료하기", desc: "",category:"기타"},

    {id: "w11", type: "weekly", title: "테신 상점확인", desc: "",category:"상점 확인"},
    {id: "w12", type: "weekly", title: "아이언 웨이크 상점확인", desc: "",category:"상점 확인"},
];

export const PRESET_DAILY: Act[] = [
    ...DEFAULT_DAILY,
]

export const PRESET_WEEKLY: Act[] = [
    ...DEFAULT_WEEKLY,
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

export interface ActFormData {
    title: string;
    desc: string;
    category: string;
}

export interface PresetItem {
    title: string;
    desc: string;
    category?: string;
}