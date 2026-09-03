import { useMemo, useState } from "react";

export interface ActItem {
    id: string;
    title: string;
    desc?: string;
    category?: string;
}

export function useActFilter<T extends ActItem>(
    acts: T[],
    checkedMap: Record<string, boolean>
) {
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedCategory, setSelectedCategory] = useState<string>("ALL");

    // 1. 미완료 항목 필터링
    const uncompletedActs = useMemo(() => {
        return acts.filter((act) => !checkedMap[act.id]);
    }, [acts, checkedMap]);

    // 2. 전체 카테고리 목록 추출 (정렬 없이 원래 순서 유지)
    const categories = useMemo(() => {
        return Array.from(new Set(acts.map((act) => act.category || "기타")));
    }, [acts]);

    // 3. 검색어 및 선택된 카테고리 필터링
    const filteredActs = useMemo(() => {
        const query = searchQuery.trim().toLowerCase();

        return acts.filter((act) => {
            const matchesCategory =
                selectedCategory === "ALL" || (act.category || "기타") === selectedCategory;

            const matchesSearch =
                !query ||
                act.title.toLowerCase().includes(query) ||
                (act.desc && act.desc.toLowerCase().includes(query));

            return matchesCategory && matchesSearch;
        });
    }, [acts, selectedCategory, searchQuery]);

    // 4. 필터링된 결과 내 카테고리 목록
    const filteredCategories = useMemo(() => {
        return Array.from(new Set(filteredActs.map((act) => act.category || "기타")));
    }, [filteredActs]);

    return {
        searchQuery,
        setSearchQuery,
        selectedCategory,
        setSelectedCategory,
        uncompletedActs,
        categories,
        filteredActs,
        filteredCategories,
    };
}