"use client";

import {useState} from "react";
import {Card} from "@/components/ui/card";
import ActRowAddButton from "@/components/act-row-add-button";
import {useActStore} from "@/store/use-act-stroe";
import {ActRow} from "@/components/act-row";
import {AddActDialog} from "@/components/add-act-dialog";


export default function WeeklyPage() {
    const {weeklyActs, checked, toggle, handleAdd, deleteAct} = useActStore();
    const [showModal, setShowModal] = useState(false);

    const completed = weeklyActs.filter((a) => checked[a.id]).length;
    const handleDelete = (id: string) => {
        deleteAct(id);
    };
    return (
        <>
            <Card className="bg-card border-border overflow-hidden mb-4 gap-0">
                <div className="flex items-center justify-between px-4 py-2.5 border-b border-border">
                    <div className="flex items-center gap-2">
            <span className="font-mono text-xs font-bold tracking-widest uppercase text-accent">
              WEEKLY ACTS
            </span>
                        <span className="font-mono text-xs text-muted-foreground">
              {completed}/{weeklyActs.length}
            </span>
                    </div>
                </div>

                {weeklyActs.length === 0 ? (
                    <div className="px-4 py-10 text-center">
                        <p className="font-mono text-muted-foreground text-sm">활동이 없어. 추가해, 텐노.</p>
                    </div>
                ) : (
                    weeklyActs.map((act) => (
                        <ActRow
                            type={'weekly'}
                            key={act.id}
                            act={act}
                            checked={!!checked[act.id]}
                            onToggle={() => toggle(act.id)}
                            onDelete={() => handleDelete(act.id)}
                        />
                    ))
                )}
            </Card>

            <ActRowAddButton onClick={() => setShowModal(true)} type={'weekly'}/>

            {showModal && (
                <AddActDialog
                    open={showModal}
                    type="weekly"
                    onClose={() => setShowModal(false)}
                    onAdd={handleAdd}
                />
            )}
        </>
    );
}