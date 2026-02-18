'use client'

import { Button } from "@/components/ui/button";
import { useState } from "react"

export default function LazyIntitialization() {
    console.log("First render");

    const [counter, setCounter] = useState(() => {
        console.log("Initialized render");
        return 0;
    })

    return (
        <div className="w-full flex items-center justify-center h-screen">
            <Button onClick={() => setCounter(prev => prev + 1)}>
                {counter}
            </Button>
        </div>
    )
}