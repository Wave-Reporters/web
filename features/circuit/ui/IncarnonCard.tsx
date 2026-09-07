import {IncarnonWeapon} from "@/features/circuit/lib/const";
import Image from "next/image";
import React, {useMemo} from "react";

const TIER_COLORS: Record<IncarnonWeapon['tier'], string> = {
    S: 'bg-primary/90 text-white border-primary/80',
    A: 'bg-orange-500 text-white border-orange-600',
    B: 'bg-yellow-400 text-black border-yellow-500',
    C: 'bg-gray-500 text-white border-gray-600',
    D: 'bg-background-400 text-white border-gray-600',
};

function IncarnonCard({weapon}: { weapon: IncarnonWeapon }) {
    // 로컬 이미지 사용 시 경로 (public/images/incarnon/braton_Incarnon_Genesis.png)
    const imageSrc = `/images/incarnon/${weapon.id}_incarnon.webp`;

    const tierText = useMemo(() => {
        if(weapon.tier === 'S' || weapon.tier === 'A') {
            return '추천'
        }
        return ''
    },[weapon])
    return (
        <div
            className="relative flex flex-col w-full items-center justify-between p-4 bg-slate-900 rounded-xl w-44 h-52 text-center shadow-md">

            {/* 1. 오른쪽 위 끝 absolute 티어 표시 */}
            <div className={'w-10 h-5.5'}>
                {tierText &&
                <span
                    className={`px-2 py-0.5 text-xs font-black border rounded-md shadow ${
                        TIER_COLORS.S
                    }`}
                >
                    {tierText}
                </span>}
            </div>

            {/* 2. 중앙 이미지 */}
            <div className="relative w-28 h-28 my-2 md:w-20 h-20">
                <Image
                    src={imageSrc}
                    alt={weapon.name_en}
                    fill
                    className="object-contain"
                />
            </div>

            {/* 3. 아래 이름 */}
            <div className="w-full">
                <p className="font-bold text-white text-sm truncate">{weapon.name_kr}</p>
            </div>

        </div>
    );
}


export default IncarnonCard