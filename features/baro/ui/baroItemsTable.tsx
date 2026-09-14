"use client"
import {memo, useDeferredValue, useMemo, useState} from "react";
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import {Badge} from "@/components/ui/badge";
import {Tabs, TabsList, TabsTrigger} from "@/components/ui/tabs";
import BaroTable from "@/features/baro/ui/baroTable";
import {KITIER_ITEMS} from "@/features/baro/lib/const";

const items = KITIER_ITEMS;
export function BaroItemsTable() {
    // 필터 상태 관리
    const [scope, setScope] = useState<"all" | "weekly">("all");
    const [selectedType, setSelectedType] = useState<string>("ALL");
    const [selectedCategory, setSelectedCategory] = useState<string>("ALL");
    const [search, setSearch] = useState<string>("");

    // 1. search 반응성을 지연시키는 deferredSearch 생성
    const deferredSearch = useDeferredValue(search);

    // unique한 Type과 Category 목록 자동 추출
    const types = useMemo(() => {
        const set = new Set(items.map((i) => i.type));
        return Array.from(set).sort();
    }, [items]);

    const categories = useMemo(() => {
        const set = new Set(items.map((i) => i.category));
        return Array.from(set).sort();
    }, [items]);

    // 2. 의존성 배열 및 조건절에 search 대신 deferredSearch 사용
    const filteredItems = useMemo(() => {
        const searchKeyword = deferredSearch.trim().toLowerCase();

        return items.filter((data) => {
            // 1. 전체 / 이번주 필터
            if (scope === "weekly") return false; // ※ 참고: weekly 체크 로직 확인 필요
            // 2. 타입 필터
            if (selectedType !== "ALL" && data.type !== selectedType) return false;
            // 3. 카테고리 필터
            if (selectedCategory !== "ALL" && data.category !== selectedCategory) return false;
            // 4. 키워드 검색 (lowercase 연산 중복 방지)
            if (searchKeyword && !data.item.toLowerCase().includes(searchKeyword)) return false;

            return true;
        });
    }, [items, scope, selectedType, selectedCategory, deferredSearch]);


    return (
        <Card className="border-primary/30 bg-card relative py-4">
            {/* 상단 하이라이트 라인 */}
            <div
                className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-primary/60 via-primary/20 to-transparent"/>

            <CardHeader className="px-4 pb-3 pt-0 flex flex-col gap-3">
                {/* 상단 타이틀 & 뱃지 */}
                <div className="flex items-center justify-between">
                    <div>
                        <CardTitle
                            className="font-mono text-base sm:text-lg font-bold text-primary tracking-tight mt-0.5">
                            바로 키티어 아이템 (개발중)
                        </CardTitle>
                    </div>
                    <Badge
                        variant="outline"
                        className="font-mono text-[11px] font-bold border-primary/40 text-primary bg-primary/10 shrink-0 py-1 ml-3"
                    >
                        {filteredItems.length} ITEMS
                    </Badge>
                </div>

                {/* 필터 컨트롤 바 */}
                <div className="flex flex-col md:flex-row gap-2.5 items-stretch md:items-center justify-between pt-1">
                    {/* 1. 범위 탭: 전체 / 이번주 */}
                    <Tabs
                        value={scope}
                        onValueChange={(val) => setScope(val as "all" | "weekly")}
                        className="w-full md:w-auto"
                    >
                        <TabsList className="grid grid-cols-2 w-full md:w-48 bg-muted/50 p-1 rounded-lg">
                            <TabsTrigger value="all" className="text-xs font-mono py-1 cursor-pointer">
                                전체 목록
                            </TabsTrigger>
                            <TabsTrigger value="weekly" className="text-xs font-mono py-1 cursor-pointer">
                                이번 주
                            </TabsTrigger>
                        </TabsList>
                    </Tabs>

                    {/* 2. 상세 필터 그룹 (Type, Category, Search) */}
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:flex items-center gap-2 w-full md:w-auto">
                        {/* Type 드롭다운 */}
                        <select
                            value={selectedType}
                            onChange={(e) => setSelectedType(e.target.value)}
                            className="px-2.5 py-1.5 text-xs font-mono bg-background border border-primary/20 rounded-md focus:outline-none focus:border-primary/60 text-foreground cursor-pointer"
                        >
                            <option value="ALL">타입 (전체)</option>
                            {types.map((t) => (
                                <option key={t} value={t}>
                                    {t}
                                </option>
                            ))}
                        </select>

                        {/* Category 드롭다운 */}
                        <select
                            value={selectedCategory}
                            onChange={(e) => setSelectedCategory(e.target.value)}
                            className="px-2.5 py-1.5 text-xs font-mono bg-background border border-primary/20 rounded-md focus:outline-none focus:border-primary/60 text-foreground cursor-pointer"
                        >
                            <option value="ALL">카테고리 (전체)</option>
                            {categories.map((c) => (
                                <option key={c} value={c}>
                                    {c}
                                </option>
                            ))}
                        </select>

                        {/* 검색 인풋 */}
                        <input
                            type="text"
                            placeholder="아이템 검색..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="col-span-2 sm:col-span-1 px-3 py-1.5 text-xs font-mono bg-background border border-primary/20 rounded-md focus:outline-none focus:border-primary/60 text-foreground placeholder:text-muted-foreground/50 w-full sm:w-36 md:w-40"

                        />
                    </div>
                </div>
            </CardHeader>

            <CardContent className="px-4 pb-0">
                {/* 테이블 컨테이너 */}
                <div
                    className="overflow-x-auto border border-primary/10 rounded-lg scrollbar-thin">
                    <BaroTable filteredItems={filteredItems}/>
                </div>
            </CardContent>
        </Card>
    );
}
