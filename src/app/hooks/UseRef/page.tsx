"use client";
import { useRef, useEffect } from "react";

export default function InputFocus() {
    const inputRef = useRef<HTMLInputElement | null>(null);

    useEffect(() => {
        inputRef.current?.focus();
    }, []);

    return (
        <div>
            <input ref={inputRef} placeholder="Type here..." />
        </div>
    );
}
