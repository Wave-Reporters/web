import React, {type ReactNode} from 'react';
import {Card, CardContent} from "@/components/ui/card";
import {Progress} from "@/components/ui/progress";

const DashBoardBannerContent = ({children}:{children:ReactNode}) => {
    return (
        <Card className="border-primary/30 bg-card relative overflow-hidden py-4">
            <div
                className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-primary/60 via-primary/20 to-transparent"/>
            <CardContent className="">
                {children}
            </CardContent>
        </Card>
    );
};

export default DashBoardBannerContent;