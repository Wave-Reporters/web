import React, {useMemo} from 'react';
import {circuitRotation, IncarnonWeapon} from "@/features/circuit/lib/const";
import {getCurrentIncarnonWeek} from "@/features/circuit/lib/utils";
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import Image from 'next/image';
import IncarnonCard from "@/features/circuit/ui/IncarnonCard";
const CircuitDashBoard = () => {
    const currentWeak = useMemo(() => getCurrentIncarnonWeek(), []);
// 현재 주차의 무기 데이터 추출
    const currentRotation = circuitRotation.rotations.find((r) => r.week === currentWeak);
    if(!currentRotation) {
        return (
            <span>오류가 발생하였습니다</span>
        )
    }
    return (
        <Card className="border-primary/30 bg-card relative overflow-hidden py-4">
            <div
                className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-primary/60 via-primary/20 to-transparent"/>
            <CardHeader className="px-4 pb-3 pt-0 flex flex-row items-center justify-between space-y-0">
                <div>
                    <p className="font-mono text-[10px] text-muted-foreground tracking-widest uppercase">
                        이번 주 인카논 로테이션 (WEEK {currentWeak})
                    </p>
                </div>
            </CardHeader>
            <CardContent className="flex flex-col gap-1 md:flex-row">
                {currentRotation.weapons.map((data) => {
                    return (
                        <IncarnonCard weapon={data} key={data.id}/>
                    )
                })}
            </CardContent>
        </Card>
    );
};

export default React.memo(CircuitDashBoard);