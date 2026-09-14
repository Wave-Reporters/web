import {Metadata} from "next";
import ActPageContainer from "@/components/act/act-page-container";

export const metadata: Metadata = {
    title: "일일 행동",
    description: "오늘 완수해야 하는 일일 행동 목록과 스펙트럼 달성 상태를 실시간으로 확인하세요.",
    openGraph: {
        title: "일일 행동 | WAVE REPORTER",
        description: "오늘 완수해야 하는 일일 행동 목록과 스펙트럼 달성 상태를 실시간으로 확인하세요.",
    },
};

export default function Page() {
    return (
        <div className={'max-w-3xl mx-auto'}>
            <ActPageContainer type="daily"/>
        </div>
    )
}