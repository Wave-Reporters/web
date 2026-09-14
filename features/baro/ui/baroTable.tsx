import React from 'react';
import {kitierItems} from "@/features/baro/lib/type";
import {TYPE_BADGE_STYLES} from "@/features/baro/lib/const";

interface Props {
    filteredItems: kitierItems[]
}
const BaroTable = ({filteredItems}:Props) => {


    return (
        <table className="w-full text-left font-mono text-xs border-collapse">
            <thead
                className="bg-muted/60 sticky top-0 z-10 backdrop-blur-sm border-b border-primary/10 text-muted-foreground text-[11px]">
            <tr>
                <th className="py-2.5 px-3 font-medium">아이템 이름</th>
                <th className="py-2.5 px-3 font-medium">타입</th>
                <th className="py-2.5 px-3 font-medium">카테고리</th>
                <th className="py-2.5 px-3 font-medium text-right">두캇</th>
                <th className="py-2.5 px-3 font-medium text-right">크레딧</th>
            </tr>
            </thead>
            <tbody className="divide-y divide-primary/5">
            {filteredItems.length > 0 ? (
                filteredItems.map((data, idx) => {
                    const typeStyle =
                        TYPE_BADGE_STYLES[data.type] ||
                        "border-primary/30 text-muted-foreground bg-primary/5";

                    return (
                        <tr
                            key={idx}
                            className="hover:bg-primary/5 transition-colors group"
                        >
                            {/* 아이템 이름 + 뱃지들 */}
                            <td className="py-2.5 px-3 font-medium text-foreground">
                                <div className="flex items-center gap-2">
                          <span className="truncate max-w-[200px] sm:max-w-xs">
                            {data.item}
                          </span>
                                    {/*                    {data.isWeekly && (*/}
                                    {/*                        <span*/}
                                    {/*                            className="px-1.5 py-0.2 text-[9px] font-bold border border-emerald-500/40 text-emerald-400 bg-emerald-500/10 rounded shrink-0">*/}
                                    {/*  WEEKLY*/}
                                    {/*</span>*/}
                                    {/*                    )}*/}
                                    {data.only && (
                                        <span
                                            className="px-1.5 py-0.2 text-[9px] font-bold border border-amber-500/40 text-amber-400 bg-amber-500/10 rounded shrink-0">
                              ONLY
                            </span>
                                    )}
                                </div>
                            </td>

                            {/* 타입 */}
                            <td className="py-2.5 px-3 whitespace-nowrap">
                        <span
                            className={`inline-block px-2 py-0.5 text-[10px] font-bold border rounded ${typeStyle}`}
                        >
                          {data.type}
                        </span>
                            </td>

                            {/* 카테고리 */}
                            <td className="py-2.5 px-3 text-muted-foreground whitespace-nowrap">
                                {data.category}
                            </td>

                            {/* 두캇 */}
                            <td className="py-2.5 px-3 text-right font-bold text-amber-400 whitespace-nowrap tabular-nums">
                                {data.ducat.toLocaleString()}{" "}
                            </td>

                            {/* 크레딧 */}
                            <td className="py-2.5 px-3 text-right text-muted-foreground whitespace-nowrap tabular-nums">
                                {data.credit.toLocaleString()}{" "}
                            </td>
                        </tr>
                    );
                })
            ) : (
                <tr>
                    <td
                        colSpan={5}
                        className="py-10 text-center text-muted-foreground text-xs"
                    >
                        조건에 해당하는 아이템이 없습니다.
                    </td>
                </tr>
            )}
            </tbody>
        </table>    );
};

export default React.memo(BaroTable);