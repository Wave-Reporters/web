"use client";

import {useState} from "react";
import {Card} from "@/components/ui/card";
import {useActStore} from "@/store/use-act-stroe";
import {ActRow} from "@/components/act-row";
import {AddActDialog} from "@/components/add-act-dialog";
import ActRowAddButton from "@/components/act-row-add-button";

export default function Page() {
    const {dailyActs, checked, toggle, handleAdd, deleteAct} = useActStore();
    const [showModal, setShowModal] = useState(false);

    const completed = dailyActs.filter((a) => checked[a.id]).length;
// 삭제 처리 함수
    const handleDelete = (id: string) => {
        deleteAct(id);
    };
    return (
        <>
            <Card className="bg-card border-border overflow-hidden mb-4 gap-0">
                <div className="flex items-center justify-between px-4 py-2.5 border-b border-border">
                    <div className="flex items-center gap-2">
                        <span className="font-mono text-xs font-bold tracking-widest uppercase text-primary">
                            DAILY ACTS </span>
                        <span className="font-mono text-xs text-muted-foreground">
                            {completed}/{dailyActs.length}
                        </span>
                    </div>
                </div>

                {dailyActs.length === 0 ? (
                    <div className="px-4 py-10 text-center">
                        <p className="font-mono text-muted-foreground text-sm">활동이 없습니다</p>
                    </div>
                ) : (
                    dailyActs.map((act) => (
                        <ActRow
                            key={act.id}
                            type={'daily'}
                            act={act}
                            checked={!!checked[act.id]}
                            onToggle={() => toggle(act.id)}
                            onDelete={() => handleDelete(act.id)}
                        />
                    ))
                )}
            </Card>

            <ActRowAddButton onClick={() => setShowModal(true)} type={'daily'}/>

            {showModal && (
                <AddActDialog
                    open={showModal}
                    type="daily"
                    onClose={() => setShowModal(false)}
                    onAdd={handleAdd}
                />
            )}
        </>
    );
}