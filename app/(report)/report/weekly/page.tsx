import {Metadata} from "next";
import ActPageContainer from "@/components/act/act-page-container";


export const metadata: Metadata = {
    title: "주간 행동 | WAVE REPORTER",
    description: "이번 주 행동 달성 현황을 추적.",
    openGraph: {
        title: "주간 행동 | WAVE REPORTER",
        description: "이번 주 행동 달성 현황을 추적.",
    },
};
export default function Page() {
    return <ActPageContainer type="weekly"/>;
}