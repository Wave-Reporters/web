"use client";

import React, { ReactNode } from "react";
import { CheckCheck } from "lucide-react";
import { useActPage } from "@/hooks/useActPage";
import { Card } from "@/components/ui/card";
import {Act, ActType} from "@/lib/types";
import {useActFilter} from "@/hooks/use-act-filter";
import {ActRow} from "@/components/act/act-row";
import {AddActDialog} from "@/components/act/add-act-dialog";
import ActRowAddButton from "@/components/act/act-row-add-button";
import CategoryFilter from "@/components/act/act-page-container-category";
import {cn} from "@/lib/utils";

interface CategoryButtonProps {
    children: ReactNode;
    isSelected: boolean;
    onClick: () => void;
}

const CategoryButton = ({ children, isSelected, onClick }: CategoryButtonProps) => {
    return (
        <button
            type="button"
            onClick={onClick}
            className={`rounded-full px-3 py-1 text-xs font-medium transition-colors cursor-pointer ${
                isSelected
                    ? "bg-primary text-primary-foreground"
                    : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
            }`}
        >
            {children}
        </button>
    );
};

interface ActPageContainerProps {
    type: ActType;
}

export default function ActPageContainer({ type }: ActPageContainerProps) {
    const {
        handleDelete,
        handleAdd,
        setShowModal,
        showModal,
        toggle,
        checked,
        updateAct,
        acts,
        handleToggleAll,
    } = useActPage(type);

    const {
        uncompletedActs,
        filteredActs,
        filteredCategories,
        setSelectedCategory,
        selectedCategory,
        categories,
    } = useActFilter<Act>(acts, checked);

    const isDaily = type === 'daily'

    return (
        <div className="space-y-4">
            {/* ── 검색 및 카테고리 필터 영역 ── */}
            <div className="flex flex-col gap-2.5">
                <CategoryFilter
                    type={type}
                    categories={categories}
                    selectedCategory={selectedCategory}
                    uncompletedActs={uncompletedActs}
                    onSelectCategory={setSelectedCategory}
                />
            </div>

            {/* ── 대분류별 카드가 렌더링되는 영역 ── */}
            {filteredActs.length === 0 ? (
                <Card className="bg-card border-border overflow-hidden mb-4">
                    <div className="px-4 py-10 text-center">
                        <p className="font-mono text-muted-foreground text-sm">
                            {acts.length === 0
                                ? "활동이 없습니다"
                                : "검색 결과와 일치하는 활동이 없습니다."}
                        </p>
                    </div>
                </Card>
            ) : (
                filteredCategories.map((cat) => {
                    const actsGroup = filteredActs.filter((act) => (act.category || "기타") === cat);
                    const groupCompleted = actsGroup.filter((act) => !!checked[act.id]).length;
                    const isAllCompleted = actsGroup.length > 0 && groupCompleted === actsGroup.length;

                    return (
                        <div key={cat} className="mb-4">
                            <Card className="bg-card border-border overflow-hidden gap-0">
                                {/* 대분류 헤더 */}
                                <div className="flex items-center justify-between px-4 py-2.5 border-b border-border bg-muted/30">
                                    <div className="flex items-center gap-2">
                                        <span
                                            className={cn(
                                                "font-mono text-xs font-bold tracking-widest uppercase",
                                                isDaily ? "text-primary" : "text-accent"
                                            )}                                        >
                                            {cat}
                                        </span>
                                        <span className="font-mono text-xs text-muted-foreground">
                                            {groupCompleted}/{actsGroup.length}
                                        </span>
                                    </div>
                                    {/* ── 전체 토글 체크 아이콘 버튼 ── */}
                                    <button
                                        type="button"
                                        onClick={() => handleToggleAll(actsGroup, isAllCompleted)}
                                        title={isAllCompleted ? "전체 해제하기" : "전체 완료 처리"}
                                        className={cn(
                                            "p-1 rounded transition-colors cursor-pointer flex items-center justify-center hover:bg-muted",
                                            isAllCompleted
                                                ? isDaily
                                                    ? "text-primary opacity-80"
                                                    : "text-accent opacity-80"
                                                : isDaily
                                                    ? "text-muted-foreground hover:text-primary"
                                                    : "text-muted-foreground hover:text-accent"
                                        )}
                                    >
                                        <CheckCheck className="w-4 h-4" />
                                    </button>
                                </div>

                                {/* 해당 대분류의 Act 항목들 */}
                                {actsGroup.map((act) => (
                                    <ActRow
                                        key={act.id}
                                        type={type}
                                        act={act}
                                        checked={!!checked[act.id]}
                                        onToggle={() => toggle(act.id)}
                                        onDelete={() => handleDelete(act.id)}
                                        onUpdate={(updatedAct) => updateAct(updatedAct)}
                                    />
                                ))}
                            </Card>
                        </div>
                    );
                })
            )}

            <ActRowAddButton onClick={() => setShowModal(true)} type={type} />

            {showModal && (
                <AddActDialog
                    open={showModal}
                    type={type}
                    onClose={() => setShowModal(false)}
                    onAdd={handleAdd}
                />
            )}
        </div>
    );
}