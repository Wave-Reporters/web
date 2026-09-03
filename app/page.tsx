"use client";

import { useRouter } from "next/navigation";
import {useActStore} from "@/store/use-act-stroe";
import {Tab} from "@/lib/types";
import {DashboardTab} from "@/components/dashboard/dashboard-tab";

export default function Page() {
  const router = useRouter();
  const { dailyActs, weeklyActs, checked } = useActStore();

  const handleNavigate = (tab: Tab) => {
    if (tab === "daily") router.push("/report/daily");
    else if (tab === "weekly") router.push("/report/weekly");
    else router.push("/");
  };

  return (
        <DashboardTab
            dailyActs={dailyActs}
            weeklyActs={weeklyActs}
            checked={checked}
            onNavigate={handleNavigate}
        />
  );
}