import React from 'react';
import {Button} from "@/components/ui/button";
import {Plus} from "lucide-react";
import {cn} from "@/lib/utils";
import {Act, ActType} from "@/lib/types";

type Props = {
    onClick: React.MouseEventHandler<HTMLButtonElement>;
    type:ActType
}
const ActRowAddButton = ({onClick,type}:Props) => {
    return (
        <Button
            onClick={onClick}
            variant="outline"
            className={cn("w-full font-mono text-xs font-bold tracking-widest py-5 border-dashed  transition-all cursor-pointer",
                type === 'daily' ?
                "border-primary/40 text-primary hover:bg-primary/10"
                :
                "border-accent/40 text-accent hover:bg-accent/10")
            }
        >
            <Plus className="w-4 h-4 mr-1"/> 추가하기
        </Button>
    );
};

export default ActRowAddButton;