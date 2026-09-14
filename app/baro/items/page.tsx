import React from 'react';
import {Metadata} from "next";
import {BaroItemsTable} from "@/features/baro/ui/baroItemsTable";
export const metadata: Metadata = {
    title: "키 티어 아이템 목록",
    description: "키티어 아이템 목록 필터링",
    openGraph: {
        title: "키 티어 아이템 목록",
        description: "키티어 아이템 목록 필터링",
    },
};
const Page = () => {
    return (
        <BaroItemsTable />
    );
};

export default Page;