import {Metadata} from "next";
import WeeklyPage from "@/components/client-page/WeeklyPage";


export const metadata: Metadata = {
    title: "주간 행동 | WAVE REPORTER",
    description: "이번 주 행동 달성 현황을 추적.",
    openGraph: {
        title: "주간 행동 | WAVE REPORTER",
        description: "이번 주 행동 달성 현황을 추적.",
    },
};
export default function Page() {
    return (
        <WeeklyPage/>
    );
}