import React, {ReactNode} from "react";
import {cn} from "@/lib/utils";
import {Act, ActType} from "@/lib/types";

interface CategoryFilterProps {
    type: ActType;
    categories: string[];
    selectedCategory: string;
    uncompletedActs: Act[];
    onSelectCategory: (category: string) => void;
}

interface CategoryButtonProps {
    type: ActType;
    isSelected: boolean;
    onClick: () => void;
    children: ReactNode;
}

function CategoryButton({type, isSelected, onClick, children}: CategoryButtonProps) {
    return (
        <button
            type="button"
            onClick={onClick}
            className={cn(
                "rounded-full px-3 py-1 text-xs font-medium transition-colors cursor-pointer",
                isSelected
                    ? type === "daily"
                        ? "bg-primary/80 text-primary-foreground"
                        : "bg-accent/80 text-primary-foreground"
                    : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
            )}
        >
            {children}
        </button>
    );
}

// ── 카테고리 필터 영역 전체 컴포넌트 ──
function CategoryFilter({
                            type,
                            categories,
                            selectedCategory,
                            uncompletedActs,
                            onSelectCategory,
                        }: CategoryFilterProps) {
    console.log(type)
    return (
        <div className="flex flex-wrap items-center gap-1.5">
            {/* 전체 버튼 */}
            <CategoryButton
                type={type}
                isSelected={selectedCategory === "ALL"}
                onClick={() => onSelectCategory("ALL")}
            >
                전체 ({uncompletedActs.length})
            </CategoryButton>

            {/* 개별 카테고리 버튼 */}
            {categories.map((cat) => {
                const count = uncompletedActs.filter(
                    (a) => (a.category || "기타") === cat
                ).length;
                const isSelected = selectedCategory === cat;

                return (
                    <CategoryButton
                        key={cat}
                        type={type}
                        isSelected={isSelected}
                        onClick={() => onSelectCategory(isSelected ? "ALL" : cat)}
                    >
                        {cat} ({count})
                    </CategoryButton>
                );
            })}
        </div>
    );
}

export default CategoryFilter