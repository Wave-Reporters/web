"use client";

import { useEffect, useState } from "react";

export function useDailyCountdown() {
    const getSecondsLeft = () => {
        const now = new Date();
        const utcH = now.getUTCHours();
        const utcM = now.getUTCMinutes();
        const utcS = now.getUTCSeconds();
        return Math.max(0, 86400 - (utcH * 3600 + utcM * 60 + utcS));
    };

    const [seconds, setSeconds] = useState(getSecondsLeft);

    useEffect(() => {
        const id = setInterval(() => setSeconds(getSecondsLeft()), 1000);
        return () => clearInterval(id);
    }, []);

    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    const pad = (n: number) => String(n).padStart(2, "0");

    return {
        display: `${pad(h)}:${pad(m)}:${pad(s)}`,
        secondsLeft: seconds,
    };
}