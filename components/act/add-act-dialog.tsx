"use client";

import {useState} from "react";
import {Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle,} from "@/components/ui/dialog";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {Label} from "@/components/ui/label";
import {Act, ActFormData, ActType, PRESET_DAILY, PRESET_WEEKLY, TAB_CONFIG} from "@/lib/types";
import {cn} from "@/lib/utils";
import {ActFormDialog} from "@/components/act/act-form-dialog";

interface AddActDialogProps {
    open: boolean;
    type: ActType;
    onClose: () => void;
    onAdd: (act: Act) => void;
}


interface AddActDialogProps {
    open: boolean;
    type: ActType;
    onClose: () => void;
    onAdd: (act: Act) => void;
}

const PRESETS: Record<ActType, Array<{ title: string; desc: string; category?: string }>> = {
    daily: [...PRESET_DAILY],
    weekly: [...PRESET_WEEKLY],
};

export function AddActDialog({ open, type, onClose, onAdd }: AddActDialogProps) {
    const handleSubmit = (formData: ActFormData) => {
        onAdd({
            id: `custom-${Date.now()}`,
            type,
            ...formData,
        });
    };

    return (
        <ActFormDialog
            open={open}
            type={type}
            mode="add"
            presets={PRESETS[type] || []}
            onClose={onClose}
            onSubmit={handleSubmit}
        />
    );
}