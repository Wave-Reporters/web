"use client";

import React, { useState } from "react";
import {Act, ActFormData, ActType} from "@/lib/types";
import {ActFormDialog} from "@/components/act/act-form-dialog";


interface EditActDialogProps {
    open: boolean;
    act: Act;
    onClose: () => void;
    onSave: (updatedAct: Act) => void;
}

export default function EditActDialog({ open, act, onClose, onSave }: EditActDialogProps) {
    const handleSubmit = (formData: ActFormData) => {
        onSave({
            ...act,
            ...formData,
        });
    };

    return (
        <ActFormDialog
            open={open}
            type={(act.type) || "daily"}
            mode="edit"
            initialValues={{
                title: act.title,
                desc: act.desc || "",
                category: act.category || "",
            }}
            onClose={onClose}
            onSubmit={handleSubmit}
        />
    );
}